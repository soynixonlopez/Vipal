import { Metadata } from "next";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = createMetadata({
  title: "Proyectos | Vipal S.A.",
  description:
    "Galeria de proyectos en vidrio y aluminio ejecutados por Vipal S.A. para espacios residenciales y corporativos.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return (
    <>
      <section className="container-custom py-16">
        <SectionHeader
          badge="Galeria premium"
          title="Proyectos que demuestran calidad, precision y diseño."
          description="Explora trabajos referenciales clasificados por categoria y visualiza como aplicamos nuestras soluciones en distintos contextos."
        />
        <div className="mt-10">
          <ProjectsGallery items={projects} />
        </div>
      </section>

      <CTASection
        title="Tu proyecto puede ser el proximo caso de exito."
        description="Hablemos de tu idea y definamos juntos una ejecucion de alto nivel."
      />
    </>
  );
}
