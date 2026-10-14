import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { drawScreen, type ScreenName } from "@/components/screens/draw";
import { LiveGlucose } from "@/components/screens/glucose";
import type { ScreenLocale } from "@/components/screens/strings";
import { PHONE_DIM, createPhone, createWatch } from "./models";

/**
 * The page's single WebGL stage. One fixed canvas renders:
 *  - the journey phone, positioned in viewport space from `state.phone`,
 *    which the scroll timeline tweens;
 *  - anchored views: a model fitted into a DOM element's rect and scissored
 *    to it (the hero Watch tile, the Watch panel, the "your day" phone), so
 *    3D can live inside page layout, scroll with it and answer hover.
 * Rendering stops whenever nothing is on screen.
 */

/** The journey phone's screens, in story order; `screen` tweens through them. */
export const JOURNEY_SCREENS: ScreenName[] = ["home", "lock", "alerts", "standby"];
export const DAY_SCREENS: ScreenName[] = ["logbook", "trends", "health"];

export type StageState = {
  phone: {
    nx: number;
    ny: number;
    /** Fraction of the viewport height the phone's long side spans. */
    h: number;
    /** Max fraction of the viewport width its horizontal extent may take. */
    wMax: number;
    rx: number;
    ry: number;
    rz: number;
    visible: boolean;
  };
  /** Float index into JOURNEY_SCREENS; the fraction is the dissolve. */
  screen: number;
  alerts: number;
  intro: { y: number; r: number };
  watch: { p: number };
  day: { index: number; t: number };
};

export type AnchorKey = "watch" | "tile" | "day";

export type Stage = {
  state: StageState;
  setAnchor: (key: AnchorKey, el: HTMLElement | null) => void;
  setJourneyActive: (on: boolean) => void;
  dispose: () => void;
};

type Tex = { canvas: HTMLCanvasElement; texture: THREE.CanvasTexture; drawnKey: string };

