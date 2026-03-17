export type ThemeMode = "light" | "dark";

export interface CompanyInfo {
  name: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  applications: string[];
  whyChoose: string[];
  image: string;
  featured?: boolean;
  category: "vidrio" | "aluminio" | "oficinas" | "decorativo";
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  serviceSlug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
