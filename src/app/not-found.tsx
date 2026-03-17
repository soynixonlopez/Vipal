import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-custom py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
        Pagina no encontrada
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        La ruta que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
