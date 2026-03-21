"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface StatsSectionProps {
  items: { label: string; value: string }[];
}

type ValueKind = "plus" | "percent" | "slash" | "plain";

interface ParsedValue {
  kind: ValueKind;
  target: number;
  suffix?: string;
  rightSide?: string;
  raw: string;
}

function parseValue(raw: string): ParsedValue {
  const plus = raw.match(/^(\d+)\+$/);
  if (plus) {
    return { kind: "plus", target: Number(plus[1]), suffix: "+", raw };
  }

  const percent = raw.match(/^(\d+)%$/);
  if (percent) {
    return { kind: "percent", target: Number(percent[1]), suffix: "%", raw };
  }

  const slash = raw.match(/^(\d+)\/(\d+)$/);
  if (slash) {
    return {
      kind: "slash",
      target: Number(slash[1]),
      rightSide: slash[2],
      raw,
    };
  }

  return { kind: "plain", target: 0, raw };
}

function formatValue(parsed: ParsedValue, current: number) {
  if (parsed.kind === "plain") return parsed.raw;
  if (parsed.kind === "slash") return `${current}/${parsed.rightSide}`;
  return `${current}${parsed.suffix ?? ""}`;
}

export function StatsSection({ items }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState<string[]>(() => items.map(() => "0"));

  const parsedValues = useMemo(() => items.map((item) => parseValue(item.value)), [items]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const durationMs = 1400;
    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValues(
        parsedValues.map((parsed) => {
          if (parsed.kind === "plain") return parsed.raw;
          const next = Math.round(parsed.target * eased);
          return formatValue(parsed, next);
        }),
      );

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [visible, parsedValues]);

  return (
    <section ref={sectionRef} className="container-custom py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <article
            key={item.label}
            className={`interactive-card reveal-on-scroll rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#12324c] dark:bg-[#0a2035] ${
              visible ? "is-visible" : ""
            }`}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {values[index] ?? item.value}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {item.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
