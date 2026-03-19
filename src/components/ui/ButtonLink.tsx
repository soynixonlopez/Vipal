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
          "bg-[#0a5f80] text-white shadow-lg shadow-[#0a5f80]/25 hover:bg-[#084c66]",
        variant === "secondary" &&
          "border border-slate-300 bg-white/70 text-slate-900 hover:border-[#0a5f80] hover:text-[#0a5f80] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-[#4ea4c2] dark:hover:text-[#9cd2e4]",
        variant === "ghost" &&
          "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
        className,
      )}
    >
      {children}
    </Link>
  );
}
