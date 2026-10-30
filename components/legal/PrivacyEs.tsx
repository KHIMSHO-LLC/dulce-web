import { Link } from "@/i18n/navigation";

{/* Sigue pendiente la revisión legal: validar con asesoría española la base jurídica, el consentimiento en la app, la conservación y las transferencias. */}
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
        El responsable del tratamiento es <strong>Giorgio Khimshiashvili</strong>, como
        empresario individual. Puedes contactarnos para cualquier cuestión relativa a tus datos
        en <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Qué datos recopilamos</h2>
      <h3>2.1 Sitio web</h3>
      <ul>
        <li>
          <strong>Lista de espera para Android:</strong> tu correo, el idioma elegido, la
          página o ubicación donde te apuntaste y un hash seudónimo de tu IP para prevenir abusos.
        </li>
        <li>
          <strong>Formulario de interés en la beta, si lo enviaste:</strong> nombre, correo,
          dispositivo CGM, región y las notas opcionales que compartieras.
        </li>
        <li>
          <strong>Formulario de contacto:</strong> nombre, correo, asunto y mensaje. Resend
          reenvía el mensaje a nuestro buzón de soporte y te envía una confirmación.
        </li>
        <li>
          <strong>Datos técnicos mínimos:</strong> un hash seudonimizado (SHA-256) de tu IP
          combinado con una sal que rota a diario, usado para limitar el abuso de formularios.
          Los registros de la lista de espera y beta incluyen este hash hasta que se elimina el
          registro asociado. Los contadores para limitar peticiones son temporales. No guardamos
          directamente la IP en claro.
        </li>
        <li>
          <strong>Analítica web:</strong> Vercel Analytics mide páginas vistas y rendimiento sin
          cookies. Vercel indica que su métrica de visitantes usa un hash derivado de la solicitud
          que caduca tras 24 horas; los informes pueden incluir URL, referente, ubicación general,
          navegador y sistema operativo, que vemos en forma agregada. Google Analytics 4 mide
          visitas, ruta e idioma de la página, clics en enlaces a App
          Store y campañas, y altas completadas en la lista de espera. En el EEE, Reino Unido y
          Suiza, o si no podemos determinar tu ubicación, solo se carga si aceptas las cookies de
          analítica; en otros lugares sigue la configuración regional descrita en la Política de
          Cookies. No enviamos lecturas de
          glucosa, otros datos de salud ni tu correo a ninguno de estos servicios.
        </li>
      </ul>

      <h3>2.2 En la app, en tu dispositivo</h3>
      <ul>
        <li>
          <strong>Tus credenciales del sistema CGM.</strong> Inicias sesión con tu cuenta de
          LibreLinkUp (Abbott) o Dexcom Share. La contraseña se guarda en el llavero seguro de
          tu dispositivo y no se envía a Dulce. La app la usa para conectarse al proveedor;
          cuando conectas tu CGM, se envía al relay un token de sesión del proveedor
          (no tu contraseña), como se explica a continuación.
        </li>
        <li>
          <strong>Lecturas de glucosa</strong> obtenidas de LibreLinkUp o Dexcom Share,
          guardadas en una base de datos local en tu dispositivo.
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
        Cuando conectas tu CGM, la app registra esta instalación en nuestro relay para poder
        ofrecer actualizaciones en segundo plano, alertas, funciones de Apple Watch y
        seguimiento familiar cuando las uses. El relay es un pequeño servidor que operamos y
        alojamos en Cloudflare. Obtiene lecturas de LibreLinkUp o Dexcom Share y envía
        actualizaciones a tus dispositivos. El relay procesa:
      </p>
      <ul>
        <li>
          <strong>Un token de sesión del proveedor</strong> (no tu contraseña): un token de
          LibreLinkUp o un ID de sesión de Dexcom Share, para obtener lecturas en tu nombre.
        </li>
        <li>
          <strong>Un ID aleatorio de instalación y un identificador de tu cuenta CGM</strong>
          para asociar el registro, las lecturas y los ajustes al dispositivo y conexión CGM correctos.
        </li>
        <li>
          <strong>Tokens de notificación</strong> emitidos por Apple o Google para enviar
          notificaciones y actualizaciones de Live Activity.
        </li>
        <li>
          <strong>Tus lecturas de glucosa más recientes</strong>, incluidos el valor y la hora,
          guardadas como una ventana corta y rotativa para mostrar la Live Activity, el reloj y
          las vistas de tus seguidores. El relay no es un archivo histórico de tu salud — eso
          se queda en tu dispositivo.
        </li>
        <li>
          <strong>Ajustes y datos técnicos del dispositivo y la app</strong> necesarios para el
          servicio (unidades, rango objetivo, umbrales de alerta, idioma, zona horaria,
          plataforma y versión de la app).
        </li>
        <li>
          <strong>Eventos de uso:</strong> eventos básicos de configuración, conexión y
          suscripción asociados al ID aleatorio de instalación para medir y mejorar el servicio.
        </li>
        <li>
          <strong>Registros operativos:</strong> los registros de diagnóstico enviados a
          Cloudflare Workers Logs contienen un código seudónimo del dispositivo (un hash
          irreversible de tu ID de instalación, no el ID en sí), tu proveedor de CGM, si cada
          actualización o alerta se entregó, el tipo de alerta cuando se envía una, eventos de
          estado de la Actividad en Vivo que comunica la app y detalles de errores. No contienen
          valores de glucosa. Cloudflare borra estos registros a los 7 días.
        </li>
      </ul>
      <p>
        Puedes detener este tratamiento desconectando tu CGM o usando «Eliminar cuenta» en
        Ajustes. La app solicita al relay que elimine los registros activos del dispositivo,
        tokens y datos de seguimiento. Después se conserva un ID mínimo de instalación y la
        fecha del primer registro para reconocer una instalación que vuelve y no contarla como
        nueva en las métricas internas. Este marcador no tiene caducidad automática. Escríbenos
        si también quieres que lo borremos.
      </p>

      <h3>2.4 Seguimiento familiar</h3>
      <p>
        Si invitas a alguien a seguirte, el relay entrega tus lecturas recientes y tus
        alertas a su dispositivo desde el momento en que acepta — el historial anterior no se
        comparte. Los mensajes breves para comprobar cómo estás, incluido el texto que elijas,
        también pasan por el relay; no es un servicio de chat. Puedes revocar el acceso de un
        seguidor en cualquier momento y desactivar por completo esos mensajes.
      </p>

      <h3>2.5 Compras</h3>
      <p>
        Las suscripciones las procesa <strong>Apple</strong>. Nunca vemos tu nombre, tarjeta
        ni datos de facturación. Usamos <strong>RevenueCat</strong> para validar las
        suscripciones con un identificador aleatorio generado por la app — no con tu correo
        ni tu identidad.
      </p>
      <p>
        Nuestro servidor guarda ese identificador de RevenueCat junto al identificador de
        instalación para retirar las funciones Pro en cuanto se reembolsa una compra. Si pides
        un reembolso a Apple o Google, podemos indicarles, a través de RevenueCat, si la compra
        se entregó y nuestra preferencia sobre el reembolso. No compartimos datos de glucosa ni
        de salud; la decisión la toma siempre Apple o Google.
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
        <li>Responder a las consultas enviadas mediante el formulario de contacto.</li>
        <li>Proteger el sitio del abuso (hash de IP, límite de peticiones).</li>
        <li>Entender las visitas al sitio, las derivaciones a App Store y el uso del servicio y su configuración.</li>
        <li>Cumplir obligaciones legales y responder a tus solicitudes de derechos.</li>
      </ul>

      <h2 id="legal-basis">4. Base jurídica</h2>
      <ul>
        <li>
          <strong>Consentimiento explícito</strong> (art. 9.2.a RGPD): el tratamiento de tus
          datos de salud cuando decides conectar tu CGM y usar las funciones relacionadas.
          Desconectar tu CGM detiene el tratamiento en el relay; también puedes retirar el
          consentimiento escribiéndonos. Durante el onboarding, la app enlaza esta política,
          pero actualmente no muestra una casilla separada para consentir el tratamiento de datos
          de salud. Estamos pidiendo a asesoría española que confirme si el aviso y el flujo de
          conexión actuales cumplen el estándar de consentimiento explícito.
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
          respuesta a las consultas que envías mediante el formulario de contacto. La base
          jurídica de la analítica depende del servicio y de las normas regionales descritas en
          la Política de Cookies; debe confirmarse con asesoría de privacidad.
        </li>
      </ul>

      <h2 id="health">5. Datos de categoría especial (art. 9 RGPD)</h2>
      <p>
        Las lecturas de glucosa y otros datos de salud son <strong>categorías especiales</strong>{" "}
        de datos personales. Nuestro enfoque:
      </p>
      <ul>
        <li>
          Tu historial de glucosa a largo plazo, tu diario y los datos de Apple Salud se procesan
          y almacenan en tu dispositivo. El relay también procesa las lecturas recientes como se
          explica arriba.
        </li>
        <li>
          Cuando conectas tu CGM, el relay procesa las lecturas recientes necesarias para las
          funciones en segundo plano y de seguimiento que uses; conserva una ventana breve,
          no tu historial de glucosa a largo plazo.
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
          <strong>Datos activos del relay:</strong> las lecturas recientes se sustituyen
          continuamente en una ventana corta. Los tokens de sesión del proveedor y de
          notificación se conservan mientras los necesite el dispositivo conectado y se
          eliminan al desconectarlo o darlo de baja, cerrar sesión o usar Ajustes → Eliminar cuenta.
        </li>
        <li>
          <strong>Datos de la app en tu dispositivo:</strong> hasta que los borres o
          desinstales la app.
        </li>
        <li>
          <strong>Lista de espera para Android:</strong> hasta seis meses después del lanzamiento
          de Android o hasta que pidas que te eliminemos. El almacenamiento actual no caduca
          automáticamente; la eliminación requiere una tarea manual o tu solicitud. El hash de
          IP asociado se conserva con el registro durante el mismo periodo.
        </li>
        <li>
          <strong>Formulario de interés en la beta:</strong> durante la beta y 12 meses más.
          Estos registros también se eliminan manualmente o a petición; el hash de IP asociado
          se conserva con el registro.
        </li>
        <li>
          <strong>Mensajes de contacto:</strong> mientras atendemos tu consulta y cualquier
          seguimiento necesario. Las copias de correo pueden permanecer en nuestro buzón y en
          los sistemas de Resend según su configuración de conservación; puedes pedirnos que las
          borremos cuando no exista una obligación legal de conservarlas.
        </li>
        <li>
          <strong>Eventos de uso del relay:</strong> los registros asociados a un ID aleatorio
          de instalación se conservan hasta 45 días; las estadísticas diarias agregadas del
          servicio, hasta 400 días.
        </li>
        <li>
          <strong>Registros operativos:</strong> Cloudflare Workers Logs se borran a los 7 días.
        </li>
        <li>
          <strong>Marcador de instalación:</strong> el ID aleatorio y la fecha del primer
          registro se conservan tras borrar los datos del relay para reconocer instalaciones
          que vuelven. No tiene caducidad automática; puedes pedirnos que borremos también este
          marcador.
        </li>
      </ul>

      <h2 id="recipients">7. Con quién compartimos tus datos</h2>
      <p>
        Usamos los proveedores que se indican a continuación. Algunos tratan datos por nuestra
        cuenta bajo contrato; Abbott, Dexcom, Apple y Google también prestan servicios sujetos
        a sus propias condiciones y políticas de privacidad:
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
          <strong>Google Analytics 4 (Google Ireland Ltd.)</strong> — analítica web según la
          configuración regional de consentimiento descrita en la Política de Cookies.
        </li>
        <li>
          <strong>RevenueCat</strong> — validación de suscripciones (solo ID seudónimo).
        </li>
        <li>
          <strong>Supabase</strong> (almacenamiento de lista de espera y beta) — alojado en
          la UE (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (entrega del formulario de contacto y correo de confirmación
          de la lista) y{" "}
          <strong>Vercel</strong> (alojamiento web y analítica web agregada).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong> — tu dispositivo y nuestro relay se conectan
          al servicio de Abbott con tus credenciales/sesión para obtener tus lecturas. Esa
          conexión se rige por la política de privacidad de Abbott.
        </li>
        <li>
          <strong>Dexcom (Share)</strong> — tu dispositivo y, mientras tu CGM está conectado,
          nuestro relay se conecta a Dexcom Share mediante un ID de sesión para obtener
          lecturas. Se aplican las condiciones de privacidad de Dexcom.
        </li>
      </ul>
      <p>
        Nunca vendemos, alquilamos ni cedemos tus datos a terceros con fines publicitarios o
        comerciales.
      </p>

      <h2 id="transfers">8. Transferencias internacionales</h2>
      <p>
        Algunos proveedores y servicios que usamos (Cloudflare, RevenueCat, Resend, Vercel,
        Apple y Google) pueden tratar datos en EE. UU. u otros países. Cuando el RGPD exige
        garantías para una transferencia, el mecanismo aplicable depende del proveedor y del
        servicio, y puede incluir una decisión de adecuación o las Cláusulas Contractuales Tipo
        (SCC) de la Comisión Europea. Google LLC figura como participante activo del Marco de
        Privacidad de Datos UE-EE. UU., dentro del alcance de su certificación. Escríbenos para
        consultar los detalles y obtener copia de las garantías aplicables en{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="rights">9. Tus derechos</h2>
      <p>Según el RGPD y sujeto a sus condiciones, tienes derecho a:</p>
      <ul>
        <li>Acceder a tus datos personales.</li>
        <li>Rectificarlos si son inexactos.</li>
        <li>Solicitar su supresión.</li>
        <li>Oponerte al tratamiento o pedir su limitación.</li>
        <li>La portabilidad de los datos que nos hayas facilitado.</li>
        <li>Retirar tu consentimiento en cualquier momento.</li>
      </ul>
      <p>
        Usa <strong>Ajustes → Eliminar cuenta</strong> en la app para borrar los datos locales y
        los registros activos del relay. El marcador mínimo de instalación descrito arriba
        permanece hasta que solicites su borrado. Puedes ejercer cualquiera de estos derechos
        escribiendo a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Respondemos en el
        plazo de un mes. Si la solicitud es compleja o recibimos muchas solicitudes, el RGPD
        permite ampliarlo hasta dos meses más; te explicaremos cualquier ampliación durante el
        primer mes.
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
        Usamos cookies técnicas estrictamente necesarias y, con tu consentimiento donde la ley
        lo exige, cookies de Google Analytics. No usamos cookies de publicidad. Qué cookies son y
        cómo cambiar tu elección está en nuestra{" "}
        <Link href="/legal/cookies">Política de Cookies</Link>.
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
