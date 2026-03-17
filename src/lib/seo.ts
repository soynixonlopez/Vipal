import { Metadata } from "next";

const baseUrl = "https://vipalpty.com";

const defaultKeywords = [
  "ventanas corredizas en Panama",
  "puertas de aluminio Panama",
  "fachadas de vidrio templado Panama",
  "divisiones de oficina Panama",
  "espejos decorativos Panama",
  "barandas de vidrio Panama",
  "servicios de vidrio y aluminio Panama",
];

interface SeoInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: SeoInput): Metadata {
  const url = `${baseUrl}${path}`;
  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    openGraph: {
      title,
      description,
      url,
      siteName: "Vipal S.A.",
      type: "website",
      locale: "es_PA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
