"use client";

/**
 * Banners tab (route /partners/banners) — the in-app service notice.
 *
 * Talks to the relay's /ref/admin/notice: one manual banner (notice or
 * maintenance, per-language text, optional window and regions) plus the
 * automatic Abbott maintenance banners the relay reads from
 * status.freestyle.abbott every 6 h.
 */

import { useCallback, useEffect, useState } from "react";
import {
  UnauthorizedError,
  deleteNotice,
  fetchNotice,
  putNotice,
  setNoticeAuto,
  type AbbottTexts,
  type BannerLevel,
  type NoticeState,
} from "../../api";
import { useAdmin } from "../../AdminGate";
import { dateTime } from "../../format";

const LANGS: { id: string; label: string }[] = [
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
const LANG_LABEL = new Map(LANGS.map((l) => [l.id, l.label]));
const ALWAYS = ["en", "es"];
const MAX_LEN = 300;
const MAX_TITLE = 80;

const PROVIDERS: { id: string; label: string; who: string }[] = [
  { id: "libre", label: "Libre", who: "Libre users" },
  { id: "dexcom", label: "Dexcom", who: "Dexcom users" },
  { id: "nightscout", label: "Nightscout", who: "Nightscout users" },
  { id: "carelink", label: "CareLink", who: "CareLink users" },
];
const ROLES: { id: string; label: string; who: string }[] = [
  { id: "patient", label: "People with their own sensor", who: "people with their own sensor" },
  { id: "follower", label: "Followers", who: "followers" },
];

function reachText(providers: string[], roles: string[], regions: string[]): string {
  const parts: string[] = [];
  if (providers.length) parts.push(PROVIDERS.filter((p) => providers.includes(p.id)).map((p) => p.who).join(", "));
  if (roles.length) parts.push(ROLES.filter((r) => roles.includes(r.id)).map((r) => r.who).join(", "));
  if (regions.length) parts.push(`regions ${regions.join(", ")}`);
  return parts.length ? parts.join(", ") : "everyone";
}

const DEFAULT_ABBOTT = {
  title: "LibreLinkUp maintenance",
  body: "Readings may pause {day}, {start}–{end}.",
  bodyNow: "Readings may pause until {end}.",
};
const SAMPLE = { day: "Thu 17 Dec", start: "17:00", end: "18:00" };
function fill(t: string): string {
  return t.replace(/\{day\}/g, SAMPLE.day).replace(/\{start\}/g, SAMPLE.start).replace(/\{end\}/g, SAMPLE.end);
}

const REGIONS: { id: string; label: string }[] = [
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

const LEVEL_TITLE: Record<BannerLevel, string> = {
  notice: "Service notice",
  maintenance: "Scheduled maintenance",
};

const inputCls =
  "w-full rounded-[var(--radius-button-sm)] border border-border-subtle bg-card px-3 py-2 text-foreground";
const btnCls =
  "h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft disabled:opacity-50 transition-colors";
const primaryCls =
  "h-10 px-4 rounded-[var(--radius-button-sm)] bg-accent text-white font-semibold disabled:opacity-50 transition-opacity";

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
      <h3 className="text-label font-bold text-foreground">{title}</h3>
      {subtitle ? <p className="mt-0.5 text-caption text-muted">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function regionText(regions?: string[]): string {
  return regions && regions.length ? regions.join(", ") : "everyone";
}

function whenText(ms?: number | null): string {
  return ms ? dateTime(ms) : "—";
}

/** datetime-local value ("2026-11-19T10:30", viewer's local time) → epoch ms. */
function localToMs(v: string): number | null {
  if (!v) return null;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
}

export default function BannersPage() {
  const { adminKey, onUnauthorized } = useAdmin();
  const [state, setState] = useState<NoticeState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Form
  const [level, setLevel] = useState<BannerLevel>("notice");
  const [texts, setTexts] = useState<Record<string, string>>({ en: "", es: "" });
  const [extra, setExtra] = useState<string[]>([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [regions, setRegions] = useState<string[]>([]);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [providers, setProviders] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  // Abbott text editor
  const [abbott, setAbbott] = useState<AbbottTexts>({});
  const [abbottLoaded, setAbbottLoaded] = useState<unknown>(null);
  const [abbottExtra, setAbbottExtra] = useState<string[]>([]);

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

  const load = useCallback(
    async (key: string) => {
      setLoading(true);
      setError(null);
      try {
        setState(await fetchNotice(key));
      } catch (err) {
        fail(err);
      } finally {
        setLoading(false);
      }
    },
    [fail],
  );

  useEffect(() => {
    // Fetch-on-mount; setState happens past the await inside `load`.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(adminKey);
  }, [adminKey, load]);

  /** Run a mutating call, then reload; errors show inline. */
  const run = async (fn: () => Promise<void>): Promise<boolean> => {
    setBusy(true);
    setError(null);
    try {
      await fn();
      setState(await fetchNotice(adminKey));
      return true;
    } catch (err) {
      fail(err);
      return false;
    } finally {
      setBusy(false);
    }
  };

  // Sync the editor when the relay's texts change (load, save, reset).
  if (state && abbottLoaded !== state.texts) {
    setAbbottLoaded(state.texts);
    const t = state.texts ?? {};
    setAbbott(JSON.parse(JSON.stringify(t)) as AbbottTexts);
    setAbbottExtra(Object.keys(t).filter((l) => !ALWAYS.includes(l)));
  }

  const showRegions = providers.length === 0 || providers.includes("libre");
  const shownLangs = [...ALWAYS, ...extra];
  const available = LANGS.filter((l) => !shownLangs.includes(l.id));
  const messages: Record<string, string> = {};
  for (const l of shownLangs) {
    const t = (texts[l] ?? "").trim();
    if (t) messages[l] = t;
  }
  const cleanTitles: Record<string, string> = {};
  for (const l of shownLangs) {
    const t = (titles[l] ?? "").trim();
    if (t) cleanTitles[l] = t;
  }
  const tooLong =
    Object.values(messages).some((t) => t.length > MAX_LEN) ||
    Object.values(cleanTitles).some((t) => t.length > MAX_TITLE);
  const effRegions = showRegions ? regions : [];
  const startMs = localToMs(start);
  const endMs = localToMs(end);
  const badWindow = startMs !== null && endMs !== null && endMs <= startMs;
  const canPublish = !!messages.en && !tooLong && !badWindow && !busy;

  const publish = async () => {
    if (!window.confirm("This shows on every matching phone on next app open. Publish?")) return;
    const ok = await run(() =>
      putNotice(adminKey, {
        level,
        messages,
        titles: cleanTitles,
        providers,
        roles,
        startsAt: startMs,
        endsAt: endMs,
        regions: effRegions,
      }),
    );
    if (ok) {
      setTexts({ en: "", es: "" });
      setExtra([]);
      setStart("");
      setEnd("");
      setRegions([]);
      setTitles({});
      setProviders([]);
      setRoles([]);
    }
  };

  // Abbott text helpers
  const abbottLangs = [...ALWAYS, ...abbottExtra];
  const abbottAvail = LANGS.filter((l) => !abbottLangs.includes(l.id));
  const setAb = (lang: string, key: "title" | "body" | "bodyNow", v: string) =>
    setAbbott((a) => ({ ...a, [lang]: { ...(a[lang] ?? {}), [key]: v } }));
  const cleanAbbott = (): AbbottTexts | null => {
    const out: AbbottTexts = {};
    for (const l of abbottLangs) {
      const t = abbott[l] ?? {};
      const e: { title?: string; body?: string; bodyNow?: string } = {};
      if (t.title?.trim()) e.title = t.title.trim();
      if (t.body?.trim()) e.body = t.body.trim();
      if (t.bodyNow?.trim()) e.bodyNow = t.bodyNow.trim();
      if (Object.keys(e).length) out[l] = e;
    }
    return Object.keys(out).length ? out : null;
  };
  const abbottBad = abbottLangs.some((l) => {
    const t = abbott[l] ?? {};
    return (t.title ?? "").length > MAX_TITLE || (t.body ?? "").length > MAX_LEN || (t.bodyNow ?? "").length > MAX_LEN;
  });

  const remove = async () => {
    if (!window.confirm("Remove the current banner? Phones stop showing it on next app open.")) return;
    await run(() => deleteNotice(adminKey));
  };

  const manual = state?.manual ?? null;

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-display font-bold tracking-tight text-foreground">Banners</h1>
          <p className="mt-1 text-label text-muted">
            A notice shown at the top of the app, for everyone or for chosen regions.
          </p>
        </div>
        <button type="button" onClick={() => void load(adminKey)} disabled={loading || busy} className={btnCls}>
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-4 text-label text-state-low">
          {error}
        </div>
      ) : null}

      {!state ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-border-subtle bg-card p-10 text-center text-muted">
          {loading ? "Loading…" : "No data."}
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          <Card title="Current banner">
            {manual ? (
              <div className="grid gap-3 text-label text-foreground">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p>
                    <span className="font-semibold">{LEVEL_TITLE[manual.level]}</span>
                    <span className="text-muted">
                      {" "}
                      · for {reachText(manual.providers ?? [], manual.roles ?? [], manual.regions ?? [])}
                    </span>
                  </p>
                  <button type="button" onClick={() => void remove()} disabled={busy} className={btnCls}>
                    Remove
                  </button>
                </div>
                <p className="text-caption text-muted">
                  From {whenText(manual.startsAt)} to {whenText(manual.endsAt)} · updated{" "}
                  {dateTime(manual.updatedAt)}
                </p>
                <p className="text-caption text-muted">
                  Sensors: {manual.providers?.length ? manual.providers.join(", ") : "all"} · Roles:{" "}
                  {manual.roles?.length ? manual.roles.join(", ") : "all"} · Regions:{" "}
                  {regionText(manual.regions)}
                </p>
                <ul className="grid gap-1.5">
                  {Object.entries(manual.messages).map(([lang, text]) => (
                    <li key={lang} className="text-caption">
                      <span className="font-semibold uppercase">{lang}</span>
                      <span className="text-muted"> {LANG_LABEL.get(lang) ?? ""}</span>
                      {manual.titles?.[lang] ? (
                        <span className="block text-label font-semibold">{manual.titles[lang]}</span>
                      ) : null}
                      <span className="block text-label">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-label text-muted">No manual banner is set.</p>
            )}
          </Card>

          <Card title="New banner" subtitle="Publishing replaces the current banner.">
            <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
              <div className="grid gap-4">
                <div className="inline-flex w-fit rounded-[var(--radius-button-sm)] border border-border-subtle p-0.5">
                  {(["notice", "maintenance"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={level === l}
                      onClick={() => setLevel(l)}
                      className={`h-8 px-3 rounded-[var(--radius-button-sm)] text-caption font-semibold transition-colors ${
                        level === l ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {l === "notice" ? "Notice" : "Maintenance"}
                    </button>
                  ))}
                </div>

                {shownLangs.map((l) => {
                  const len = (texts[l] ?? "").length;
                  return (
                    <label key={l} className="grid gap-1">
                      <span className="flex items-center justify-between text-caption text-muted">
                        <span>
                          {LANG_LABEL.get(l)} ({l}){l === "en" ? " · required" : ""}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className={len > MAX_LEN ? "text-state-low" : ""}>
                            {len}/{MAX_LEN}
                          </span>
                          {!ALWAYS.includes(l) ? (
                            <button
                              type="button"
                              className="underline"
                              onClick={() => {
                                setExtra(extra.filter((x) => x !== l));
                                setTexts((t) => ({ ...t, [l]: "" }));
                                setTitles((t) => ({ ...t, [l]: "" }));
                              }}
                            >
                              remove
                            </button>
                          ) : null}
                        </span>
                      </span>
                      <input
                        type="text"
                        value={titles[l] ?? ""}
                        placeholder={`Title (optional, default "${LEVEL_TITLE[level]}")`}
                        aria-label={`Title (${l})`}
                        onChange={(e) => setTitles((t) => ({ ...t, [l]: e.target.value }))}
                        className={`${inputCls} ${(titles[l] ?? "").length > MAX_TITLE ? "border-state-low" : ""}`}
                      />
                      <textarea
                        rows={2}
                        value={texts[l] ?? ""}
                        onChange={(e) => setTexts((t) => ({ ...t, [l]: e.target.value }))}
                        className={inputCls}
                      />
                    </label>
                  );
                })}

                {available.length ? (
                  <select
                    value=""
                    onChange={(e) => e.target.value && setExtra([...extra, e.target.value])}
                    className={`${inputCls} w-fit`}
                    aria-label="Add language"
                  >
                    <option value="">Add language…</option>
                    {available.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label} ({l.id})
                      </option>
                    ))}
                  </select>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-caption text-muted">
                    Start (optional, your local time)
                    <input
                      type="datetime-local"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      className={inputCls}
                    />
                  </label>
                  <label className="grid gap-1 text-caption text-muted">
                    End (optional, your local time)
                    <input
                      type="datetime-local"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      className={inputCls}
                    />
                  </label>
                </div>
                {badWindow ? (
                  <p className="text-caption text-state-low">The end must be after the start.</p>
                ) : null}

                <div className="grid gap-4 rounded-[var(--radius-card)] border border-border-subtle p-4">
                  <p className="text-label font-bold text-foreground">Who sees it</p>
                  <fieldset>
                    <legend className="text-caption text-muted">Sensor (none checked = all)</legend>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                      {PROVIDERS.map((p) => (
                        <label key={p.id} className="flex items-center gap-2 text-label text-foreground">
                          <input
                            type="checkbox"
                            checked={providers.includes(p.id)}
                            onChange={(e) =>
                              setProviders(
                                e.target.checked ? [...providers, p.id] : providers.filter((x) => x !== p.id),
                              )
                            }
                          />
                          {p.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-caption text-muted">Role (none checked = all)</legend>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                      {ROLES.map((r) => (
                        <label key={r.id} className="flex items-center gap-2 text-label text-foreground">
                          <input
                            type="checkbox"
                            checked={roles.includes(r.id)}
                            onChange={(e) =>
                              setRoles(e.target.checked ? [...roles, r.id] : roles.filter((x) => x !== r.id))
                            }
                          />
                          {r.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {showRegions ? (
                    <fieldset>
                      <legend className="text-caption text-muted">
                        Libre regions (none checked = all). Regions limit the banner to Libre users.
                      </legend>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {REGIONS.map((r) => (
                          <label key={r.id} className="flex items-center gap-2 text-label text-foreground">
                            <input
                              type="checkbox"
                              checked={regions.includes(r.id)}
                              onChange={(e) =>
                                setRegions(
                                  e.target.checked ? [...regions, r.id] : regions.filter((x) => x !== r.id),
                                )
                              }
                            />
                            {r.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}
                  <p className="text-label text-foreground">
                    Reaches: {reachText(providers, roles, effRegions)}
                  </p>
                  <p className="text-caption text-muted">
                    Targeted banners reach only app 1.0.11+ with the latest update; banners for everyone also
                    reach older versions.
                  </p>
                </div>
              </div>

              <div className="grid content-start gap-3">
                <p className="text-caption uppercase tracking-wide text-muted">Preview</p>
                <div className="rounded-[var(--radius-card)] border border-border-subtle bg-accent-soft p-4">
                  <p className="text-label font-bold text-foreground">{cleanTitles.en ?? LEVEL_TITLE[level]}</p>
                  <p className="mt-1 text-label text-foreground">
                    {messages.en ?? <span className="text-muted">Your English text appears here.</span>}
                  </p>
                </div>
                <button type="button" onClick={() => void publish()} disabled={!canPublish} className={primaryCls}>
                  {busy ? "Working…" : "Publish"}
                </button>
              </div>
            </div>
          </Card>

          <Card
            title="Abbott maintenance (automatic)"
            subtitle="Shown to Libre users in those regions from 24 h before until the end. Checked every 6 h from status.freestyle.abbott."
          >
            <label className="flex items-center gap-2 text-label text-foreground">
              <input
                type="checkbox"
                role="switch"
                checked={state.auto}
                disabled={busy}
                onChange={(e) => void run(() => setNoticeAuto(adminKey, { auto: e.target.checked }))}
              />
              Show Abbott maintenance banners automatically
            </label>
            <div className="mt-5 rounded-[var(--radius-card)] border border-border-subtle p-4">
              <p className="text-label font-bold text-foreground">Edit text</p>
              <p className="mt-0.5 text-caption text-muted">
                Empty fields use the app&apos;s built-in text ({state.texts ? "custom text is set" : "no custom text"}).
                Placeholders: {"{day} {start} {end}"}.
              </p>
              <div className="mt-3 grid gap-5 lg:grid-cols-[3fr_2fr]">
                <div className="grid gap-4">
                  {abbottLangs.map((l) => {
                    const t = abbott[l] ?? {};
                    return (
                      <div key={l} className="grid gap-1.5">
                        <span className="flex items-center justify-between text-caption text-muted">
                          <span>
                            {LANG_LABEL.get(l)} ({l})
                          </span>
                          {!ALWAYS.includes(l) ? (
                            <button
                              type="button"
                              className="underline"
                              onClick={() => {
                                setAbbottExtra(abbottExtra.filter((x) => x !== l));
                                setAbbott((a) => {
                                  const n = { ...a };
                                  delete n[l];
                                  return n;
                                });
                              }}
                            >
                              remove
                            </button>
                          ) : null}
                        </span>
                        <input
                          type="text"
                          value={t.title ?? ""}
                          placeholder={DEFAULT_ABBOTT.title}
                          aria-label={`Abbott title (${l})`}
                          onChange={(e) => setAb(l, "title", e.target.value)}
                          className={inputCls}
                        />
                        <textarea
                          rows={2}
                          value={t.body ?? ""}
                          placeholder={`Before: ${DEFAULT_ABBOTT.body}`}
                          aria-label={`Abbott before text (${l})`}
                          onChange={(e) => setAb(l, "body", e.target.value)}
                          className={inputCls}
                        />
                        <textarea
                          rows={2}
                          value={t.bodyNow ?? ""}
                          placeholder={`During: ${DEFAULT_ABBOTT.bodyNow}`}
                          aria-label={`Abbott during text (${l})`}
                          onChange={(e) => setAb(l, "bodyNow", e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    );
                  })}
                  {abbottAvail.length ? (
                    <select
                      value=""
                      onChange={(e) => e.target.value && setAbbottExtra([...abbottExtra, e.target.value])}
                      className={`${inputCls} w-fit`}
                      aria-label="Add Abbott language"
                    >
                      <option value="">Add language…</option>
                      {abbottAvail.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.label} ({l.id})
                        </option>
                      ))}
                    </select>
                  ) : null}
                  {abbottBad ? (
                    <p className="text-caption text-state-low">
                      Titles are up to {MAX_TITLE} characters, texts up to {MAX_LEN}.
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={busy || abbottBad}
                      onClick={() => void run(() => setNoticeAuto(adminKey, { texts: cleanAbbott() }))}
                      className={primaryCls}
                    >
                      Save text
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        if (window.confirm("Go back to the app's built-in Abbott text?"))
                          void run(() => setNoticeAuto(adminKey, { texts: null }));
                      }}
                      className={btnCls}
                    >
                      Reset to app default
                    </button>
                  </div>
                </div>
                <div className="grid content-start gap-3">
                  <p className="text-caption uppercase tracking-wide text-muted">
                    Preview (sample: {SAMPLE.day}, {SAMPLE.start}–{SAMPLE.end})
                  </p>
                  {["en", "es"].map((l) => {
                    const t = abbott[l] ?? {};
                    return (
                      <div key={l} className="rounded-[var(--radius-card)] border border-border-subtle bg-accent-soft p-4">
                        <p className="text-label font-bold text-foreground">
                          {t.title?.trim() || DEFAULT_ABBOTT.title}
                        </p>
                        <p className="mt-1 text-label text-foreground">{fill(t.body?.trim() || DEFAULT_ABBOTT.body)}</p>
                        <p className="mt-1 text-caption text-muted">
                          During: {fill(t.bodyNow?.trim() || DEFAULT_ABBOTT.bodyNow)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {state.maintenances.length ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-label">
                  <thead className="text-caption uppercase tracking-wide text-muted">
                    <tr>
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Regions</th>
                      <th className="py-2 pr-4">Window (local time)</th>
                      <th className="py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {state.maintenances.map((m) => (
                      <tr key={m.id} className="border-t border-border-subtle">
                        <td className="py-2 pr-4 text-foreground">{m.name}</td>
                        <td className="py-2 pr-4 text-muted">{regionText(m.regions)}</td>
                        <td className="py-2 pr-4 text-muted">
                          {dateTime(m.startsAt)} – {dateTime(m.endsAt)}
                        </td>
                        <td className="py-2 text-right">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() =>
                              void run(() =>
                                setNoticeAuto(adminKey, m.hidden ? { unhide: m.id } : { hide: m.id }),
                              )
                            }
                            className={btnCls}
                          >
                            {m.hidden ? "Show" : "Hide"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-label text-muted">No upcoming windows.</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
