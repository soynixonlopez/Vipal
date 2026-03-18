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
          <a
            href="/contacto"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-600/20 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-white"
          >
            Solicitar cotización ahora
          </a>
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
