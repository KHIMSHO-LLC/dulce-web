{/* TODO: Revisión legal por un abogado sanitario antes del lanzamiento público. */}
export function DisclaimerEs() {
  return (
    <>
      <p>
        Este Aviso Médico explica los límites de lo que Dulce puede hacer por ti. Léelo con
        atención: usar la aplicación implica que entiendes y aceptas lo que se describe aquí.
      </p>

      <blockquote>
        <p>
          Dulce <strong>no es un dispositivo médico</strong>. No está diseñada para
          diagnosticar, tratar, curar ni prevenir ninguna enfermedad, ni para tomar
          decisiones de tratamiento. No sustituye a tu medidor de glucosa, a tu sistema de
          monitorización continua (MCG) ni al criterio de tu equipo sanitario.
        </p>
      </blockquote>

      <h2 id="que-es">1. Qué es Dulce y qué no es</h2>
      <p>
        Dulce es una aplicación complementaria que <strong>muestra</strong> las lecturas de
        glucosa que ya genera tu sistema de monitorización (LibreLinkUp de Abbott, Dexcom o
        tu instancia personal de Nightscout). Su función es presentar esa información de forma
        cómoda y legible. Dulce no mide la glucosa, no fabrica sensores y no controla ningún
        dispositivo médico.
      </p>
      <p>
        La fuente oficial y autorizada de tus datos es siempre la aplicación del fabricante de
        tu MCG y los avisos de seguridad de ese sistema. Si Dulce y la aplicación del
        fabricante muestran algo distinto, <strong>la del fabricante prevalece</strong>.
      </p>

      <h2 id="no-decisiones">2. No tomes decisiones médicas basándote solo en Dulce</h2>
      <p>
        No ajustes tu insulina, tu medicación, tu alimentación ni tu actividad física basándote
        únicamente en lo que veas en Dulce. Cualquier decisión sobre tu tratamiento debe
        tomarse siguiendo las indicaciones de tu médico o tu equipo sanitario y con las
        herramientas que ellos te hayan indicado.
      </p>

      <h2 id="confirma">3. Confirma siempre con una punción capilar</h2>
      <p>
        Antes de actuar ante una lectura alta o baja —y especialmente si lo que ves no encaja
        con cómo te sientes— confirma tu glucosa con una <strong>punción capilar</strong>{" "}
        (medidor de sangre). Los valores que muestra Dulce proceden de un sensor intersticial y
        pueden diferir de tu glucosa en sangre real, sobre todo cuando cambia rápidamente.
      </p>

      <h2 id="alertas">4. Las alertas no están garantizadas</h2>
      <p>
        Dulce no es un sistema de alarma de seguridad. Las notificaciones pueden retrasarse o
        no llegar por motivos que no controlamos: el teléfono apagado, en silencio, sin
        batería o sin conexión; permisos de notificación desactivados; el sistema operativo
        limitando la app en segundo plano; o una interrupción del servicio del fabricante de tu
        MCG. <strong>No dependas de Dulce para avisarte de una hipoglucemia o hiperglucemia.</strong>{" "}
        Mantén activas las alarmas del sistema oficial de tu MCG.
      </p>

      <h2 id="exactitud">5. Exactitud y retraso de los datos</h2>
      <p>
        Los datos pueden mostrarse con retraso, de forma incompleta o desactualizada debido a
        la latencia de la red, los intervalos de sincronización o el estado de los servidores
        de terceros. Cuando una lectura es antigua, Dulce intenta indicarlo, pero ninguna marca
        de tiempo sustituye a una comprobación directa. Trata todo dato como orientativo, no
        como una medición clínica en tiempo real.
      </p>

      <h2 id="sin-predicciones">6. Sin predicciones ni cálculo de dosis</h2>
      <p>
        Dulce muestra datos de forma pasiva. No predice hacia dónde irá tu glucosa, no calcula
        dosis de insulina ni de carbohidratos, y no ofrece consejos clínicos. Si en el futuro
        añadimos funciones de este tipo, irán acompañadas de la información y las advertencias
        que correspondan.
      </p>

      <h2 id="emergencias">7. Emergencias</h2>
      <p>
        Dulce no atiende emergencias. Si sospechas una hipoglucemia o hiperglucemia grave, o
        ante cualquier urgencia médica, sigue tu plan de tratamiento y contacta con los
        servicios de emergencia (<strong>112</strong> en España) o con tu profesional sanitario.
      </p>

      <h2 id="equipo-sanitario">8. Consulta a tu equipo sanitario</h2>
      <p>
        La información de esta aplicación tiene una finalidad meramente informativa y no
        constituye consejo médico. Habla con tu médico o educador en diabetes antes de cambiar
        cualquier aspecto de tu tratamiento y para resolver cualquier duda sobre tu salud.
      </p>

      <h2 id="terceros">9. Datos de proveedores externos</h2>
      <p>
        Dulce depende de servicios de terceros (Abbott / LibreLinkUp, Dexcom, Nightscout, Apple
        Salud) para obtener tus datos. No controlamos la disponibilidad, la exactitud ni la
        continuidad de esos servicios, y no nos hacemos responsables de las interrupciones o
        errores que se originen en ellos.
      </p>

      <h2 id="aceptacion">10. Aceptación</h2>
      <p>
        Al usar Dulce confirmas que has leído y comprendido este Aviso Médico y que asumes la
        responsabilidad de gestionar tu diabetes con las herramientas autorizadas y el apoyo de
        tu equipo sanitario. Si no estás de acuerdo, por favor no utilices la aplicación.
      </p>
      <p>
        Para cualquier duda sobre este aviso, escríbenos a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
