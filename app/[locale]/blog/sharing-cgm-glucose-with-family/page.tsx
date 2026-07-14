import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/sharing-cgm-glucose-with-family">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  return { 
    title: locale === "es" ? "Compartir tu CGM con la familia sin fatiga de alarmas" : "Sharing your CGM with family without the alert fatigue",
    description: locale === "es" ? "Cómo dar tranquilidad a tus seres queridos mediante el uso compartido de la glucosa, evitando la ansiedad y las alertas constantes a las 3 AM." : "How to give loved ones peace of mind using glucose sharing, without causing anxiety or constant 3 AM alerts."
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/sharing-cgm-glucose-with-family">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ArticleContent locale={locale as AppLocale} />;
}

function ArticleContent({ locale }: { locale: AppLocale }) {
  const isEs = locale === "es";

  return (
    <article className="container-page py-16 md:py-24 max-w-3xl">
      <header className="mb-12">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent mb-4">
          Family · Oct 05, 2026
        </p>
        <h1 className="text-display md:text-display-lg tracking-tight font-bold text-foreground leading-tight mb-6">
          {isEs 
            ? "Compartir tu CGM con la familia sin la infame 'fatiga de alarmas'" 
            : "Sharing your CGM with family without the dreaded 'alert fatigue'"}
        </h1>
        <div className="flex items-center gap-3 text-label text-muted">
          <span>By Giorgio</span>
          <span>·</span>
          <span>6 min read</span>
        </div>
      </header>

      <div className="space-y-6 text-body text-muted leading-relaxed">
        {isEs ? (
          <>
            <p>
              La diabetes tipo 1 rara vez afecta solo a una persona. Cuando vives con DM1, las personas que te aman—tus padres, tu pareja, tus compañeros de cuarto—a menudo comparten gran parte de la carga mental subyacente. 
            </p>
            <p>
              La llegada de aplicaciones compañeras para Monitorización Continua de Glucosa (CGM) como Dexcom Share y LibreLinkUp cambió las reglas del juego. De repente, una madre en el trabajo podía ver la glucosa de su hijo en la escuela. Un cónyuge podía verificar si su pareja estaba baja durante la noche. Fue una revolución para la tranquilidad familiar.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              El lado oscuro de compartir: La Ansiedad Digital
            </h2>
            <p>
              Pero esta revolución trajo un nuevo problema psicológico que muchas familias enfrentan: la <strong>fatiga de alarmas</strong> y el exceso de vigilancia.
            </p>
            <p>
              Si configuras las alertas de seguimiento demasiado estrictas, el teléfono de tu pareja sonará sin parar. Estás en 85 y bajando ligeramente; la alarma de tu pareja se dispara durante una reunión. Acabas de comer y la glucosa sube a 190 antes de bajar; la alarma de tus padres suena en mitad de la noche, provocando una llamada de pánico.
            </p>
            <p>
              Esto a menudo resulta en fricción: el paciente siente que lo están micro-gestionando, y el seguidor vive en un estado constante de ansiedad basal esperando el próximo pitido.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              Mejores prácticas para compartir tu glucosa
            </h2>
            <p>
              El objetivo de compartir tus datos no es que otra persona maneje tu diabetes (a menos que hablemos de niños muy pequeños). El objetivo es crear una red de seguridad. Aquí te damos tres reglas clave para evitar la fricción:
            </p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>Amplía los rangos de los seguidores:</strong> Si tu alarma personal suena a los 75 mg/dL, configura la alarma de tus seguidores a los 65 o 60 mg/dL. Tú necesitas saber cuándo estás empezando a bajar para actuar; ellos solo necesitan saber si no lo has resuelto a tiempo.
              </li>
              <li>
                <strong>Desactiva las alarmas altas para la familia:</strong> A menos que exista un riesgo severo de cetoacidosis (CAD), una alarma alta rara vez es una emergencia médica inmediata que requiera intervención de otra persona a las 3 AM. Deja que tú te encargues de las altas; reserva a tus seguidores para las bajas severas.
              </li>
              <li>
                <strong>Establece el protocolo "El botón OK":</strong> La regla de oro. Si tu seguidor ve una lectura baja severa, debe esperar 15 minutos antes de llamar. Esto te da tiempo de comer carbohidratos y que el CGM registre la recuperación.
              </li>
            </ul>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              Cómo Dulce hace el seguimiento más humano
            </h2>
            <p>
              Cuando construimos la función de "Seguidores" en Dulce, teníamos este problema psicológico muy presente. No queríamos otra aplicación ruidosa que asustara a las familias.
            </p>
            <p>
              En lugar de llamadas de pánico, los seguidores en Dulce pueden usar la función de "Toque". Si un padre ve que la glucosa está baja, en lugar de llamar, puede enviar un "Nudge" silencioso. El paciente recibe una notificación simple y, con un solo toque desde su pantalla de bloqueo o reloj, puede responder <em>"Estoy bien, ya lo estoy tratando."</em>
            </p>
            <p>
              Es comunicación rápida, sin fricción, diseñada para preservar la independencia del paciente mientras se mantiene intacta la red de seguridad de la familia.
            </p>
          </>
        ) : (
          <>
            <p>
              Type 1 diabetes rarely affects just one person. When you live with T1D, the people who love you—your parents, your partner, your roommates—often carry a massive, invisible mental load right alongside you.
            </p>
            <p>
              The advent of Continuous Glucose Monitor (CGM) companion apps like Dexcom Share and LibreLinkUp completely changed the game. Suddenly, a mom at work could glance at her phone and see her child's glucose at school. A spouse could verify if their partner was low during the night. It was an absolute revolution for family peace of mind.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              The dark side of sharing: Digital Anxiety
            </h2>
            <p>
              But this revolution brought a new psychological problem that many families struggle with today: <strong>alert fatigue</strong> and over-monitoring.
            </p>
            <p>
              If you set follower alerts too tight, your partner's phone will ring incessantly. You are at 85 mg/dL and drifting down; your spouse's alarm goes off during a client meeting. You just ate dinner and spiked to 190 mg/dL before coming back down; your parents' alarm blasts in the middle of the night, prompting a panicked phone call.
            </p>
            <p>
              This frequently results in friction: the person with diabetes feels micromanaged, and the follower lives in a constant state of baseline anxiety waiting for the next loud beep.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              Best practices for sharing your glucose
            </h2>
            <p>
              The goal of sharing data isn't to have someone else manage your diabetes (unless we are talking about very young children). The goal is to build a safety net. Here are three key rules to avoid family friction:
            </p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>Widen the follower's thresholds:</strong> If your personal low alarm triggers at 75 mg/dL, set your followers' alarm to 65 or 60 mg/dL. You need to know when you are trending down so you can act; they only need to know if you haven't solved it in time.
              </li>
              <li>
                <strong>Turn off high alarms for family:</strong> Unless there is a severe risk of DKA, a high alarm is rarely an immediate, life-threatening emergency that requires someone else to wake up at 3 AM. Handle the highs yourself; reserve your followers for severe lows.
              </li>
              <li>
                <strong>Establish the "I'm OK" protocol:</strong> The golden rule. If a follower sees a severe low, they should wait 15 minutes before calling. This gives you time to eat carbs and allows the CGM delay to catch up and show the recovery.
              </li>
            </ul>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              How Dulce makes following more human
            </h2>
            <p>
              When we built the Follower features in Dulce, we kept this exact psychological problem in mind. We didn't want another noisy app that terrifies families.
            </p>
            <p>
              Instead of panicked phone calls, followers in Dulce can use the "Nudge" feature. If a parent sees a low, instead of calling, they can send a silent Nudge. The patient receives a simple notification, and with a single tap from their lock screen or Apple Watch, they can reply: <em>"I'm OK, I'm treating it."</em>
            </p>
            <p>
              It’s fast, frictionless communication designed to preserve the patient's independence while keeping the family’s safety net fully intact.
            </p>
          </>
        )}
      </div>

      <div className="mt-16 pt-10 border-t border-border-subtle bg-accent-soft/30 rounded-[var(--radius-card-xl)] p-8 md:p-12 text-center">
        <h3 className="text-display tracking-tight font-bold text-foreground mb-4">
          {isEs ? "Comparte sin estrés" : "Share without the stress"}
        </h3>
        <p className="text-body text-muted mb-8 max-w-lg mx-auto">
          {isEs ? "Usa Dulce para mantener a tu familia informada sin la ansiedad constante." : "Use Dulce to keep your family in the loop without the constant anxiety."}
        </p>
        <Button as="a" href="/#waitlist" size="lg">
          {isEs ? "Únete a Dulce" : "Join Dulce"}
        </Button>
      </div>
    </article>
  );
}
