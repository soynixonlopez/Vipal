import Image from "next/image";
import { Service } from "@/types";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="interactive-card group relative h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:h-[460px]">
      <Image
        src={service.image}
        alt={service.name}
        fill
        quality={100}
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 48vw, 92vw"
        className="media-hover object-cover object-center"
      />

      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Detalle extra + CTA al hover */}
        <div className="mb-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-xl border border-white/10 bg-slate-950/45 backdrop-blur-sm p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Lo que incluye
            </p>
            <ul className="mt-3 space-y-1 text-xs text-white/90">
              {service.benefits.slice(0, 3).map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>

            <div className="mt-4">
              <ButtonLink
                href={`/servicios/${service.slug}`}
                variant="primary"
                className="w-full"
              >
                Ver detalles
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{service.name}</h3>
          <p className="text-sm leading-relaxed text-white/90">{service.shortDescription}</p>
        </div>
      </div>
    </article>
  );
}
