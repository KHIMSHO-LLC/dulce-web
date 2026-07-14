import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/time-in-range-vs-a1c">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  return { 
    title: locale === "es" ? "Tiempo en Rango (TIR) vs. A1C: Por qué importa" : "Time in Range vs. A1C: Why endocrinologists are changing their focus",
    description: locale === "es" ? "Descubre por qué el objetivo del 70% de Tiempo en Rango (TIR) es el nuevo estándar oro en el manejo de la diabetes." : "Learn why the 70% Time in Range (TIR) goal is becoming the gold standard in diabetes management."
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/time-in-range-vs-a1c">) {
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
          Health · Oct 10, 2026
        </p>
        <h1 className="text-display md:text-display-lg tracking-tight font-bold text-foreground leading-tight mb-6">
          {isEs 
            ? "Tiempo en Rango vs. A1C: Por qué los endocrinólogos están cambiando su enfoque" 
            : "Time in Range vs. A1C: Why endocrinologists are changing their focus"}
        </h1>
        <div className="flex items-center gap-3 text-label text-muted">
          <span>By Giorgio</span>
          <span>·</span>
          <span>4 min read</span>
        </div>
      </header>

      <div className="space-y-6 text-body text-muted leading-relaxed">
        {isEs ? (
          <>
            <p>
              Durante décadas, la Hemoglobina Glicosilada (HbA1c o A1C) fue el estándar absoluto del control de la diabetes. Ibas a la clínica cada tres meses, te extraían sangre, y ese número determinaba si estabas "haciendo un buen trabajo" o no. 
            </p>
            <p>
              Sin embargo, los endocrinólogos y las asociaciones clínicas de diabetes, como la ADA (American Diabetes Association), están cambiando su enfoque hacia una métrica mucho más accionable y realista: el <strong>Tiempo en Rango (TIR)</strong>.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              ¿Cuál es el problema con la A1C?
            </h2>
            <p>
              La A1C es un promedio. Mide cuánta glucosa se ha adherido a tus glóbulos rojos durante los últimos 90 días. El problema de los promedios es que ocultan los extremos. 
            </p>
            <p>
              Imagina a dos personas con diabetes, ambas con una A1C del 7.0%. 
              <br/><br/>
              <strong>Persona A:</strong> Su glucosa fluctúa salvajemente, de 40 mg/dL a las 3 AM hasta 300 mg/dL después del almuerzo. Su promedio aritmético da como resultado una "buena" A1C, pero su calidad de vida está sufriendo drásticamente por la fatiga y los cambios de humor que causan las montañas rusas glucémicas.
              <br/><br/>
              <strong>Persona B:</strong> Su glucosa se mantiene constante, subiendo y bajando suavemente entre 80 y 160 mg/dL. 
              <br/><br/>
              La prueba de A1C dirá que ambas están igual de saludables. Tu cuerpo sabe que eso no es cierto.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              El poder del Tiempo en Rango (TIR)
            </h2>
            <p>
              El Tiempo en Rango, posible gracias al uso generalizado de los Monitores Continuos de Glucosa (CGMs) como Dexcom y Libre, mide el porcentaje del día que pasas dentro de tu rango objetivo (generalmente 70-180 mg/dL).
            </p>
            <p>
              El consenso médico internacional establece que un buen objetivo inicial para la mayoría de las personas con diabetes tipo 1 o tipo 2 es:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Más del 70%</strong> del tiempo dentro del rango (70-180 mg/dL).</li>
              <li>Menos del 4% del tiempo por debajo del rango (hipoglucemia, menos de 70 mg/dL).</li>
            </ul>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              Visualizar tu éxito diario
            </h2>
            <p>
              El mayor beneficio psicológico del TIR es que te saca del ciclo de castigo de la A1C trimestral. Si tuviste un día de un 40% en rango porque la cena fue difícil de calcular, mañana tienes la oportunidad de alcanzar un 80%.
            </p>
            <p>
              Apps compañeras como <strong>Dulce</strong> traen esta métrica al frente de tu vida. Al agregar gráficos de tendencia directamente en tus widgets de la pantalla de inicio o en tu Apple Watch, dejas de adivinar cómo está yendo el día y comienzas a actuar proactivamente.
            </p>
          </>
        ) : (
          <>
            <p>
              For decades, the Hemoglobin A1C test was the undisputed gold standard of diabetes control. You went to the clinic every three months, gave some blood, and that single percentage dictated whether you were doing a "good job" or a "bad job."
            </p>
            <p>
              Today, top endocrinologists and organizations like the American Diabetes Association (ADA) are heavily promoting a far more actionable and realistic metric: <strong>Time in Range (TIR)</strong>.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              What’s wrong with A1C?
            </h2>
            <p>
              A1C is an average. It measures how much glucose has attached to your red blood cells over a 90-day period. The problem with averages is that they completely hide the extremes.
            </p>
            <p>
              Imagine two people living with diabetes, both with an A1C of 7.0%. 
              <br/><br/>
              <strong>Person A:</strong> Their glucose fluctuates wildly, dropping to 40 mg/dL at 3 AM and rocketing to 300 mg/dL after lunch. Their mathematical average comes out to a "good" A1C, but their daily quality of life is severely impacted by exhaustion, brain fog, and the emotional toll of the glycemic rollercoaster.
              <br/><br/>
              <strong>Person B:</strong> Their glucose remains steady, gently rolling between 80 and 160 mg/dL. 
              <br/><br/>
              An A1C blood test treats both patients as if they have identical health outcomes. Your body knows that isn't true.
            </p>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              The power of Time in Range (TIR)
            </h2>
            <p>
              Time in Range, made possible by the widespread adoption of Continuous Glucose Monitors (CGMs) like Dexcom and FreeStyle Libre, measures the exact percentage of the day you spend inside your target zone (typically defined as 70-180 mg/dL).
            </p>
            <p>
              The international clinical consensus states that a solid initial goal for most people with type 1 or type 2 diabetes is:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>More than 70%</strong> of the time in range (70-180 mg/dL).</li>
              <li>Less than 4% of the time below range (hypoglycemia, under 70 mg/dL).</li>
            </ul>
            <h2 className="text-headline font-bold text-foreground mt-10 mb-4">
              Visualizing daily success
            </h2>
            <p>
              The biggest psychological benefit of TIR is that it breaks the punishing cycle of the quarterly A1C test. If you had a tough day and hit 40% in range because pizza math is hard, you get to wake up tomorrow with a fresh slate and aim for 80%.
            </p>
            <p>
              Companion apps like <strong>Dulce</strong> bring this metric to the forefront of your daily experience. By placing trend lines and TIR calculations right on your iPhone lock screen widgets and Apple Watch face, you stop guessing how the day is going and start making proactive, micro-adjustments.
            </p>
          </>
        )}
      </div>

      <div className="mt-16 pt-10 border-t border-border-subtle bg-accent-soft/30 rounded-[var(--radius-card-xl)] p-8 md:p-12 text-center">
        <h3 className="text-display tracking-tight font-bold text-foreground mb-4">
          {isEs ? "Mejora tu TIR con Dulce" : "Improve your TIR with Dulce"}
        </h3>
        <p className="text-body text-muted mb-8 max-w-lg mx-auto">
          {isEs ? "Sigue tus tendencias en tiempo real con widgets para tu pantalla de inicio." : "Track your trends in real-time with beautiful home screen widgets."}
        </p>
        <Button as="a" href="/#waitlist" size="lg">
          {isEs ? "Descubrir Dulce" : "Discover Dulce"}
        </Button>
      </div>
    </article>
  );
}
