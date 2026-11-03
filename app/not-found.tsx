import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0d0c0b",
          color: "#f6f0ea",
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
            Page not found
          </h1>
          <p style={{ color: "#cfc6bd", marginBottom: "1.5rem" }}>
            The link you followed is wrong or the page has moved.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.25rem",
              background: "#f36638",
              color: "#1b0c06",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
