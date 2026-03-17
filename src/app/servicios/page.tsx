import { Metadata } from "next";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { services } from "@/data/services";
import { CTASection } from "@/components/shared/CTASection";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Servicios | Vipal S.A.",
  description:
    "Explora todos los servicios de Vipal S.A.: ventanas corredizas, fachadas de vidrio templado, puertas de aluminio, barandas, louvers y mas.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <section className="container-custom py-16">
        <SectionHeader
          badge="Servicios profesionales"
          title="Soluciones en vidrio y aluminio para proyectos que exigen calidad."
          description="Cada servicio se desarrolla con enfoque tecnico, diseño elegante y ejecucion profesional para garantizar resultados duraderos."
        />
        <div className="mt-10">
          <ServiceGrid items={services} />
        </div>
      </section>

      <CTASection
        title="¿Buscas una solucion especifica para tu proyecto?"
        description="Solicita una cotizacion y recibe recomendacion profesional segun tu espacio, presupuesto y objetivo."
      />
    </>
  );
}
