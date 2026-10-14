/**
 * A small stable-fluids simulation (semi-Lagrangian advection, vorticity
 * confinement, Jacobi pressure solve) rendering coloured "ink in water" that
 * the pointer stirs. WebGL2 with half-float render targets; returns null where
 * that is unavailable so callers simply skip the effect.
 */

type FBO = {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach: (id: number) => number;
};
type DoubleFBO = { read: FBO; write: FBO; swap: () => void; width: number; height: number };

export type Fluid = {
  splat: (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => void;
  step: (dt: number) => void;
  render: () => void;
  resize: () => void;
  dispose: () => void;
};

const VERT = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
uniform vec2 texelSize;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
out vec4 o;
`;

const FRAG = {
  splat: `${HEAD}
uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
void main() {
  vec2 p = vUv - point; p.x *= aspectRatio;
  vec3 s = exp(-dot(p, p) / radius) * color;
  o = vec4(texture(uTarget, vUv).xyz + s, 1.0);
}`,
  advection: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  o = texture(uSource, coord) / (1.0 + dissipation * dt);
}`,
  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,
  curl: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y; float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x; float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,
  vorticity: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main() {
  float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C; force.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + force * dt;
  o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`,
  pressure: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  float d = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
}`,
  gradient: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(v, 0.0, 1.0);
}`,
  clear: `${HEAD}
uniform sampler2D uTexture; uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,
  display: `${HEAD}
uniform sampler2D uTexture;
void main() {
  vec3 c = clamp(texture(uTexture, vUv).rgb, 0.0, 1.0);
  float a = max(c.r, max(c.g, c.b));
  o = vec4(c, a);
}`,
};

type Program = { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null> };

