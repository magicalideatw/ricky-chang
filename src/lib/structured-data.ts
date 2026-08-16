import { siteConfig } from "@/lib/site-config";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    alternateName: ["Ricky Chang", "張煜晟"],
    url: siteConfig.url,
    jobTitle: [
      "Stage Magician",
      "Magic Performer",
      "Magic Creator",
      "台灣舞台魔術師",
    ],
    description: siteConfig.seo.description,
    image: `${siteConfig.url}${siteConfig.seo.ogImage}`,
    knowsAbout: [
      "舞台魔術",
      "魔術演出",
      "表演藝術",
      "晟心誠藝劇團",
    ],
    sameAs: siteConfig.socialLinks.map((link) => link.href),
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.seo.title,
    url: siteConfig.url,
    description: siteConfig.seo.description,
    inLanguage: "zh-TW",
    author: {
      "@type": "Person",
      name: siteConfig.fullName,
    },
  };
}
