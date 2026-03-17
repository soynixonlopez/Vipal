interface StatsSectionProps {
  items: { label: string; value: string }[];
}

export function StatsSection({ items }: StatsSectionProps) {
  return (
    <section className="container-custom py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-3xl font-bold text-slate-900">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {item.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
