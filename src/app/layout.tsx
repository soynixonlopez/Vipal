import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vipalpty.com"),
  title: "Vipal S.A. | Fingertips Solutions",
  description:
    "Soluciones profesionales en vidrio y aluminio en Panama City: ventanas corredizas, fachadas, puertas, divisiones de oficina, barandas y espejos decorativos.",
  icons: {
    icon: "/assets/logo/favicon.jpeg",
    shortcut: "/assets/logo/favicon.jpeg",
    apple: "/assets/logo/favicon.jpeg",
  },
  openGraph: {
    title: "Vipal S.A. | Fingertips Solutions",
    description:
      "Instalaciones premium en vidrio y aluminio para proyectos residenciales y corporativos.",
    type: "website",
    locale: "es_PA",
    images: [
      {
        url: "/assets/logo/vipallogo.png",
        width: 1024,
        height: 682,
        alt: "Vipal Glass - Fingertips Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipal S.A. | Fingertips Solutions",
    description:
      "Instalaciones premium en vidrio y aluminio para proyectos residenciales y corporativos.",
    images: ["/assets/logo/vipallogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className="dark"
      suppressHydrationWarning
    >
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <Navbar />
          <main className="fade-in min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
