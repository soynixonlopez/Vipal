import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Service } from "@/types";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          quality={100}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-950">
          {service.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {service.shortDescription}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {service.benefits.slice(0, 2).map((benefit) => (
            <li key={benefit}>• {benefit}</li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <ButtonLink href={`/servicios/${service.slug}`} variant="secondary">
            Ver detalle
          </ButtonLink>
          <ArrowRight className="h-5 w-5 text-cyan-700" />
        </div>
      </div>
    </article>
  );
}
