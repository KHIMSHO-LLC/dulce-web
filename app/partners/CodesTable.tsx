"use client";

import { useState } from "react";
import type { RefCode } from "./api";

type Props = {
  codes: RefCode[];
  busyCode: string | null;
  onTogglePause: (code: RefCode) => Promise<void>;
  onDelete: (code: RefCode) => Promise<void>;
  onMarkPaid: (code: RefCode) => Promise<void>;
};

function formatDate(ms: number | null): string {
  if (ms === null) return "—";
  return new Date(ms).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });
}

function formatEur(amount: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);
}

function payoutLabel(payout: RefCode["payout"]): string {
  switch (payout.type) {
    case "per_paying":
      return `${formatEur(payout.amount)} / pago`;
    case "per_retained":
      return `${formatEur(payout.amount)} / retenido`;
    case "percent":
      return `${payout.amount}% (nota)`;
  }
}

function owedLabel(owed: RefCode["owed"]): string {
  if (owed.amount === null) {
    return `${owed.count} evento${owed.count === 1 ? "" : "s"} (ver nota)`;
  }
  return `${formatEur(owed.amount)} (${owed.count})`;
}

/** Row actions that need confirmation get a lightweight inline confirm
 *  instead of window.confirm — keeps behavior consistent and testable. */
function ConfirmButton({
  label,
  confirmLabel,
  className,
  disabled,
  onConfirm,
}: {
  label: string;
  confirmLabel: string;
  className: string;
  disabled?: boolean;
  onConfirm: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={disabled}
          onClick={async () => {
            setConfirming(false);
            await onConfirm();
          }}
          className={className}
        >
          {confirmLabel}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-caption text-muted underline underline-offset-2"
        >
          cancelar
        </button>
      </div>
    );
  }

  return (
    <button type="button" disabled={disabled} onClick={() => setConfirming(true)} className={className}>
      {label}
    </button>
  );
}

export function CodesTable({ codes, busyCode, onTogglePause, onDelete, onMarkPaid }: Props) {
  if (codes.length === 0) {
    return (
      <div className="bg-card rounded-[var(--radius-card)] border border-border-subtle p-10 text-center text-muted">
        Todavía no hay códigos. Añade el primero arriba.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border-subtle bg-card">
      <table className="w-full min-w-[1000px] text-left text-label">
        <thead>
          <tr className="border-b border-border-subtle text-caption uppercase tracking-wider text-muted">
            <th className="px-4 py-3 font-semibold">Código</th>
            <th className="px-4 py-3 font-semibold">Estado</th>
            <th className="px-4 py-3 font-semibold">Offering</th>
            <th className="px-4 py-3 font-semibold text-right">Claims</th>
            <th className="px-4 py-3 font-semibold text-right">Trials</th>
            <th className="px-4 py-3 font-semibold text-right">Pago</th>
            <th className="px-4 py-3 font-semibold text-right">Retenido 1m</th>
            <th className="px-4 py-3 font-semibold">Regla de pago</th>
            <th className="px-4 py-3 font-semibold">Adeudado</th>
            <th className="px-4 py-3 font-semibold">Pagado hasta</th>
            <th className="px-4 py-3 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((c) => {
            const busy = busyCode === c.code;
            return (
              <tr key={c.code} className="border-b border-border-subtle last:border-0 align-middle">
                <td className="px-4 py-3 font-mono font-bold tracking-wider">{c.code}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-[var(--radius-badge)] px-2 py-0.5 text-caption font-semibold ${
                      c.status === "active"
                        ? "bg-state-in-range/10 text-state-in-range"
                        : "bg-state-slightly-low/10 text-state-slightly-low"
                    }`}
                  >
                    {c.status === "active" ? "Activo" : "Pausado"}
                  </span>
                </td>
                <td className="px-4 py-3">{c.offeringId}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.stats.claims}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.stats.trials}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.stats.paying}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.stats.retained}</td>
                <td className="px-4 py-3 whitespace-nowrap">{payoutLabel(c.payout)}</td>
                <td className="px-4 py-3 whitespace-nowrap font-semibold">{owedLabel(c.owed)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(c.paidThrough)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => onTogglePause(c)}
                      className="text-caption font-semibold text-accent hover:text-accent-hover disabled:opacity-50"
                    >
                      {c.status === "active" ? "Pausar" : "Reanudar"}
                    </button>
                    <ConfirmButton
                      label="Marcar pagado"
                      confirmLabel={`Confirmar (resetea contador desde hoy)`}
                      disabled={busy}
                      className="text-caption font-semibold text-accent hover:text-accent-hover disabled:opacity-50"
                      onConfirm={() => onMarkPaid(c)}
                    />
                    <ConfirmButton
                      label="Eliminar"
                      confirmLabel="Confirmar borrado"
                      disabled={busy}
                      className="text-caption font-semibold text-state-low hover:opacity-80 disabled:opacity-50"
                      onConfirm={() => onDelete(c)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
