"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type ImageAccordionItem = {
  src: string;
  title?: string;
  description?: string;
  href?: string;
};

interface ImageAccordionProps {
  items: ImageAccordionItem[];
  defaultIndex?: number;
  className?: string;
}

export function ImageAccordion({
  items,
  defaultIndex = 0,
  className,
}: ImageAccordionProps) {
  const safeDefault = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(0, Math.min(defaultIndex, items.length - 1));
  }, [defaultIndex, items.length]);

  const [activeIndex, setActiveIndex] = useState<number>(safeDefault);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeFr = 4;
  const inactiveFr = 1;

  const template = useMemo(() => {
    return items
      .map((_, i) => (i === activeIndex ? `${activeFr}fr` : `${inactiveFr}fr`))
      .join(" ");
  }, [activeIndex, items, activeFr, inactiveFr]);

  const style = useMemo(() => {
    // Animamos la dimension dominante (cols en desktop, rows en mobile).
    return isMobile
      ? {
          gridTemplateRows: template,
          gridTemplateColumns: "1fr",
        }
      : {
          gridTemplateColumns: template,
          gridTemplateRows: "1fr",
        };
  }, [isMobile, template]);

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
        // Desktop: horizontal row accordion.
        "h-[420px] md:h-[440px]",
        isMobile ? "h-[560px]" : "h-[420px]",
        className,
      )}
      style={{
        ...style,
        transition:
          "grid-template-columns 650ms cubic-bezier(0.2, 0.8, 0.2, 1), grid-template-rows 650ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: "grid-template-columns, grid-template-rows",
      }}
    >
      {items.map((item, idx) => {
        const active = idx === activeIndex;
        const title = item.title ?? `Imagen ${idx + 1}`;

        return (
          <button
            key={`${item.src}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative overflow-hidden bg-slate-100 dark:bg-slate-900/40 focus:outline-none",
              // Sin gaps, solo bordes sutiles.
              idx !== items.length - 1 && !isMobile ? "border-r border-white/10" : "",
              idx !== items.length - 1 && isMobile ? "border-b border-white/10" : "",
            )}
            aria-label={`Ver ${title}`}
          >
            <Image
              src={item.src}
              alt={title}
              fill
              quality={100}
              priority={active}
              sizes={
                isMobile
                  ? "90vw"
                  : "(min-width: 1024px) 20vw, (min-width: 768px) 28vw, 90vw"
              }
              className={cn(
                "object-cover transition-transform duration-700 ease-out",
                active ? "scale-[1.05]" : "scale-100",
              )}
            />

            {/* Overlay elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className={cn("text-sm font-semibold text-white drop-shadow")}>
                {item.title}
              </div>

              {item.description ? (
                <div
                  className={cn(
                    "mt-1 text-xs text-white/90 transition-all duration-500",
                    active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
                  )}
                >
                  {item.description}
                </div>
              ) : null}

              {/* CTA solo en activo */}
              {item.href && active ? (
                <div className="mt-3">
                  <Link
                    href={item.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center rounded-xl bg-[#0a5f80] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#0a5f80]/25 transition hover:bg-[#084c66]"
                  >
                    Ver detalle
                  </Link>
                </div>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}

