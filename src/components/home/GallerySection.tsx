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
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
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
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                {project.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/proyectos"
          className="text-sm font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
        >
          Ver galería completa →
        </Link>
      </div>
    </section>
  );
}
