"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FaqItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <article
            key={item.id}
            className="interactive-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {item.question}
              </h3>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-slate-500 transition dark:text-slate-400",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.answer}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
