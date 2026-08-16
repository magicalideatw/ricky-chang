import { getPersonJsonLd, getWebSiteJsonLd } from "@/lib/structured-data";

export function JsonLd() {
  const schemas = [getPersonJsonLd(), getWebSiteJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