export function createFluid(canvas: HTMLCanvasElement, opts: { simRes?: number; dyeRes?: number } = {}): Fluid | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });
  if (!gl || gl.isContextLost() || !gl.getExtension("EXT_color_buffer_float")) return null;
  gl.getExtension("OES_texture_float_linear");

  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
    return sh;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const make = (src: string): Program => {
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, src));
    gl.bindAttribLocation(program, 0, "aPosition");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
    const uniforms: Program["uniforms"] = {};
    const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < n; i++) {
      const name = gl.getActiveUniform(program, i)!.name;
      uniforms[name] = gl.getUniformLocation(program, name);
    }
    return { program, uniforms };
  };

  let P: Record<keyof typeof FRAG, Program>;
  try {
    P = Object.fromEntries(Object.entries(FRAG).map(([k, v]) => [k, make(v)])) as typeof P;
  } catch {
    return null;
  }

  // Full-screen quad.
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const ebo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  const blit = (target: FBO | null) => {
    if (target) {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };

  const textures: WebGLTexture[] = [];
  const fbos: WebGLFramebuffer[] = [];
  const createFBO = (w: number, h: number, internal: number, format: number): FBO => {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    textures.push(texture);
    fbos.push(fbo);
    return {
      texture,
      fbo,
      width: w,
      height: h,
      attach: (id) => {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  };
  const createDouble = (w: number, h: number, internal: number, format: number): DoubleFBO => {
    let a = createFBO(w, h, internal, format);
    let b = createFBO(w, h, internal, format);
    return {
      width: w,
      height: h,
      get read() {
        return a;
      },
      get write() {
        return b;
      },
      swap() {
        [a, b] = [b, a];
      },
    } as DoubleFBO;
  };

  const res = (target: number) => {
    const aspect = gl.drawingBufferWidth / Math.max(1, gl.drawingBufferHeight);
    const min = Math.round(target);
    const max = Math.round(target * (aspect < 1 ? 1 / aspect : aspect));
    return aspect >= 1 ? { w: max, h: min } : { w: min, h: max };
  };

  let velocity!: DoubleFBO;
  let dye!: DoubleFBO;
  let pressure!: DoubleFBO;
  let divergence!: FBO;
  let curl!: FBO;
  let ready = false;
  const freeTargets = () => {
    textures.splice(0).forEach((t) => gl.deleteTexture(t));
    fbos.splice(0).forEach((f) => gl.deleteFramebuffer(f));
  };
  const initTargets = () => {
    freeTargets();
    const sim = res(opts.simRes ?? 128);
    const dy = res(opts.dyeRes ?? 512);
    ready = true;
    velocity = createDouble(sim.w, sim.h, gl.RG16F, gl.RG);
    dye = createDouble(dy.w, dy.h, gl.RGBA16F, gl.RGBA);
    pressure = createDouble(sim.w, sim.h, gl.R16F, gl.RED);
    divergence = createFBO(sim.w, sim.h, gl.R16F, gl.RED);
    curl = createFBO(sim.w, sim.h, gl.R16F, gl.RED);
  };

  const bind = (p: Program) => gl.useProgram(p.program);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(2, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(2, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      initTargets();
    }
  };
  resize();
  if (!ready) initTargets();

  const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => {
    const aspect = canvas.width / canvas.height;
    bind(P.splat);
    gl.uniform1i(P.splat.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(P.splat.uniforms.aspectRatio, aspect);
    gl.uniform2f(P.splat.uniforms.point, x, y);
    gl.uniform3f(P.splat.uniforms.color, dx, dy, 0);
    gl.uniform1f(P.splat.uniforms.radius, (0.28 / 100) * (aspect > 1 ? aspect : 1));
    blit(velocity.write);
    velocity.swap();
    gl.uniform1i(P.splat.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(P.splat.uniforms.color, color[0], color[1], color[2]);
    blit(dye.write);
    dye.swap();
  };

  const step = (dt: number) => {
    gl.disable(gl.BLEND);
    const tx = 1 / velocity.width;
    const ty = 1 / velocity.height;

    bind(P.curl);
    gl.uniform2f(P.curl.uniforms.texelSize, tx, ty);
    gl.uniform1i(P.curl.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    bind(P.vorticity);
    gl.uniform2f(P.vorticity.uniforms.texelSize, tx, ty);
    gl.uniform1i(P.vorticity.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(P.vorticity.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(P.vorticity.uniforms.curl, 28);
    gl.uniform1f(P.vorticity.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    bind(P.divergence);
    gl.uniform2f(P.divergence.uniforms.texelSize, tx, ty);
    gl.uniform1i(P.divergence.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    bind(P.clear);
    gl.uniform1i(P.clear.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(P.clear.uniforms.value, 0.8);
    blit(pressure.write);
    pressure.swap();

    bind(P.pressure);
    gl.uniform2f(P.pressure.uniforms.texelSize, tx, ty);
    gl.uniform1i(P.pressure.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < 20; i++) {
      gl.uniform1i(P.pressure.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    bind(P.gradient);
    gl.uniform2f(P.gradient.uniforms.texelSize, tx, ty);
    gl.uniform1i(P.gradient.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(P.gradient.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    bind(P.advection);
    gl.uniform2f(P.advection.uniforms.texelSize, tx, ty);
    const vid = velocity.read.attach(0);
    gl.uniform1i(P.advection.uniforms.uVelocity, vid);
    gl.uniform1i(P.advection.uniforms.uSource, vid);
    gl.uniform1f(P.advection.uniforms.dt, dt);
    gl.uniform1f(P.advection.uniforms.dissipation, 0.25);
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(P.advection.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(P.advection.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(P.advection.uniforms.dissipation, 1.35);
    blit(dye.write);
    dye.swap();
  };

  const render = () => {
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    bind(P.display);
    gl.uniform1i(P.display.uniforms.uTexture, dye.read.attach(0));
    blit(null);
  };

  // Frees GPU resources but keeps the context: a canvas only ever has one, so
  // losing it on purpose would leave nothing to restart with (and a lost
  // context composites as an opaque white sheet under mix-blend-screen).
  const dispose = () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    freeTargets();
    Object.values(P).forEach((p) => gl.deleteProgram(p.program));
    gl.deleteShader(vs);
    gl.deleteBuffer(vbo);
    gl.deleteBuffer(ebo);
  };

  return { splat, step, render, resize, dispose };
}
