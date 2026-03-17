import Link from "next/link";
import { company, navLinks } from "@/data/company";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100/70 py-14 dark:border-slate-800 dark:bg-slate-950">
      <div className="container-custom grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {company.name}
          </h3>
          <p className="mt-1 text-sm uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            {company.slogan}
          </p>
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
                  className="text-slate-600 transition hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
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
            className="mt-5 inline-flex rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      <div className="container-custom mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} {company.name}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
