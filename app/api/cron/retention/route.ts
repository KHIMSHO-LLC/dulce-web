import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

function parseConfiguredDate(value: string | undefined, name: string): Date | null {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${name} must use YYYY-MM-DD`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`${name} is not a valid calendar date`);
  }
  return date;
}

function addUtcMonths(date: Date, months: number): Date {
  const firstOfTargetMonth = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1),
  );
  const lastDayOfTargetMonth = new Date(
    Date.UTC(
      firstOfTargetMonth.getUTCFullYear(),
      firstOfTargetMonth.getUTCMonth() + 1,
      0,
    ),
  ).getUTCDate();

  return new Date(
    Date.UTC(
      firstOfTargetMonth.getUTCFullYear(),
      firstOfTargetMonth.getUTCMonth(),
      Math.min(date.getUTCDate(), lastDayOfTargetMonth),
    ),
  );
}

function dueCutoff(date: Date | null, months: number, now: Date): string | null {
  if (!date) return null;
  const cutoff = addUtcMonths(date, months);
  return cutoff.getTime() <= now.getTime() ? cutoff.toISOString() : null;
}

export async function GET(request: Request): Promise<Response> {
  if (process.env.ENABLE_RETENTION_CLEANUP !== "true") {
    return Response.json({ ok: true, deleted: { waitlist: 0, betaInterest: 0 }, configured: false });
  }

  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return Response.json({ ok: false, error: "cron_secret_missing" }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  let androidLaunchDate: Date | null;
  let betaEndDate: Date | null;
  try {
    androidLaunchDate = parseConfiguredDate(
      process.env.ANDROID_LAUNCH_DATE,
      "ANDROID_LAUNCH_DATE",
    );
    betaEndDate = parseConfiguredDate(process.env.BETA_END_DATE, "BETA_END_DATE");
  } catch (error) {
    console.error(
      "[retention] invalid date configuration:",
      error instanceof Error ? error.message : "unknown configuration error",
    );
    return Response.json({ ok: false, error: "invalid_date_configuration" }, { status: 500 });
  }

  const now = new Date();
  const waitlistCutoff = dueCutoff(androidLaunchDate, 6, now);
  const betaCutoff = dueCutoff(betaEndDate, 12, now);
  if (!waitlistCutoff && !betaCutoff) {
    return Response.json({ ok: true, deleted: { waitlist: 0, betaInterest: 0 }, configured: false });
  }

  try {
    const supabase = supabaseAdmin();
    let waitlistDeleted = 0;
    let betaInterestDeleted = 0;

    if (waitlistCutoff) {
      const { count, error } = await supabase
        .from("waitlist")
        .delete({ count: "exact" })
        .lt("created_at", waitlistCutoff);
      if (error) throw new Error(`waitlist deletion failed (${error.code || "unknown"})`);
      waitlistDeleted = count ?? 0;
    }

    if (betaCutoff) {
      const { count, error } = await supabase
        .from("beta_interest")
        .delete({ count: "exact" })
        .lt("created_at", betaCutoff);
      if (error) throw new Error(`beta-interest deletion failed (${error.code || "unknown"})`);
      betaInterestDeleted = count ?? 0;
    }

    console.info(
      `[retention] cleanup complete waitlist=${waitlistDeleted} betaInterest=${betaInterestDeleted}`,
    );
    return Response.json({
      ok: true,
      deleted: { waitlist: waitlistDeleted, betaInterest: betaInterestDeleted },
      cutoffs: { waitlist: waitlistCutoff, betaInterest: betaCutoff },
    });
  } catch (error) {
    console.error(
      "[retention] cleanup failed:",
      error instanceof Error ? error.message : "unknown database error",
    );
    return Response.json({ ok: false, error: "cleanup_failed" }, { status: 500 });
  }
}