export function createStage(canvas: HTMLCanvasElement, locale: ScreenLocale, opts: { coarse: boolean }): Stage {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  // Full device resolution on desktop so screen text stays crisp.
  const maxDpr = opts.coarse ? 1.75 : 2;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  renderer.autoClear = false;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const makeScene = () => {
    const scene = new THREE.Scene();
    scene.environment = envTex;
    scene.environmentIntensity = 0.85;
    const key = new THREE.DirectionalLight("#ffb48c", 2.4);
    key.position.set(3, 2.5, 4);
    const rim = new THREE.DirectionalLight("#ffe7d6", 1.2);
    rim.position.set(-4, 1.5, -2.5);
    const fillL = new THREE.DirectionalLight("#f36638", 0.9);
    fillL.position.set(-2, -2, 3);
    scene.add(key, rim, fillL, new THREE.AmbientLight("#ffffff", 0.18));
    return scene;
  };

  // --- Journey -----------------------------------------------------------
  const journeyScene = makeScene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 6);
  const phone = createPhone();
  journeyScene.add(phone.group);

  // --- Anchored: watch ---------------------------------------------------
  const watchScene = makeScene();
  const watchCam = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  watchCam.position.set(0, 0, 6);
  const watch = createWatch();
  watchScene.add(watch.group);

  // --- Anchored: "your day" phone ---------------------------------------
  const dayScene = makeScene();
  const dayCam = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  dayCam.position.set(0, 0, 6);
  const dayPhone = createPhone();
  dayScene.add(dayPhone.group);

  const state: StageState = {
    phone: { nx: 0.12, ny: -0.02, h: 0.78, wMax: 0.9, rx: 0.08, ry: -0.42, rz: 0.1, visible: true },
    screen: 0,
    alerts: 0,
    intro: { y: 0, r: 0 },
    watch: { p: 0 },
    day: { index: 0, t: 0 },
  };

  // --- Live glucose and screen textures ---------------------------------
  const live = new LiveGlucose();
  let now = new Date();
  const textures = new Map<string, Tex>();
  // 3 px per point on desktop (1179x2556, the real iPhone resolution).
  const screenScale = opts.coarse ? 2.2 : 3;

  const drawState = (progress?: number) => ({
    locale,
    value: live.value,
    trend: live.trend,
    delta: live.delta,
    series: live.series,
    now,
    progress,
  });

  const getTex = (name: ScreenName, slot = ""): Tex => {
    const key = name + slot;
    let t = textures.get(key);
    if (!t) {
      const c = document.createElement("canvas");
      const texture = new THREE.CanvasTexture(c);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      t = { canvas: c, texture, drawnKey: "" };
      textures.set(key, t);
    }
    return t;
  };

  /** Redraws a screen only when what it shows has changed. */
  const ensureDrawn = (name: ScreenName, slot = "") => {
    const t = getTex(name, slot);
    const progress = name === "alerts" ? Math.round(state.alerts * 60) / 60 : undefined;
    const key = `${live.value}|${now.getHours()}:${now.getMinutes()}|${progress ?? ""}`;
    if (t.drawnKey !== key) {
      drawScreen(t.canvas, name, drawState(progress), screenScale, () => {
        t.drawnKey = "";
        requestRender();
      });
      t.texture.needsUpdate = true;
      t.drawnKey = key;
    }
    return t.texture;
  };

  // --- Layout ------------------------------------------------------------
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  const resize = () => {
    vw = window.innerWidth;
    vh = canvas.clientHeight || window.innerHeight;
    renderer.setSize(vw, vh, false);
    camera.aspect = vw / vh;
    camera.updateProjectionMatrix();
    requestRender();
  };

  // --- Pointer parallax (fine pointers only) ----------------------------
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    pointer.tx = (e.clientX / vw) * 2 - 1;
    pointer.ty = (e.clientY / vh) * 2 - 1;
    requestRender();
  };
  if (!opts.coarse) window.addEventListener("pointermove", onPointer, { passive: true });

  // --- Anchors -----------------------------------------------------------
  type Anchor = { el: HTMLElement | null; visible: boolean; hx: number; hy: number; hover: number; target: number };
  const mk = (): Anchor => ({ el: null, visible: false, hx: 0, hy: 0, hover: 0, target: 0 });
  const anchors: Record<AnchorKey, Anchor> = { watch: mk(), tile: mk(), day: mk() };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const key = (e.target as HTMLElement).dataset.anchor as AnchorKey;
        if (anchors[key]) anchors[key].visible = e.isIntersecting;
      }
      requestRender();
    },
    { rootMargin: "10% 0px" },
  );
  // Hover is read from the anchor's own hover target (the card around it).
  const hoverOff: Array<() => void> = [];
  const setAnchor = (key: AnchorKey, el: HTMLElement | null) => {
    const a = anchors[key];
    if (a.el) io.unobserve(a.el);
    a.el = el;
    if (!el) return;
    io.observe(el);
    const host = (el.closest("[data-hover-host]") as HTMLElement | null) ?? el;
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      a.hx = ((e.clientX - r.left) / r.width) * 2 - 1;
      a.hy = ((e.clientY - r.top) / r.height) * 2 - 1;
      a.target = 1;
      requestRender();
    };
    const leave = () => {
      a.target = 0;
      a.hx = 0;
      a.hy = 0;
      requestRender();
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    hoverOff.push(() => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    });
  };

  let journeyActive = true;
  const setJourneyActive = (on: boolean) => {
    journeyActive = on;
    requestRender();
  };

  // --- Frame loop --------------------------------------------------------
  let raf = 0;
  let running = false;
  let disposed = false;
  let lastTick = performance.now();
  const clock = new THREE.Clock();

  function requestRender() {
    if (running || disposed) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  const halfExtents = (cam: THREE.PerspectiveCamera) => {
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z;
    return { halfH, halfW: halfH * cam.aspect };
  };

  const pickScreens = (list: ScreenName[], f: number, slot: string, mat: THREE.ShaderMaterial) => {
    const clamped = Math.max(0, Math.min(list.length - 1, f));
    const i = Math.min(list.length - 2, Math.floor(clamped));
    const frac = clamped - i;
    mat.uniforms.mapA.value = ensureDrawn(list[i], slot);
    mat.uniforms.mapB.value = ensureDrawn(list[i + 1], slot);
    mat.uniforms.mixT.value = frac;
  };

  function renderJourney(t: number) {
    const p = state.phone;
    const { halfH, halfW } = halfExtents(camera);
    const rz = p.rz;
    const extentX = Math.abs(Math.cos(rz)) * PHONE_DIM.w + Math.abs(Math.sin(rz)) * PHONE_DIM.h;
    const scale = Math.min((p.h * 2 * halfH) / PHONE_DIM.h, (p.wMax * 2 * halfW) / extentX);

    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    const floatY = Math.sin(t * 0.9) * 0.012;

    // A slow breathing sway keeps the phone alive while the copy holds still.
    const sway = Math.sin(t * 0.45) * 0.035;

    phone.group.scale.setScalar(scale);
    phone.group.position.set(p.nx * halfW, (p.ny + state.intro.y) * halfH + floatY * scale, 0);
    phone.group.rotation.set(
      p.rx + pointer.y * 0.08 + state.intro.r * 0.6,
      p.ry + pointer.x * 0.14 + state.intro.r + sway,
      rz + sway * 0.3,
    );

    pickScreens(JOURNEY_SCREENS, state.screen, "", phone.screen.material);
    phone.screen.material.uniforms.time.value = t;

    renderer.setViewport(0, 0, vw, vh);
    renderer.setScissorTest(false);
    renderer.render(journeyScene, camera);
  }

  const fitWatch = (rect: DOMRect, heightFrac: number, lift: number) => {
    watchCam.aspect = rect.width / rect.height;
    watchCam.updateProjectionMatrix();
    const { halfH, halfW } = halfExtents(watchCam);
    const s = Math.min((halfH * 2 * heightFrac) / 0.5, (halfW * 2 * 0.62) / 0.42);
    watch.group.scale.setScalar(s);
    watch.group.position.set(0, lift * halfH, 0);
  };

  function renderAnchored(key: AnchorKey, t: number) {
    const a = anchors[key];
    if (!a.el || !a.visible) return;
    const rect = a.el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh || rect.width < 2 || rect.height < 2) return;
    a.hover += (a.target - a.hover) * 0.08;
    const x = rect.left;
    const y = vh - rect.bottom; // GL origin is bottom-left
    renderer.setViewport(x, y, rect.width, rect.height);
    renderer.setScissor(x, y, rect.width, rect.height);
    renderer.setScissorTest(true);
    const h = a.hover;

    if (key === "watch" || key === "tile") {
      if (key === "watch") {
        const p = state.watch.p;
        const narrow = rect.width < 640;
        fitWatch(rect, narrow ? 0.4 : 0.5, narrow ? 0.3 : -0.02);
        watch.group.rotation.set(
          0.42 - p * 0.24 + a.hy * 0.22 * h,
          -0.8 + p * 1.3 + pointer.x * 0.1 + a.hx * 0.32 * h,
          -0.1 + p * 0.14,
        );
      } else {
        // Hero tile: idles in a slow turn; on hover it squares up to the
        // pointer and steps forward.
        fitWatch(rect, 0.62 + 0.1 * h, 0.04);
        watch.group.rotation.set(
          0.25 * (1 - h) + a.hy * 0.35 * h,
          Math.sin(t * 0.6) * 0.5 * (1 - h) + a.hx * 0.6 * h,
          0,
        );
      }
      const wm = watch.screen.material;
      wm.uniforms.mapA.value = ensureDrawn("watch");
      wm.uniforms.mapB.value = ensureDrawn("watch");
      wm.uniforms.mixT.value = 0;
      renderer.render(watchScene, watchCam);
    } else {
      dayCam.aspect = rect.width / rect.height;
      dayCam.updateProjectionMatrix();
      const { halfH, halfW } = halfExtents(dayCam);
      const s = Math.min((halfH * 2 * 0.84) / PHONE_DIM.h, (halfW * 2 * 0.7) / PHONE_DIM.w);
      // Scroll turns the phone as the card travels through the viewport.
      const travel = (rect.top + rect.height / 2) / vh - 0.5;
      dayPhone.group.scale.setScalar(s * (1 + 0.04 * h));
      dayPhone.group.position.set(0, Math.sin(t * 0.8) * 0.01, 0);
      dayPhone.group.rotation.set(
        0.06 - travel * 0.3 + a.hy * 0.25 * h,
        -0.32 + travel * 0.9 + a.hx * 0.45 * h,
        0.04 + travel * 0.08,
      );
      const m = dayPhone.screen.material;
      const from = DAY_SCREENS[Math.max(0, Math.min(DAY_SCREENS.length - 1, state.day.index))];
      const prev = (m.userData.prev as ScreenName) ?? from;
      m.uniforms.mapA.value = ensureDrawn(prev, "d");
      m.uniforms.mapB.value = ensureDrawn(from, "d");
      m.uniforms.mixT.value = prev === from ? 0 : state.day.t;
      if (state.day.t >= 1) m.userData.prev = from;
      m.uniforms.time.value = t;
      renderer.render(dayScene, dayCam);
    }
  }

  function frame() {
    running = false;
    if (disposed) return;
    const t = clock.getElapsedTime();

    // Tick the live reading every few seconds while anything shows it.
    const nowMs = performance.now();
    if (nowMs - lastTick > 3200) {
      live.tick();
      now = new Date();
      lastTick = nowMs;
      window.dispatchEvent(
        new CustomEvent("dulce:glucose", {
          detail: { value: live.value, trend: live.trend, delta: live.delta, series: live.series },
        }),
      );
    }

    renderer.setScissorTest(false);
    renderer.clear();
    const showJourney = journeyActive && state.phone.visible;
    if (showJourney) renderJourney(t);
    renderAnchored("tile", t);
    renderAnchored("watch", t);
    renderAnchored("day", t);

    const anyVisible = showJourney || anchors.watch.visible || anchors.day.visible || anchors.tile.visible;
    if (anyVisible && !document.hidden) {
      running = true;
      raf = requestAnimationFrame(frame);
    }
  }

  const onVisibility = () => {
    if (!document.hidden) requestRender();
  };
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("resize", resize);
  resize();
  requestRender();

  // Every tween writes into `state`; nudge the loop whenever it might sleep.
  const stateProxy = new Proxy(state, {
    get(target, prop, receiver) {
      requestRender();
      return Reflect.get(target, prop, receiver);
    },
  });

  return {
    state: stateProxy,
    setAnchor,
    setJourneyActive,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      hoverOff.forEach((fn) => fn());
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      textures.forEach((t) => t.texture.dispose());
      phone.dispose();
      dayPhone.dispose();
      watch.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
