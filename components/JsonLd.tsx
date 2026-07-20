/**
 * Renders a JSON-LD <script> block. Server-safe; used for BlogPosting,
 * BreadcrumbList and FAQPage structured data across the marketing pages.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
