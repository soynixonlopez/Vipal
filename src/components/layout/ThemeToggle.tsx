"use client";

import { Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  // En esta configuración el sitio siempre está en modo dark.
  useTheme();

  return (
    <button
      type="button"
      aria-label="Modo dark activo"
      disabled
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#12324c] bg-[#0a2035] text-slate-200 opacity-60 transition"
    >
      <Moon className="h-5 w-5" />
    </button>
  );
}
