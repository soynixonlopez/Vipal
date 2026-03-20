import Link from "next/link";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeaturedProjectsCardsCarouselV2 } from "@/components/projects/FeaturedProjectsCardsCarouselV2";

export function GallerySection() {
  const getFileTitle = (imageSrc: string) => {
    try {
      const file = imageSrc.split("/").pop() ?? "";
      const decoded = decodeURIComponent(file);
      return decoded.replace(/\.[^/.]+$/, "");
    } catch {
      return undefined;
    }
  };

  const getLocation = (imageSrc: string) => {
    try {
      const file = imageSrc.split("/").pop() ?? "";
      const decoded = decodeURIComponent(file);
      const name = decoded.replace(/\.[^/.]+$/, "");
      if (!name.includes(",")) return undefined;
      return name.split(",")[1]?.trim();
    } catch {
      return undefined;
    }
  };

  const items = projects.slice(0, 5).map((project) => {
    const location = getLocation(project.image);
    return {
      src: project.image,
      title: project.title,
      description:
        project.id === "p3"
          ? "Ph Twis Obarrio"
          : project.id === "p2"
            ? "mañanitas"
            : location ?? project.category,
      // Sin "ver detalles": solo mostrar ubicación.
    };
  });

  return (
    <section className="container-custom py-20">
      <SectionHeader
        badge="Proyectos destacados"
        title="Resultados que reflejan precisión, estética y confianza."
        description="Muestra referencial de trabajos ejecutados en soluciones de vidrio, aluminio y divisiones arquitectónicas."
      />

      <div className="mt-10">
        <FeaturedProjectsCardsCarouselV2 items={items} />
      </div>

      {/* Quitado: enlace a la página completa de proyectos */}
    </section>
  );
}
