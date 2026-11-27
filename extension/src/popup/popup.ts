/**
 * The popup. Reads storage and draws; asks the background worker (the only
 * writer of link state) to get a code or refresh. The picked person and
 * chart length are plain preferences and are saved from here.
 */

import { chartSvg, qrSvg } from '../lib/chart';
import { COLORS, TREND_ARROWS, formatDelta, formatValue, unitLabel, viewOf } from '../lib/display';
import type { Stored, View } from '../lib/display';
import { load, save } from '../lib/store';
import type { Message } from '../lib/store';
import { ageText, t, uiLocale } from '../lib/text';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const SECTIONS = ['loading', 'link', 'error', 'reading', 'message'] as const;
type Section = (typeof SECTIONS)[number];

const locale = uiLocale();
let stored: Stored = {};
let pairing = false;
let pairFailed = false;
let forgot = false;
let unlinkArmed: ReturnType<typeof setTimeout> | null = null;

function send(msg: Message): Promise<{ ok: boolean } | undefined> {
  return chrome.runtime.sendMessage(msg).catch(() => undefined);
}

function show(section: Section): void {
  for (const s of SECTIONS) $(s).hidden = s !== section;
}

/** "ABC DEF": easier to read out and type. */
function spacedCode(code: string): string {
  return code.length === 6 ? `${code.slice(0, 3)} ${code.slice(3)}` : code;
}

function renderPeople(): void {
  const sel = $<HTMLSelectElement>('person');
  const body = stored.last?.body;
  const people = body?.people ?? [];
  sel.hidden = people.length < 2;
  if (sel.hidden) return;
  const current = body?.pid ?? '';
  const key = people.map((p) => `${p.pid}:${p.name ?? ''}`).join('|') + `#${current}`;
  if (sel.dataset.key === key) return;
  sel.dataset.key = key;
  sel.replaceChildren(
    ...people.map((p) => {
      const o = document.createElement('option');
      o.value = p.pid;
      o.textContent = p.pid === 'me' ? t('me') : (p.name ?? '…');
      o.selected = p.pid === current;
      return o;
    }),
  );
}

function renderLink(v: Extract<View, { kind: 'pending' }>): void {
  show('link');
  const qr = $('qr');
  if (qr.dataset.code !== v.code) {
    qr.dataset.code = v.code;
    qr.innerHTML = qrSvg(v.qr, 148);
  }
  $('code').textContent = spacedCode(v.code);
  const minutesLeft = Math.max(0, Math.ceil((v.expiresAt - Date.now()) / 60_000));
  $('code-expiry').textContent = v.expired ? t('codeExpired') : t('codeExpiresIn', String(minutesLeft));
  $('qr').style.opacity = v.expired ? '0.25' : '1';
  $('new-code').hidden = !v.expired;
  $('forgot-hint').hidden = !forgot;
}

function renderReading(v: Extract<View, { kind: 'reading' }>): void {
  show('reading');
  const color = COLORS[v.zone];
  $('reading').classList.toggle('old', v.old);
  $('value').textContent = formatValue(v.valueMgdl, v.unit, locale);
  $('value').style.color = color;
  $('arrow').textContent = TREND_ARROWS[v.trend];
  $('arrow').style.color = color;
  $('unit').textContent = unitLabel(v.unit);
  $('delta').textContent = v.deltaMgdl != null ? formatDelta(v.deltaMgdl, v.unit, locale) : '';
  const name = stored.last?.body.name;
  $('age').textContent = [name, ageText(v.ageMs), v.old ? t('oldReading') : null].filter(Boolean).join(' · ');
  $('offline').hidden = !v.offline;

  const hours = stored.hours ?? 3;
  for (const b of document.querySelectorAll<HTMLButtonElement>('#hours button')) {
    b.textContent = t('chartHours', b.dataset.hours ?? '');
    b.setAttribute('aria-pressed', String(Number(b.dataset.hours) === hours));
  }
  const g = stored.graph;
  const body = stored.last?.body;
  const chart = $('chart');
  if (g && body && g.hours === hours) {
    chart.innerHTML = chartSvg({
      values: g.values,
      stepSec: g.stepSec,
      endAt: g.endAt,
      hours,
      unit: v.unit,
      locale,
      targetLow: body.targetLow,
      targetHigh: body.targetHigh,
      lowLine: body.lowLine,
      highLine: body.highLine,
      zoneLow: body.zoneLow,
      zoneHigh: body.zoneHigh,
      width: 292,
      height: 120,
    });
    chart.style.opacity = '1';
  } else {
    chart.style.opacity = '0.4';
  }
}

