import { processSteps } from "@/data/company";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function ProcessSection() {
  return (
    <section className="bg-slate-100/70 py-20 dark:bg-slate-900/40">
      <div className="container-custom">
        <SectionHeader
          badge="Proceso de trabajo"
          title="Metodología clara para asegurar resultados profesionales."
          description="Cada proyecto se gestiona con una ruta definida para mantener calidad, tiempos y una comunicación transparente."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                Paso {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
