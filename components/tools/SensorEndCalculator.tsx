"use client";

import { useState, useSyncExternalStore } from "react";
import type { AppLocale } from "@/i18n/routing";
import { SENSORS, sensorTimes, type SensorModel } from "@/lib/tools";

const L: Record<
  AppLocale,
  { sensor: string; started: string; ready: string; ends: string; left: string; ended: string; days: string; hours: string }
> = {
  es: { sensor: "Sensor", started: "Lo pusiste el", ready: "Lecturas listas (fin del calentamiento)", ends: "El sensor termina", left: "Tiempo restante", ended: "Este sensor ya ha terminado", days: "d", hours: "h" },
  en: { sensor: "Sensor", started: "Started on", ready: "Readings ready (end of warm-up)", ends: "Sensor ends", left: "Time left", ended: "This sensor has already ended", days: "d", hours: "h" },
  de: { sensor: "Sensor", started: "Gesetzt am", ready: "Werte bereit (Ende der Aufwärmphase)", ends: "Sensor endet", left: "Restzeit", ended: "Dieser Sensor ist bereits abgelaufen", days: "T", hours: "Std." },
  fr: { sensor: "Capteur", started: "Posé le", ready: "Mesures prêtes (fin du préchauffage)", ends: "Le capteur expire", left: "Temps restant", ended: "Ce capteur a déjà expiré", days: "j", hours: "h" },
  it: { sensor: "Sensore", started: "Applicato il", ready: "Letture pronte (fine del riscaldamento)", ends: "Il sensore scade", left: "Tempo rimanente", ended: "Questo sensore è già scaduto", days: "g", hours: "h" },
};

/** "2026-10-22T08:30" in the browser's local time, for <input type="datetime-local">. */
function toLocalInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

// The visitor's clock, re-read every minute. The server snapshot is null so the
// server render and the first client render agree (times depend on the
// visitor's time zone).
const subscribeMinute = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};
const currentMinute = () => Math.floor(Date.now() / 60_000) * 60_000;
const noClock = () => null;

/** When a FreeStyle Libre sensor is ready and when it ends, from its start time. */
export function SensorEndCalculator({ locale }: { locale: AppLocale }) {
  const l = L[locale];
  const [model, setModel] = useState<SensorModel>("libre3");
  const [picked, setPicked] = useState<string | null>(null);
  const now = useSyncExternalStore(subscribeMinute, currentMinute, noClock);
  // Until the visitor picks a time, assume the sensor was started now.
  const start = picked ?? (now != null ? toLocalInput(new Date(now)) : "");

  const startMs = start ? new Date(start).getTime() : NaN;
  const times = Number.isFinite(startMs) ? sensorTimes(model, startMs) : null;
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const leftMs = times && now != null ? times.endsAt - now : null;

  const field = "mt-2 w-full rounded-[14px] border border-white/12 bg-ground-2 px-4 py-3 text-ink";
  return (
    <div className="rounded-[24px] border border-white/8 bg-glass p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-label text-mute">
          {l.sensor}
          <select className={field} value={model} onChange={(e) => setModel(e.target.value as SensorModel)}>
            {(Object.keys(SENSORS) as SensorModel[]).map((m) => (
              <option key={m} value={m}>
                {SENSORS[m].name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-label text-mute">
          {l.started}
          <input type="datetime-local" className={field} value={start} onChange={(e) => setPicked(e.target.value)} />
        </label>
      </div>
      {times ? (
        <dl className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
          <div className="rounded-[18px] border border-white/8 bg-ground-2 px-4 py-3">
            <dt className="text-caption text-mute">{l.ready}</dt>
            <dd className="mt-1 text-[1.2rem] font-light text-ink">{fmt.format(times.readyAt)}</dd>
          </div>
          <div className="rounded-[18px] border border-white/8 bg-ground-2 px-4 py-3">
            <dt className="text-caption text-mute">{l.ends}</dt>
            <dd className="mt-1 text-[1.2rem] font-light text-ink">{fmt.format(times.endsAt)}</dd>
          </div>
          <div className="rounded-[18px] border border-white/8 bg-ground-2 px-4 py-3">
            <dt className="text-caption text-mute">{l.left}</dt>
            <dd className="mt-1 text-[1.2rem] font-light text-ink">
              {leftMs == null
                ? "–"
                : leftMs <= 0
                  ? l.ended
                  : `${Math.floor(leftMs / 86_400_000)} ${l.days} ${Math.floor((leftMs % 86_400_000) / 3_600_000)} ${l.hours}`}
            </dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}
