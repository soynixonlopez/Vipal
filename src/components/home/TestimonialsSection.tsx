import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function TestimonialsSection() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="container-custom">
        <SectionHeader
          badge="Testimonios"
          title="Clientes que confían en nuestra ejecución profesional."
          description="Experiencias de clientes residenciales y corporativos que eligieron a Vipal para proyectos de alto estándar."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <Quote className="h-6 w-6 text-emerald-600" />
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                “{testimonial.quote}”
              </p>
              <p className="mt-5 text-sm font-semibold text-slate-900">
                {testimonial.name}
              </p>
              <p className="text-xs text-slate-500">
                {testimonial.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
