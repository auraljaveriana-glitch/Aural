/**
 * Tipos de audífonos (páginas /audifonos/[tipo]).
 * Diseño: frames de Figma RIC, RETROAUDICULARES, INTRACANAL y RECARGABLES (nov-2026).
 * Todas las medidas están en px de Figma (página de 1920 de ancho).
 * Bluetooth no tiene página propia: su información va en Recargables ("Conectividad Bluetooth").
 */

/** foto: posición de la imagen respecto a su óvalo (334 × 277). negrita: parte del nombre en negrita */
export type Modelo = {
  nombre: string;
  imagen: string;
  negrita?: string;
  foto?: { left: number; top: number; ancho: number };
};

/** Audífono grande: borde superior izquierdo y ancho de la imagen, sobre el panel */
export type Dispositivo = { src: string; left: number; top: number; ancho: number };

/** Texto grande del hero. left o right ubican la caja del texto; top es el borde superior de la caja */
export type Letras = { texto: string; tamano: number; top: number; left?: number; right?: number; espaciado?: number };

export type TipoAudifono = {
  slug: string;
  titulo: { fuerte: string; suave?: string };
  descripcion: string;
  ideales: string[];
  beneficios: string[];
  modelosTitulo: { suave: string; fuerte: string };
  modelos: Modelo[];
  /** corrimiento horizontal de la fila de modelos (px de Figma) */
  modelosX?: number;
  plantilla: {
    tema?: "gris" | "beige";
    letras: Letras;
    subtitulo: Omit<Letras, "texto">;
    /** Los 3 audífonos grandes. Al bajar, el audífono pasa de uno a otro. */
    dispositivos: [Dispositivo, Dispositivo, Dispositivo];
    frase?: { normal: string; fuerte: string; ligera?: boolean; top: number; left: number };
    texto: { contenido: string; top: number; left: number; ancho: number };
  };
};

const foto = (archivo: string) => `/img/audifonos/modelos/${archivo}.webp`;
const disp = (carpeta: string, n: number, left: number, top: number, ancho: number): Dispositivo => ({
  src: `/img/audifonos/${carpeta}/${carpeta}-${n}.webp`,
  left,
  top,
  ancho,
});

