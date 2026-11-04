import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tipos, tipoPorSlug } from "@/content/audifonos";
import PanelAudifono from "@/components/audifonos/PanelAudifono";
import Modelos from "@/components/audifonos/Modelos";
import Cierre from "@/components/audifonos/Cierre";

type Props = { params: Promise<{ tipo: string }> };

// Solo se generan los tipos que ya tienen la plantilla completa (por ahora, RIC)
export function generateStaticParams() {
  return tipos.filter((t) => t.plantilla).map((t) => ({ tipo: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tipo = tipoPorSlug((await params).tipo);
  if (!tipo) return {};
  return {
    title: `Audífonos ${tipo.titulo.fuerte}${tipo.titulo.suave ? ` ${tipo.titulo.suave}` : ""}`,
    description: tipo.descripcion,
  };
}

export default async function PaginaAudifono({ params }: Props) {
  const tipo = tipoPorSlug((await params).tipo);
  if (!tipo?.plantilla) notFound();

  return (
    <div data-pagina="audifonos">
      <PanelAudifono tipo={tipo} />
      <Modelos tipo={tipo} />
      <Cierre />
    </div>
  );
}
