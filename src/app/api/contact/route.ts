import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload) {
  if (!payload.name || !payload.phone || !payload.email || !payload.service || !payload.message) {
    return "Todos los campos son obligatorios.";
  }
  if (!EMAIL_REGEX.test(payload.email)) {
    return "El correo electronico no es valido.";
  }
  return null;
}

export async function POST(request: Request) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "465");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL ?? "info@vipalglasspanama.com";
  const senderEmail = process.env.CONTACT_SENDER_EMAIL ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !senderEmail) {
    return NextResponse.json(
      {
        error:
          "Faltan variables SMTP. Configura SMTP_HOST, SMTP_PORT, SMTP_USER y SMTP_PASS en .env.local.",
      },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Solicitud invalida." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: normalize(body.name),
    phone: normalize(body.phone),
    email: normalize(body.email),
    service: normalize(body.service),
    message: normalize(body.message),
  };

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const subject = `Nueva cotizacion web - ${payload.service}`;
  const text = [
    "Nueva solicitud de cotizacion",
    "",
    `Nombre: ${payload.name}`,
    `Telefono: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Servicio: ${payload.service}`,
    "",
    "Mensaje:",
    payload.message,
  ].join("\n");

  const html = `
    <h2>Nueva solicitud de cotizacion</h2>
    <p><strong>Nombre:</strong> ${payload.name}</p>
    <p><strong>Telefono:</strong> ${payload.phone}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Servicio:</strong> ${payload.service}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Vipal Web" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se pudo enviar el correo. Verifica la configuracion SMTP." },
      { status: 500 },
    );
  }
}
