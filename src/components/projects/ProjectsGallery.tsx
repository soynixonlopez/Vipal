"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectsGalleryProps {
  items: Project[];
}

export function ProjectsGallery({ items }: ProjectsGalleryProps) {
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    activeCategory === "Todos"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              activeCategory === category
                ? "border-cyan-500 bg-cyan-500 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <button
            type="button"
            key={project.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            onClick={() => setSelected(project)}
          >
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
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
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <button
              type="button"
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-300 bg-white/90 p-2 dark:border-slate-700 dark:bg-slate-900/90"
              onClick={() => setSelected(null)}
              aria-label="Cerrar vista ampliada"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative h-72 w-full">
              <Image src={selected.image} alt={selected.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                {selected.category}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {selected.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