function renderMessage(title: string, text: string): void {
  show('message');
  $('message-title').textContent = title;
  $('message-text').textContent = text;
}

function render(): void {
  const v = viewOf(stored, Date.now());
  renderPeople();
  $('unlink').hidden = !stored.token || v.kind === 'pending';
  switch (v.kind) {
    case 'unlinked':
      if (pairFailed) show('error');
      else show('loading');
      break;
    case 'pending':
      renderLink(v);
      break;
    case 'reading':
      renderReading(v);
      break;
    case 'pro_required':
      renderMessage(t('proRequiredTitle'), t('proRequiredText'));
      break;
    case 'signed_out':
      renderMessage(t('signedOutTitle'), t('signedOutText'));
      break;
    case 'waiting':
      renderMessage(t('waitingTitle'), v.offline ? t('offline') : t('waitingText'));
      break;
  }
}

async function pair(): Promise<void> {
  if (pairing) return;
  pairing = true;
  pairFailed = false;
  render();
  const r = await send({ type: 'pair' });
  pairing = false;
  pairFailed = !r?.ok;
  stored = await load();
  render();
}

/** Get a code when there is no link, or the shown code ran out. */
async function pairIfNeeded(): Promise<void> {
  const v = viewOf(stored, Date.now());
  if (v.kind === 'unlinked' && !pairFailed) await pair();
}

async function refresh(): Promise<void> {
  await send({ type: 'refresh', withGraph: true });
  stored = await load();
  render();
  await pairIfNeeded();
}

// Fill the fixed texts.
for (const el of document.querySelectorAll<HTMLElement>('[data-i18n]')) el.textContent = t(el.dataset.i18n!);
document.documentElement.lang = locale;

$('new-code').addEventListener('click', () => void pair());
$('retry').addEventListener('click', () => {
  pairFailed = false;
  void pair();
});
$<HTMLSelectElement>('person').addEventListener('change', async (e) => {
  await save({ pid: (e.target as HTMLSelectElement).value, graph: undefined });
  await refresh();
});
for (const b of document.querySelectorAll<HTMLButtonElement>('#hours button')) {
  b.addEventListener('click', async () => {
    await save({ hours: Number(b.dataset.hours) as 3 | 6 | 12 });
    stored = await load();
    render();
    await refresh();
  });
}
$('unlink').addEventListener('click', async () => {
  const btn = $('unlink');
  if (!unlinkArmed) {
    btn.textContent = t('unlinkConfirm');
    unlinkArmed = setTimeout(() => {
      unlinkArmed = null;
      btn.textContent = t('unlink');
    }, 4000);
    return;
  }
  clearTimeout(unlinkArmed);
  unlinkArmed = null;
  btn.textContent = t('unlink');
  await send({ type: 'forget' });
  forgot = true;
  stored = await load();
  render();
  await pair();
});

chrome.storage.onChanged.addListener(async (_changes, area) => {
  if (area !== 'local') return;
  stored = await load();
  render();
});

// Ages and the code countdown tick every few seconds; while a code is shown,
// ask often so the value appears right after the phone links; otherwise once
// a minute while the popup stays open.
setInterval(render, 5_000);
setInterval(() => {
  const v = viewOf(stored, Date.now());
  if (v.kind === 'pending' && !v.expired) void refresh();
}, 3_000);
setInterval(() => {
  const v = viewOf(stored, Date.now());
  if (v.kind !== 'pending' && v.kind !== 'unlinked') void refresh();
}, 60_000);

stored = await load();
render();
await pairIfNeeded();
await refresh();
