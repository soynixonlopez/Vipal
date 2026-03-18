"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

function fileTitleFromSrc(src: string) {
  // Intenta sacar algo legible desde la ruta del archivo (sin depender del backend).
  try {
    const file = src.split("/").pop() ?? "";
    const decoded = decodeURIComponent(file);
    return decoded.replace(/\.[^/.]+$/, "");
  } catch {
    return src;
  }
}

interface ServiceGalleryCarouselProps {
  images: string[];
  serviceName: string;
  autoMs?: number;
}

export function ServiceGalleryCarousel({
  images,
  serviceName,
  autoMs = 4200,
}: ServiceGalleryCarouselProps) {
  const safeImages = useMemo(() => images ?? [], [images]);
  const n = safeImages.length;

  // El carrusel puede mostrar 4+ tarjetas por vista; necesitamos clonar
  // suficientes imágenes para que nunca aparezca espacio en blanco en los extremos.
  const [clonesCount, setClonesCount] = useState<number>(2);
  const k = Math.min(clonesCount, n);
  const [index, setIndex] = useState<number>(n > 0 ? Math.min(2, n) : 0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [stepPx, setStepPx] = useState<number>(0);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduceMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mide el ancho real de una tarjeta (incluyendo el gap) para mover el carrusel
  // de a una tarjeta por vez manteniendo el look estable con responsive.
  useLayoutEffect(() => {
    const measure = () => {
      const cardEl = firstCardRef.current;
      const trackEl = trackRef.current;
      const viewportEl = viewportRef.current;
      if (!cardEl || !trackEl || !viewportEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const styles = window.getComputedStyle(trackEl);
      const gapStr = styles.columnGap || styles.gap || "0px";
      const gap = Number.parseFloat(gapStr) || 0;

      const nextStep = Math.max(1, cardRect.width + gap);
      setStepPx(nextStep);

      const viewportRect = viewportEl.getBoundingClientRect();
      const viewportWidth = viewportRect.width;
      // Aproximación de tarjetas visibles: ancho de viewport / (card + gap)
      const cardsPerView = Math.max(1, Math.floor((viewportWidth + gap) / nextStep));
      // +1 extra por seguridad para cubrir transiciones y clones al final.
      setClonesCount(Math.max(2, cardsPerView + 1));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Recalibrar índice cuando cambian clonesCount/safeImages
  useEffect(() => {
    if (!measured) return;
    if (n === 0) return;
    setIndex(k);
  }, [k, measured, n]);

  useEffect(() => {
    if (reduceMotion) return;
    if (paused) return;
    if (n <= 1) return;

    const id = window.setInterval(() => {
      setIndex((v) => v + 1);
    }, autoMs);

    return () => window.clearInterval(id);
  }, [autoMs, n, paused, reduceMotion]);

  useEffect(() => {
    if (stepPx > 0) setMeasured(true);
  }, [stepPx]);

  const slides = useMemo(() => {
    if (n === 0) return [];
    const left = k > 0 ? safeImages.slice(n - k) : [];
    const right = k > 0 ? safeImages.slice(0, k) : [];
    return [...left, ...safeImages, ...right];
  }, [n, k, safeImages]);

  const activeRealIndex = useMemo(() => {
    if (n === 0) return 0;
    // index: [clonesCount..clonesCount+n-1] -> reales
    const real = index - k;
    return ((real % n) + n) % n;
  }, [index, k, n]);

  if (n === 0) return null;
  const safeStep = stepPx || 280; // fallback por si aún no midió

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={viewportRef} className="relative">
        <div
          className="relative overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex gap-4 py-4"
            style={{
              transform: `translate3d(${-index * safeStep}px, 0, 0)`,
              transition: disableTransition
                ? "none"
                : "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
            onTransitionEnd={() => {
              // Cuando pasamos por clones, volvemos al índice real sin animar.
              if (n === 0) return;
              // Si estamos en el bloque izquierdo de clones, "corrimos" hacia el bloque real.
              if (index < k) {
                setDisableTransition(true);
                setIndex(index + n);
                window.requestAnimationFrame(() => setDisableTransition(false));
                return;
              }
              // Si estamos en el bloque derecho de clones, "corrimos" hacia el bloque real.
              if (index >= k + n) {
                setDisableTransition(true);
                setIndex(index - n);
                window.requestAnimationFrame(() => setDisableTransition(false));
              }
            }}
          >
            {slides.map((src, idx) => {
              const isActive = (idx - k + n) % n === activeRealIndex;

              return (
                <div
                  key={`${src}-${idx}`}
                  className="flex-none"
                >
                  {/* Tarjeta con tamaño fijo: muestra varias en fila */}
                  <div
                    ref={idx === 1 ? firstCardRef : undefined}
                    className="relative h-[220px] w-[220px] sm:h-[240px] sm:w-[240px] md:h-[260px] md:w-[250px] lg:h-[280px] lg:w-[270px] overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  >
                    <Image
                      src={src}
                      alt={`${serviceName} - ${fileTitleFromSrc(src)}`}
                      fill
                      quality={80}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 80vw"
                      className="object-cover"
                      priority={isActive}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

