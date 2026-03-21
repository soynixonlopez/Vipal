"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export type FeaturedCarouselItem = {
  src: string;
  title: string;
  description?: string; // ubicación
};

interface FeaturedProjectsCardsCarouselV2Props {
  items: FeaturedCarouselItem[];
  autoMs?: number;
}

export function FeaturedProjectsCardsCarouselV2({
  items,
  autoMs = 3200,
}: FeaturedProjectsCardsCarouselV2Props) {
  const safeItems = items ?? [];
  const n = safeItems.length;

  const slides = useMemo(() => {
    if (n === 0) return [];
    if (n === 1) return safeItems;
    return [safeItems[n - 1], ...safeItems, safeItems[0]];
  }, [n, safeItems]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(n > 1 ? 1 : 0); // 0 y n+1 son clones

  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const resettingRef = useRef(false);

  const slideMs = 700;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduceMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Medimos el "paso" (ancho tarjeta + gap) para poder hacer scroll exacto.
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (slides.length <= 1) return;

    let attempts = 0;
    const maxAttempts = 8;

    const measure = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-project-slide='1']");
      if (cards.length < 2) {
        attempts += 1;
        if (attempts < maxAttempts) {
          window.requestAnimationFrame(measure);
        }
        return;
      }

      const a = cards[0];
      const b = cards[1];
      const nextStep = b.offsetLeft - a.offsetLeft;

      if (!nextStep || nextStep <= 0) {
        attempts += 1;
        if (attempts < maxAttempts) {
          window.requestAnimationFrame(measure);
        }
        return;
      }

      setStep(nextStep);
      el.scrollLeft = nextStep * idx;
      setReady(true);
    };

    const raf = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(raf);
  }, [slides.length]);

  useEffect(() => {
    if (!ready) return;
    const el = scrollerRef.current;
    if (!el) return;
    if (step <= 0) return;

    const targetLeft = step * idx;

    if (resettingRef.current) {
      resettingRef.current = false;
      el.scrollLeft = targetLeft;
      return;
    }

    el.scrollTo({ left: targetLeft, behavior: "smooth" });

    // Reset instantáneo cuando llegamos a clones (sin que se note).
    if (n > 1) {
      if (idx === 0) {
        window.setTimeout(() => {
          resettingRef.current = true;
          setIdx(n);
        }, slideMs);
      }
      if (idx === n + 1) {
        window.setTimeout(() => {
          resettingRef.current = true;
          setIdx(1);
        }, slideMs);
      }
    }
  }, [idx, ready, step, n]);

  useEffect(() => {
    if (!ready) return;
    if (reduceMotion) return;
    if (paused) return;
    if (n <= 1) return;

    const id = window.setInterval(() => {
      setIdx((v) => v + 1);
    }, autoMs);

    return () => window.clearInterval(id);
  }, [ready, reduceMotion, paused, n, autoMs]);

  if (n === 0) return null;

  return (
    <div
      className="relative rounded-2xl border border-slate-200 bg-white dark:border-[#12324c] dark:bg-transparent"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-x-auto scroll-smooth rounded-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div
          ref={scrollerRef}
          className="flex gap-3 px-2 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {slides.map((item, i) => {
            const realIndex = n > 1 ? (i - 1 + n) % n : 0;
            return (
              <button
                key={`${item.src}-${i}`}
                type="button"
                data-project-slide="1"
                onClick={() => {
                  // Pausa para que el usuario vea la tarjeta.
                  setPaused(true);
                  // "Saltamos" al slide clickeado.
                  setIdx(i);
                  window.setTimeout(() => setPaused(false), slideMs);
                }}
                aria-label={`Proyecto: ${item.title}`}
                className="group relative h-[260px] w-[260px] sm:h-[290px] sm:w-[280px] md:h-[320px] md:w-[320px] flex-none overflow-hidden rounded-2xl border border-slate-200 bg-transparent dark:border-[#12324c] dark:bg-transparent"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    quality={75}
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 260px"
                    className="media-hover object-cover object-center"
                    priority={i === 1}
                  />
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/90">
                    {item.title}
                  </p>
                  {item.description ? (
                    <p className="mt-1 text-sm font-medium text-white/90">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

