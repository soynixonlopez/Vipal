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
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
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
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0a5f80] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#084c66]"
            >
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M19.11 17.53c-.27-.13-1.58-.78-1.83-.87-.24-.09-.42-.13-.6.14-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.18-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.95 2.57 1.08 2.75.13.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.16-1.28-.07-.11-.24-.18-.51-.31Z" />
                <path d="M16.01 3.2c-7.04 0-12.77 5.73-12.77 12.77 0 2.25.59 4.46 1.71 6.4L3 28.8l6.57-1.72a12.7 12.7 0 0 0 6.43 1.74h.01c7.04 0 12.77-5.73 12.77-12.77S23.05 3.2 16.01 3.2Zm0 23.47h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.39a10.62 10.62 0 0 1-1.63-5.72c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12 2.01 2.01 3.12 4.68 3.12 7.52 0 5.86-4.77 10.63-10.63 10.63Z" />
              </svg>
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
            <div className="mt-4 h-44 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800" />
          </article>
        </aside>
      </div>
    </section>
  );
}
