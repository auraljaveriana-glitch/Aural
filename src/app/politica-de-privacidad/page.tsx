import type { Metadata } from "next";
import PaginaLegal from "@/components/legal/PaginaLegal";
import { privacidad } from "@/content/legales";

export const metadata: Metadata = {
  title: privacidad.nombre,
  description: "Política de Privacidad y Tratamiento de Datos Personales de Aural Colombia S.A.S.",
};

export default function Pagina() {
  return (
    <div data-pagina="legal">
      <PaginaLegal pagina={privacidad} />
    </div>
  );
}
