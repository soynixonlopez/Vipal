"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type FeaturedProject = {
  src: string;
  title: string;
  description?: string;
};

interface FeaturedProjectsStripProps {
  items: FeaturedProject[];
}

export function FeaturedProjectsStrip({
  items,
}: FeaturedProjectsStripProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [anchorTop, setAnchorTop] = useState<number | null>(null);
  const [modalMarginTop, setModalMarginTop] = useState<number>(12);
  const modalCardRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(() => {
    if (selectedIndex === null) return null;
    return items[selectedIndex] ?? null;
  }, [items, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    // Colocamos el modal cerca del lugar donde se hizo click,
    // para que no “salte” arriba y no tengas que scrollear.
    const raf = window.requestAnimationFrame(() => {
      const card = modalCardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const desired = anchorTop ?? 12;
      const maxMargin = window.innerHeight - rect.height - 12;
      const clamped = Math.max(12, Math.min(desired, maxMargin));
      setModalMarginTop(clamped);
    });

    return () => window.cancelAnimationFrame(raf);
  }, [selectedIndex, anchorTop]);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        {/* Desktop (lg): 3 arriba + 2 abajo, siempre en cover sin zoom */}
        <div className="hidden h-[520px] lg:flex lg:flex-col lg:gap-0">
          <div className="flex h-1/2">
            {items.slice(0, 3).map((item, i) => {
              const idx = i;
              return (
                <button
                  key={`${item.src}-${idx}`}
                  type="button"
                  onClick={(e) => {
                    const top = e.currentTarget.getBoundingClientRect().top;
                    setAnchorTop(top);
                    setSelectedIndex(idx);
                  }}
                  className={[
                    "group relative flex-1 min-w-0 overflow-hidden bg-slate-100 dark:bg-slate-900/40 focus:outline-none",
                    i !== 2 ? "border-r border-white/10" : "",
                    "transition duration-300 hover:shadow-md hover:shadow-slate-950/10",
                  ].join(" ")}
                  aria-label={`Abrir proyecto: ${item.title}`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      quality={100}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/90">
                      {item.title}
                    </p>
                    {item.description ? (
                      <p className="mt-1 text-sm font-medium text-white/90 opacity-95">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex h-1/2">
            {items.slice(3, 5).map((item, i) => {
              const idx = 3 + i;
              return (
                <button
                  key={`${item.src}-${idx}`}
                  type="button"
                  onClick={(e) => {
                    const top = e.currentTarget.getBoundingClientRect().top;
                    setAnchorTop(top);
                    setSelectedIndex(idx);
                  }}
                  className={[
                    "group relative flex-1 min-w-0 overflow-hidden bg-slate-100 dark:bg-slate-900/40 focus:outline-none",
                    i !== 1 ? "border-r border-white/10" : "",
                    "transition duration-300 hover:shadow-md hover:shadow-slate-950/10",
                  ].join(" ")}
                  aria-label={`Abrir proyecto: ${item.title}`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      quality={100}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/90">
                      {item.title}
                    </p>
                    {item.description ? (
                      <p className="mt-1 text-sm font-medium text-white/90 opacity-95">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive: grilla 1 col (móvil) / 2 col (tablet), cover sin zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden">
          {items.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              type="button"
              onClick={(e) => {
                const top = e.currentTarget.getBoundingClientRect().top;
                setAnchorTop(top);
                setSelectedIndex(idx);
              }}
              className={[
                "group relative min-w-0 overflow-hidden bg-slate-100 dark:bg-slate-900/40 focus:outline-none",
                "border-t border-white/10",
                "transition duration-300 hover:shadow-md hover:shadow-slate-950/10",
              ].join(" ")}
              aria-label={`Abrir proyecto: ${item.title}`}
            >
              <div className="relative h-[240px]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  quality={100}
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/90">
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-1 text-sm font-medium text-white/90 opacity-95">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal ampliado (mejor resolución al expandir) */}
      {selected ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/75">
          <div
            ref={modalCardRef}
            style={{ marginTop: modalMarginTop }}
            className="relative w-full max-w-5xl overflow-hidden mx-3 sm:mx-6 rounded-3xl border border-white/10 bg-white dark:bg-slate-950"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-3">
              <button
                type="button"
                className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:bg-slate-950/70"
                onClick={() =>
                  setSelectedIndex((v) => (v === null ? v : Math.max(0, v - 1)))
                }
                aria-label="Imagen anterior"
                disabled={selectedIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:bg-slate-950/70"
                onClick={() =>
                  setSelectedIndex((v) =>
                    v === null ? v : Math.min(items.length - 1, v + 1),
                  )
                }
                aria-label="Imagen siguiente"
                disabled={selectedIndex === items.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/30 bg-slate-950/60 p-2 text-white backdrop-blur"
              onClick={() => {
                setSelectedIndex(null);
                setAnchorTop(null);
              }}
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative h-[52vh] min-h-[360px] max-h-[620px] w-full">
              <Image
                src={selected.src}
                alt={selected.title}
                fill
                priority
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-2 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Proyecto
              </p>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                {selected.title}
              </h3>
              {selected.description ? (
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {selected.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

