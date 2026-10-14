import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { createScreenMaterial, roundedPlane, roundedSlab } from "./geometry";

/**
 * Procedural devices. Proportions follow a 6.1" iPhone (71.6 x 146.6 x 8.25 mm)
 * and a 45 mm Watch case at 1 unit = 100 mm. The phone carries the Apple logo
 * on its back, since the app is iOS-only.
 */
export const PHONE_DIM = { w: 0.716, h: 1.466, d: 0.0825, r: 0.112 } as const;
export const WATCH_DIM = { w: 0.42, h: 0.5, d: 0.11 } as const;

/** The Apple logo, in a 24x24 SVG box (y down). */
const APPLE_LOGO =
  "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701";

/** Flat logo geometry, centred, `height` tall, y up. */
function appleLogo(height: number): THREE.ShapeGeometry {
  const svg = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${APPLE_LOGO}"/></svg>`);
  const shapes = svg.paths.flatMap((path) => SVGLoader.createShapes(path));
  const geo = new THREE.ShapeGeometry(shapes, 24);
  geo.computeBoundingBox();
  const box = geo.boundingBox!;
  const k = height / (box.max.y - box.min.y);
  geo.translate(-(box.min.x + box.max.x) / 2, -(box.min.y + box.max.y) / 2, 0);
  geo.scale(k, -k, 1);
  // Flipping y reverses the winding; flip the index back so the face points +z.
  const index = geo.index!;
  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i + 1);
    index.setX(i + 1, index.getX(i + 2));
    index.setX(i + 2, a);
  }
  geo.computeVertexNormals();
  return geo;
}

/** Screen aspect must match the 393x852 texture. */
const SCREEN_H = 1.43;
const SCREEN_W = SCREEN_H * (393 / 852);

export type PhoneModel = {
  group: THREE.Group;
  screen: THREE.Mesh<THREE.ShapeGeometry, THREE.ShaderMaterial>;
  dispose: () => void;
};

