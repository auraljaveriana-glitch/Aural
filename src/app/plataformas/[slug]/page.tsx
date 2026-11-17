import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Vitrina from "@/components/plataformas/Vitrina";
import { plataformas, plataformaPorSlug } from "@/content/plataformas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return plataformas.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = plataformaPorSlug((await params).slug);
  if (!p) return {};
  return { title: `Widex ${p.nombre}`, description: p.descripcion };
}

export default async function PaginaPlataforma({ params }: Props) {
  const p = plataformaPorSlug((await params).slug);
  if (!p) notFound();
  return (
    <div data-pagina="plataforma">
      <Vitrina plataforma={p} />
    </div>
  );
}
