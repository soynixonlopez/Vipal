"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  // En esta configuración el sitio siempre está en modo dark.
  useTheme();

  return (
    <button
      type="button"
      aria-label="Modo dark activo"
      disabled
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-slate-700 opacity-60 transition hover:bg-white dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
    >
      <Moon className="h-5 w-5" />
    </button>
  );
}
