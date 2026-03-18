"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { company, navLinks } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-[#12324c]/70 dark:bg-[#071826]/60">
      <div className="container-custom flex h-20 items-center justify-between">
        <Link href="/" className="group">
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {company.name}
          </p>
          <p className="text-xs uppercase tracking-widest text-emerald-700">
            {company.slogan}
          </p>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <ButtonLink href="/contacto">Solicitar cotización</ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden dark:border-[#12324c] dark:bg-[#071826]/80">
          <nav className="grid gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/contacto" className="mt-2 w-full">
              Solicitar cotización
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
