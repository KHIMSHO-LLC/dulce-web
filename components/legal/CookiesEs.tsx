import { GA_ID } from "@/lib/consent";

{/* Sigue pendiente la revisión legal: confirmar con asesoría española las regiones de consentimiento, cookies y analítica. */}
export function CookiesEs() {
  return (
    <>
      <p>
        Esta Política de Cookies explica qué cookies y tecnologías similares usa el sitio web{" "}
        <strong>dulceglucosa.com</strong> y para qué.
      </p>

      <h2 id="que-son">1. ¿Qué es una cookie?</h2>
      <p>
        Una cookie es un pequeño archivo de texto que un sitio web guarda en tu navegador para
        recordar información entre páginas o visitas. Las cookies pueden ser{" "}
        <strong>técnicas</strong> (necesarias para que el sitio funcione) o{" "}
        <strong>no técnicas</strong> (analítica, publicidad, etc.).
      </p>

      <h2 id="cuales-usamos">2. Cookies que usamos</h2>
      {GA_ID ? (
        <p>
          En Dulce usamos <strong>cookies técnicas estrictamente necesarias</strong> y cookies de{" "}
          <strong>Google Analytics</strong>, que en el EEE, el Reino Unido y Suiza, y cuando no
          podemos determinar tu ubicación, solo se usa después de que aceptes la analítica. No
          usamos cookies de seguimiento publicitario.
        </p>
      ) : (
        <p>
          En Dulce usamos <strong>únicamente cookies técnicas estrictamente necesarias</strong>.
          No usamos cookies de seguimiento publicitario ni cookies de terceros para analítica.
        </p>
      )}

      <h3>2.1 Cookies de sesión / técnicas</h3>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong> — recuerda tu preferencia de idioma entre páginas.
          Tipo: técnica. Duración: hasta 1 año.
        </li>
        <li>
          <strong>dulce-region</strong> — el código de tu país, proporcionado por nuestro
          proveedor de alojamiento a partir de la solicitud y guardado en una cookie de sesión
          para decidir si debemos pedirte consentimiento para la analítica. No guardamos la IP
          en claro con este fin. Tipo: técnica. Duración: hasta que cierres el navegador.
        </li>
        <li>
          <strong>dulce:analytics-consent</strong> — un valor de localStorage del navegador, no
          una cookie, que recuerda si aceptaste o rechazaste Google Analytics. Permanece hasta
          que borres los datos de este sitio en el navegador.
        </li>
      </ul>

      <h3>2.2 Analítica agregada sin cookies</h3>
      <p>
        Usamos <strong>Vercel Analytics</strong> para medir páginas vistas y rendimiento web{" "}
        <strong>sin cookies</strong>. Vercel indica que su métrica de visitantes usa un hash
        derivado de la solicitud que caduca tras 24 horas; los informes pueden incluir la URL,
        el referente, la ubicación general, el navegador y el sistema operativo. Usamos informes
        agregados. Este servicio no instala cookies, pero los datos siguen sujetos a la normativa
        de privacidad aplicable.
      </p>

      {GA_ID ? (
        <>
          <h3>2.3 Google Analytics</h3>
          <p>
            En el EEE, el Reino Unido y Suiza (o si no podemos determinar tu ubicación) solo si
            aceptas las cookies de análisis, y en el
            resto del mundo salvo que lo desactives, usamos <strong>Google Analytics 4</strong>{" "}
            (Google Ireland Ltd.) para medir visitas, páginas, clics en enlaces a App Store, su
            campaña y ubicación, y altas completadas en la lista de espera. Instala las cookies
            <strong> _ga</strong> y <strong>_ga_*</strong> (duración:
            hasta 2 años). Google puede tratar estos datos en Estados Unidos al amparo del Marco
            de Privacidad de Datos UE-EE. UU. Las funciones publicitarias, Google Signals y la
            personalización de anuncios están desactivadas. Si las rechazas, Google Analytics
            no se carga.
          </p>
        </>
      ) : null}

      <h2 id="consentimiento">3. Consentimiento</h2>
      <p>
        Las cookies estrictamente necesarias pueden usarse sin consentimiento cuando cumplen la
        excepción aplicable de la normativa española de cookies (art. 22 LSSI). Los datos
        personales asociados siguen sujetos a la normativa de protección de datos.{" "}
        {GA_ID
          ? "En el EEE, el Reino Unido y Suiza, o si no podemos determinar tu ubicación, las cookies de Google Analytics solo se instalan después de que las aceptes en nuestro banner. En cualquier país puedes cambiar tu elección cuando quieras en «Ajustes de cookies», al pie de cada página."
          : "Si en el futuro introdujéramos cookies no técnicas, te pediríamos consentimiento previo mediante un banner adecuado."}
      </p>

      <h2 id="gestionar">4. Cómo gestionar las cookies</h2>
      <p>
        Puedes borrar las cookies almacenadas o impedir que tu navegador las acepte desde la
        configuración del propio navegador:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/es/kb/Borrar%20cookies"
            target="_blank"
            rel="noopener"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/es-es/HT201265"
            target="_blank"
            rel="noopener"
          >
            Safari (iOS / macOS)
          </a>
        </li>
      </ul>
      <p>
        Si deshabilitas las cookies técnicas, algunas funciones (por ejemplo, recordar tu
        idioma) podrían no funcionar.
      </p>

      <h2 id="cambios">5. Cambios en esta política</h2>
      <p>
        Si añadimos o eliminamos cookies actualizaremos esta página. La fecha de última
        actualización aparece arriba.
      </p>

      <h2 id="contacto">6. Contacto</h2>
      <p>
        Para cualquier consulta sobre cookies, escríbenos a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
