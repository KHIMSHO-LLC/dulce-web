"use client";

/**
 * Targeted notices (relay /ref/admin/notices, dulce-app #98): several notices
 * at once, each with text per language, an optional button (Contact support or
 * a link), an audience (sensor, LibreLinkUp region, plan, role, platform, app
 * version, single phones by log tag) and an optional push with a dry-run count
 * first. Builds before 1.0.12 only see notices targeted by sensor / region /
 * role (text only, no button) unless "older app versions" is switched off.
 */

import { useCallback, useEffect, useState } from "react";
import {
  UnauthorizedError,
  deleteTargetedNotice,
  fetchTargetedNotices,
  pushTargetedNotice,
  putTargetedNotice,
  type NoticePushCount,
  type NoticeTarget,
  type TargetedLevel,
  type TargetedNotice,
} from "../../api";
import { dateTime } from "../../format";

type Opt = { id: string; label: string };

const LANGS: Opt[] = [
  { id: "en", label: "English" },
  { id: "es", label: "Spanish" },
  { id: "ka", label: "Georgian" },
  { id: "de", label: "German" },
  { id: "fr", label: "French" },
  { id: "it", label: "Italian" },
  { id: "fi", label: "Finnish" },
  { id: "da", label: "Danish" },
  { id: "nb", label: "Norwegian" },
  { id: "sv", label: "Swedish" },
  { id: "nl", label: "Dutch" },
  { id: "ru", label: "Russian" },
  { id: "ja", label: "Japanese" },
  { id: "ko", label: "Korean" },
  { id: "pt", label: "Portuguese" },
];
const ALWAYS = ["en", "es"];
const MAX_BODY = 300;
const MAX_TITLE = 80;
const MAX_LABEL = 30;

const LEVELS: { id: TargetedLevel; label: string; title: string }[] = [
  { id: "info", label: "Information", title: "Notice" },
  { id: "maintenance", label: "Maintenance", title: "Scheduled maintenance" },
  { id: "action", label: "Action needed", title: "Action needed" },
];
const PROVIDERS: Opt[] = [
  { id: "libre", label: "Libre" },
  { id: "dexcom", label: "Dexcom" },
  { id: "nightscout", label: "Nightscout" },
  { id: "carelink", label: "CareLink" },
];
const REGIONS: Opt[] = [
  { id: "eu", label: "Europe (eu)" },
  { id: "eu2", label: "UK & Ireland (eu2)" },
  { id: "us", label: "United States (us)" },
  { id: "fr", label: "France (fr)" },
  { id: "de", label: "Germany (de)" },
  { id: "ca", label: "Canada (ca)" },
  { id: "la", label: "Latin America (la)" },
  { id: "au", label: "Australia (au)" },
  { id: "ap", label: "Asia-Pacific (ap)" },
  { id: "ae", label: "Middle East (ae)" },
  { id: "jp", label: "Japan (jp)" },
  { id: "ru", label: "Russia (ru)" },
];
const TIERS: Opt[] = [
  { id: "paid", label: "Pro (paid)" },
  { id: "trial", label: "Trial" },
  { id: "free", label: "Free" },
];
const ROLES: Opt[] = [
  { id: "patient", label: "Own sensor" },
  { id: "follower", label: "Followers only" },
];
const PLATFORMS: Opt[] = [
  { id: "ios", label: "iPhone" },
  { id: "android", label: "Android" },
];

const inputCls =
  "w-full rounded-[var(--radius-button-sm)] border border-border-subtle bg-card px-3 py-2 text-foreground";
const btnCls =
  "h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft disabled:opacity-50 transition-colors";
const primaryCls =
  "h-10 px-4 rounded-[var(--radius-button-sm)] bg-accent text-white font-semibold disabled:opacity-50 transition-opacity";
const chipCls = (on: boolean) =>
  `h-8 px-3 rounded-full border text-caption font-semibold transition-colors ${
    on ? "border-accent bg-accent text-white" : "border-border-subtle bg-card text-foreground hover:bg-accent-soft"
  }`;

