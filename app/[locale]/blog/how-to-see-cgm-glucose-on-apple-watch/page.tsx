import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/how-to-see-cgm-glucose-on-apple-watch">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  return { 
    title: locale === "es" ? "Cómo ver tu glucosa CGM en Apple Watch" : "How to see your CGM glucose on Apple Watch",
    description: locale === "es" ? "Guía paso a paso para ver los datos de tu FreeStyle Libre o Dexcom nativamente en tu muñeca sin retrasos." : "Step-by-step guide to getting FreeStyle Libre or Dexcom readings natively on your wrist without delays."
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/how-to-see-cgm-glucose-on-apple-watch">) {
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
          Guides · Oct 12, 2026
        </p>
        <h1 className="text-display md:text-display-lg tracking-tight font-bold text-foreground leading-tight mb-6">
          {isEs 
            ? "Cómo ver tu glucosa en el Apple Watch (y por qué la mayoría de apps fallan)" 
            : "How to see your CGM glucose on your Apple Watch (and why most apps fail at it)"}
        </h1>
        <div className="flex items-center gap-3 text-label text-muted">
          <span>By Giorgio</span>
          <span>·</span>
          <span>5 min read</span>
        </div>
      </header>

      <div className="space-y-6 text-body text-muted leading-relaxed">
        {isEs ? (
          <>
            <p>
              Si vives con diabetes tipo 1 y usas un monitor continuo de glucosa (CGM) como FreeStyle Libre o Dexcom, probablemente te hayas hecho esta pregunta: <em>¿Por qué es tan difícil ver simplemente mi número en mi reloj?</em>
            </p>
            <p>
              Compraste un Apple Watch esperando poder echar un vistazo a tu muñeca durante una reunión, mientras conduces o cuando corres, en lugar de tener que sacar el teléfono de tu bolsillo cada 15 minutos. Pero la realidad con las aplicaciones oficiales a menudo es decepcionante: complicaciones que muestran "---", datos que tardan media hora en actualizarse, o pantallas que te obligan a abrir la aplicación en el teléfono primero.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              El problema con las aplicaciones oficiales
            </h2>
            <p>
              El problema principal radica en cómo Apple maneja la batería. Las aplicaciones oficiales de CGM (como LibreLink o Dexcom G6/G7) se ejecutan en tu teléfono. Cuando la aplicación del teléfono recibe una nueva lectura por Bluetooth, intenta despertar la aplicación del reloj para enviarle el dato. 
            </p>
            <p>
              Sin embargo, watchOS es muy estricto limitando cuántas veces una aplicación en segundo plano puede actualizar su complicación en la esfera del reloj. Si superas ese límite (que suele pasar rápidamente cuando actualizas cada minuto), el reloj bloquea las actualizaciones para ahorrar batería. El resultado es que miras tu muñeca y no hay datos.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              La solución: Conexiones Directas
            </h2>
            <p>
              La mejor práctica actual en la gestión de diabetes con tecnología portátil no es depender de la sincronización entre el teléfono y el reloj, sino usar aplicaciones que funcionen de manera independiente.
            </p>
            <p>
              Aquí es donde aplicaciones compañeras como <strong>Dulce</strong> marcan la diferencia. Dulce está diseñada con una arquitectura nativa para watchOS. Si tu Apple Watch tiene conexión a Internet (ya sea por Wi-Fi o datos celulares), Dulce no espera a que tu teléfono le envíe la información. Se conecta de forma segura directamente a los servidores de LibreLinkUp o Dexcom Share para descargar tu glucosa en tiempo real.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              Cómo configurar Dulce en tu Apple Watch
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Abre la App Store directamente en tu Apple Watch y descarga Dulce.</li>
              <li>Inicia sesión con tu cuenta oficial de Dexcom o LibreLinkUp.</li>
              <li>Mantén presionada la esfera de tu reloj y toca <em>Editar</em>.</li>
              <li>Desliza hasta la pantalla de <em>Complicaciones</em> y selecciona el espacio donde quieres tu glucosa.</li>
              <li>Elige Dulce en la lista de aplicaciones.</li>
            </ul>
            <p className="mt-8 italic">
              Nota médica: Dulce no es un dispositivo médico y no sustituye el consejo de tu endocrinólogo. Siempre toma decisiones de tratamiento basándote en la aplicación principal de tu sensor o con un glucómetro capilar.
            </p>
          </>
        ) : (
          <>
            <p>
              If you live with type 1 diabetes and use a Continuous Glucose Monitor (CGM) like FreeStyle Libre or Dexcom, you’ve probably asked yourself this question: <em>Why is it so hard to just see my number on my watch?</em>
            </p>
            <p>
              You bought an Apple Watch hoping you could just glance at your wrist during a meeting, while driving, or out on a run, instead of fishing your phone out of your pocket every 15 minutes. But the reality with official apps is often frustrating: complications that display "---", data that takes half an hour to refresh, or screens that force you to open the phone app first anyway.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              The problem with official apps
            </h2>
            <p>
              The core issue lies in how Apple handles battery life. Official CGM apps run on your phone. When the phone app gets a new reading via Bluetooth, it attempts to wake up the watch app to push the data over.
            </p>
            <p>
              However, watchOS is extremely strict about limiting how many times a background app can update its watch face complication. If you exceed that budget (which you do quickly when updating every minute), the watch freezes updates to save battery. The result? You look at your wrist, and there is no data.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              The solution: Standalone Connections
            </h2>
            <p>
              Current best practices in wearable diabetes management recommend moving away from phone-to-watch synchronization, and instead using apps that operate independently.
            </p>
            <p>
              This is where companion apps like <strong>Dulce</strong> make a massive difference. Dulce is built with a native watchOS architecture. If your Apple Watch has an active internet connection (either via Wi-Fi or Cellular), Dulce doesn’t wait for your phone to send it data. It securely connects directly to LibreLinkUp or Dexcom Share servers to pull your glucose in real-time.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              How to set up Dulce on your Apple Watch
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Open the App Store directly on your Apple Watch and download Dulce.</li>
              <li>Sign in using your official Dexcom or LibreLinkUp account.</li>
              <li>Long press your watch face and tap <em>Edit</em>.</li>
              <li>Swipe over to the <em>Complications</em> screen and tap the space where you want your glucose.</li>
              <li>Scroll down to find Dulce and select your preferred widget size.</li>
            </ul>
            <p className="mt-8 italic">
              Medical notice: Dulce is not a medical device and does not replace your healthcare team's advice. Always make treatment decisions using your primary sensor app or a fingerstick.
            </p>
          </>
        )}
      </div>

      <div className="mt-16 pt-10 border-t border-border-subtle bg-accent-soft/30 rounded-[var(--radius-card-xl)] p-8 md:p-12 text-center">
        <h3 className="text-display tracking-tight font-bold text-foreground mb-4">
          {isEs ? "Experimenta Dulce en tu reloj" : "Experience Dulce on your watch"}
        </h3>
        <p className="text-body text-muted mb-8 max-w-lg mx-auto">
          {isEs ? "Descarga la beta privada hoy y mantén tu glucosa en tu muñeca de manera confiable." : "Join the private beta today and keep your glucose on your wrist, reliably."}
        </p>
        <Button as="a" href="/#waitlist" size="lg">
          {isEs ? "Unirme a la lista de espera" : "Join the waitlist"}
        </Button>
      </div>
    </article>
  );
}
