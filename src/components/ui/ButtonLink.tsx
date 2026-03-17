import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-300",
        variant === "primary" &&
          "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500",
        variant === "secondary" &&
          "border border-slate-300 bg-white/70 text-slate-900 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-300",
        variant === "ghost" &&
          "text-slate-700 hover:bg-slate-200/70 dark:text-slate-200 dark:hover:bg-slate-800/80",
        className,
      )}
    >
      {children}
    </Link>
  );
}
