{/* TODO: Legal review by a Spanish DPO / lawyer required before public launch. */}
export function PrivacyEs() {
  return (
    <>
      <p>
        Esta Política de Privacidad explica qué datos personales recopila Dulce, cómo los
        usamos y los derechos que tienes sobre ellos. Se aplica tanto a este sitio web
        (<strong>dulceglucosa.com</strong>) como a la aplicación móvil Dulce.
      </p>

      <h2 id="responsable">1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento es <strong>Giorgio Khimshiashvili</strong>, en calidad
        de autónomo, con domicilio profesional en España. Puedes contactarnos para cualquier
        cuestión relativa a tus datos en{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="datos">2. Qué datos recogemos</h2>
      <h3>2.1 Sitio web</h3>
      <ul>
        <li>
          <strong>Lista de espera:</strong> tu correo electrónico y el idioma de tu sesión.
        </li>
        <li>
          <strong>Formulario de beta:</strong> nombre, correo electrónico, CGM que usas y
          región. Opcionalmente, notas que decidas compartir.
        </li>
        <li>
          <strong>Datos técnicos mínimos:</strong> hash anónimo (SHA-256) de tu IP junto a una
          sal rotativa diaria, usado únicamente para limitar el abuso del formulario. No
          almacenamos la IP en claro.
        </li>
        <li>
          <strong>Analítica anónima:</strong> usamos Vercel Analytics, que no instala cookies
          ni recoge identificadores personales. Solo mide páginas vistas y rendimiento.
        </li>
      </ul>
      <h3>2.2 Aplicación móvil</h3>
      <ul>
        <li>
          <strong>Datos de glucosa</strong> obtenidos en tu dispositivo desde LibreLinkUp,
          Dexcom Share o tu instancia personal de Nightscout. Las credenciales se cifran en el
          llavero seguro del sistema (Keychain en iOS, Keystore en Android).
        </li>
        <li>
          <strong>Datos de Apple Salud</strong> en modo solo-lectura, si se lo permites.
        </li>
        <li>
          <strong>Tu diario</strong>: carbohidratos, insulina, ejercicio, notas y lecturas
          manuales. Almacenado localmente.
        </li>
        <li>
          <strong>Preferencias</strong>: unidad de medida, rango objetivo, idioma, tema.
        </li>
      </ul>
      <p>
        Durante el MVP, los datos de la aplicación se almacenan en tu dispositivo y no se
        transmiten a servidores de Dulce. Cuando esto cambie (sincronización opcional en la
        nube, función de compartir con familiares), actualizaremos esta política y te
        pediremos consentimiento explícito.
      </p>

      <h2 id="finalidad">3. Para qué usamos tus datos</h2>
      <ul>
        <li>Avisarte cuando Dulce esté disponible (lista de espera).</li>
        <li>Evaluar y seleccionar participantes para la beta (formulario de beta).</li>
        <li>Proteger el sitio frente a abuso (hash de IP, rate-limit).</li>
        <li>Entender qué páginas funcionan mejor (analítica anónima).</li>
        <li>Cumplir obligaciones legales y responder a tus solicitudes de derechos.</li>
      </ul>

      <h2 id="base-legal">4. Base legal</h2>
      <ul>
        <li>
          <strong>Consentimiento</strong> (art. 6.1.a RGPD): al apuntarte a la lista o a la
          beta.
        </li>
        <li>
          <strong>Interés legítimo</strong> (art. 6.1.f RGPD): seguridad básica del sitio y
          analítica anónima.
        </li>
        <li>
          <strong>Ejecución de la relación pre-contractual</strong> (art. 6.1.b RGPD): cuando
          gestionamos tu candidatura a la beta.
        </li>
      </ul>

      <h2 id="salud">5. Datos especialmente sensibles (categorías del art. 9 RGPD)</h2>
      <p>
        Los datos de glucosa y otros datos de salud son <strong>categorías especiales</strong>{" "}
        de datos personales. Su tratamiento requiere consentimiento explícito (art. 9.2.a
        RGPD). En el MVP, estos datos:
      </p>
      <ul>
        <li>Solo se procesan en tu dispositivo.</li>
        <li>No se transmiten a servidores de Dulce.</li>
        <li>No se comparten con terceros sin tu instrucción expresa.</li>
      </ul>

      <h2 id="conservacion">6. Cuánto tiempo conservamos tus datos</h2>
      <ul>
        <li>
          <strong>Lista de espera:</strong> hasta el lanzamiento + 6 meses, o hasta que pidas
          tu baja.
        </li>
        <li>
          <strong>Formulario de beta:</strong> durante el periodo de beta + 12 meses con fines
          de soporte y mejora.
        </li>
        <li>
          <strong>Hash de IP:</strong> 30 días.
        </li>
        <li>
          <strong>Datos de la app</strong> (en tu dispositivo): hasta que los borres o
          desinstales la aplicación.
        </li>
      </ul>

      <h2 id="destinatarios">7. Con quién compartimos tus datos</h2>
      <p>
        Solo compartimos datos con los proveedores estrictamente necesarios para operar el
        servicio. Todos ellos actúan como encargados del tratamiento bajo contrato:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> (almacenamiento de listas de espera y beta) — alojado en
          la UE (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (envío del correo de confirmación de lista de espera).
        </li>
        <li>
          <strong>Vercel</strong> (hosting del sitio web y analítica anónima).
        </li>
        <li>
          En la aplicación, conexiones <strong>directas</strong> entre tu dispositivo y los
          proveedores que tú elijas: <strong>LibreLinkUp</strong> (Abbott),{" "}
          <strong>Dexcom</strong>, <strong>Nightscout</strong>, <strong>Apple</strong>{" "}
          (Salud). Esas conexiones se rigen por las políticas de privacidad de esos servicios.
        </li>
      </ul>
      <p>
        No vendemos, alquilamos ni cedemos tus datos a terceros con fines publicitarios o
        comerciales.
      </p>

      <h2 id="transferencias">8. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros encargados (Resend, Vercel) procesan datos en EE. UU. Las
        transferencias se realizan al amparo de las Cláusulas Contractuales Tipo de la
        Comisión Europea (SCC) o de programas equivalentes (DPF). Puedes solicitar copia de
        las garantías en{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="derechos">9. Tus derechos</h2>
      <p>Como interesado, tienes derecho a:</p>
      <ul>
        <li>Acceder a tus datos personales.</li>
        <li>Rectificarlos si son inexactos.</li>
        <li>Solicitar su supresión.</li>
        <li>Oponerte al tratamiento o solicitar su limitación.</li>
        <li>Portabilidad de los datos que nos has proporcionado.</li>
        <li>Retirar el consentimiento en cualquier momento.</li>
      </ul>
      <p>
        Puedes ejercer cualquiera de estos derechos escribiéndonos a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Responderemos en un plazo máximo
        de 30 días.
      </p>
      <p>
        Si consideras que el tratamiento no se ajusta a la normativa, tienes derecho a
        presentar una reclamación ante la{" "}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener"
        >
          Agencia Española de Protección de Datos (AEPD)
        </a>
        .
      </p>

      <h2 id="menores">10. Menores</h2>
      <p>
        Dulce no está dirigida a menores de 14 años. Si eres padre, madre o tutor legal y
        crees que un menor a tu cargo nos ha proporcionado datos sin tu consentimiento,
        escríbenos y los eliminaremos.
      </p>

      <h2 id="cookies">11. Cookies</h2>
      <p>
        Usamos únicamente cookies técnicas estrictamente necesarias para el funcionamiento
        del sitio (preferencia de idioma, token anti-CSRF en formularios). No usamos cookies
        de seguimiento ni publicidad. Más información en nuestra{" "}
        <a href="/legal/cookies">Política de Cookies</a>.
      </p>

      <h2 id="cambios">12. Cambios en esta política</h2>
      <p>
        Si introducimos cambios sustanciales, lo notificaremos por correo a las personas
        afectadas y publicaremos la nueva versión con su fecha de actualización en esta misma
        página.
      </p>

      <h2 id="contacto">13. Contacto</h2>
      <p>
        Para cualquier consulta relativa a esta Política de Privacidad o al tratamiento de
        tus datos, escríbenos a <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
