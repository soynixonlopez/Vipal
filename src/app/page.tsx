import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/shared/StatsSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { services } from "@/data/services";
import { stats } from "@/data/company";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { faqItems } from "@/data/faq";
import { createMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/shared/MotionSection";

export const metadata: Metadata = createMetadata({
  title: "Vipal S.A. | Vidrio y aluminio en Panama City",
  description:
    "Empresa profesional de vidrio y aluminio en Panama City. Cotiza ventanas corredizas, fachadas, puertas, divisiones de oficina, barandas y mas.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <MotionSection>
        <StatsSection items={stats} />
      </MotionSection>

      <MotionSection delayMs={80}>
        <section className="container-custom py-16">
          <SectionHeader
            badge="Servicios destacados"
            title="Soluciones de alto nivel para proyectos residenciales y corporativos."
            description="Trabajamos cada detalle para lograr resultados funcionales, elegantes y alineados a la arquitectura del espacio."
          />
          <div className="mt-10">
            <ServiceGrid items={services.slice(0, 6)} />
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/servicios" variant="secondary">
              Ver todos los servicios
            </ButtonLink>
          </div>
        </section>
      </MotionSection>

      <MotionSection delayMs={120}>
        <WhyChooseUsSection />
      </MotionSection>
      <MotionSection delayMs={140}>
        <GallerySection />
      </MotionSection>
      <MotionSection delayMs={160}>
        <TestimonialsSection />
      </MotionSection>

      <MotionSection delayMs={180}>
        <section className="container-custom py-20">
          <SectionHeader
            badge="Preguntas frecuentes"
            title="Respuestas claras para que tomes decisiones con confianza."
            description="Conoce nuestro enfoque de trabajo, tiempos de respuesta y alcance de servicios."
          />
          <div className="mt-8">
            <FAQAccordion items={faqItems.slice(0, 4)} />
          </div>
        </section>
      </MotionSection>

      <MotionSection delayMs={220}>
        <CTASection
          title="Convierte tu espacio en un proyecto de alto impacto visual y funcional."
          description="Habla con nuestro equipo y recibe una propuesta profesional para tu necesidad en vidrio y aluminio."
        />
      </MotionSection>
    </>
  );
}
