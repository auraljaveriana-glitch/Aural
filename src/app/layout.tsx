import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.dominio),
  title: {
    default: "Aural Centros Auditivos | Vuelve a escuchar lo que más te importa",
    template: "%s | Aural Centros Auditivos",
  },
  description: site.descripcion,
};

export const viewport: Viewport = {
  themeColor: "#041e42",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
