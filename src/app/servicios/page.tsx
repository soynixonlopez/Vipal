import { Metadata } from "next";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { services } from "@/data/services";
import { CTASection } from "@/components/shared/CTASection";
import { createMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/shared/MotionSection";

export const metadata: Metadata = createMetadata({
  title: "Servicios | Vipal S.A.",
  description:
    "Explora todos los servicios de Vipal S.A.: ventanas corredizas, fachadas de vidrio templado, puertas de aluminio, barandas, louvers y mas.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <MotionSection>
        <section className="container-custom py-16">
          <SectionHeader
            badge="Servicios profesionales"
            title="Soluciones en vidrio y aluminio para proyectos que exigen calidad."
            description="Cada servicio se desarrolla con enfoque tecnico, diseño elegante y ejecucion profesional para garantizar resultados duraderos."
          />
          <div className="mt-10">
            <ServicesExplorer items={services} />
          </div>
        </section>
      </MotionSection>

      <MotionSection delayMs={120}>
        <CTASection
          title="¿Buscas una solucion especifica para tu proyecto?"
          description="Solicita una cotizacion y recibe recomendacion profesional segun tu espacio, presupuesto y objetivo."
        />
      </MotionSection>
    </>
  );
}
