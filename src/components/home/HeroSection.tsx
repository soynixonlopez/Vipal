import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HeroSection() {
  return (
    <section className="container-custom grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="inline-flex rounded-full border border-cyan-600/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-800">
          Soluciones arquitectónicas modernas en Panama City
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Proyectos de vidrio y aluminio que elevan la imagen y funcionalidad de
          tus espacios.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
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
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-700"
          >
            Contactar por WhatsApp
          </a>
        </div>

      </div>

      <div className="relative h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
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
