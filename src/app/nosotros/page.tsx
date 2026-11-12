import type { Metadata } from "next";
import Nosotros from "@/components/nosotros/Nosotros";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Aural nació en España con una idea clara: que cada persona reciba atención auditiva cercana y profesional. Hoy somos una red de centros respaldada por Widex en Colombia.",
};

export default function PaginaNosotros() {
  return (
    <div data-pagina="nosotros">
      <Nosotros />
    </div>
  );
}
