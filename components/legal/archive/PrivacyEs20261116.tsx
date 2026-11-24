import { Link } from "@/i18n/navigation";

{/* Texto que prevalece. Decisiones de redacción y puntos abiertos: DULCE/plans/legal-answers-2026-11-16.md. */}
export function PrivacyEs20261116() {
  return (
    <>
      <p>
        Esta Política de Privacidad explica qué datos personales recopila Dulce, cómo los
        usamos y los derechos que tienes sobre ellos. Se aplica tanto a este sitio web
        (<strong>dulceglucosa.com</strong>) como a la aplicación móvil Dulce.
      </p>

      <h2 id="controller">1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento es <strong>Giorgi Khimshiashvili</strong>, como
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
          (no tu contraseña), como se explica a continuación. Con Medtronic CareLink, escribes tu contraseña en la propia página de Medtronic, por lo que Dulce nunca la ve, y Dulce recibe tokens de acceso de Medtronic. Con Nightscout, introduces la dirección de tu sitio y un token de acceso o secreto de API (Dulce solo guarda la huella SHA-1 del secreto). Excepción para Dexcom: mientras «Mantener la sesión iniciada» está activado (Ajustes › Sensor, activado por defecto), la app envía además tu contraseña de Dexcom al relay una vez, porque Dexcom cierra la sesión cada 24 horas; ver más abajo. Si usas el historial guardado de la gráfica y aceptaste que se siga recogiendo mientras no estás, la contraseña también permite al relay seguir recogiendo tu historial después de que cierres sesión (ver 2.6).
        </li>
        <li>
          <strong>Lecturas de glucosa</strong> obtenidas de LibreLinkUp, Dexcom Share, Medtronic CareLink o Nightscout,
          guardadas en una base de datos local en tu dispositivo (y, para los suscriptores de Dulce
          Pro que aceptan el historial guardado de la gráfica, también en el relay; ver 2.6).
        </li>
        <li>
          <strong>Tu diario</strong>: carbohidratos, insulina (incluidas las dosis leídas de una
          pluma de insulina inteligente), ejercicio, entradas manuales de glucosa y notas. Se
          guarda en tu dispositivo. Si usas el historial guardado de la gráfica y compartes tu
          diario con tu familia (activado por defecto; puedes desactivarlo), las entradas desde el
          día en que activaste el uso compartido, incluidas las notas de texto libre, también se
          guardan en el relay (ver 2.6).
        </li>
        <li>
          <strong>Datos de Apple Salud</strong> (iPhone) o de <strong>Health Connect</strong>{" "}
          (Android), si das permiso. Consulta el apartado 2.2.1.
        </li>
        <li>
          <strong>Preferencias</strong>: unidades, rango objetivo, idioma, tema, ajustes de
          alertas.
        </li>
      </ul>

      <h3>2.2.1 Apple Salud y Health Connect</h3>
      <p>
        Si lo activas en Ajustes, Dulce lee registros de glucosa en sangre y de carbohidratos
        (en iPhone también de insulina) de Apple Salud o, en Android, de Health Connect. Tú
        eliges cada tipo y puedes retirar el acceso cuando quieras en los ajustes de Dulce o en
        los ajustes de salud del sistema. En Android, Dulce solo lee: nunca escribe en Health Connect. En iPhone, desde la versión 1.0.7, si activas la glucosa en Dulce y das permiso, Dulce también guarda las lecturas de tu sensor en Apple Salud, como máximo una cada 5 minutos. Puedes detenerlo en los ajustes de Dulce o en la app Salud. Las lecturas guardadas permanecen en Apple Salud, según las condiciones de Apple, y otras apps a las que des permiso pueden leerlas.
      </p>
      <p>
        Usamos estos datos solo para mostrarlos en tu gráfica y en tu diario. Se guardan en tu
        dispositivo, no se envían al relay de Dulce ni a nosotros, y nunca los vendemos, los
        compartimos ni los usamos para publicidad.
      </p>
      <p>
        El uso que hace Dulce de la información recibida de Health Connect cumplirá la{" "}
        <a
          href="https://support.google.com/googleplay/android-developer/answer/12991134"
          target="_blank"
          rel="noopener noreferrer"
        >
          política de permisos de Health Connect
        </a>
        , incluidos los requisitos de uso limitado.
      </p>

      <h3>2.2.2 Medición de anuncios (opcional, iOS)</h3>
      <p>
        La app de Dulce puede incluir el SDK de Meta (Meta Platforms Ireland Ltd. para usuarios
        en Europa) para medir si los anuncios propios de Dulce en Facebook e Instagram llevan a
        instalaciones y suscripciones. Está <strong>desactivada</strong> hasta que dices que sí
        a una pregunta dentro de la app, y puedes desactivarla de nuevo cuando quieras en Ajustes
        (fila «Medición de anuncios»). Si dices que no, no se envía nada a Meta.
      </p>
      <p>
        Si lo permites, compartimos que la app se instaló o se abrió, y que se inició una
        suscripción o una prueba (los eventos de compra los envía nuestro proveedor de pagos,
        RevenueCat), junto con un identificador anónimo que crea el SDK de Meta para esta app y
        los datos técnicos que acompañan a cualquier solicitud (dirección IP, modelo de
        dispositivo, versión del sistema operativo). Nunca compartimos lecturas de glucosa,
        datos de salud, datos de la cuenta del sensor, tu nombre ni tu correo electrónico.
      </p>
      <p>
        Dulce no muestra el aviso de seguimiento de Apple y no recopila el identificador
        publicitario (IDFA). No se te sigue por apps ni sitios web de otras empresas, y la
        medición es agregada. La base jurídica es tu consentimiento (art. 6.1.a RGPD), que
        puedes retirar cuando quieras en Ajustes.
      </p>

      <h3>2.3 El relay de Dulce (funciones en tiempo real)</h3>
      <p>
        Cuando conectas tu CGM, la app registra esta instalación en nuestro relay para poder
        ofrecer actualizaciones en segundo plano, alertas, funciones de Apple Watch y
        seguimiento familiar cuando las uses. El relay es un pequeño servidor que operamos y
        alojamos en Cloudflare. Obtiene lecturas de LibreLinkUp, Dexcom Share, Medtronic CareLink o Nightscout y envía
        actualizaciones a tus dispositivos. El relay procesa:
      </p>
      <ul>
        <li>
          <strong>Un token de sesión del proveedor</strong> (no tu contraseña): un token de
          LibreLinkUp o un ID de sesión de Dexcom Share, para obtener lecturas en tu nombre. Con Medtronic CareLink, el relay guarda tus tokens de acceso de CareLink. Con Nightscout, guarda la dirección de tu sitio y tu token de acceso o la huella SHA-1 de tu secreto de API. Con Dexcom, mientras «Mantener la sesión iniciada» está activado, el relay guarda también tu contraseña de Dexcom cifrada (AES-256-GCM, con la clave guardada aparte en el almacén de secretos de Cloudflare) y solo la usa para volver a iniciar sesión en Dexcom Share cuando caduca tu sesión. Nunca se registra en logs ni se comparte, y se borra al desactivar la opción o eliminar tu cuenta. Al cerrar sesión también se borra, salvo que Dulce siga recogiendo tu historial guardado de la gráfica mientras no estás (ver 2.6): en ese caso se conserva, cifrada, solo mientras dure esa recogida, y se borra en el momento en que termina por cualquier motivo. Si al cerrar sesión eliges «Parar y borrar», se borra de inmediato.
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
          las vistas de tus seguidores. Si eres suscriptor de Dulce Pro y aceptas el historial
          guardado de la gráfica en la app, el relay también conserva el historial de tu gráfica
          durante un máximo de 1 año (ver 2.6). Si no, tu historial a largo plazo se queda solo en
          tu dispositivo.
        </li>
        <li>
          <strong>Ajustes y datos técnicos del dispositivo y la app</strong> necesarios para el
          servicio (unidades, rango objetivo, umbrales de alerta, idioma, zona horaria,
          plataforma y versión de la app).
        </li>
        <li>
          <strong>Fotos de comidas</strong>, solo si usas «Estimar carbohidratos con una foto»: el
          relay las reenvía a Anthropic para estimar los carbohidratos y los valores nutricionales, sin guardarlas, y lleva un
          recuento diario de las fotos usadas (ver 2.8).
        </li>
        <li>
          <strong>Eventos de uso:</strong> eventos de configuración, conexión, suscripción, pantalla de pago y uso de funciones, además de cualquier opción de opinión que toques, asociados al ID aleatorio de instalación para medir y mejorar el servicio. No incluyen lecturas de glucosa ni el texto de los mensajes.
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
        Puedes detener este tratamiento usando «Eliminar cuenta» en Ajustes. Cerrar sesión de tu
        cuenta del sensor en Dulce detiene las actualizaciones en tiempo real y las alertas; si
        usas el historial guardado de la gráfica, tú decides si Dulce sigue recogiendo tu
        historial mientras tienes la sesión cerrada (ver 2.6). «Eliminar cuenta» solicita al relay
        que elimine los registros activos del dispositivo, tokens, datos de seguimiento e
        historial guardado. Después se conserva un ID mínimo de instalación y la
        fecha del primer registro para reconocer una instalación que vuelve y no contarla como
        nueva en las métricas internas. Este marcador no tiene caducidad automática. Escríbenos
        si también quieres que lo borremos.
      </p>

      <h3>2.4 Seguimiento familiar</h3>
      <p>
        Si invitas a alguien a seguirte, el relay entrega tus lecturas y tus alertas a su
        dispositivo desde el momento en que acepta. Sin el historial guardado de la gráfica, el
        historial anterior no se comparte. Si usas el historial guardado de la gráfica (Dulce Pro),
        tus seguidores también pueden ver el historial guardado de tu gráfica, incluidas las
        lecturas de antes de que aceptaran y, mientras el uso compartido del diario esté activado,
        tu diario compartido, incluidas las notas de texto libre; dejan de verlo cuando revocas su
        acceso o pausas el uso compartido (ver 2.6). Los mensajes entre tú y tus seguidores, incluido el texto que escribas, pasan por el relay y por el servicio de notificaciones de Apple o Google para llegar a sus dispositivos. El relay no guarda el texto de los mensajes ni un historial. Puedes revocar el acceso de un
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

      <h3>2.6 Historial guardado de la gráfica (Dulce Pro)</h3>
      <p>
        <strong>Qué es.</strong> Si tienes Dulce Pro y lo aceptas en la app, nuestro relay guarda
        tu historial de glucosa para que tu gráfica y la de tus seguidores sean la misma y no
        tengan huecos, y para que tu historial siga ahí después de cerrar sesión, reinstalar Dulce
        o cambiar de iPhone. Si no tienes Dulce Pro, o no lo aceptas, no se guarda nada y tu
        historial se queda solo en tu dispositivo.
      </p>
      <p>
        <strong>Qué se guarda.</strong>
      </p>
      <ul>
        <li>
          Tus lecturas de glucosa, cada una con su hora, valor y flecha de tendencia: el historial
          que devuelve el propio servicio de tu sensor (LibreLinkUp, Dexcom Share, Medtronic
          CareLink o Nightscout), las lecturas que obtiene el relay y, una sola vez al aceptarlo,
          el historial que ya está en tu teléfono (hasta 90 días).
        </li>
        <li>
          Tu diario, si lo compartes con tu familia (activado por defecto mientras el historial
          guardado de la gráfica esté activado; puedes desactivarlo por separado). Se comparte todo
          lo que hay en el diario: carbohidratos, insulina (incluidas las dosis leídas de una pluma
          de insulina inteligente y las dosis de purgado), ejercicio, mediciones manuales de
          glucosa y notas de texto libre, cada una con su hora y cantidad. Solo se comparten las
          entradas desde el día en que activas el uso compartido del diario; las anteriores no.
        </li>
        <li>
          No se guarda con él: el correo de tu cuenta del sensor, tu nombre, el texto de los
          mensajes entre tú y tus seguidores, ni los datos de Apple Salud o Health Connect.
        </li>
      </ul>
      <p>
        <strong>Para qué.</strong> Solo para prestar esta función: la misma gráfica completa para
        ti y para los familiares que invitaste, conservada aunque cierres sesión, reinstales o
        cambies de teléfono. No lo usamos para publicidad, elaboración de perfiles ni venta, y no
        lo compartimos con Meta ni con ningún servicio de analítica.
      </p>
      <p>
        <strong>Base jurídica.</strong> Tu consentimiento explícito (art. 9.2.a RGPD), porque los
        datos de glucosa son datos de salud. La app te lo pregunta antes de empezar a guardar, por
        separado para cada cuenta del sensor: si inicias sesión con otra cuenta del sensor, vuelve
        a preguntarte. No se guarda nada antes de que respondas, y las versiones de la app que no
        lo preguntan no guardan nada. Puedes retirar tu consentimiento en cualquier momento en
        Ajustes: el guardado se detiene y la copia guardada en el relay se borra de inmediato. La
        retirada no afecta a la licitud del guardado realizado antes. Dulce Pro no depende de este
        consentimiento: sin él, Dulce Pro funciona sin historial guardado.
      </p>
      <p>
        <strong>Dónde.</strong> En el relay de Dulce, en una base de datos de nuestro proveedor de
        alojamiento Cloudflare, que la trata por nuestra cuenta y puede tratar datos en la UE y en
        otros países con sus garantías estándar (ver el apartado 8). El mismo historial también se
        queda en la base de datos local de la app en tu teléfono.
      </p>
      <p>
        <strong>Cuánto tiempo.</strong> Mientras tu suscripción a Dulce Pro (incluida una prueba
        gratuita) esté activa, conservamos como máximo 1 año de historial aproximadamente; los días
        más antiguos se eliminan automáticamente. Si tu suscripción termina o se reembolsa, el
        guardado se detiene y el historial guardado (lecturas y diario compartido) se borra 90
        días después; si vuelves a suscribirte dentro de esos 90 días, sigue ahí.
      </p>
      <p>
        <strong>Recogida mientras tienes la sesión cerrada o la app está eliminada.</strong> Si lo
        aceptaste (la app te lo indica en la pantalla de consentimiento, en un aviso único o al
        cerrar sesión), el relay sigue recogiendo el historial de tu sensor después de que cierres
        sesión de tu cuenta del sensor en Dulce o elimines la app, unas cuantas veces al día en
        lugar de cada minuto, con la credencial del sensor que ya tiene:
      </p>
      <ul>
        <li>
          LibreLinkUp: el token de sesión. Nightscout: la dirección de tu sitio y tu token de acceso
          o la huella de tu secreto de API.
        </li>
        <li>
          Medtronic CareLink: los tokens de acceso que Medtronic emitió para Dulce (nunca tu
          contraseña), que el relay renueva como exige Medtronic.
        </li>
        <li>
          Dexcom Share: si «Mantener la sesión iniciada» está activado, tu contraseña de Dexcom,
          cifrada como se explica en 2.3. Si está desactivado, la recogida se detiene
          aproximadamente un día después de tu último inicio de sesión, porque Dexcom cierra la
          sesión.
        </li>
      </ul>
      <p>
        La recogida mientras no estás termina con lo primero que ocurra de lo siguiente: vuelves a
        iniciar sesión en Dulce con la misma cuenta del sensor; la desactivas en Ajustes o eliges
        «Parar y borrar» al cerrar sesión; desactivas el historial guardado de la gráfica o usas
        «Eliminar cuenta»; termina tu suscripción a Dulce Pro; el servicio de tu sensor rechaza el
        inicio de sesión o sigue fallando durante aproximadamente una semana; o ha pasado 1 año.
        Cuando termina, se borra la credencial conservada para ella. El historial ya guardado se
        conserva hasta que lo borres o venza el plazo indicado arriba, salvo que hayas elegido
        borrarlo. Si eliminas la app sin cerrar sesión, la app no puede preguntarte en ese
        momento: la recogida solo continúa si ya la habías aceptado; para detenerla, escríbenos
        (ver «Cómo desactivarlo y borrarlo» más abajo). Mientras tienes la sesión cerrada o no
        estás, tus seguidores no reciben lecturas en tiempo real, alertas ni historial nuevo.
      </p>
      <p>
        <strong>Puede tener huecos o perderse.</strong> El historial guardado es una comodidad: no
        es un historial médico ni una copia de seguridad. Puede tener huecos o perderse, por
        ejemplo cuando caduca la sesión de tu sensor o cambias la contraseña del sensor, cuando
        Dexcom cierra la sesión y «Mantener la sesión iniciada» está desactivado, cuando el
        servicio de tu sensor tiene una interrupción o aún no ha recibido datos de tu teléfono,
        cuando termina tu suscripción, cuando reinstalas Dulce en Android o pasas a un iPhone sin
        tu Llavero de iCloud, cuando usas «Eliminar cuenta», cuando un fabricante de sensores
        cambia o cierra su servicio, o por un fallo por nuestra parte. Conserva los registros que
        necesite tu médico en la app oficial del fabricante de tu sensor.
      </p>
      <p>
        <strong>Quién puede verlo.</strong> Tú y los seguidores que invitaste mientras compartas
        con ellos: ven el historial guardado de tu gráfica (incluidas las lecturas de antes de que
        aceptaran) y, mientras el uso compartido del diario esté activado, tu diario compartido,
        incluidas las notas de texto libre. Dejan de verlo cuando revocas su acceso, cuando se
        pausa el uso compartido o cuando borras tu historial. Desactivar el uso compartido del
        diario borra la copia compartida en el relay; tu diario en el teléfono se queda. Tus
        seguidores pueden leer las notas que compartes, así que no escribas información sobre
        otras personas en las notas que compartas. Quien haya iniciado sesión con la misma cuenta
        del sensor en su propio teléfono no recibe tu historial guardado a través de Dulce. El
        relay trata estos datos de forma automática para entregarlos; no miramos el historial ni
        las notas de un usuario concreto, salvo cuando sea necesario para resolver un problema que
        nos comuniques, para mantener la seguridad del servicio o cuando lo exija la ley.
      </p>
      <p>
        <strong>Cómo reconocemos tu historial sin una cuenta.</strong> Dulce no tiene cuentas de
        usuario. Tu historial está vinculado a una «clave de historial» secreta y aleatoria creada
        en tu teléfono, combinada con un identificador del paciente de tu cuenta del sensor (un
        número o nombre de usuario asignado por el servicio de tu sensor, o una huella de tu
        dirección de Nightscout), nunca con el correo de tu sensor. En iPhone, si usas el Llavero
        de iCloud, la clave de historial se sincroniza a través de tu propio Llavero de iCloud, por
        lo que tus otros iPhone con la misma cuenta de Apple comparten el mismo historial; por el
        mismo motivo, desactivar el guardado en uno de ellos lo desactiva en los demás. «Eliminar
        cuenta» borra la clave de tu Llavero de iCloud, así que Dulce empezará un historial nuevo
        en tus otros iPhone. Si inicias sesión con otra cuenta del sensor en el mismo teléfono,
        los historiales no se mezclan.
      </p>
      <p>
        <strong>Cómo desactivarlo y borrarlo.</strong>
      </p>
      <ul>
        <li>
          En la app, desactiva «Guardar historial de la gráfica» en Ajustes y confirma «Dejar y
          borrar»: la copia guardada en el relay se borra de inmediato.
        </li>
        <li>
          En la app, desactiva «Seguir recogiendo si cierro sesión o elimino la app»: Dulce deja de
          recoger después de que cierres sesión o elimines la app, y no conserva ninguna credencial
          del sensor para ello.
        </li>
        <li>
          En la app, desactiva «Compartir mi diario con la familia»: se borra la copia del diario
          compartido en el relay.
        </li>
        <li>Al cerrar sesión, elige «Parar y borrar» (o «Borrarlo»).</li>
        <li>
          Usa Ajustes → Eliminar cuenta: se borra todo, como se explica en el apartado 9.
        </li>
        <li>
          Sin la app, escribe a{" "}
          <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Como no hay cuenta,
          incluye tu ID de soporte (en la app: Ajustes › Cuenta › ID de soporte) o el email de
          contacto que guardaste (apartado 2.7), si los tienes; si no, te pediremos información que
          nos permita encontrar tus datos (por ejemplo, el servicio de tu sensor y cuándo usaste
          Dulce por última vez). Solo podemos actuar sobre los datos que podamos identificar, y te
          avisaremos si no podemos.
        </li>
      </ul>

      <h3>2.7 Email de contacto (opcional)</h3>
      <p>
        Dulce funciona sin dirección de email. Si quieres, puedes guardar un email de contacto en
        la app. Lo guardamos en el relay de Dulce, vinculado a tu instalación (el ID de soporte que
        muestra la app), y lo usamos solo para:
      </p>
      <ul>
        <li>responder a tus consultas de soporte y encontrar tu instalación cuando nos escribes;</li>
        <li>
          escribirte sobre tu instalación de Dulce o tu suscripción, por ejemplo un problema con la
          conexión de tu sensor, un cambio en esta política o en los términos, o un mes gratis que
          te ofrezcamos.
        </li>
      </ul>
      <p>
        No lo usamos para marketing ni boletines salvo que lo aceptes por separado, y no lo
        compartimos con Meta, con servicios de analítica ni con nadie más, salvo con nuestro
        proveedor de alojamiento Cloudflare, que lo guarda por nosotros. Nunca se escribe en los
        registros. Como está vinculado a tu instalación, nos permite saber de quién es esa
        instalación cuando te ayudamos (por ejemplo, el estado de tu suscripción o si usas el
        seguimiento familiar); el soporte no ve tus lecturas de glucosa.
      </p>
      <p>
        <strong>Base jurídica:</strong> tu consentimiento (art. 6.1.a RGPD). Darlo es opcional y
        puedes cambiarlo o quitarlo en la app cuando quieras; al quitarlo se borra del relay.{" "}
        <strong>Plazo:</strong> hasta que lo quites, uses Eliminar cuenta o nos pidas que lo
        borremos. Se conserva cuando cierras sesión en tu cuenta del sensor, para que podamos
        seguir ayudándote. Los emails que nos envías se tratan como se describe para los mensajes
        de contacto en el apartado 6.
      </p>

      <h3>2.8 Estimación de carbohidratos con una foto (opcional)</h3>
      <p>
        Al añadir una entrada puedes usar «Estimar carbohidratos con una foto». Dulce solo hace una
        foto de tu comida cuando decides usar esta función. Su uso es opcional y la app te lo
        pregunta antes de la primera foto. La función no se ofrece en algunos países.
      </p>
      <ul>
        <li>
          <strong>Adónde va la foto.</strong> La app envía la foto, a través del relay de Dulce, a
          Anthropic (Anthropic, PBC, Estados Unidos), un proveedor de servicios de inteligencia
          artificial que la trata por cuenta nuestra para estimar los carbohidratos de la comida y, donde la app los muestra, sus proteínas, grasas y calorías.
        </li>
        <li>
          <strong>Qué se envía con ella.</strong> Solo el idioma de la app, para que los nombres de
          los alimentos se devuelvan en ese idioma. Nada más: ni tu nombre, ni tu email, ni ningún
          identificador del dispositivo, ni lecturas de glucosa ni otros datos de salud. Antes de
          enviarla, la app reduce y vuelve a codificar la foto, lo que elimina los metadatos de
          ubicación y de la cámara.
        </li>
        <li>
          <strong>Qué conserva Dulce.</strong> Dulce no guarda la foto ni el resultado en sus
          servidores. El relay solo conserva un recuento de cuántas fotos ha usado tu dispositivo
          ese día, para aplicar el límite diario; el recuento se borra a los dos días.
        </li>
        <li>
          <strong>Qué guardas tú.</strong> La estimación se introduce en el campo de carbohidratos y los nombres de los alimentos en la nota de la entrada; si has activado los campos opcionales de nutrición, los valores de proteínas, grasas y calorías también se introducen en ellos. Puedes cambiarlo todo antes de guardar.
          Lo que guardas es una entrada normal del diario y se trata como cualquier otra entrada
          del diario (apartados 2.2 y 2.6).
        </li>
        <li>
          <strong>Qué conserva Anthropic.</strong> Anthropic borra las entradas y salidas de su API
          en un plazo de 30 días. Si sus sistemas automáticos de seguridad marcan una solicitud
          como posible infracción de su política de uso, puede conservar esa entrada y esa salida
          hasta 2 años, y las puntuaciones de clasificación de seguridad hasta 7 años. Anthropic no
          usa estos datos para entrenar sus modelos.
        </li>
      </ul>
      <p>
        Fotografía solo tu comida, no a personas ni documentos.
      </p>
      <p>
        <strong>Base jurídica:</strong> tu consentimiento (art. 6.1.a RGPD) y, cuando una foto
        pueda revelar información sobre tu salud, tu consentimiento explícito (art. 9.2.a RGPD),
        que la app te pide antes de la primera foto. Puedes retirarlo en cualquier momento
        simplemente dejando de usar la función. Anthropic trata la foto en Estados Unidos
        (apartado 8).
      </p>

      <h2 id="purpose">3. Para qué usamos tus datos</h2>
      <ul>
        <li>
          Mostrar tu glucosa en tus dispositivos y, si tú lo decides, en los de tus
          seguidores.
        </li>
        <li>Entregarte las alertas que configuras.</li>
        <li>
          Conservar el historial de tu gráfica para que tu gráfica y la de tus seguidores sean la
          misma, también después de cerrar sesión, reinstalar o cambiar de teléfono, y compartir tu diario
          con la familia que invitaste (Dulce Pro, con tu consentimiento; apartado 2.6).
        </li>
        <li>
          Si así lo decides, estimar los carbohidratos de una comida a partir de una foto que haces
          (apartado 2.8).
        </li>
        <li>Validar tu suscripción y desbloquear las funciones Pro.</li>
        <li>
          Si guardaste un email de contacto, responder a tus consultas de soporte y escribirte sobre
          tu instalación o tu suscripción (apartado 2.7).
        </li>
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
          datos de salud cuando conectas tu sensor en la app y usas las funciones relacionadas
          (lecturas en directo, alertas, Actividad en directo, widgets, reloj y seguimiento
          familiar). Lo das al conectar tu sensor, después de que la app te haya explicado qué hace
          Dulce y enlazado esta política. Puedes retirarlo cuando quieras cerrando sesión en tu
          cuenta del sensor en Dulce, lo que detiene el tratamiento en el relay (salvo la recogida
          de tu historial guardado de la gráfica mientras no estás, si la aceptaste; apartado 2.6),
          usando Eliminar cuenta o escribiéndonos.
        </li>
        <li>
          <strong>Consentimiento explícito</strong> (art. 9.2.a RGPD) para el historial guardado
          de la gráfica, la recogida mientras tienes la sesión cerrada o la app está eliminada, y
          el uso compartido del diario: se pide en la app, para cada cuenta del sensor, antes de
          empezar a guardar, y puedes retirarlo en cualquier momento en Ajustes (apartado 2.6).
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
          <strong>Consentimiento</strong> (art. 6.1.a RGPD): también para la medición de
          anuncios opcional descrita en el apartado 2.2.2; puedes retirarlo cuando quieras en
          Ajustes.
        </li>
        <li>
          <strong>Consentimiento</strong> (art. 6.1.a RGPD): para el email de contacto opcional
          del apartado 2.7; puedes quitarlo cuando quieras en la app.
        </li>
        <li>
          <strong>Consentimiento</strong> (art. 6.1.a RGPD) y, cuando una foto pueda revelar
          información sobre tu salud, <strong>consentimiento explícito</strong> (art. 9.2.a RGPD):
          para la estimación opcional de carbohidratos con una foto del apartado 2.8; se pide en la
          app antes de la primera foto y puedes retirarlo cuando quieras dejando de usar la función.
        </li>
        <li>
          <strong>Interés legítimo</strong> (art. 6.1.f RGPD): seguridad básica del sitio y
          respuesta a las consultas que nos envías mediante el formulario de contacto o por email.
          Analítica web: tu consentimiento donde nuestra Política de Cookies lo pide (en el EEE, el
          Reino Unido y Suiza, o cuando no podemos saber dónde estás) y, en otros lugares, nuestro
          interés legítimo en entender cómo se usa el sitio.
        </li>
      </ul>

      <h2 id="health">5. Datos de categoría especial (art. 9 RGPD)</h2>
      <p>
        Las lecturas de glucosa y otros datos de salud son <strong>categorías especiales</strong>{" "}
        de datos personales. Nuestro enfoque:
      </p>
      <ul>
        <li>
          Tu historial de glucosa a largo plazo, tu diario y los datos de Apple Salud o Health
          Connect se procesan y almacenan en tu dispositivo. El relay también procesa las lecturas recientes como se
          explica arriba. Si usas Dulce Pro y aceptas el historial guardado de la gráfica, tu
          historial de glucosa, y tu diario mientras lo compartas con tu familia, también se
          guardan en el relay (apartado 2.6).
        </li>
        <li>
          Cuando conectas tu CGM, el relay procesa las lecturas recientes necesarias para las
          funciones en segundo plano y de seguimiento que uses; conserva una ventana breve y,
          solo para los suscriptores de Dulce Pro que lo aceptan, el historial guardado de la
          gráfica descrito en 2.6.
        </li>
        <li>
          Si usas la estimación de carbohidratos con una foto, la foto de la comida pasa por el
          relay hasta Anthropic solo para obtener la estimación, sin tus lecturas de glucosa ni
          otros datos de salud (apartado 2.8).
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
          Excepción: mientras Dulce siga recogiendo tu historial guardado de la gráfica después de
          que cierres sesión o elimines la app (apartado 2.6), la credencial del sensor necesaria
          para ello (token de sesión de LibreLinkUp, token del sitio de Nightscout, tokens de
          acceso de Medtronic CareLink o la contraseña cifrada de Dexcom) se conserva solo para eso
          y se borra cuando termina la recogida, como muy tarde al cabo de 1 año.
        </li>
        <li>
          <strong>Historial guardado de la gráfica y diario compartido (Dulce Pro):</strong>{" "}
          mientras tu suscripción esté activa, como máximo 1 año aproximadamente; los días más
          antiguos se eliminan automáticamente. Se borran de inmediato cuando desactivas el
          guardado, eliges «Parar y borrar» al cerrar sesión o usas Eliminar cuenta (el diario
          compartido, también cuando desactivas el uso compartido del diario); se borran 90 días
          después de que tu suscripción termine o se reembolse.
        </li>
        <li>
          <strong>Email de contacto:</strong> hasta que lo quites en la app, uses Eliminar cuenta
          o nos pidas que lo borremos (apartado 2.7).
        </li>
        <li>
          <strong>Estimación de carbohidratos con una foto:</strong> Dulce no guarda la foto ni el
          resultado en sus servidores; el recuento diario de fotos se borra a los dos días.
          Anthropic borra la foto y el resultado en un plazo de 30 días, salvo en los casos
          descritos en el apartado 2.8.
        </li>
        <li>
          <strong>Copias de seguridad:</strong> los datos borrados del relay pueden permanecer
          hasta 30 días en las copias de seguridad automáticas de la base de datos de nuestro
          proveedor de alojamiento; después se sobrescriben. Solo usamos esas copias para
          recuperarnos de un fallo.
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
        cuenta bajo contrato; Abbott, Dexcom, Medtronic, Apple y Google también prestan servicios sujetos
        a sus propias condiciones y políticas de privacidad:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> — aloja el relay de Dulce descrito arriba y guarda el
          historial guardado de la gráfica y el diario compartido (apartado 2.6) y el email de
          contacto opcional (apartado 2.7), como encargado del tratamiento.
        </li>
        <li>
          <strong>Anthropic (Anthropic, PBC, Estados Unidos)</strong> — proveedor de servicios de
          inteligencia artificial que estima los carbohidratos de una foto de comida cuando usas
          «Estimar carbohidratos con una foto» (apartado 2.8), como encargado del tratamiento.
        </li>
        <li>
          <strong>Apple</strong> — notificaciones push (APNs), Live Activities, Apple Salud
          (en el dispositivo), pagos y, si usas el Llavero de iCloud, la conservación de tu clave
          de historial en tu propio Llavero de iCloud (apartado 2.6).
        </li>
        <li>
          <strong>Google Firebase</strong> — notificaciones push en Android.
        </li>
        <li>
          <strong>Google Health Connect</strong> — el almacén de datos de salud de Android; Dulce
          lo lee solo en tu dispositivo.
        </li>
        <li>
          <strong>Google Analytics 4 (Google Ireland Ltd.)</strong> — analítica web según la
          configuración regional de consentimiento descrita en la Política de Cookies.
        </li>
        <li>
          <strong>RevenueCat</strong> — validación de suscripciones (solo ID seudónimo).
        </li>
        <li>
          <strong>Meta (Meta Platforms Ireland Ltd.)</strong> — solo si permites la medición de
          anuncios en la app (apartado 2.2.2).
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
        <li>
          <strong>Medtronic (CareLink)</strong> — si conectas CareLink, tu dispositivo y nuestro relay se conectan al servicio de Medtronic mediante tokens de acceso para obtener tus lecturas. Se aplican las condiciones de privacidad de Medtronic.
        </li>
        <li>
          <strong>Nightscout</strong> — si conectas Nightscout, tu dispositivo y nuestro relay obtienen las lecturas del sitio que gestionas o eliges. Quien aloja ese sitio es responsable de él.
        </li>
      </ul>
      <p>
        Nunca vendemos, alquilamos ni cedemos tus datos a terceros con fines publicitarios o
        comerciales. Lo único relacionado con publicidad que se comparte es la medición de
        anuncios opcional del apartado 2.2.2, que sigue desactivada salvo que la permitas.
      </p>

      <h2 id="transfers">8. Transferencias internacionales</h2>
      <p>
        Algunos proveedores y servicios que usamos (Cloudflare, Anthropic, RevenueCat, Resend,
        Vercel, Meta, Apple y Google) pueden tratar datos en EE. UU. u otros países. Cuando el RGPD exige
        garantías para una transferencia, el mecanismo aplicable depende del proveedor y del
        servicio, y puede incluir una decisión de adecuación o las Cláusulas Contractuales Tipo
        (SCC) de la Comisión Europea. Google LLC figura como participante activo del Marco de
        Privacidad de Datos UE-EE. UU., dentro del alcance de su certificación. Escríbenos para
        consultar los detalles y obtener copia de las garantías aplicables en{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
      <p>
        El historial guardado de la gráfica y las entradas del diario compartido se guardan en una
        base de datos de nuestro proveedor de alojamiento Cloudflare, que puede tratar datos en la
        UE y en otros países con las garantías descritas arriba.
      </p>
      <p>
        Las fotos de comidas que envías para estimar los carbohidratos (apartado 2.8) las trata
        Anthropic en Estados Unidos conforme a su Anexo de Tratamiento de Datos (Data Processing
        Addendum), que incluye las Cláusulas Contractuales Tipo de la Comisión Europea y su anexo
        para el Reino Unido.
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
        los registros activos del relay, incluidos tu historial guardado de la gráfica y tu
        diario compartido; también borra la clave de historial de Dulce de tu Llavero de iCloud,
        así que Dulce empezará un historial nuevo en tus otros iPhone. También puedes desactivar
        el historial guardado de la gráfica en Ajustes, lo que borra la copia guardada de
        inmediato, y desactivar por separado el uso compartido del diario, lo que borra la copia
        del diario compartido. La app no tiene un botón para exportar el historial guardado;
        escríbenos y te enviaremos una copia en un formato electrónico de uso común (por ejemplo,
        CSV). El marcador mínimo de instalación descrito arriba permanece hasta que solicites su
        borrado. Puedes ejercer cualquiera de estos derechos escribiendo a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Como Dulce no tiene
        cuentas, incluye tu ID de soporte (en la app: Ajustes › Cuenta › ID de soporte) o el email
        de contacto que guardaste, si los tienes; si no, te pediremos otra información que nos
        permita encontrar tus datos, y solo podemos actuar sobre los datos que podamos
        identificar. Respondemos en el plazo de un mes. Si la solicitud es compleja o recibimos
        muchas solicitudes, el RGPD permite ampliarlo hasta dos meses más; te explicaremos
        cualquier ampliación durante el primer mes.
      </p>
      <p>
        Si un usuario de Dulce ha fallecido, un familiar cercano o un heredero puede pedirnos que
        borremos sus datos y detengamos cualquier recogida de su historial; le pediremos una
        prueba razonable.
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
        Dulce no está dirigida a menores de 14 años. En Android, Dulce está pensada para adultos de 18 años o más. Un padre, madre o tutor legal puede usar
        Dulce para seguir la glucosa de un menor bajo su propia responsabilidad; en ese caso, es
        el padre, la madre o el tutor quien da o niega el consentimiento para el historial
        guardado de la gráfica y el uso compartido del diario. Si tienes entre 14 y 18 años,
        necesitas el consentimiento de tu padre, madre o tutor legal para usar Dulce (Términos de
        uso, apartado 4), y eso incluye el historial guardado de la gráfica, el uso compartido del
        diario y el email de contacto. La estimación de carbohidratos con una foto (apartado 2.8)
        está disponible para todas las personas que pueden usar Dulce según los Términos de uso,
        incluidos los usuarios de iPhone de entre 14 y 18 años que cuenten con ese
        consentimiento. Si crees que
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
        Si hacemos cambios sustanciales, te avisamos antes de que se apliquen: en la app (en la
        nota «Novedades» de la actualización que los trae y en un aviso que enlaza esta página) y,
        si guardaste un email de contacto, por email. Esta página muestra la fecha de la versión
        actual, un breve resumen de lo que cambia y un enlace a la versión anterior. Si un cambio
        necesita tu consentimiento, por ejemplo un nuevo uso de tus datos de salud, la app te lo
        pide primero y no pasa nada nuevo hasta que respondas; las versiones de la app que no lo
        piden siguen funcionando como antes. Los cambios en el historial guardado de la gráfica
        que te quiten algo se anuncian en la app con al menos 30 días de antelación (Términos de
        uso, apartados 8.1 y 15).
      </p>

      <h2 id="contact">13. Contacto</h2>
      <p>
        Para cualquier duda sobre esta Política de Privacidad o el tratamiento de tus datos,
        escribe a <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
