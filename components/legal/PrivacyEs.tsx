{/* TODO: Legal review by a Spanish DPO / lawyer required before public launch. */}
export function PrivacyEs() {
  return (
    <>
      <p>
        Esta Política de Privacidad explica qué datos personales recopila Dulce, cómo los
        usamos y los derechos que tienes sobre ellos. Se aplica tanto a este sitio web
        (<strong>dulceglucosa.com</strong>) como a la aplicación móvil Dulce.
      </p>

      <h2 id="controller">1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento es <strong>Giorgio Khimshiashvili</strong>, autónomo,
        con base en España. Puedes contactarnos para cualquier cuestión relativa a tus datos
        en <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Qué datos recopilamos</h2>
      <h3>2.1 Sitio web</h3>
      <ul>
        <li>
          <strong>Lista de espera:</strong> tu correo y el idioma de tu sesión.
        </li>
        <li>
          <strong>Formulario de beta:</strong> nombre, correo, dispositivo CGM y región.
          Opcionalmente, las notas que quieras compartir.
        </li>
        <li>
          <strong>Datos técnicos mínimos:</strong> un hash anónimo (SHA-256) de tu IP
          combinado con una sal que rota a diario, usado solo para frenar el abuso de los
          formularios. Nunca guardamos la IP en claro.
        </li>
        <li>
          <strong>Analítica anónima:</strong> usamos Vercel Analytics, que no instala cookies
          ni recoge identificadores personales. Solo mide visitas y rendimiento.
        </li>
      </ul>

      <h3>2.2 En la app, en tu dispositivo</h3>
      <ul>
        <li>
          <strong>Tus credenciales de LibreLinkUp.</strong> Inicias sesión con el correo y la
          contraseña de tu cuenta de LibreLinkUp (Abbott). Se guardan únicamente en el
          llavero seguro de tu dispositivo y se usan para obtener tu glucosa del servicio de
          Abbott. Nunca se envían a los servidores de Dulce.
        </li>
        <li>
          <strong>Lecturas de glucosa</strong> obtenidas de LibreLinkUp, guardadas en una
          base de datos local en tu dispositivo.
        </li>
        <li>
          <strong>Tu diario</strong>: carbohidratos, insulina, entradas manuales de glucosa y
          notas. Almacenado localmente.
        </li>
        <li>
          <strong>Datos de Apple Salud</strong> en modo solo lectura, si das permiso.
        </li>
        <li>
          <strong>Preferencias</strong>: unidades, rango objetivo, idioma, tema, ajustes de
          alertas.
        </li>
      </ul>

      <h3>2.3 El relay de Dulce (funciones en tiempo real)</h3>
      <p>
        Algunas funciones tienen que seguir funcionando con el móvil bloqueado o la app
        cerrada: la Live Activity de la pantalla de bloqueo, las alertas de glucosa, las
        actualizaciones del Apple Watch y el seguimiento familiar. Para eso, un pequeño
        servidor operado por nosotros (el «relay», alojado en Cloudflare) obtiene tus
        lecturas de LibreLinkUp y las envía a tus dispositivos. Cuando — y solo cuando —
        activas una de estas funciones, el relay procesa:
      </p>
      <ul>
        <li>
          <strong>Un token de sesión de LibreLinkUp</strong> (no tu contraseña), para poder
          obtener lecturas en tu nombre.
        </li>
        <li>
          <strong>Tokens de notificación anónimos</strong> de tus dispositivos, emitidos por
          Apple o Google. Identifican un dispositivo para notificaciones; no te identifican a
          ti personalmente.
        </li>
        <li>
          <strong>Tus lecturas de glucosa más recientes</strong>, guardadas como una ventana
          corta y rotativa, la necesaria para mostrar la Live Activity, el reloj y las vistas
          de tus seguidores. El relay no es un archivo histórico de tu salud — eso se queda
          en tu dispositivo.
        </li>
        <li>
          <strong>Los ajustes mínimos</strong> para formatear lo que ves (unidades, rango
          objetivo, umbrales de alerta, idioma).
        </li>
      </ul>
      <p>
        Si nunca activas estas funciones, no se envía nada a los servidores de Dulce. Si las
        desactivas, cierras sesión o eliminas tu cuenta en Ajustes, los datos asociados del
        relay se eliminan.
      </p>

      <h3>2.4 Seguimiento familiar</h3>
      <p>
        Si invitas a alguien a seguirte, el relay entrega tus lecturas recientes y tus
        alertas a su dispositivo desde el momento en que acepta — el historial anterior no se
        comparte. Los mensajes cortos predefinidos entre tú y tus seguidores también pasan
        por el relay. Puedes revocar el acceso de un seguidor en cualquier momento, y puedes
        desactivar por completo los mensajes de seguidores.
      </p>

      <h3>2.5 Compras</h3>
      <p>
        Las suscripciones las procesa <strong>Apple</strong>. Nunca vemos tu nombre, tarjeta
        ni datos de facturación. Usamos <strong>RevenueCat</strong> para validar las
        suscripciones con un identificador aleatorio generado por la app — no con tu correo
        ni tu identidad.
      </p>

      <h2 id="purpose">3. Para qué usamos tus datos</h2>
      <ul>
        <li>
          Mostrar tu glucosa en tus dispositivos y, si tú lo decides, en los de tus
          seguidores.
        </li>
        <li>Entregarte las alertas que configuras.</li>
        <li>Validar tu suscripción y desbloquear las funciones Pro.</li>
        <li>Avisarte cuando Dulce esté disponible (lista de espera).</li>
        <li>Proteger el sitio del abuso (hash de IP, límite de peticiones).</li>
        <li>Entender qué páginas funcionan mejor (analítica anónima).</li>
        <li>Cumplir obligaciones legales y responder a tus solicitudes de derechos.</li>
      </ul>

      <h2 id="legal-basis">4. Base jurídica</h2>
      <ul>
        <li>
          <strong>Consentimiento explícito</strong> (art. 9.2.a RGPD): el tratamiento de tus
          datos de glucosa a través del relay cuando activas funciones en tiempo real o el
          seguimiento familiar.
        </li>
        <li>
          <strong>Contrato</strong> (art. 6.1.b RGPD): prestarte la app y las funciones a las
          que te suscribes.
        </li>
        <li>
          <strong>Consentimiento</strong> (art. 6.1.a RGPD): cuando te apuntas a la lista de
          espera o a la beta.
        </li>
        <li>
          <strong>Interés legítimo</strong> (art. 6.1.f RGPD): seguridad básica del sitio y
          analítica anónima.
        </li>
      </ul>

      <h2 id="health">5. Datos de categoría especial (art. 9 RGPD)</h2>
      <p>
        Las lecturas de glucosa y otros datos de salud son <strong>categorías especiales</strong>{" "}
        de datos personales. Nuestro enfoque:
      </p>
      <ul>
        <li>Por defecto, se procesan y almacenan solo en tu dispositivo.</li>
        <li>
          Solo llegan a nuestro relay cuando activas expresamente una función que lo
          requiere, y solo como una ventana reciente de corta duración.
        </li>
        <li>Siempre van cifrados en tránsito (TLS).</li>
        <li>
          Se usan exclusivamente para entregar tus propios datos a tus propios dispositivos y
          a los seguidores que tú eliges — nunca para publicidad, perfiles ni reventa.
        </li>
      </ul>

      <h2 id="retention">6. Cuánto tiempo conservamos tus datos</h2>
      <ul>
        <li>
          <strong>Datos del relay:</strong> las lecturas recientes se sobrescriben
          continuamente; los tokens de sesión y de notificación se conservan mientras la
          función está activa y se eliminan cuando la desactivas, cierras sesión o eliminas
          tu cuenta (Ajustes → Eliminar cuenta).
        </li>
        <li>
          <strong>Datos de la app en tu dispositivo:</strong> hasta que los borres o
          desinstales la app.
        </li>
        <li>
          <strong>Lista de espera:</strong> hasta el lanzamiento + 6 meses, o hasta que pidas
          que te eliminemos.
        </li>
        <li>
          <strong>Formulario de beta:</strong> durante la beta + 12 meses.
        </li>
        <li>
          <strong>Hash de IP:</strong> 30 días.
        </li>
      </ul>

      <h2 id="recipients">7. Con quién compartimos tus datos</h2>
      <p>
        Compartimos datos únicamente con los proveedores estrictamente necesarios para operar
        el servicio. Todos actúan como encargados del tratamiento bajo contrato:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> — aloja el relay de Dulce descrito arriba.
        </li>
        <li>
          <strong>Apple</strong> — notificaciones push (APNs), Live Activities, Apple Salud
          (en el dispositivo) y pagos.
        </li>
        <li>
          <strong>Google Firebase</strong> — notificaciones push en Android.
        </li>
        <li>
          <strong>RevenueCat</strong> — validación de suscripciones (solo ID seudónimo).
        </li>
        <li>
          <strong>Supabase</strong> (almacenamiento de lista de espera y beta) — alojado en
          la UE (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (correo de confirmación de la lista) y{" "}
          <strong>Vercel</strong> (alojamiento web y analítica anónima).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong> — tu dispositivo y nuestro relay se conectan
          al servicio de Abbott con tus credenciales/sesión para obtener tus lecturas. Esa
          conexión se rige por la política de privacidad de Abbott.
        </li>
      </ul>
      <p>
        Nunca vendemos, alquilamos ni cedemos tus datos a terceros con fines publicitarios o
        comerciales.
      </p>

      <h2 id="transfers">8. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros encargados (Cloudflare, RevenueCat, Resend, Vercel, Apple,
        Google) procesan datos en EE. UU. o en ubicaciones edge globales. Las transferencias
        se realizan bajo las Cláusulas Contractuales Tipo (SCC) de la Comisión Europea o
        marcos equivalentes (DPF). Puedes pedir copia de estas garantías en{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="rights">9. Tus derechos</h2>
      <p>Como titular de los datos, tienes derecho a:</p>
      <ul>
        <li>Acceder a tus datos personales.</li>
        <li>Rectificarlos si son inexactos.</li>
        <li>Solicitar su supresión.</li>
        <li>Oponerte al tratamiento o pedir su limitación.</li>
        <li>La portabilidad de los datos que nos hayas facilitado.</li>
        <li>Retirar tu consentimiento en cualquier momento.</li>
      </ul>
      <p>
        La forma más rápida de borrar todo lo que Dulce guarda sobre ti es{" "}
        <strong>Ajustes → Eliminar cuenta</strong> dentro de la app. También puedes ejercer
        cualquiera de estos derechos escribiendo a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Respondemos en un
        máximo de 30 días.
      </p>
      <p>
        Si crees que nuestro tratamiento no cumple la ley, tienes derecho a presentar una
        reclamación ante la{" "}
        <a href="https://www.aepd.es" target="_blank" rel="noopener">
          Agencia Española de Protección de Datos (AEPD)
        </a>
        .
      </p>

      <h2 id="minors">10. Menores</h2>
      <p>
        Dulce no está dirigida a menores de 14 años. Un padre, madre o tutor legal puede usar
        Dulce para seguir la glucosa de un menor bajo su propia responsabilidad. Si crees que
        un menor a tu cargo nos ha facilitado datos sin tu consentimiento, contáctanos y los
        eliminaremos.
      </p>

      <h2 id="cookies">11. Cookies</h2>
      <p>
        Solo usamos cookies técnicas estrictamente necesarias (preferencia de idioma, token
        CSRF en formularios). No usamos cookies de rastreo ni publicidad. Más información en
        nuestra <a href="/legal/cookies">Política de Cookies</a>.
      </p>

      <h2 id="changes">12. Cambios en esta política</h2>
      <p>
        Si hacemos cambios sustanciales, avisaremos a los usuarios afectados por correo o
        dentro de la app y publicaremos la versión actualizada con su fecha de revisión en
        esta página.
      </p>

      <h2 id="contact">13. Contacto</h2>
      <p>
        Para cualquier duda sobre esta Política de Privacidad o el tratamiento de tus datos,
        escribe a <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
