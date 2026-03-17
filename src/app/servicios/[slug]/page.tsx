import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/data/company";

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

  const related = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <section className="container-custom grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Servicio especializado
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            {service.fullDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contacto">Solicitar cotizacion</ButtonLink>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-700"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div className="relative h-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <Image
            src={service.image}
            alt={service.name}
            fill
            quality={100}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {service.gallery && service.gallery.length > 1 && (
        <section className="container-custom pb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Galería del servicio
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.gallery.map((src) => (
              <div
                key={src}
                className="relative h-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <Image
                  src={src}
                  alt={service.name}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-custom grid gap-6 pb-20 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Beneficios
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {service.benefits.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Usos comunes
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {service.applications.map((application) => (
              <li key={application}>• {application}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Por que elegir este servicio
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {service.whyChoose.map((reason) => (
              <li key={reason}>• {reason}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container-custom pb-20">
        <h2 className="text-2xl font-bold text-slate-900">
          Servicios relacionados
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/servicios/${item.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
