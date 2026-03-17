import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";

const heroPoints = [
  "Acabados premium y precisión técnica",
  "Instalación profesional en vidrio y aluminio",
  "Atención personalizada para cada proyecto",
];

export function HeroSection() {
  return (
    <section className="container-custom grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
          Soluciones arquitectónicas modernas en Panama City
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Proyectos de vidrio y aluminio que elevan la imagen y funcionalidad de
          tus espacios.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          En {company.name}, transformamos ideas en instalaciones elegantes,
          seguras y duraderas. Diseñamos y ejecutamos soluciones a medida para
          residencias, oficinas y comercios.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contacto">Solicitar cotización</ButtonLink>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
          >
            Contactar por WhatsApp
          </a>
        </div>

        <ul className="mt-8 space-y-3">
          {heroPoints.map((point) => (
            <li
              key={point}
              className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200"
            >
              <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <Image
          src="/images/hero-main.svg"
          alt="Composición arquitectónica en vidrio y aluminio"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
