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
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-5rem)] overflow-hidden"
    >
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

      <div className="relative container-custom flex min-h-[calc(100svh-5rem)] items-center justify-center py-10 text-center lg:py-20">
        <div className="max-w-3xl sm:max-w-4xl">
          <p className="inline-flex rounded-full border border-[#74b6cb]/40 bg-[#0a5f80]/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9cd2e4]">
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
              className="inline-flex min-w-[240px] h-14 items-center justify-center gap-2 rounded-xl border border-slate-100/70 px-8 text-base font-semibold text-slate-50 transition hover:border-[#74b6cb] hover:text-[#c3e7f2]"
            >
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M19.11 17.53c-.27-.13-1.58-.78-1.83-.87-.24-.09-.42-.13-.6.14-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.18-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.95 2.57 1.08 2.75.13.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.16-1.28-.07-.11-.24-.18-.51-.31Z" />
                <path d="M16.01 3.2c-7.04 0-12.77 5.73-12.77 12.77 0 2.25.59 4.46 1.71 6.4L3 28.8l6.57-1.72a12.7 12.7 0 0 0 6.43 1.74h.01c7.04 0 12.77-5.73 12.77-12.77S23.05 3.2 16.01 3.2Zm0 23.47h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.39a10.62 10.62 0 0 1-1.63-5.72c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12 2.01 2.01 3.12 4.68 3.12 7.52 0 5.86-4.77 10.63-10.63 10.63Z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