export function createPhone(): PhoneModel {
  const { w, h, d, r } = PHONE_DIM;
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  // Warm "desert" titanium frame.
  const frameMat = track(
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6b5a4d"),
      metalness: 1,
      roughness: 0.3,
      clearcoat: 0.4,
      clearcoatRoughness: 0.25,
    }),
  );
  const body = new THREE.Mesh(track(roundedSlab(w, h, d, r, 0.014)), frameMat);
  group.add(body);

  // Front black glass.
  const frontGlass = new THREE.Mesh(
    track(roundedPlane(w - 0.012, h - 0.012, r - 0.006)),
    track(
      new THREE.MeshPhysicalMaterial({
        color: "#030303",
        metalness: 0,
        roughness: 0.06,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
      }),
    ),
  );
  frontGlass.position.z = d / 2 + 0.0006;
  group.add(frontGlass);

  // The display.
  const screenMat = track(createScreenMaterial());
  const screen = new THREE.Mesh(track(roundedPlane(SCREEN_W, SCREEN_H, 0.092, 48)), screenMat);
  screen.position.z = d / 2 + 0.0012;
  group.add(screen);

  // A whisper of reflective glass over the display.
  const sheen = new THREE.Mesh(
    track(roundedPlane(SCREEN_W, SCREEN_H, 0.092)),
    track(
      new THREE.MeshPhysicalMaterial({
        color: "#000000",
        metalness: 0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.07,
        depthWrite: false,
      }),
    ),
  );
  sheen.position.z = d / 2 + 0.0018;
  group.add(sheen);

  // Back: matte glass, camera plateau and lenses.
  const backMat = track(
    new THREE.MeshPhysicalMaterial({
      color: "#5b4c41",
      metalness: 0.2,
      roughness: 0.55,
      clearcoat: 0.3,
      clearcoatRoughness: 0.6,
    }),
  );
  const back = new THREE.Mesh(track(roundedPlane(w - 0.016, h - 0.016, r - 0.008)), backMat);
  back.rotation.y = Math.PI;
  back.position.z = -d / 2 - 0.0006;
  group.add(back);

  // Polished logo, centred on the back like the real thing.
  const logo = new THREE.Mesh(
    track(appleLogo(0.17)),
    track(new THREE.MeshPhysicalMaterial({ color: "#8a7564", metalness: 1, roughness: 0.18, clearcoat: 1 })),
  );
  logo.rotation.y = Math.PI;
  logo.position.set(0, 0.02, -d / 2 - 0.0012);
  group.add(logo);

  const plateau = new THREE.Mesh(track(roundedSlab(0.31, 0.31, 0.018, 0.075, 0.006)), backMat);
  const px = w / 2 - 0.03 - 0.155;
  const py = h / 2 - 0.03 - 0.155;
  plateau.position.set(px, py, -d / 2 - 0.006);
  group.add(plateau);

  const ringMat = track(new THREE.MeshPhysicalMaterial({ color: "#7b6a5c", metalness: 1, roughness: 0.25 }));
  const lensGlass = track(
    new THREE.MeshPhysicalMaterial({ color: "#05070a", metalness: 0.1, roughness: 0.05, clearcoat: 1 }),
  );
  const lensInner = track(new THREE.MeshPhysicalMaterial({ color: "#121a2a", metalness: 0.6, roughness: 0.15 }));
  const ringGeo = track(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 48));
  const glassGeo = track(new THREE.CylinderGeometry(0.048, 0.048, 0.032, 48));
  const innerGeo = track(new THREE.CylinderGeometry(0.022, 0.022, 0.034, 32));
  // Viewed from the back, two lenses stack on the left and one sits right.
  const lensSpots: Array<[number, number]> = [
    [px + 0.068, py + 0.068],
    [px + 0.068, py - 0.068],
    [px - 0.07, py],
  ];
  for (const [lx, ly] of lensSpots) {
    const lens = new THREE.Group();
    const ring = new THREE.Mesh(ringGeo, ringMat);
    const glass = new THREE.Mesh(glassGeo, lensGlass);
    const inner = new THREE.Mesh(innerGeo, lensInner);
    [ring, glass, inner].forEach((m) => {
      m.rotation.x = Math.PI / 2;
      lens.add(m);
    });
    lens.position.set(lx, ly, -d / 2 - 0.024);
    group.add(lens);
  }
  const dotGeo = track(new THREE.CylinderGeometry(0.018, 0.018, 0.01, 24));
  const flash = new THREE.Mesh(dotGeo, track(new THREE.MeshStandardMaterial({ color: "#e9dcc6", roughness: 0.4 })));
  flash.rotation.x = Math.PI / 2;
  flash.position.set(px - 0.07, py + 0.1, -d / 2 - 0.016);
  const lidar = new THREE.Mesh(dotGeo, lensGlass);
  lidar.rotation.x = Math.PI / 2;
  lidar.position.set(px - 0.07, py - 0.1, -d / 2 - 0.016);
  group.add(flash, lidar);

  // Side buttons.
  const btnMat = frameMat;
  const power = new THREE.Mesh(track(new RoundedBoxGeometry(0.012, 0.16, 0.03, 3, 0.006)), btnMat);
  power.position.set(w / 2 + 0.003, 0.26, 0);
  const volUp = new THREE.Mesh(track(new RoundedBoxGeometry(0.012, 0.12, 0.03, 3, 0.006)), btnMat);
  volUp.position.set(-w / 2 - 0.003, 0.3, 0);
  const volDown = volUp.clone();
  volDown.position.y = 0.15;
  const action = new THREE.Mesh(track(new RoundedBoxGeometry(0.012, 0.07, 0.03, 3, 0.006)), btnMat);
  action.position.set(-w / 2 - 0.003, 0.47, 0);
  group.add(power, volUp, volDown, action);

  return {
    group,
    screen,
    dispose: () => disposables.forEach((x) => x.dispose()),
  };
}

export type WatchModel = PhoneModel;