export const tipos: TipoAudifono[] = [
  {
    slug: "receptor-en-el-canal",
    titulo: { fuerte: "Receptor en el Canal", suave: "(RIC / RITE)" },
    descripcion:
      "Discreción, naturalidad y tecnología en equilibrio perfecto. Estos audífonos ubican el receptor dentro del canal auditivo, permitiendo una experiencia de sonido más natural, cómoda y casi imperceptible en el día a día.",
    ideales: [
      "Pérdidas auditivas leves a severas",
      "Usuarios activos que buscan comodidad y estética",
      "Usuarios que priorizan discreción sin renunciar a calidad sonora",
    ],
    beneficios: [
      "Diseño moderno, ligero y casi invisible",
      "Sonido más natural y envolvente",
      "Mayor comodidad durante todo el día",
      "Adaptación precisa según tu perfil auditivo",
    ],
    modelosTitulo: { suave: "Audífonos", fuerte: "Receptor en canal RIC" },
    modelosX: 1,
    modelos: [
      { nombre: "RIC 10", negrita: "RIC", imagen: foto("ric-10"), foto: { left: -28.5, top: -30, ancho: 467 } },
      { nombre: "RIC 312 D", negrita: "RIC", imagen: foto("ric-312-d"), foto: { left: -15.2, top: -69.7, ancho: 375.5 } },
    ],
    plantilla: {
      letras: { texto: "RIC", tamano: 514, top: 304.5, left: 694 },
      subtitulo: { tamano: 34, top: 782.5, left: 752 },
      dispositivos: [disp("ric", 1, 291.5, 211, 663), disp("ric", 2, 1338.5, 1079, 220), disp("ric", 3, 1141, 2032, 663)],
      frase: { normal: "Discreción, naturalidad y tecnología en", fuerte: "equilibrio perfecto.", top: 1256.7, left: 223 },
      texto: {
        contenido:
          "Estos audífonos ubican el receptor dentro del canal auditivo, permitiendo una experiencia de sonido más natural, cómoda y casi imperceptible en el día a día.",
        top: 1456,
        left: 223,
        ancho: 746,
      },
    },
  },
  {
    slug: "retroauriculares",
    titulo: { fuerte: "Retroauriculares", suave: "(BTE)" },
    descripcion: "Se colocan detrás de la oreja y se conectan al oído mediante un molde o tubo.",
    ideales: [
      "Pérdidas auditivas leves a profundas",
      "Personas que buscan mayor potencia y durabilidad",
      "Usuarios que valoran facilidad de uso y durabilidad en su día a día",
    ],
    beneficios: [
      "Alta amplificación",
      "Fáciles de manipular",
      "Resistentes y confiables",
      "Adaptación personalizada según tu necesidad auditiva",
    ],
    modelosTitulo: { suave: "Audífonos", fuerte: "Retroauriculares" },
    modelosX: -5,
    modelos: [
      { nombre: "BTE R D", negrita: "BTE", imagen: foto("bte-r-d"), foto: { left: -41, top: -26, ancho: 429 } },
      { nombre: "BTE 13 D", negrita: "BTE", imagen: foto("bte-13-d"), foto: { left: -63, top: -18, ancho: 470 } },
      { nombre: "BTE 312", negrita: "BTE", imagen: foto("bte-312"), foto: { left: -82, top: -35, ancho: 455 } },
      { nombre: "IMPACT", negrita: "", imagen: foto("impact"), foto: { left: -38, top: -21, ancho: 411 } },
    ],
    plantilla: {
      letras: { texto: "BTE", tamano: 500, top: 305.8, right: 310, espaciado: 0.026 },
      subtitulo: { tamano: 33, top: 773.8, right: 344 },
      dispositivos: [disp("bte", 1, 342, 171, 469), disp("bte", 2, 1230, 1104, 433), disp("bte", 3, 1230, 2019, 433)],
      texto: {
        contenido: "Se colocan detrás de la oreja y se conectan al oído mediante un molde o tubo.",
        top: 1400,
        left: 243,
        ancho: 612,
      },
    },
  },
  {
    slug: "intracanal",
    titulo: { fuerte: "Intracanal", suave: "(ITC / CIC)" },
    descripcion:
      "Se adaptan parcial o completamente dentro del canal auditivo, ofreciendo una solución discreta y personalizada.",
    ideales: ["Pérdidas auditivas leves a moderadas", "Usuarios que buscan máxima discreción"],
    beneficios: [
      "Prácticamente invisibles",
      "Experiencia de sonido más natural y envolvente",
      "Ajuste personalizado para mayor comodidad y adaptación",
    ],
    modelosTitulo: { suave: "Audífonos", fuerte: "Intracanales" },
    modelosX: -5,
    modelos: [
      { nombre: "CIC M", negrita: "CIC", imagen: foto("cic-m"), foto: { left: 55, top: 68, ancho: 250 } },
      { nombre: "CIC", negrita: "CIC", imagen: foto("cic"), foto: { left: 41, top: 53, ancho: 257 } },
      { nombre: "XP", negrita: "XP", imagen: foto("xp"), foto: { left: 53, top: 69, ancho: 209 } },
    ],
    plantilla: {
      tema: "beige",
      letras: { texto: "INTRACANAL", tamano: 156, top: 451.3, right: 201 },
      subtitulo: { tamano: 34, top: 630.6, right: 200 },
      dispositivos: [
        disp("intracanal", 1, 244, 368, 783),
        disp("intracanal", 2, 1075, 1204, 687),
        disp("intracanal", 3, 1075, 2169, 687),
      ],
      texto: {
        contenido:
          "Se adaptan parcial o completamente dentro del canal auditivo, ofreciendo una solución discreta y personalizada.",
        top: 1402,
        left: 253,
        ancho: 632,
      },
    },
  },
  {
    slug: "recargables",
    titulo: { fuerte: "Recargables" },
    descripcion:
      "Disponibles en diferentes estilos (BTE y RIC), eliminan el uso de pilas y simplifican tu día a día. Con conectividad Bluetooth.",
    ideales: [
      "Personas con un estilo de vida activo y dinámico",
      "Usuarios que buscan practicidad sin complicaciones",
      "Quienes valoran opciones más sostenibles y modernas",
    ],
    beneficios: [
      "Olvídate de cambiar pilas",
      "Autonomía para todo el día con una sola carga",
      "Recarga fácil y segura durante la noche",
      "Alternativa más amigable con el medio ambiente",
    ],
    modelosTitulo: { suave: "Audífonos", fuerte: "Recargables" },
    modelosX: -5,
    modelos: [
      { nombre: "ALLURE", negrita: "ALLURE", imagen: foto("allure"), foto: { left: -31, top: -115, ancho: 409 } },
      { nombre: "BTE R D", negrita: "BTE", imagen: foto("bte-r-d-recargable"), foto: { left: -22, top: -11, ancho: 390 } },
      { nombre: "RIC R D", negrita: "RIC", imagen: foto("ric-r-d"), foto: { left: 7, top: -17, ancho: 412 } },
      { nombre: "SMARTRIC", negrita: "SMARTRIC", imagen: foto("smartric"), foto: { left: 22, top: -61, ancho: 351 } },
    ],
    plantilla: {
      // en Figma dice "RECARGABLE" (singular)
      letras: { texto: "RECARGABLE", tamano: 156, top: 451.3, right: 138, espaciado: 0.008 },
      subtitulo: { tamano: 33, top: 630.8, right: 159 },
      dispositivos: [
        disp("recargables", 1, 0, 261, 903),
        disp("recargables", 2, 707, 1113, 1213),
        disp("recargables", 3, 1092, 2085, 736),
      ],
      frase: { normal: "Conectividad", fuerte: "Bluetooth", ligera: true, top: 1317.7, left: 270 },
      texto: {
        contenido:
          "Conéctate de forma directa a tu celular, televisor y otros dispositivos, integrando tu audición a tu vida digital.",
        top: 1401,
        left: 266,
        ancho: 612,
      },
    },
  },
];

export const tipoPorSlug = (slug: string) => tipos.find((t) => t.slug === slug);
