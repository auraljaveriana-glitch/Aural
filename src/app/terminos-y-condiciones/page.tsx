import type { Metadata } from "next";
import PaginaLegal from "@/components/legal/PaginaLegal";
import { terminos } from "@/content/legales";

export const metadata: Metadata = {
  title: terminos.nombre,
  description: "Términos y Condiciones de Uso de Aural Colombia S.A.S.",
};

export default function Pagina() {
  return (
    <div data-pagina="legal">
      <PaginaLegal pagina={terminos} />
    </div>
  );
}
