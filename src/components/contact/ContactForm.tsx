"use client";

import { useState } from "react";
import { services } from "@/data/services";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Solicita tu cotización
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Completa el formulario y te responderemos con una propuesta a medida.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Nombre completo
          <input
            type="text"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Ej. Juan Pérez"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Teléfono
          <input
            type="tel"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Ej. 6834-3037"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
          Email
          <input
            type="email"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Ej. cliente@email.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
          Servicio de interés
          <select
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un servicio
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
          Mensaje
          <textarea
            required
            rows={5}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Cuéntanos sobre tu proyecto y objetivos."
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
      >
        Enviar solicitud
      </button>

      {sent && (
        <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
          Gracias. Tu solicitud fue registrada; este formulario está listo para
          conectarse a tu backend o email service.
        </p>
      )}
    </form>
  );
}
