import { processSteps } from "@/data/company";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function ProcessSection() {
  return (
    <section className="bg-slate-100 py-20">
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
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <p className="text-sm font-semibold text-cyan-700">
                Paso {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
