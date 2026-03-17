import { MetadataRoute } from "next";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vipalpty.com";
  const now = new Date();

  const staticRoutes = ["", "/nosotros", "/servicios", "/proyectos", "/contacto", "/faq"];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: now,
  }));

  return [...staticUrls, ...serviceUrls];
}
