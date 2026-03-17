interface SectionHeaderProps {
  badge?: string;
  title: string;
  description: string;
  center?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  center = false,
}: SectionHeaderProps) {
  return (
    <header className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {badge && (
        <p className="mb-3 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
          {badge}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </header>
  );
}
