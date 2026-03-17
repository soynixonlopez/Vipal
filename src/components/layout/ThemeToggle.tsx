"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-slate-700 transition aria-disabled cursor-default"
      aria-label="Modo claro activo"
      aria-disabled="true"
    >
      <Sun className="h-5 w-5" />
    </button>
  );
}
