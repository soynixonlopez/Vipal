"use client";

import Link from "next/link";
import { useState } from "react";
import { company, navLinks } from "@/data/company";
import { Modal } from "@/components/ui/Modal";

export function Footer() {
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openLegal, setOpenLegal] = useState(false);

  return (
    <footer className="border-t border-slate-200 bg-slate-100 py-14">
      <div className="container-custom grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {company.name}
          </h3>
          <p className="mt-1 text-sm uppercase tracking-wider text-emerald-700">
            {company.slogan}
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Soluciones premium en vidrio y aluminio para proyectos residenciales y
            corporativos en {company.location}.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Navegación
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-600 transition hover:text-emerald-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Servicios
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Ventanas corredizas</li>
            <li>Fachadas de vidrio</li>
            <li>Puertas de vidrio templado</li>
            <li>Divisiones de oficina</li>
            <li>Barandas</li>
            <li>Espejos decorativos a la medida</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Contacto directo
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Tel/WhatsApp: {company.phone}</li>
            <li>Email: {company.email}</li>
            <li>Ubicación: {company.location}</li>
          </ul>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      <div className="container-custom mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {company.name}. Todos los derechos
          reservados.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setOpenPrivacy(true)}
            className="text-xs font-medium text-slate-600 underline underline-offset-4 hover:text-emerald-700"
          >
            Política de privacidad
          </button>
          <button
            type="button"
            onClick={() => setOpenLegal(true)}
            className="text-xs font-medium text-slate-600 underline underline-offset-4 hover:text-emerald-700"
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