function localToMs(v: string): number | null {
  if (!v) return null;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
}
function msToLocal(ms: number | null | undefined): string {
  if (!ms) return "";
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
const labelsOf = (opts: Opt[], ids?: string[]) => opts.filter((o) => ids?.includes(o.id)).map((o) => o.label).join(", ");

/** One line: who gets it. */
export function audienceText(t: NoticeTarget | undefined): string {
  if (!t) return "everyone";
  const parts: string[] = [];
  if (t.providers?.length) parts.push(labelsOf(PROVIDERS, t.providers));
  if (t.regions?.length) parts.push(`regions ${t.regions.join(", ")}`);
  if (t.tiers?.length) parts.push(labelsOf(TIERS, t.tiers));
  if (t.roles?.length) parts.push(labelsOf(ROLES, t.roles));
  if (t.platforms?.length) parts.push(labelsOf(PLATFORMS, t.platforms));
  if (t.minVersion || t.maxVersion) parts.push(`app ${t.minVersion ?? "any"}–${t.maxVersion ?? "any"}`);
  if (t.devices?.length) parts.push(`${t.devices.length} phone${t.devices.length > 1 ? "s" : ""}`);
  return parts.length ? parts.join(" · ") : "everyone";
}

function Chips({ opts, value, onChange }: { opts: Opt[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((o) => (
        <button key={o.id} type="button" className={chipCls(value.includes(o.id))} onClick={() => onChange(toggle(value, o.id))}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <p className="text-caption font-semibold text-foreground">{label}</p>
      {children}
      {hint ? <p className="text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

type Form = {
  replaces: string | null;
  level: TargetedLevel;
  titles: Record<string, string>;
  bodies: Record<string, string>;
  extra: string[];
  button: "none" | "support" | "url";
  url: string;
  labels: Record<string, string>;
  providers: string[];
  regions: string[];
  tiers: string[];
  roles: string[];
  platforms: string[];
  minVersion: string;
  maxVersion: string;
  devices: string;
  start: string;
  end: string;
  legacy: boolean;
};
const EMPTY: Form = {
  replaces: null,
  level: "info",
  titles: {},
  bodies: {},
  extra: [],
  button: "none",
  url: "",
  labels: {},
  providers: [],
  regions: [],
  tiers: [],
  roles: [],
  platforms: [],
  minVersion: "",
  maxVersion: "",
  devices: "",
  start: "",
  end: "",
  legacy: true,
};

function formOf(n: TargetedNotice): Form {
  const titles: Record<string, string> = {};
  const bodies: Record<string, string> = {};
  for (const [l, m] of Object.entries(n.messages)) {
    if (m.title) titles[l] = m.title;
    bodies[l] = m.body;
  }
  const t = n.target ?? {};
  return {
    replaces: n.id,
    level: n.level,
    titles,
    bodies,
    extra: Object.keys(n.messages).filter((l) => !ALWAYS.includes(l)),
    button: n.action?.type ?? "none",
    url: n.action?.url ?? "",
    labels: n.action?.label ?? {},
    providers: t.providers ?? [],
    regions: t.regions ?? [],
    tiers: t.tiers ?? [],
    roles: t.roles ?? [],
    platforms: t.platforms ?? [],
    minVersion: t.minVersion ?? "",
    maxVersion: t.maxVersion ?? "",
    devices: (t.devices ?? []).join(", "),
    start: msToLocal(n.startsAt),
    end: msToLocal(n.endsAt),
    legacy: n.legacy !== false,
  };
}

function Preview({ form, lang }: { form: Form; lang: string }) {
  const title = form.titles[lang]?.trim() || form.titles.en?.trim() || LEVELS.find((l) => l.id === form.level)!.title;
  const body = form.bodies[lang]?.trim() || form.bodies.en?.trim() || "…";
  const label =
    form.labels[lang]?.trim() || form.labels.en?.trim() || (form.button === "support" ? "Contact support" : "Learn more");
  return (
    <div className="flex max-w-sm gap-3 rounded-2xl border border-border-subtle bg-accent-soft/40 px-3.5 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card text-accent">
        {form.level === "info" ? "i" : "!"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-caption font-bold text-foreground">{title}</p>
        <p className="text-caption text-muted">{body}</p>
        {form.button !== "none" ? (
          <span className="mt-2 inline-block rounded-xl bg-card px-3 py-1.5 text-caption font-bold text-accent">{label}</span>
        ) : null}
      </div>
      <span className="text-caption text-muted">✕</span>
    </div>
  );
}

export function TargetedNotices({ adminKey, onUnauthorized }: { adminKey: string; onUnauthorized: () => void }) {
  const [list, setList] = useState<TargetedNotice[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [open, setOpen] = useState(false);
  const [previewLang, setPreviewLang] = useState("en");
  const [counts, setCounts] = useState<Record<string, NoticePushCount>>({});
  /** Clock of the last load (render stays pure). */
  const [loadedAt, setLoadedAt] = useState(0);

  const fail = useCallback(
    (err: unknown) => {
      if (err instanceof UnauthorizedError) {
        onUnauthorized();
        return;
      }
      setError(err instanceof Error ? err.message : "Unknown error.");
    },
    [onUnauthorized],
  );

  const load = useCallback(async () => {
    try {
      const l = await fetchTargetedNotices(adminKey);
      setLoadedAt(Date.now());
      setList(l);
    } catch (err) {
      fail(err);
    }
  }, [adminKey, fail]);

  useEffect(() => {
    // Fetch-on-mount; setState happens past the await inside `load`.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const run = async (fn: () => Promise<void>): Promise<boolean> => {
    setBusy(true);
    setError(null);
    try {
      await fn();
      await load();
      return true;
    } catch (err) {
      fail(err);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const langs = [...ALWAYS, ...form.extra];
  const available = LANGS.filter((l) => !langs.includes(l.id));
  const messages: Record<string, { title?: string; body: string }> = {};
  for (const l of langs) {
    const b = (form.bodies[l] ?? "").trim();
    const t = (form.titles[l] ?? "").trim();
    if (b) messages[l] = t ? { title: t, body: b } : { body: b };
  }
  const labels: Record<string, string> = {};
  for (const l of langs) {
    const t = (form.labels[l] ?? "").trim();
    if (t) labels[l] = t;
  }
  const devices = form.devices
    .split(/[\s,]+/)
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
  const badDevices = devices.some((d) => !/^[0-9a-f]{8}$/.test(d));
  const badVersion = [form.minVersion, form.maxVersion].some((v) => v.trim() && !/^\d{1,3}(\.\d{1,3}){0,3}$/.test(v.trim()));
  const badUrl = form.button === "url" && !/^https:\/\/[^\s/@]+(\/\S*)?$/i.test(form.url.trim());
  const tooLong =
    Object.values(messages).some((m) => m.body.length > MAX_BODY || (m.title ?? "").length > MAX_TITLE) ||
    Object.values(labels).some((t) => t.length > MAX_LABEL);
  const startMs = localToMs(form.start);
  const endMs = localToMs(form.end);
  const badWindow = startMs !== null && endMs !== null && endMs <= startMs;
  const showRegions = form.providers.length === 0 || form.providers.includes("libre");
  const target: NoticeTarget = {
    ...(form.providers.length ? { providers: form.providers } : {}),
    ...(showRegions && form.regions.length ? { regions: form.regions } : {}),
    ...(form.tiers.length ? { tiers: form.tiers } : {}),
    ...(form.roles.length ? { roles: form.roles } : {}),
    ...(form.platforms.length ? { platforms: form.platforms } : {}),
    ...(form.minVersion.trim() ? { minVersion: form.minVersion.trim() } : {}),
    ...(form.maxVersion.trim() ? { maxVersion: form.maxVersion.trim() } : {}),
    ...(devices.length ? { devices } : {}),
  };
  const oldBuildsSee =
    form.legacy && !target.tiers && !target.platforms && !target.devices && !target.minVersion && !target.maxVersion;
  const problem = !messages.en
    ? "English text is required."
    : tooLong
      ? "A text is too long."
      : badUrl
        ? "The link must start with https://."
        : badDevices
          ? "Phones are 8-character log tags (node scripts/log-tag.mjs <deviceId>)."
          : badVersion
            ? "Versions look like 1.0.12."
            : badWindow
              ? "The end must be after the start."
              : null;

  const save = async () => {
    const who = audienceText(Object.keys(target).length ? target : undefined);
    if (!window.confirm(`Show this to ${who} on their next app open?`)) return;
    const ok = await run(async () => {
      await putTargetedNotice(adminKey, {
        ...(form.replaces ? { replaces: form.replaces } : {}),
        level: form.level,
        messages,
        startsAt: startMs,
        endsAt: endMs,
        ...(form.button === "support"
          ? { action: { type: "support" as const, ...(Object.keys(labels).length ? { label: labels } : {}) } }
          : form.button === "url"
            ? { action: { type: "url" as const, url: form.url.trim(), ...(Object.keys(labels).length ? { label: labels } : {}) } }
            : {}),
        ...(Object.keys(target).length ? { target } : {}),
        ...(form.legacy ? {} : { legacy: false }),
      });
    });
    if (ok) {
      setForm(EMPTY);
      setOpen(false);
    }
  };

  const remove = async (n: TargetedNotice) => {
    if (!window.confirm("Remove this notice? Phones stop showing it on next app open.")) return;
    await run(() => deleteTargetedNotice(adminKey, n.id));
  };

  const count = async (n: TargetedNotice) => {
    await run(async () => {
      const c = await pushTargetedNotice(adminKey, n.id);
      setCounts((m) => ({ ...m, [n.id]: c }));
    });
  };

  const send = async (n: TargetedNotice) => {
    const c = counts[n.id];
    if (!c) return;
    const again = !!n.pushedAt;
    const msg =
      `Send a push to ${c.total} phone${c.total === 1 ? "" : "s"} (${c.ios} iPhone, ${c.android} Android)?` +
      (again ? `\n\nThis notice was already pushed on ${dateTime(n.pushedAt!)}. Send it AGAIN?` : "") +
      "\n\nFollowers without their own sensor get the banner only, never the push.";
    if (!window.confirm(msg)) return;
    await run(async () => {
      await pushTargetedNotice(adminKey, n.id, true, again);
      setCounts((m) => {
        const next = { ...m };
        delete next[n.id];
        return next;
      });
    });
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-label font-bold text-foreground">Targeted notices</h3>
          <p className="mt-0.5 text-caption text-muted">
            Several at once, with a Contact support or link button, for chosen people. App 1.0.12 and later; older apps
            see the text only when the audience is just sensor, region or role.
          </p>
        </div>
        {!open ? (
          <button type="button" className={primaryCls} onClick={() => { setForm(EMPTY); setOpen(true); }} disabled={busy}>
            New notice
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="mt-4 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-3 text-label text-state-low">
          {error}
        </div>
      ) : null}

      <div className="mt-4 grid gap-3">
        {list === null ? (
          <p className="text-caption text-muted">Loading…</p>
        ) : list.length === 0 ? (
          <p className="text-caption text-muted">No targeted notices.</p>
        ) : (
          list.map((n) => {
            const c = counts[n.id];
            const ended = n.endsAt != null && n.endsAt <= loadedAt;
            return (
              <div key={n.id} className="grid gap-2 rounded-[var(--radius-button-sm)] border border-border-subtle p-3 text-label">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-foreground">
                    <span className="font-semibold">{n.messages.en?.title ?? LEVELS.find((l) => l.id === n.level)?.title}</span>
                    <span className="text-muted"> · {audienceText(n.target)}</span>
                    {ended ? <span className="text-muted"> · ended</span> : null}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className={btnCls} disabled={busy} onClick={() => { setForm(formOf(n)); setOpen(true); }}>
                      Edit
                    </button>
                    <button type="button" className={btnCls} disabled={busy} onClick={() => void remove(n)}>
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-caption text-muted">{n.messages.en?.body}</p>
                <p className="text-caption text-muted">
                  {n.startsAt ? `From ${dateTime(n.startsAt)}` : "From now"} · {n.endsAt ? `until ${dateTime(n.endsAt)}` : "no end"}
                  {n.action ? ` · button: ${n.action.type === "support" ? "Contact support" : n.action.url}` : ""}
                  {n.pushedAt ? ` · pushed ${dateTime(n.pushedAt)} to ${n.pushedCount ?? 0}` : ""}
                </p>
                {!ended ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <button type="button" className={btnCls} disabled={busy} onClick={() => void count(n)}>
                      Count push recipients
                    </button>
                    {c ? (
                      <>
                        <span className="text-caption text-foreground">
                          {c.total} phones ({c.ios} iPhone, {c.android} Android){c.noToken ? `, ${c.noToken} without push` : ""}
                        </span>
                        {c.total > 0 ? (
                          <button type="button" className={primaryCls} disabled={busy} onClick={() => void send(n)}>
                            {n.pushedAt ? "Send push again" : "Send push"}
                          </button>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>

      {open ? (
        <div className="mt-6 grid gap-5 border-t border-border-subtle pt-5">
          <p className="text-label font-bold text-foreground">{form.replaces ? "Edit notice" : "New notice"}</p>
          {form.replaces ? (
            <p className="text-caption text-muted">
              Changing the text, button or audience makes it a new notice: people who closed it see it again. Changing only
              the dates keeps it closed for them.
            </p>
          ) : null}
          <Field label="Kind">
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button key={l.id} type="button" className={chipCls(form.level === l.id)} onClick={() => set("level", l.id)}>
                  {l.label}
                </button>
              ))}
            </div>
          </Field>

          {langs.map((l) => (
            <div key={l} className="grid gap-2">
              <p className="text-caption font-semibold text-foreground">
                {LANGS.find((x) => x.id === l)?.label}
                {l === "en" ? " (required, fallback for every other language)" : ""}
              </p>
              <input
                className={inputCls}
                placeholder={`Title (optional, ≤ ${MAX_TITLE})`}
                value={form.titles[l] ?? ""}
                onChange={(e) => set("titles", { ...form.titles, [l]: e.target.value })}
              />
              <textarea
                className={inputCls}
                rows={2}
                placeholder={`Text (≤ ${MAX_BODY})`}
                value={form.bodies[l] ?? ""}
                onChange={(e) => set("bodies", { ...form.bodies, [l]: e.target.value })}
              />
            </div>
          ))}
          {available.length ? (
            <select
              className={inputCls}
              value=""
              onChange={(e) => e.target.value && set("extra", [...form.extra, e.target.value])}
            >
              <option value="">Add a language…</option>
              {available.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          ) : null}

          <Field label="Button">
            <div className="flex flex-wrap gap-2">
              {(["none", "support", "url"] as const).map((b) => (
                <button key={b} type="button" className={chipCls(form.button === b)} onClick={() => set("button", b)}>
                  {b === "none" ? "No button" : b === "support" ? "Contact support" : "Open a link"}
                </button>
              ))}
            </div>
            {form.button === "url" ? (
              <input className={inputCls} placeholder="https://…" value={form.url} onChange={(e) => set("url", e.target.value)} />
            ) : null}
            {form.button !== "none"
              ? langs.map((l) => (
                  <input
                    key={l}
                    className={inputCls}
                    placeholder={`Button text, ${LANGS.find((x) => x.id === l)?.label} (optional, ≤ ${MAX_LABEL})`}
                    value={form.labels[l] ?? ""}
                    onChange={(e) => set("labels", { ...form.labels, [l]: e.target.value })}
                  />
                ))
              : null}
          </Field>

          <Field label="Sensor" hint="None selected = everyone.">
            <Chips opts={PROVIDERS} value={form.providers} onChange={(v) => set("providers", v)} />
          </Field>
          {showRegions ? (
            <Field label="LibreLinkUp region" hint="Only Libre phones have a region; choosing one leaves out everyone else.">
              <Chips opts={REGIONS} value={form.regions} onChange={(v) => set("regions", v)} />
            </Field>
          ) : null}
          <Field label="Plan">
            <Chips opts={TIERS} value={form.tiers} onChange={(v) => set("tiers", v)} />
          </Field>
          <Field label="Role">
            <Chips opts={ROLES} value={form.roles} onChange={(v) => set("roles", v)} />
          </Field>
          <Field label="Platform">
            <Chips opts={PLATFORMS} value={form.platforms} onChange={(v) => set("platforms", v)} />
          </Field>
          <Field label="App version" hint="Inclusive. Phones that never reported a version are left out when set.">
            <div className="flex gap-2">
              <input className={inputCls} placeholder="from, e.g. 1.0.9" value={form.minVersion} onChange={(e) => set("minVersion", e.target.value)} />
              <input className={inputCls} placeholder="to, e.g. 1.0.11" value={form.maxVersion} onChange={(e) => set("maxVersion", e.target.value)} />
            </div>
          </Field>
          <Field label="Single phones" hint="8-character log tags, comma separated (node scripts/log-tag.mjs <deviceId>).">
            <input className={inputCls} value={form.devices} onChange={(e) => set("devices", e.target.value)} />
          </Field>
          <Field label="When" hint="Your local time. Empty = from now / no end.">
            <div className="flex gap-2">
              <input type="datetime-local" className={inputCls} value={form.start} onChange={(e) => set("start", e.target.value)} />
              <input type="datetime-local" className={inputCls} value={form.end} onChange={(e) => set("end", e.target.value)} />
            </div>
          </Field>
          <label className="flex items-center gap-2 text-caption text-foreground">
            <input type="checkbox" checked={form.legacy} onChange={(e) => set("legacy", e.target.checked)} />
            Also show on older app versions (text only, no button)
          </label>
          <p className="text-caption text-muted">
            Goes to: <span className="font-semibold text-foreground">{audienceText(Object.keys(target).length ? target : undefined)}</span>
            {oldBuildsSee ? " · older apps see it too" : " · app 1.0.12+ only"}
          </p>

          <Field label="Preview">
            <div className="flex flex-wrap gap-2">
              {langs.map((l) => (
                <button key={l} type="button" className={chipCls(previewLang === l)} onClick={() => setPreviewLang(l)}>
                  {LANGS.find((x) => x.id === l)?.label}
                </button>
              ))}
            </div>
            <Preview form={form} lang={previewLang} />
          </Field>

          {problem ? <p className="text-caption text-state-low">{problem}</p> : null}
          <div className="flex flex-wrap gap-2">
            <button type="button" className={primaryCls} disabled={busy || !!problem} onClick={() => void save()}>
              {form.replaces ? "Save" : "Publish"}
            </button>
            <button type="button" className={btnCls} disabled={busy} onClick={() => { setOpen(false); setForm(EMPTY); }}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