/** Watch with a natural titanium case, ember band and a glucose face. */
export function createWatch(): WatchModel {
  const { w, h, d } = WATCH_DIM;
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  const caseMat = track(
    new THREE.MeshPhysicalMaterial({ color: "#8c8279", metalness: 1, roughness: 0.28, clearcoat: 0.5 }),
  );
  const body = new THREE.Mesh(track(roundedSlab(w, h, d, 0.13, 0.03, 48)), caseMat);
  group.add(body);

  const bezel = new THREE.Mesh(
    track(roundedPlane(w - 0.03, h - 0.03, 0.115)),
    track(new THREE.MeshPhysicalMaterial({ color: "#020202", roughness: 0.05, clearcoat: 1 })),
  );
  bezel.position.z = d / 2 + 0.001;
  group.add(bezel);

  // 368x448 texture aspect.
  const sh = h - 0.075;
  const sw = sh * (368 / 448);
  const screenMat = track(createScreenMaterial());
  const screen = new THREE.Mesh(track(roundedPlane(sw, sh, 0.09, 48)), screenMat);
  screen.position.z = d / 2 + 0.0016;
  group.add(screen);

  // Crown with an ember ring, and the side button.
  const crown = new THREE.Mesh(track(new THREE.CylinderGeometry(0.036, 0.036, 0.05, 40)), caseMat);
  crown.rotation.z = Math.PI / 2;
  crown.position.set(w / 2 + 0.02, 0.08, 0);
  const crownRing = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.038, 0.038, 0.012, 40)),
    track(new THREE.MeshStandardMaterial({ color: "#f36638", roughness: 0.4 })),
  );
  crownRing.rotation.z = Math.PI / 2;
  crownRing.position.set(w / 2 + 0.036, 0.08, 0);
  const sideBtn = new THREE.Mesh(track(new RoundedBoxGeometry(0.02, 0.11, 0.045, 3, 0.008)), caseMat);
  sideBtn.position.set(w / 2 + 0.006, -0.1, 0);
  group.add(crown, crownRing, sideBtn);

  // Band: a flattened tube following a wrist-wrap path above and below.
  // Graphite woven loop: fine ribs drawn into a small canvas, repeated along the strap.
  const weave = document.createElement("canvas");
  weave.width = 64;
  weave.height = 64;
  const wctx = weave.getContext("2d");
  if (wctx) {
    wctx.fillStyle = "#2a2522";
    wctx.fillRect(0, 0, 64, 64);
    for (let y = 0; y < 64; y += 4) {
      wctx.fillStyle = y % 8 === 0 ? "#3a332f" : "#211d1a";
      wctx.fillRect(0, y, 64, 2);
    }
  }
  const weaveTex = track(new THREE.CanvasTexture(weave));
  weaveTex.colorSpace = THREE.SRGBColorSpace;
  weaveTex.wrapS = THREE.RepeatWrapping;
  weaveTex.wrapT = THREE.RepeatWrapping;
  weaveTex.repeat.set(10, 1);
  weaveTex.rotation = Math.PI / 2;
  const bandMat = track(new THREE.MeshStandardMaterial({ map: weaveTex, roughness: 0.95, metalness: 0 }));
  const strap = (dir: 1 | -1) => {
    // Wraps back around an implied wrist (radius ~0.3) soon after leaving the case.
    const pts = [
      new THREE.Vector3(0, dir * (h / 2 - 0.04), -0.01),
      new THREE.Vector3(0, dir * (h / 2 + 0.07), -0.04),
      new THREE.Vector3(0, dir * (h / 2 + 0.15), -0.13),
      new THREE.Vector3(0, dir * (h / 2 + 0.19), -0.28),
      new THREE.Vector3(0, dir * (h / 2 + 0.15), -0.45),
      new THREE.Vector3(0, dir * (h / 2 + 0.04), -0.58),
    ];
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = track(new THREE.TubeGeometry(curve, 48, 0.018, 16, false));
    const mesh = new THREE.Mesh(geo, bandMat);
    mesh.scale.x = 9.4;
    return mesh;
  };
  group.add(strap(1), strap(-1));

  return { group, screen, dispose: () => disposables.forEach((x) => x.dispose()) };
}
