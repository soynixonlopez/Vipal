"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    let raf = 0;

    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const h = el.offsetHeight || 1;
      const vh = window.innerHeight || 1;

      // 0..1 aproximado según cuánto se ha desplazado la sección en pantalla.
      const progress = (vh - rect.top) / (vh + h);
      const p = (clamp01(progress) - 0.5) * 2; // -1..1

      setParallax(p);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const bgTransform = useMemo(() => {
    // Ajusta intensidad del parallax.
    const y = parallax * -22;
    return `translate3d(0, ${y}px, 0) scale(1.05)`;
  }, [parallax]);

  const overlayOpacity = useMemo(() => {
    // Mantener legibilidad del texto.
    return 0.68 + parallax * -0.08;
  }, [parallax]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: bgTransform }}
        aria-hidden="true"
      >
        <Image
          src="/assets/img/mainsection.png"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0 bg-slate-900"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative container-custom flex min-h-screen items-center justify-center py-16 text-center lg:py-24">
        <div className="max-w-3xl sm:max-w-4xl">
          <p className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            Vidrio y aluminio para proyectos exigentes
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white leading-tight sm:text-5xl lg:text-6xl">
            Eleva tus espacios con vidrio y aluminio profesional.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-100/90 sm:text-lg">
            Diseñamos, fabricamos e instalamos soluciones a medida para
            residencias, oficinas y comercios en Panama City.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink
              href="/contacto"
              className="min-w-[240px] h-14 px-8 text-base"
            >
              Solicitar cotización
            </ButtonLink>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[240px] h-14 items-center justify-center rounded-xl border border-slate-100/70 px-8 text-base font-semibold text-slate-50 transition hover:border-emerald-400 hover:text-emerald-200"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
