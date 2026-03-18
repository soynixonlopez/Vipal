import { CompanyInfo } from "@/types";

export const company: CompanyInfo = {
  name: "Vipal S.A.",
  slogan: "Fingertips Solutions",
  phone: "6834-3037",
  whatsapp: "50768343037",
  email: "vipalpty@gmail.com",
  location: "Panama City",
};

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Cotización" },
];

export const stats = [
  { label: "Proyectos ejecutados", value: "200+" },
  { label: "Años de experiencia", value: "12+" },
  { label: "Atención personalizada", value: "100%" },
  { label: "Cobertura en Panama City", value: "24/7" },
];

export const whyChooseUs = [
  "Diseños a medida alineados con arquitectura residencial y comercial.",
  "Instalación profesional con enfoque en seguridad, durabilidad y acabados.",
  "Asesoría técnica clara para elegir materiales y soluciones correctas.",
  "Compromiso con tiempos, limpieza de obra y comunicación constante.",
];

export const processSteps = [
  {
    title: "Levantamiento y asesoría",
    description:
      "Evaluamos el espacio, necesidades y estilo del proyecto para proponer la mejor solución.",
  },
  {
    title: "Propuesta y cotización",
    description:
      "Entregamos una cotización clara con alcance, materiales recomendados y tiempos estimados.",
  },
  {
    title: "Fabricación e instalación",
    description:
      "Ejecutamos con precisión técnica, mano de obra especializada y control de calidad en cada detalle.",
  },
  {
    title: "Entrega y seguimiento",
    description:
      "Validamos acabados, funcionamiento y satisfacción para garantizar una experiencia premium.",
  },
];
