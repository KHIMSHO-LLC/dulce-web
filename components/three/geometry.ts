import * as THREE from "three";

/** Rounded rectangle centred on the origin. */
export function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const x = -w / 2;
  const y = -h / 2;
  const rad = Math.min(r, w / 2, h / 2);
  const s = new THREE.Shape();
  s.moveTo(x + rad, y);
  s.lineTo(x + w - rad, y);
  s.quadraticCurveTo(x + w, y, x + w, y + rad);
  s.lineTo(x + w, y + h - rad);
  s.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  s.lineTo(x + rad, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - rad);
  s.lineTo(x, y + rad);
  s.quadraticCurveTo(x, y, x + rad, y);
  return s;
}

/** Flat rounded-rect plane with UVs normalised to 0..1 across its bounds. */
export function roundedPlane(w: number, h: number, r: number, segments = 32): THREE.ShapeGeometry {
  const geo = new THREE.ShapeGeometry(roundedRectShape(w, h, r), segments);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

/** Extruded rounded slab centred on z, with a soft bevel. */
export function roundedSlab(w: number, h: number, depth: number, r: number, bevel: number, curveSegments = 40) {
  const shape = roundedRectShape(w - bevel * 2, h - bevel * 2, Math.max(0.001, r - bevel));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.0001, depth - bevel * 2),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 10,
    curveSegments,
  });
  geo.translate(0, 0, -(depth - bevel * 2) / 2);
  geo.computeVertexNormals();
  return geo;
}

const noiseGlsl = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
`;

/**
 * Screen material: shows `mapA`, and as `mixT` goes 0 -> 1 a liquid front
 * (fbm noise threshold with a refracting, ember-lit edge) washes in `mapB`.
 */
export function createScreenMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      mapA: { value: null as THREE.Texture | null },
      mapB: { value: null as THREE.Texture | null },
      mixT: { value: 0 },
      time: { value: 0 },
      brightness: { value: 1.0 },
      edgeColor: { value: new THREE.Color("#f36638") },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform sampler2D mapA;
      uniform sampler2D mapB;
      uniform float mixT;
      uniform float time;
      uniform float brightness;
      uniform vec3 edgeColor;
      ${noiseGlsl}
      void main() {
        vec2 uv = vUv;
        float n = fbm(uv * vec2(2.6, 5.2) + vec2(0.0, time * 0.04));
        float t = mixT * 1.3 - 0.15;
        float band = smoothstep(t - 0.14, t, n) - smoothstep(t, t + 0.14, n);
        vec2 warp = (vec2(n, fbm(uv * 4.0 + 3.1)) - 0.5) * band * 0.09;
        vec4 a = texture2D(mapA, uv + warp);
        vec4 b = texture2D(mapB, uv - warp);
        float m = smoothstep(t + 0.015, t - 0.015, n);
        vec3 col = mix(a.rgb, b.rgb, m);
        float washing = step(0.002, mixT) * step(mixT, 0.998);
        col += edgeColor * band * 0.85 * washing;
        gl_FragColor = vec4(col * brightness, 1.0);
        #include <colorspace_fragment>
      }
    `,
    toneMapped: false,
  });
}
