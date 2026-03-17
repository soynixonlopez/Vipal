import { Metadata } from "next";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { faqItems } from "@/data/faq";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Preguntas Frecuentes | Vipal S.A.",
  description:
    "Resuelve tus dudas sobre cotizaciones, tiempos de instalacion, materiales y cobertura de servicios de Vipal S.A.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <section className="container-custom py-16">
      <SectionHeader
        badge="FAQ"
        title="Preguntas frecuentes sobre nuestros servicios"
        description="Respuestas claras sobre cotizaciones, procesos de instalacion y atencion personalizada."
      />
      <div className="mt-10 max-w-4xl">
        <FAQAccordion items={faqItems} />
      </div>
    </section>
  );
}
