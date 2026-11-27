/**
 * Dulce on Garmin (Connect IQ): store listings and the simulator screenshots in
 * `public/guides/garmin/` (cut out of the Connect IQ simulator, sample data).
 * Copy lives in messages `garmin`; the supported-watch list there follows the
 * three manifests in dulce-app (`manifest.xml` of `garmin`, `garmin-face`, `garmin-field`; Connect IQ 3.1+).
 */
export const GARMIN_STORE = {
  app: "https://apps.garmin.com/apps/1696f65d-cb85-4210-b377-dd2ec3fd798c",
  face: "https://apps.garmin.com/apps/89b13fc5-984a-4e45-96be-e69235e368ad",
  field: "https://apps.garmin.com/apps/e3a486f6-6ea5-4709-9921-b96682edab10",
} as const;
/** Set to true when the three listings are approved (they are in Garmin's review since 2026-11-26); until then the page shows no links. */
export const GARMIN_STORE_LIVE = false;
export type GarminStoreKey = keyof typeof GARMIN_STORE;

export type GarminShot = { src: string; width: number; height: number };

const shot = (name: string, width: number, height: number): GarminShot => ({
  src: `/guides/garmin/${name}.webp`,
  width,
  height,
});

export const GARMIN_SHOTS = {
  hero: shot("app-now-venu3", 560, 791),
  graph: shot("app-graph-vivoactive5", 518, 819),
  tir: shot("app-tir-vivoactive5", 518, 819),
  glance: shot("glance-vivoactive5", 518, 819),
  faceA: shot("face-A-vivoactive5", 518, 819),
  faceB: shot("face-B-vivoactive5", 518, 819),
  aod: shot("face-alwayson-vivoactive5", 518, 819),
  field: shot("field-large-fenix7", 385, 537),
  edge: shot("field-large-light-edge1050", 560, 848),
  link: shot("app-link-vivoactive5", 518, 819),
  instinct: shot("app-now-instinct2", 367, 499),
} as const;

/** Guides about Garmin (content/articles), shown on /garmin. */
export const GARMIN_GUIDES = ["garmin-watch", "garmin-workouts", "garmin-watch-face"] as const;

export type GarminSurface = { id: "app" | "glance" | "complication" | "face" | "field"; title: string; body: string };
export type GarminWatchFamily = { family: string; models: string };
