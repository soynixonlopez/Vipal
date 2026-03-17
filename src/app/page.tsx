import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/shared/StatsSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { featuredServices } from "@/data/services";
import { stats } from "@/data/company";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { GallerySection } from "@/components/home/GallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { faqItems } from "@/data/faq";
import { createMetadata } from "@/lib/seo";

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
      <StatsSection items={stats} />

      <section className="container-custom py-16">
        <SectionHeader
          badge="Servicios destacados"
          title="Soluciones de alto nivel para proyectos residenciales y corporativos."
          description="Trabajamos cada detalle para lograr resultados funcionales, elegantes y alineados a la arquitectura del espacio."
        />
        <div className="mt-10">
          <ServiceGrid items={featuredServices} />
        </div>
      </section>

      <WhyChooseUsSection />
      <ProcessSection />
      <GallerySection />
      <TestimonialsSection />

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

      <section className="container-custom pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ubicacion y atencion comercial
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Panama City. Atendemos consultas y coordinamos visitas tecnicas para
            diagnostico, diseño y cotizacion.
          </p>
          <div className="mt-5 h-56 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
        </div>
      </section>

      <CTASection
        title="Convierte tu espacio en un proyecto de alto impacto visual y funcional."
        description="Habla con nuestro equipo y recibe una propuesta profesional para tu necesidad en vidrio y aluminio."
      />
    </>
  );
}
