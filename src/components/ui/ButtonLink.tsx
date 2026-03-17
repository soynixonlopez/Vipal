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
          "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500",
        variant === "secondary" &&
          "border border-slate-300 bg-white/70 text-slate-900 hover:border-emerald-500 hover:text-emerald-700",
        variant === "ghost" &&
          "text-slate-700 hover:bg-slate-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
