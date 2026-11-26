/** Filled in at build time (scripts/build.mjs): production, staging or the
 *  local relay of `npm run sim:garmin` in dulce-relay. */
declare const __RELAY_URL__: string;

export const RELAY_URL: string = __RELAY_URL__;
