/**
 * Tarjetas "Un diseño perfecto para cada oído y estilo de vida" (INICIO PAG).
 * `img` = posición de la foto dentro de la tarjeta, en px de Figma sobre una
 * tarjeta de 784 × 377 (medido de la exportación a 1920 px).
 */
export type Solucion = {
  slug: string;
  titulo: string; // "\n" = salto de línea como en Figma
  sigla: string; // vacío = sin sigla (Recargables)
  foto: string;
  img: { left: number; top: number; width: number };
};

export const soluciones: Solucion[] = [
  {
    slug: "retroauriculares",
    titulo: "Retroauriculares",
    sigla: "(BTE)",
    foto: "/img/soluciones/bte.png",
    img: { left: 458, top: -44, width: 342 },
  },
  {
    slug: "receptor-en-el-canal",
    titulo: "Receptor en\ncanal",
    sigla: "(RIC)",
    foto: "/img/soluciones/ric.png",
    img: { left: 403, top: -11, width: 349 },
  },
  {
    slug: "intracanal",
    titulo: "Intracanal",
    sigla: "(ITC/CIC)",
    // diseño v2 (nov-2026): par de audífonos color piel, la misma foto del hero de su página
    foto: "/img/audifonos/intracanal/intracanal-1.webp",
    img: { left: 365, top: 73, width: 376 },
  },
  {
    slug: "recargables",
    titulo: "Recargables",
    sigla: "",
    foto: "/img/soluciones/recargables.png",
    img: { left: 98, top: -49, width: 838 },
  },
];
