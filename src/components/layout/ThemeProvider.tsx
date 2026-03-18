"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { ThemeMode } from "@/types";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Modo light eliminado: el sitio siempre queda en dark.
  const theme: ThemeMode = "dark";

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {},
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe utilizarse dentro de ThemeProvider");
  }
  return context;
}
