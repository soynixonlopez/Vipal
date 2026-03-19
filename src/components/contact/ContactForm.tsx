"use client";

import { FormEvent, useState } from "react";
import { services } from "@/data/services";

interface ContactFormProps {
  defaultServiceName?: string;
}

export function ContactForm({ defaultServiceName }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [serviceInterest, setServiceInterest] = useState(defaultServiceName ?? "");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(false);
    setErrorMessage("");
    setSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          data?.error ?? "No se pudo enviar la cotizacion. Intenta de nuevo.",
        );
      }

      setSent(true);
      form.reset();
      setServiceInterest(defaultServiceName ?? "");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrio un error al enviar el formulario.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      onSubmit={handleSubmit}
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
            name="name"
            type="text"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0a5f80] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Ej. Juan Pérez"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Teléfono
          <input
            name="phone"
            type="tel"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0a5f80] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Ej. 6834-3037"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0a5f80] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Ej. cliente@email.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
          Servicio de interés
          <select
            name="service"
            required
            value={serviceInterest}
            onChange={(event) => setServiceInterest(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0a5f80] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
            name="message"
            required
            rows={5}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0a5f80] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Cuéntanos sobre tu proyecto y objetivos."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-5 inline-flex rounded-xl bg-[#0a5f80] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#084c66]"
      >
        {sending ? "Enviando..." : "Enviar solicitud"}
      </button>

      {errorMessage && (
        <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
      )}

      {sent && (
        <p className="mt-4 text-sm text-[#0a5f80] dark:text-[#9cd2e4]">
          Gracias. Tu solicitud fue enviada correctamente a nuestro correo.
        </p>
      )}
    </form>
  );
}
