"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type CarouselProject = {
  src: string;
  title: string;
  description?: string; // ubicación
};

interface FeaturedProjectsCarouselProps {
  items: CarouselProject[];
  autoMs?: number;
}

export function FeaturedProjectsCarousel({
  items,
  autoMs = 4200,
}: FeaturedProjectsCarouselProps) {
  const safeItems = items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduceMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setActiveIndex((v) => Math.max(0, Math.min(v, safeItems.length - 1)));
  }, [safeItems.length]);

  const goTo = (next: number) => {
    if (safeItems.length === 0) return;
    setActiveIndex((_) => {
      const n = ((next % safeItems.length) + safeItems.length) % safeItems.length;
      return n;
    });
  };

  useEffect(() => {
    if (reduceMotion) return;
    if (paused) return;
    if (safeItems.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % safeItems.length);
    }, autoMs);

    return () => window.clearInterval(id);
  }, [autoMs, paused, reduceMotion, safeItems.length]);

  const active = safeItems[activeIndex];

  const dots = useMemo(() => {
    return safeItems.map((_, idx) => idx);
  }, [safeItems.length]);

  if (!active || safeItems.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[280px] sm:h-[320px] lg:h-[420px]">
        {safeItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={`${item.src}-${idx}`}
              className={[
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "opacity-100" : "opacity-0",
              ].join(" ")}
              aria-hidden={!isActive}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 70vw, 100vw"
                quality={75}
                className="object-cover"
                priority={isActive}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
            </div>
          );
        })}

        {/* Texto en el activo */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200/90">
                Proyecto
              </p>
              <h3 className="mt-2 line-clamp-2 text-xl sm:text-2xl font-bold text-white">
                {active.title}
              </h3>
              {active.description ? (
                <p className="mt-2 text-sm sm:text-base text-white/90">
                  {active.description}
                </p>
              ) : null}
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Proyecto anterior"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/15"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Siguiente proyecto"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/15"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 py-3">
        {dots.map((i) => {
          const activeDot = i === activeIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              className={[
                "h-2.5 rounded-full transition-all",
                activeDot
                  ? "w-8 bg-emerald-500"
                  : "w-2.5 bg-slate-300/70 hover:bg-slate-200 dark:bg-slate-700/70 dark:hover:bg-slate-600",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}

