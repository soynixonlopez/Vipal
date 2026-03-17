"use client";

import { useMemo, useState } from "react";
import { Service } from "@/types";
import { ServiceGrid } from "./ServiceGrid";

interface ServicesExplorerProps {
  items: Service[];
}

export function ServicesExplorer({ items }: ServicesExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("todas");

  const categories = useMemo(
    () => ["todas", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesCategory =
          category === "todas" || item.category === category;
        const normalizedQuery = query.trim().toLowerCase();
        if (!matchesCategory) return false;
        if (!normalizedQuery) return true;
        return (
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.shortDescription.toLowerCase().includes(normalizedQuery)
        );
      }),
    [items, category, query],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500"
              }`}
            >
              {cat === "todas"
                ? "Todos"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="w-full md:w-64">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar servicio..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-emerald-500"
          />
        </div>
      </div>

      <ServiceGrid items={filtered} />
    </div>
  );
}

