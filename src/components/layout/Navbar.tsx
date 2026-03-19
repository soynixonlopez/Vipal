"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#12324c]/70 bg-[#071826]/90 backdrop-blur-xl">
      <div className="container-custom flex h-20 items-center justify-between">
        <Link href="/" className="group shrink-0">
          <Image
            src="/assets/logo/vipallogo.png"
            alt="Vipal Glass"
            width={999}
            height={278}
            priority
            className="h-12 w-auto max-w-[62vw] object-contain md:h-14 md:max-w-[36vw]"
          />
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition hover:text-emerald-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/contacto">Solicitar cotización</ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#12324c] bg-[#0a2035] text-slate-200"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#12324c] bg-[#071826]/95 px-6 py-5 md:hidden">
          <nav className="grid gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-200"
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
