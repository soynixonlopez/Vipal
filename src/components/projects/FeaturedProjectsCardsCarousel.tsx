"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type FeaturedCarouselItem = {
  src: string;
  title: string;
  description?: string; // ubicación
};

interface FeaturedProjectsCardsCarouselProps {
  items: FeaturedCarouselItem[];
  autoMs?: number;
}

export function FeaturedProjectsCardsCarousel({
  items,
  autoMs = 4200,
}: FeaturedProjectsCardsCarouselProps) {
  const safeItems = items ?? [];
  const n = safeItems.length;

  const slides = useMemo(() => {
    if (n === 0) return [];
    // Clones para bucle infinito sin salto visible.
    return [safeItems[n - 1], ...safeItems, safeItems[0]];
  }, [n, safeItems]);

  const [index, setIndex] = useState<number>(n > 0 ? 1 : 0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduceMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (paused) return;
    if (n <= 1) return;

    const id = window.setInterval(() => {
      setIndex((v) => v + 1);
    }, autoMs);

    return () => window.clearInterval(id);
  }, [autoMs, n, paused, reduceMotion]);

  const activeRealIndex = useMemo(() => {
    if (n === 0) return 0;
    // index: 0 -> clone (last), 1..n -> real, n+1 -> clone (first)
    return (index - 1 + n) % n;
  }, [index, n]);

  const goTo = (direction: 1 | -1) => {
    setPaused(true);
    setIndex((v) => v + direction);
    window.setTimeout(() => setPaused(false), 2200);
  };

  if (n === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[260px] sm:h-[320px] lg:h-[420px]">
        <div
          className="flex h-full"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translate3d(${-index * (100 / slides.length)}%, 0, 0)`,
            // Más estable: animamos transform.
            transition: disableTransition
              ? "none"
              : "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
          // Ajuste al terminar para volver a índice real cuando llegamos a clones.
          onTransitionEnd={() => {
            // index en rango [0..n+1]
            if (n === 0) return;
            if (index === 0 || index === n + 1) {
              setDisableTransition(true);
              setIndex(index === 0 ? n : 1);
              window.requestAnimationFrame(() => setDisableTransition(false));
            }
          }}
        >
          {slides.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className="relative h-full"
              style={{ width: `${100 / slides.length}%` }}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                quality={75}
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover"
                priority={idx === 1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200/90">
                  Proyecto
                </p>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-2 text-sm sm:text-base text-white/90">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-3">
        <button
          type="button"
          aria-label="Proyecto anterior"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/15"
          onClick={() => goTo(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Siguiente proyecto"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/15"
          onClick={() => goTo(1)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 py-3">
        {safeItems.map((_, i) => {
          const active = i === activeRealIndex;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Ir al proyecto ${i + 1}`}
              onClick={() => {
                setPaused(true);
                setIndex(i + 1);
                window.setTimeout(() => setPaused(false), 2200);
              }}
              className={[
                "h-2.5 rounded-full transition-all",
                active
                  ? "w-10 bg-emerald-500"
                  : "w-2.5 bg-slate-300/70 hover:bg-slate-200 dark:bg-slate-700/70 dark:hover:bg-slate-600",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}

