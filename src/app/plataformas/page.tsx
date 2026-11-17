import type { Metadata } from "next";
import Tarjetas from "@/components/plataformas/Tarjetas";
import Vitrina from "@/components/plataformas/Vitrina";
import { plataformas } from "@/content/plataformas";

export const metadata: Metadata = {
  title: "Plataformas Widex",
  description: "Conoce las plataformas de audífonos Widex: Allure, SmartRIC, Moment y Magnify.",
};

// Figma PLATAFORMAS: tarjetas de las 4 plataformas y debajo la vitrina de Allure
export default function PaginaPlataformas() {
  return (
    <div data-pagina="plataformas">
      <Tarjetas />
      <Vitrina plataforma={plataformas[0]} comoTitulo="h2" />
    </div>
  );
}
