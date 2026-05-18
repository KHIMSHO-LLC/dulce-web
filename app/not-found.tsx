import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#FBF7F2",
          color: "#1A1A1A",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Página no encontrada
          </h1>
          <p style={{ color: "#595959", marginBottom: "1.5rem" }}>
            El enlace que has seguido es incorrecto o la página ha sido movida.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.25rem",
              background: "#C2410C",
              color: "white",
              borderRadius: 16,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
