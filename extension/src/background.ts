/**
 * Service worker: asks the relay for the latest reading once a minute and
 * keeps the toolbar badge up to date. The only writer of storage, so the
 * popup and the alarm never race.
 */

import { RELAY_URL } from './config';
import { badgeOf, viewOf } from './lib/display';
import { fetchLatest, pairStart } from './lib/relay';
import { clearLink, load, save } from './lib/store';
import type { Message } from './lib/store';
import { applyLatest, applyPair, latestRequest, shouldAsk } from './lib/sync';
import type { Change } from './lib/sync';
import { titleOf, uiLocale } from './lib/text';

const ALARM = 'tick';

async function apply(c: Change): Promise<void> {
  if (c.clear) await clearLink();
  else await save(c.patch);
}

async function paint(): Promise<void> {
  const s = await load();
  const v = viewOf(s, Date.now());
  const b = badgeOf(v, uiLocale());
  await Promise.all([
    chrome.action.setBadgeText({ text: b.text }),
    chrome.action.setBadgeBackgroundColor({ color: b.color }),
    chrome.action.setBadgeTextColor({ color: b.textColor }),
    chrome.action.setTitle({ title: titleOf(v, s.last?.body.name) }),
  ]);
}

async function refresh(withGraph: boolean, force: boolean): Promise<void> {
  const s = await load();
  const now = Date.now();
  const req = latestRequest(s, now, withGraph);
  if (req && (force || shouldAsk(s, now))) {
    await apply(applyLatest(s, await fetchLatest(RELAY_URL, req), Date.now()));
  }
  await paint();
}

async function pair(): Promise<boolean> {
  const c = applyPair(await pairStart(RELAY_URL), Date.now());
  if (c) await apply(c);
  await paint();
  return c != null;
}

// One thing at a time: a popup click and the alarm never interleave.
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(job: () => Promise<T>): Promise<T> {
  const next = queue.then(job, job);
  queue = next.catch(() => undefined);
  return next;
}

async function ensureAlarm(): Promise<void> {
  if (!(await chrome.alarms.get(ALARM))) await chrome.alarms.create(ALARM, { periodInMinutes: 1, delayInMinutes: 1 });
}

chrome.runtime.onInstalled.addListener(() => {
  void ensureAlarm();
  void serial(() => refresh(false, true));
});

chrome.runtime.onStartup.addListener(() => {
  void ensureAlarm();
  // Chrome just opened (or the computer woke): never show an old value as fresh.
  void serial(() => refresh(false, true));
});

chrome.alarms.onAlarm.addListener((a) => {
  if (a.name === ALARM) void serial(() => refresh(false, false));
});

chrome.runtime.onMessage.addListener((msg: Message, _sender, reply) => {
  const job =
    msg.type === 'pair'
      ? () => pair()
      : msg.type === 'refresh'
        ? () => refresh(msg.withGraph, true).then(() => true)
        : () => clearLink().then(paint).then(() => true);
  serial(job).then(
    (ok) => reply({ ok }),
    () => reply({ ok: false }),
  );
  return true; // reply comes later
});

void ensureAlarm();
