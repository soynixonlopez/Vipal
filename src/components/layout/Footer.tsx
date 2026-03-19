"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { company, navLinks } from "@/data/company";
import { Modal } from "@/components/ui/Modal";

export function Footer() {
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openLegal, setOpenLegal] = useState(false);

  return (
    <footer className="border-t border-slate-200 bg-slate-100 py-14 dark:border-[#12324c] dark:bg-[#071826]">
      <div className="container-custom grid gap-10 md:grid-cols-4">
        <div>
          <Image
            src="/assets/logo/vipallogo.png"
            alt="Vipal Glass"
            width={999}
            height={278}
            className="h-14 w-auto max-w-full object-contain md:h-16"
          />
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Soluciones premium en vidrio y aluminio para proyectos residenciales y
            corporativos en {company.location}.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
            Navegación
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-600 transition hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
            Servicios
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Ventanas corredizas</li>
            <li>Fachadas de vidrio</li>
            <li>Puertas de vidrio templado</li>
            <li>Divisiones de oficina</li>
            <li>Barandas</li>
            <li>Espejos decorativos a la medida</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
            Contacto directo
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Tel/WhatsApp: {company.phone}</li>
            <li>Email: {company.email}</li>
            <li>Ubicación: {company.location}</li>
          </ul>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0a5f80] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#084c66]"
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
        </div>
      </div>

      <div className="container-custom mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between dark:border-[#12324c] dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} {company.name}. Todos los derechos
          reservados.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setOpenPrivacy(true)}
            className="text-xs font-medium text-slate-600 underline underline-offset-4 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Política de privacidad
          </button>
          <button
            type="button"
            onClick={() => setOpenLegal(true)}
            className="text-xs font-medium text-slate-600 underline underline-offset-4 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300"
          >
            Aviso legal
          </button>
        </div>
      </div>

      <Modal
        open={openPrivacy}
        title="Política de privacidad"
        onClose={() => setOpenPrivacy(false)}
      >
        <p>
          En Vipal S.A. tratamos tus datos personales únicamente para gestionar
          consultas, solicitudes de cotización y la comunicación relacionada con
          nuestros servicios de vidrio y aluminio. No cedemos tus datos a
          terceros salvo obligación legal.
        </p>
        <p className="mt-3">
          Puedes ejercitar tus derechos de acceso, rectificación y eliminación
          de datos escribiendo a {company.email}.
        </p>
      </Modal>

      <Modal
        open={openLegal}
        title="Aviso legal"
        onClose={() => setOpenLegal(false)}
      >
        <p>
          Este sitio web pertenece a Vipal S.A., dedicada a soluciones en vidrio
          y aluminio en Panamá City. La información mostrada tiene carácter
          informativo y puede estar sujeta a cambios sin previo aviso.
        </p>
        <p className="mt-3">
          El uso del sitio implica la aceptación de estas condiciones. Para
          cualquier consulta legal, puedes contactarnos en {company.email}.
        </p>
      </Modal>
    </footer>
  );
}
