{/* Seguridad factual contrastada con Abbott y Dexcom el 2026-10-29; queda pendiente la revisión legal. */}
export function DisclaimerEs() {
  return (
    <>
      <p>
        Este Aviso Médico explica los límites de lo que Dulce puede hacer por ti. Léelo junto
        con las instrucciones de tu sistema CGM y las indicaciones de tu equipo sanitario.
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
        glucosa que ya genera tu sistema de monitorización (LibreLinkUp de Abbott o Dexcom
        Share). Su función es presentar esa información de forma
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

      <h2 id="confirma">3. Cuándo usar un medidor de glucosa</h2>
      <p>
        Sigue las instrucciones de tu sistema CGM. Usa un medidor de glucosa cuando lo indique
        el fabricante, también si una lectura no coincide con tus síntomas o expectativas, o si
        falta un valor actual o una flecha de tendencia. Dulce muestra datos de un sensor
        intersticial, que pueden diferir de la glucosa en sangre, sobre todo cuando cambia rápido.
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

      <h2 id="sin-predicciones">6. Previsiones orientativas, sin cálculo de dosis</h2>
      <p>
        Dulce no calcula dosis de insulina ni de carbohidratos y no ofrece consejos clínicos. El
        aviso opcional de previsión de bajada solo extrapola la velocidad de cambio de las
        últimas lecturas: es orientativo, puede fallar y no sustituye a las alarmas de tu sistema
        CGM ni a sus instrucciones sobre cuándo usar un medidor de glucosa.
      </p>

      <h2 id="emergencias">7. Emergencias</h2>
      <p>
        Dulce no atiende emergencias. Si sospechas una hipoglucemia o hiperglucemia grave, o
        ante cualquier urgencia médica, sigue tu plan de tratamiento y contacta con los
        servicios de emergencia (<strong>112</strong> en la UE, <strong>911</strong> en EE. UU.) o con tu profesional sanitario.
      </p>

      <h2 id="equipo-sanitario">8. Consulta a tu equipo sanitario</h2>
      <p>
        La información de esta aplicación tiene una finalidad meramente informativa y no
        constituye consejo médico. Habla con tu médico o educador en diabetes antes de cambiar
        cualquier aspecto de tu tratamiento y para resolver cualquier duda sobre tu salud.
      </p>

      <h2 id="terceros">9. Datos de proveedores externos</h2>
      <p>
        Dulce depende de servicios de terceros (Abbott / LibreLinkUp, Dexcom Share, Apple
        Salud) para obtener tus datos. No controlamos la disponibilidad, la exactitud ni la
        continuidad de esos servicios, y no nos hacemos responsables de las interrupciones o
        errores que se originen en ellos.
      </p>

      <h2 id="aceptacion">10. Dudas</h2>
      <p>
        Para cualquier duda sobre este aviso, escríbenos a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
