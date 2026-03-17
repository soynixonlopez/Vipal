import { ShieldCheck, Sparkles, Wrench, Users } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const pillars = [
  {
    title: "Calidad en cada acabado",
    description:
      "Seleccionamos materiales y herrajes confiables para resultados duraderos y elegantes.",
    icon: Sparkles,
  },
  {
    title: "Precisión técnica",
    description:
      "Instalaciones alineadas, limpias y seguras con control de detalle en todo el proceso.",
    icon: ShieldCheck,
  },
  {
    title: "Equipo profesional",
    description:
      "Mano de obra especializada en soluciones de vidrio y aluminio para proyectos exigentes.",
    icon: Wrench,
  },
  {
    title: "Atención personalizada",
    description:
      "Asesoría cercana desde la primera visita hasta la entrega final del proyecto.",
    icon: Users,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="container-custom py-20">
      <SectionHeader
        badge="Por qué elegirnos"
        title="Tu proyecto en manos de un equipo que combina diseño, técnica y compromiso."
        description="Nos enfocamos en crear soluciones funcionales y visualmente impecables, cuidando la experiencia del cliente en cada etapa."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
          >
            <pillar.icon className="h-8 w-8 text-cyan-700" />
            <h3 className="mt-4 text-lg font-semibold text-slate-950">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
