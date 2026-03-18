import { Metadata } from "next";
import Image from "next/image";
import { createMetadata } from "@/lib/seo";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = createMetadata({
  title: "Nosotros | Vipal S.A.",
  description:
    "Conoce a Vipal S.A., empresa especializada en soluciones premium de vidrio y aluminio en Panama City.",
  path: "/nosotros",
});

export default function NosotrosPage() {
  return (
    <>
      <section className="container-custom py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Nosotros
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              En Vipal S.A. desarrollamos soluciones arquitectonicas en vidrio y
              aluminio con una vision clara: combinar precision tecnica, diseño
              elegante y servicio profesional para crear espacios funcionales y de
              alto impacto visual.
            </p>
          </div>

          <div className="relative h-[240px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:h-[320px]">
            <Image
              src="/assets/img/vipalservices.png"
              alt="Vipal - Fingertips Solutions"
              fill
              quality={90}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container-custom grid gap-6 pb-20 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Mision
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Entregar instalaciones en vidrio y aluminio con estandares premium,
            asegurando funcionalidad, estetica y seguridad en cada proyecto.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Vision
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Ser referencia en Panama por nuestra capacidad tecnica, diseño
            arquitectonico y excelencia operativa en soluciones de vidrio y
            aluminio para sectores residenciales y corporativos.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 md:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Valores y enfoque profesional
          </h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
            <li>• Calidad real en materiales, herrajes e instalacion.</li>
            <li>• Puntualidad y transparencia en cada etapa del servicio.</li>
            <li>• Atencion personalizada con asesoria tecnica clara.</li>
            <li>• Compromiso con acabados limpios y elegantes.</li>
            <li>• Seguridad y precision en cada solucion ejecutada.</li>
            <li>• Mejora continua para entregar resultados superiores.</li>
          </ul>
        </article>
      </section>

      <CTASection
        title="Somos el aliado tecnico para tus proyectos en vidrio y aluminio."
        description="Conversemos sobre tu necesidad y diseñemos una solucion a medida con resultados de alto nivel."
      />
    </>
  );
}
