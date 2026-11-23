import { Link } from "@/i18n/navigation";

{/* Texto que prevalece. Decisiones de redacción y puntos abiertos: DULCE/plans/legal-answers-2026-11-16.md. */}
export function TermsEs() {
  return (
    <>
      <p>
        Estos Términos de Uso regulan el acceso y uso del sitio web{" "}
        <strong>dulceglucosa.com</strong> y de la aplicación móvil Dulce (en conjunto, el
        “Servicio”). Al usar el Servicio aceptas estos términos. Si no los aceptas, no uses el
        Servicio.
      </p>

      <blockquote>
        <p>
          ⚠️ Dulce <strong>no es un dispositivo médico</strong>. No diagnostica, trata, cura
          ni previene ninguna enfermedad. Las decisiones sobre tu tratamiento deben tomarse
          siempre con tu equipo médico.
        </p>
      </blockquote>

      <h2 id="acceptance">1. Aceptación</h2>
      <p>
        Al descargar la app, conectar tu cuenta de CGM o usar cualquier parte del Servicio,
        confirmas que has leído, entiendes y aceptas estos términos y nuestra{" "}
        <Link href="/legal/privacy">Política de Privacidad</Link>.
      </p>

      <h2 id="service">2. Descripción del Servicio</h2>
      <p>
        Dulce es una aplicación de acompañamiento para personas con diabetes (especialmente
        tipo 1) y sus cuidadores. El Servicio permite, entre otras cosas:
      </p>
      <ul>
        <li>
          Ver los datos de glucosa de FreeStyle Libre a través de LibreLinkUp (Abbott), de
          Dexcom G6, G7 y ONE+ a través de Dexcom Share, de sistemas de Medtronic a través de
          Medtronic CareLink, o de un sitio de Nightscout.
        </li>
        <li>
          Mostrar tu glucosa en la pantalla de bloqueo del iPhone (Live Activity), la Dynamic
          Island, widgets de la pantalla de inicio y una app nativa para Apple Watch.
        </li>
        <li>Recibir alertas de glucosa configurables.</li>
        <li>Llevar un diario manual de comida, insulina, glucosa y notas.</li>
        <li>
          Estimar los carbohidratos de una comida a partir de una foto que haces, para que los
          revises, los corrijas si hace falta y los guardes en tu diario (ver sección 3).
        </li>
        <li>Mostrar tendencias y estadísticas basadas en tus propios datos.</li>
        <li>
          Compartir tu glucosa en tiempo real con los seguidores que invites (seguimiento
          familiar).
        </li>
        <li>
          Guardar tu historial de glucosa y compartir tu diario con los seguidores que invites,
          para que tu gráfica y la suya sean la misma (Dulce Pro, con tu consentimiento; ver
          sección 8.1).
        </li>
      </ul>
      <p>
        Algunas funciones requieren una suscripción <strong>Dulce Pro</strong> (ver sección
        8).
      </p>
      <p>
        “Estimar carbohidratos con una foto” tiene un límite diario de fotos que depende de tu
        plan, y puede no estar disponible en algunos países o en algunos momentos.
      </p>

      <h2 id="medical">3. Aviso médico</h2>
      <p>
        Dulce <strong>no</strong> es un dispositivo médico ni un sustituto del criterio
        profesional. El Servicio no recomienda dosis de insulina, no diagnostica ni trata
        ninguna condición, y no debe usarse para tomar decisiones clínicas en lugar de tu
        endocrino, tu médico de cabecera u otros profesionales sanitarios.
      </p>
      <p>
        Los datos de glucosa que muestra Dulce provienen de tu CGM a través de servicios de
        terceros y están sujetos a sus limitaciones técnicas, retrasos de lectura y posibles
        errores. Sigue las instrucciones del fabricante de tu CGM sobre cuándo confirmar una
        lectura con un medidor de glucosa, también si no coincide con tus síntomas o expectativas.
      </p>
      <p>
        <strong>No dependas de Dulce como tu único sistema de alarma.</strong> La entrega de
        notificaciones, Live Activities y actualizaciones del reloj depende de Apple, del
        fabricante de tu CGM, de tu red y de los ajustes de tu dispositivo, y no puede
        garantizarse. Mantén activas las alarmas de la app oficial de tu sistema CGM. Dulce
        es una app complementaria y no sustituye la app oficial del fabricante.
      </p>
      <p>
        Esto se aplica a todas las alertas de Dulce, también a las que se repiten mientras un valor
        sigue fuera de rango y al aviso de que no llegan lecturas nuevas. Que Dulce no te avise de
        que las lecturas se han detenido no significa que tu sensor o su conexión funcionen.
      </p>
      <p>
        El historial guardado de la gráfica, el diario compartido, las estadísticas y las
        gráficas de Dulce no son un historial médico. No los uses, ni ninguna otra parte de
        Dulce, para tomar decisiones de tratamiento.
      </p>
      <p>
        Las cifras de carbohidratos de “Estimar carbohidratos con una foto” las genera un modelo
        de inteligencia artificial. Son estimaciones y pueden ser erróneas: revísalas antes de
        guardarlas o de basarte en ellas. Son información sobre la comida de la foto, que tú
        guardas como una entrada de tu propio diario. Dulce no da consejos de alimentación, de
        dosificación ni de tratamiento, y no calcula dosis de insulina.
      </p>

      <h2 id="eligibility">4. Requisitos</h2>
      <p>
        Para usar el Servicio debes tener al menos 14 años. Si tienes entre 14 y 18,
        necesitas el consentimiento de tu padre, madre o tutor legal. Si gestionas una cuenta
        en nombre de un menor, eres responsable de hacerlo conforme a la ley aplicable. En Android, debes tener al menos 18 años para usar Dulce y la opción de consentimiento anterior no se aplica. Un padre, madre o tutor legal puede seguir usando Dulce en Android para seguir la glucosa de un menor.
      </p>

      <h2 id="accounts">5. Cuentas y credenciales</h2>
      <p>
        Dulce se conecta a tus datos de CGM a través de tu cuenta de{" "}
        <strong>LibreLinkUp</strong> para FreeStyle Libre, <strong>Dexcom Share</strong> para
        Dexcom o <strong>Medtronic CareLink</strong> para Medtronic, o a un sitio de{" "}
        <strong>Nightscout</strong>. Eres responsable de la confidencialidad de esas
        credenciales. Dulce las guarda en el llavero seguro de tu dispositivo, con estas
        excepciones, explicadas en la{" "}
        <Link href="/legal/privacy">Política de Privacidad</Link>: con Dexcom y “Mantener la
        sesión iniciada”, tu contraseña también se guarda, cifrada, en nuestro relay; con
        Medtronic CareLink, nuestro relay guarda los tokens de acceso que emite Medtronic, nunca
        tu contraseña; y mientras Dulce siga recogiendo tu historial guardado de la gráfica
        después de que cierres sesión o elimines la app (sección 8.1), nuestro relay conserva la
        credencial del sensor necesaria para ello. No podemos recuperar credenciales perdidas en
        nombre del proveedor de tu CGM. Debes tener derecho a usar la cuenta que conectas.
      </p>

      <h2 id="sharing">6. Seguimiento familiar</h2>
      <p>
        Tú decides quién puede seguir tu glucosa, enviándole una invitación. Eres responsable
        de elegir a tus seguidores y puedes revocar su acceso en cualquier momento. Los
        seguidores no deben usar Dulce como sistema de monitorización de emergencias: la
        entrega de lecturas y alertas a seguidores está sujeta a las mismas limitaciones de
        la sección 3. El historial guardado de la gráfica puede tener huecos, y los seguidores
        pueden ver menos que tú. Si compartes tu diario, tus seguidores ven todo lo que contiene,
        incluidas tus notas de texto libre; no escribas información sobre otras personas en las
        notas que compartas.
      </p>

      <h2 id="license">7. Licencia</h2>
      <p>
        Te concedemos una licencia limitada, no exclusiva, intransferible y revocable para
        usar Dulce conforme a estos términos y para uso personal, no comercial.
      </p>

      <h2 id="subscriptions">8. Suscripciones (Dulce Pro)</h2>
      <p>
        La app es gratuita de descargar y usar con sus funciones básicas. Algunas funciones
        (como la Live Activity de la pantalla de bloqueo, las actualizaciones en tiempo real
        del Apple Watch, las alertas de glucosa, el seguimiento familiar y el historial
        guardado de la gráfica) requieren una
        suscripción auto-renovable <strong>Dulce Pro</strong>:
      </p>
      <ul>
        <li>
          Disponible en plan <strong>mensual</strong> o <strong>anual</strong>. El precio
          exacto se muestra siempre en el App Store y en la pantalla de compra antes de
          confirmar.
        </li>
        <li>
          Los nuevos suscriptores pueden tener una <strong>prueba gratuita</strong>{" "}
          (actualmente 14 días). Al terminar la prueba, la suscripción se renueva al precio
          mostrado salvo que canceles con al menos 24 horas de antelación.
        </li>
        <li>
          El pago se carga a tu ID de Apple. Las suscripciones se renuevan automáticamente
          salvo que las canceles al menos 24 horas antes del final del periodo en curso, en{" "}
          <strong>Ajustes → ID de Apple → Suscripciones</strong> de tu dispositivo.
        </li>
        <li>Los reembolsos los gestiona Apple según sus condiciones.</li>
        <li>
          Nada de estos términos limita los derechos imperativos de consumidor que te
          correspondan. Para consultar las fechas de prueba y las opciones de cancelación,
          renovación y reembolso, sigue la pantalla de compra y las condiciones y herramientas
          de suscripción vigentes de Apple.
        </li>
      </ul>

      <h3>8.1 Historial guardado de la gráfica (Dulce Pro)</h3>
      <p>
        El historial guardado de la gráfica forma parte de Dulce Pro. Solo se usa si lo aceptas
        en la app, y puedes desactivarlo en cualquier momento. Nuestra{" "}
        <Link href="/legal/privacy">Política de Privacidad</Link> (apartado 2.6) explica qué se
        guarda, quién puede verlo y cómo borrarlo.
      </p>
      <p>
        Intentamos guardar tu historial de forma completa, pero no garantizamos que esté completo,
        sea continuo, sea correcto o esté siempre disponible. Depende de la sesión de tu sensor y
        de terceros (el servicio del fabricante de tu sensor, Apple, Google y nuestro proveedor de
        alojamiento), y puede tener huecos o perderse. No es un historial médico ni una copia de
        seguridad: no confíes en él para ninguna decisión de tratamiento, y conserva los registros
        que necesites en la app oficial del fabricante de tu sensor. La sección 3 se le aplica
        íntegramente.
      </p>
      <p>
        Conservamos como máximo 1 año de historial aproximadamente. Si tu suscripción termina o se
        reembolsa, el guardado se detiene y tu historial guardado se borra 90 días después; si
        vuelves a suscribirte dentro de ese plazo, vuelve a estar disponible. Las funciones
        gratuitas siguen funcionando con los datos de tu dispositivo.
      </p>
      <p>
        Cerrar sesión o eliminar la app no borra por sí solo tu historial guardado. Si lo
        aceptaste, Dulce sigue recogiendo tu historial mientras tienes la sesión cerrada o la app
        está eliminada, y conserva la credencial del sensor necesaria para ello (con Dexcom y
        “Mantener la sesión iniciada”, tu contraseña, cifrada) hasta que termina la recogida. La
        recogida termina cuando vuelves a iniciar sesión, la desactivas, eliges “Parar y borrar”
        al cerrar sesión, usas Eliminar cuenta, termina tu suscripción, el servicio de tu sensor
        rechaza el inicio de sesión o sigue fallando, o ha pasado 1 año.
      </p>
      <p>
        Si compartes tu diario, tus seguidores ven todo lo que contiene, incluidas las notas de
        texto libre. Eres responsable de lo que escribes en las notas que compartes, incluida la
        información sobre otras personas. Puedes desactivar el uso compartido en cualquier
        momento, lo que borra la copia compartida.
      </p>
      <p>
        Podemos cambiar, limitar o suspender esta función, por ejemplo para proteger el Servicio,
        por motivos legales, para controlar su coste o porque el servicio de un fabricante de
        sensores ya no lo permite. Si la suspendemos, o la cambiamos de forma que te quite algo
        (por ejemplo, un historial más corto), te avisaremos en la app con al menos 30 días
        de antelación, salvo que un motivo de seguridad, legal o de un tercero ajeno a nuestro
        control lo impida; durante ese plazo tu historial guardado seguirá visible en la app y
        podrás pedirnos una copia por correo. Lo que te corresponde en ese caso se describe en la
        sección 10.
      </p>

      <h2 id="prohibited">9. Conductas prohibidas</h2>
      <p>No puedes:</p>
      <ul>
        <li>Usar el Servicio con fines ilícitos o vulnerando derechos de terceros.</li>
        <li>Intentar acceder a sistemas, datos o cuentas sin autorización.</li>
        <li>
          Hacer ingeniería inversa o eludir medidas técnicas de protección, salvo en la
          medida permitida por la ley.
        </li>
        <li>Automatizar envíos masivos de formularios o hacer spam a nuestra infraestructura.</li>
      </ul>

      <h2 id="third-parties">10. Servicios de terceros y conexiones con sensores</h2>
      <p>
        Dulce se conecta a servicios de terceros que tú eliges o que son necesarios para
        funcionar: los servicios de los fabricantes de sensores LibreLinkUp (Abbott), Dexcom
        Share y Medtronic CareLink, y los sitios de Nightscout gestionados por ti o por quien tú
        elijas; Apple (incluidos Apple Salud, notificaciones y pagos); Google (notificaciones y
        pagos en Android); Cloudflare, que aloja nuestro relay; Anthropic, que
        estima los carbohidratos de las fotos de comidas cuando usas esa función; y RevenueCat
        para la validación
        de suscripciones. El uso de esos servicios se rige por sus propios términos y políticas.
        No somos responsables de su disponibilidad, exactitud o cambios.
      </p>
      <p>
        Dulce lee tus datos de glucosa a través de los propios servicios en línea de los
        fabricantes de sensores. Algunas de estas conexiones usan interfaces que no son
        oficiales, no están documentadas o no se ofrecen para apps como Dulce (por ejemplo,
        Medtronic CareLink). Las empresas que las gestionan pueden cambiarlas, limitarlas,
        bloquearlas o cerrarlas en cualquier momento, sin avisarnos a nosotros ni a ti. Si eso
        ocurre, Dulce puede dejar de funcionar, en todo o en parte, para ese sensor, de forma
        temporal o definitiva: lecturas en tiempo real, alertas, la pantalla de bloqueo, widgets
        y reloj, seguimiento familiar, historial guardado de la gráfica y recogida mientras no
        estás. No podemos evitarlo, y puede que no podamos solucionarlo ni recuperar los datos
        que falten. Haremos esfuerzos razonables para restablecer la conexión y avisarte en la
        app, pero no podemos prometer que lo consigamos.
      </p>
      <p>
        En ese caso: Dulce Pro lo factura Apple (o Google Play, si te suscribiste en Android), y
        los reembolsos los deciden ellos según sus normas; nosotros no podemos emitir reembolsos.
        Puedes cancelar en cualquier momento en los ajustes de suscripción del App Store o de
        Google Play para que la suscripción no se renueve, y puedes pedir un reembolso a Apple o
        a Google. Nada de esta sección limita los derechos imperativos del consumidor que te
        correspondan, incluidas las medidas correctoras previstas por la ley cuando un servicio
        digital de pago no funciona según lo acordado (contenidos o servicios digitales no
        conformes).
      </p>
      <p>
        Dulce es un producto independiente y no está afiliado, avalado ni patrocinado por
        Abbott, Dexcom, Medtronic, el proyecto Nightscout, Apple ni Google. Sus nombres y los
        nombres de sus productos son marcas de sus respectivos titulares y se usan solo para
        describir la compatibilidad.
      </p>

      <h2 id="ip">11. Propiedad intelectual</h2>
      <p>
        El Servicio, incluidos el código, el diseño, la marca y los contenidos publicados por
        nosotros, pertenece a Dulce y sus licenciantes. Los datos que tú aportas (tu diario,
        tus ajustes) siguen siendo tuyos.
      </p>

      <h2 id="disclaimers">12. Exclusión de garantías</h2>
      <p>
        El Servicio se presta “tal cual” y “según disponibilidad”. En la máxima medida
        permitida por la legislación aplicable, no garantizamos que el Servicio ni ninguna de
        sus partes (incluidas las lecturas, alertas, alertas repetidas, el aviso de que no llegan
        lecturas, Live Activities, widgets, actualizaciones
        del reloj, historial guardado de la gráfica, seguimiento familiar, uso compartido del
        diario y estimaciones de carbohidratos con fotos) sea ininterrumpido, puntual, completo, esté libre de errores o sea 100 % seguro,
        que no se pierdan datos, ni que cumpla expectativas concretas. Esto es especialmente
        relevante para los datos de servicios de CGM de terceros: cualquier retraso, error o
        ausencia de datos del proveedor original puede reflejarse en Dulce. Esto no afecta a
        los derechos que la ley te reconoce como consumidor.
      </p>

      <h2 id="liability">13. Limitación de responsabilidad</h2>
      <p>
        Dulce es un complemento de tu sistema CGM, no un dispositivo médico. En la máxima medida
        permitida por la legislación aplicable:
      </p>
      <ul>
        <li>
          No somos responsables de los daños o pérdidas derivados de decisiones sobre insulina,
          medicación, alimentación, actividad física o atención médica tomadas a partir de la
          información que muestra Dulce, ni de confiar en Dulce en lugar de tu sistema CGM, su app
          oficial y sus alarmas, un medidor de glucosa en sangre o tu equipo médico.
        </li>
        <li>
          No somos responsables de que las lecturas, alertas (también las repetidas y el aviso de
          que no llegan lecturas), Live Activities, widgets,
          actualizaciones del reloj, el historial guardado de la gráfica, el seguimiento familiar
          o el uso compartido del diario lleguen tarde, estén incompletos, sean incorrectos, no
          estén disponibles o se pierdan cuando ello se deba a las causas descritas en las
          secciones 3, 8.1 y 10 (incluidos tu dispositivo, tu red y tu sistema operativo, y los
          servicios del fabricante de tu sensor, Apple o Google) o a otras circunstancias fuera
          de nuestro control razonable.
        </li>
        <li>
          No somos responsables de daños indirectos o consecuenciales, lucro cesante ni pérdida
          de datos. El historial guardado de la gráfica no es una copia de seguridad.
        </li>
        <li>
          En todos los demás casos, nuestra responsabilidad total por todas las reclamaciones
          relacionadas con el Servicio se limita al importe que hayas pagado por Dulce Pro en los
          12 meses anteriores al hecho que dio lugar a la reclamación.
        </li>
      </ul>
      <p>
        Ninguna de estas limitaciones se aplica a nuestra responsabilidad, y nada en estos
        términos la excluye ni la limita, por dolo o culpa grave; por muerte o daños personales
        causados por negligencia; por fraude; conforme a la normativa imperativa de
        responsabilidad por productos defectuosos; ni a cualquier otra responsabilidad, o
        cualquier derecho del consumidor (incluidos los derechos que la ley te reconoce ante
        contenidos o servicios digitales no conformes), que no pueda excluirse ni limitarse
        conforme a la ley que te sea aplicable. Cuando esa ley solo permita una limitación en
        parte, esta se aplica únicamente en esa medida.
      </p>

      <h2 id="indemnity">14. Indemnización</h2>
      <p>
        Te comprometes a indemnizar a Dulce frente a reclamaciones de terceros derivadas de
        un uso del Servicio que incumpla estos términos o la ley.
      </p>

      <h2 id="changes">15. Cambios en el Servicio o en estos términos</h2>
      <p>
        Podemos modificar el Servicio y estos términos para reflejar nuevas funciones,
        requisitos legales o consideraciones de seguridad. Cuando un cambio sea sustancial, te
        avisamos antes de que se aplique: en la app (en la nota «Novedades» de la actualización y
        en un aviso que enlaza el texto nuevo) y, si guardaste un email de contacto, por email.
        Esta página muestra la fecha, un breve resumen de lo que cambia y un enlace a la versión
        anterior.
      </p>
      <p>
        Los cambios que quiten algo a Dulce Pro, incluido el historial guardado de la gráfica, se
        anuncian en la app con al menos 30 días de antelación, salvo que un motivo de seguridad,
        legal o de un tercero ajeno a nuestro control lo impida (apartado 8.1). Si un cambio así te
        afecta de forma más que leve, puedes terminar tu suscripción sin coste en los 30 días
        siguientes al cambio o a nuestro aviso, lo que ocurra más tarde: cancélala en los ajustes
        de suscripción de App Store o Google Play y pide a Apple o a Google el reembolso del
        periodo no usado; si te lo niegan, escríbenos. Seguir usando Dulce después de un cambio no
        significa que renuncies a ningún derecho que te reconozca la normativa de consumo.
      </p>

      <h2 id="termination">16. Terminación</h2>
      <p>
        Puedes dejar de usar el Servicio en cualquier momento y borrar tus datos desde{" "}
        <strong>Ajustes → Eliminar cuenta</strong>. Cerrar sesión o eliminar la app no borra
        por sí solo tu historial guardado de la gráfica ni, si lo aceptaste, impide que Dulce lo
        siga recogiendo (sección 8.1). Podemos suspender o cancelar tu acceso si
        incumples estos términos o comprometes la seguridad o legalidad del Servicio.
      </p>

      <h2 id="law">17. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por la legislación del país en el que está establecido el
        operador del Servicio. Si eres consumidor, esto no te priva de la protección de las
        normas imperativas del país en el que resides habitualmente, y puedes acudir a los
        tribunales de tu lugar de residencia.
      </p>

      <h2 id="contact">18. Contacto</h2>
      <p>
        Para cualquier duda sobre estos términos, escribe a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
