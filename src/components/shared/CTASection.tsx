import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface CtaSectionProps {
  title: string;
  description: string;
}

export function CTASection({ title, description }: CtaSectionProps) {
  return (
    <section className="container-custom py-20">
      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-600 to-slate-900 px-8 py-12 text-white shadow-xl sm:px-12">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-slate-100/90">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href="/contacto"
            className="bg-white text-slate-900 hover:bg-slate-100"
          >
            Solicitar cotización ahora
          </ButtonLink>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            WhatsApp directo
          </a>
        </div>
      </div>
    </section>
  );
}
