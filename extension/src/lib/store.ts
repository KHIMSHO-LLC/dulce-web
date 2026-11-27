/** chrome.storage.local, typed. `local`, never `sync`: sync would copy the
 *  link token to every computer signed in to the same Google account. */

import type { Stored } from './display';

const KEYS: Array<keyof Stored> = ['token', 'pending', 'last', 'graph', 'lastError', 'pid', 'hours', 'nextAt'];

export async function load(): Promise<Stored> {
  return (await chrome.storage.local.get(KEYS)) as Stored;
}

export async function save(patch: Partial<Stored>): Promise<void> {
  const remove = Object.entries(patch)
    .filter(([, v]) => v === undefined)
    .map(([k]) => k);
  const set = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
  if (remove.length) await chrome.storage.local.remove(remove);
  if (Object.keys(set).length) await chrome.storage.local.set(set);
}

/** Forget the link on this computer (the phone keeps it until removed there). */
export async function clearLink(): Promise<void> {
  await chrome.storage.local.remove(['token', 'pending', 'last', 'graph', 'lastError', 'pid', 'nextAt']);
}

/** Messages from the popup to the background worker. */
export type Message =
  | { type: 'pair' }
  | { type: 'refresh'; withGraph: boolean }
  | { type: 'forget' };
