import type { Metadata } from "next";
import Proceso from "@/components/proceso/Proceso";

export const metadata: Metadata = {
  title: "Conoce el proceso",
  description:
    "Así es tu camino hacia una mejor audición: 5 pasos acompañados por profesionales, desde tu primera consulta hasta que te sientas cómodo escuchando.",
};

export default function PaginaProceso() {
  return (
    <div data-pagina="proceso">
      <Proceso />
    </div>
  );
}
