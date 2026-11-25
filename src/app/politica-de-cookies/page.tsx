import type { Metadata } from "next";
import PaginaLegal from "@/components/legal/PaginaLegal";
import { cookies } from "@/content/legales";

export const metadata: Metadata = {
  title: cookies.nombre,
  description: "Política de Cookies de Aural Colombia S.A.S.",
};

export default function Pagina() {
  return (
    <div data-pagina="legal">
      <PaginaLegal pagina={cookies} />
    </div>
  );
}
