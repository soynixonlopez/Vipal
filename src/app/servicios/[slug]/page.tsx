import { notFound } from "next/navigation";
import { Metadata } from "next";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/data/company";
import { ContactForm } from "@/components/contact/ContactForm";
import { ServiceGalleryCarousel } from "@/components/services/ServiceGalleryCarousel";
import { MotionSection } from "@/components/shared/MotionSection";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    return createMetadata({
      title: "Servicio no encontrado | Vipal S.A.",
      description: "El servicio solicitado no existe.",
      path: `/servicios/${slug}`,
    });
  }
  return createMetadata({
    title: `${service.name} en Panama | Vipal S.A.`,
    description: service.shortDescription,
    path: `/servicios/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <>
      <MotionSection>
        <section className="container-custom py-16">
          <div className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Servicio especializado
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {service.fullDescription}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="#contacto" variant="primary">
                  Solicitar cotizacion
                </ButtonLink>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-300"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </div>

            {/* Sección del formulario: se ve “integrada” debajo del texto */}
            <div
              id="contacto"
              className="mx-auto mt-10 w-full max-w-2xl lg:translate-y-6"
            >
              <div className="rounded-3xl bg-linear-to-br from-emerald-600/10 via-emerald-500/10 to-slate-200 p-1 shadow-sm dark:to-slate-950">
                <ContactForm defaultServiceName={service.name} />
              </div>
            </div>
          </div>
        </section>
      </MotionSection>

      {service.gallery && service.gallery.length > 0 && (
        <MotionSection delayMs={120}>
          <section className="container-custom pb-16">
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
              Galería del servicio
            </h2>

            <ServiceGalleryCarousel
              images={service.gallery}
              serviceName={service.name}
            />
          </section>
        </MotionSection>
      )}

      <MotionSection delayMs={160}>
        <section className="container-custom pb-20">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="interactive-card rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Beneficios
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {service.benefits.map((benefit) => (
                  <li key={benefit}>• {benefit}</li>
                ))}
              </ul>
            </article>

            <article className="interactive-card rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Usos comunes
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {service.applications.map((application) => (
                  <li key={application}>• {application}</li>
                ))}
              </ul>
            </article>

            <article className="interactive-card rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Por que elegir este servicio
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {service.whyChoose.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </MotionSection>

      {/* Eliminados: servicios relacionados (ya que el formulario está arriba) */}
    </>
  );
}
