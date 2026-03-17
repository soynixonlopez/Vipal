import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { company } from "@/data/company";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contacto y Cotizacion | Vipal S.A.",
  description:
    "Solicita tu cotizacion para servicios de vidrio y aluminio en Panama City. Contactanos por WhatsApp, llamada o correo.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <section className="container-custom py-16">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
        Cotizacion y contacto
      </h1>
      <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
        Cuentanos tu necesidad y recibe una propuesta profesional para tu
        proyecto de vidrio y aluminio.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <ContactForm />

        <aside className="space-y-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Contacto directo
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Telefono / WhatsApp: {company.phone}</li>
              <li>Email: {company.email}</li>
              <li>Direccion: {company.location}</li>
            </ul>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Escribir por WhatsApp
            </a>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Ubicacion
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Panama City. Coordinamos visitas tecnicas para levantamiento y
              asesoria.
            </p>
            <div className="mt-4 h-44 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
          </article>
        </aside>
      </div>
    </section>
  );
}
