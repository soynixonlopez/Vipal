import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function GallerySection() {
  return (
    <section className="container-custom py-20">
      <SectionHeader
        badge="Proyectos destacados"
        title="Resultados que reflejan precisión, estética y confianza."
        description="Muestra referencial de trabajos ejecutados en soluciones de vidrio, aluminio y divisiones arquitectónicas."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                {project.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/proyectos"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-600"
        >
          Ver galería completa →
        </Link>
      </div>
    </section>
  );
}
