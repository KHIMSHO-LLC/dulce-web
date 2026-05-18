{/* TODO: Legal review by a Spanish DPO / lawyer required before public launch. */}
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
      <p>
        En Dulce usamos <strong>únicamente cookies técnicas estrictamente necesarias</strong>.
        No usamos cookies de seguimiento publicitario ni cookies de terceros para analítica.
      </p>

      <h3>2.1 Cookies de sesión / técnicas</h3>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong> — recuerda tu preferencia de idioma entre páginas.
          Tipo: técnica. Duración: hasta 1 año.
        </li>
        <li>
          <strong>Tokens de envío de formularios</strong> — usados por Next.js Server Actions
          para prevenir CSRF. Tipo: técnica. Duración: solo durante el envío del formulario.
        </li>
      </ul>

      <h3>2.2 Analítica anónima sin cookies</h3>
      <p>
        Usamos <strong>Vercel Analytics</strong>, que mide páginas vistas y rendimiento web{" "}
        <strong>sin cookies</strong> ni identificadores personales. La información se agrega y
        anonimiza; no permite identificarte. Por eso no requiere consentimiento de cookies bajo
        la directiva ePrivacy.
      </p>

      <h2 id="consentimiento">3. Consentimiento</h2>
      <p>
        Las cookies estrictamente necesarias no requieren tu consentimiento — están exentas
        bajo la normativa española de cookies (art. 22 LSSI) y el RGPD. Si en el futuro
        introdujéramos cookies no técnicas, te pediríamos consentimiento previo mediante un
        banner adecuado.
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
        <a href="mailto:hola@dulce.app">hola@dulce.app</a>.
      </p>
    </>
  );
}
