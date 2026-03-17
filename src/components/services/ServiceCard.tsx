import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Service } from "@/types";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {service.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {service.shortDescription}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {service.benefits.slice(0, 2).map((benefit) => (
            <li key={benefit}>• {benefit}</li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <ButtonLink href={`/servicios/${service.slug}`} variant="secondary">
            Ver detalle
          </ButtonLink>
          <ArrowRight className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
        </div>
      </div>
    </article>
  );
}
