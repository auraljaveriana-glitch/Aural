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

/** Texto grande del hero. left o right ubican la caja del texto; top es el borde superior de la caja.
 *  lineas/alto: texto en varias líneas (Recargables) · degradado: color de izquierda a derecha */
export type Letras = {
  texto: string;
  tamano: number;
  top: number;
  left?: number;
  right?: number;
  espaciado?: number;
  lineas?: string[];
  alto?: number;
  degradado?: [string, string];
};

/** Subtítulo del hero ("TECNOLOGÍA" / "AUDÍFONOS") */
export type Subtitulo = Omit<Letras, "texto" | "lineas" | "alto" | "degradado"> & { texto?: string; color?: string };

/** Bloque de texto (diseño v3): etiqueta espaciada + título en negrita + párrafo justificado.
 *  y = tope de las mayúsculas de cada parte (px de Figma) */
export type Bloque = {
  etiqueta: string;
  titulo: string[];
  texto: string;
  left: number;
  ancho: number;
  color: string;
  etiquetaColor?: string;
  y: { etiqueta: number; titulo: number; texto: number };
  tamano: { etiqueta: number; titulo: number; tituloAlto?: number; texto: number; textoAlto: number };
  espaciado?: { etiqueta?: number; titulo?: number };
};

/** Letras enormes y casi transparentes detrás de los audífonos 2 y 3 (y = tope de las mayúsculas) */
export type Marca = { texto: string; left: number; y: number; tamano: number };

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
    tema?: "gris" | "beige" | "azul";
    letras: Letras;
    subtitulo: Subtitulo;
    /** Los 3 audífonos grandes. Al bajar, el audífono pasa de uno a otro. */
    dispositivos: [Dispositivo, Dispositivo, Dispositivo];
    bloque: Bloque;
    /** RIC: etiquetas ovaladas unidas por una línea */
    pildoras?: { items: string[]; left: number; ancho: number; alto: number; tops: number[]; lineaX: number };
    marcas?: Marca[];
    /** alto del panel y posición del acordeón (si cambian respecto a RIC) */
    panelAlto?: number;
    acordeonTop?: number;
    /** borde izquierdo del acordeón (px de Figma; por defecto 222) */
    acordeonLeft?: number;
    /** fondo del panel tomado del diseño (degradado suave sin audífonos ni textos) */
    fondo?: string;
    /** corrimiento vertical de la sección de modelos y de su fila de óvalos (px de Figma) */
    modelosExtra?: number;
    modelosFilaExtra?: number;
    /** fila "otros tipos": distancia de los nombres de modelos a la fila, y de la fila a la foto final */
    otros: { tras: number; antes: number };
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
      acordeonLeft: 150,
      fondo: "/img/audifonos/fondos/receptor-en-el-canal.webp",
      letras: { texto: "RIC", tamano: 500, top: 318.7, left: 622, espaciado: -0.04, degradado: ["#2b2a2a", "#8c8b8b"] },
      subtitulo: { texto: "Tecnología", tamano: 24, top: 568.2, left: 1285, espaciado: 0.5, color: "#333333" },
      dispositivos: [
        { src: "/img/audifonos/v3/ric-1.webp", left: 284, top: 277, ancho: 555 },
        disp("ric", 2, 1299, 1062, 220),
        { src: "/img/audifonos/v3/ric-3.webp", left: 1070, top: 2095, ancho: 600 },
      ],
      bloque: {
        etiqueta: "RIC",
        titulo: ["Equilibrio", "perfecto"],
        texto:
          "Estos audífonos ubican el receptor dentro del canal auditivo, permitiendo una experiencia de sonido más natural, cómoda y casi imperceptible en el día a día.",
        left: 150,
        ancho: 533,
        color: "#363636",
        y: { etiqueta: 1245, titulo: 1302, texto: 1508 },
        tamano: { etiqueta: 24, titulo: 66, tituloAlto: 75, texto: 24, textoAlto: 32 },
        espaciado: { etiqueta: 0.5, titulo: 0.01 },
      },
      pildoras: { items: ["Discreción", "Naturalidad", "Tecnología"], left: 856, ancho: 211, alto: 80, tops: [1144, 1420, 1716], lineaX: 1116 },
      marcas: [
        { texto: "RIC", left: 1170, y: 1570, tamano: 430 },
        { texto: "RIC", left: 1170, y: 2460, tamano: 430 },
      ],
      otros: { tras: 288, antes: 343 },
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
      acordeonLeft: 174,
      fondo: "/img/audifonos/fondos/retroauriculares.webp",
      letras: { texto: "BTE", tamano: 497, top: 306.2, right: 354, espaciado: 0.026, degradado: ["#2b2a2a", "#7d7c7c"] },
      subtitulo: { texto: "Tecnología", tamano: 29, top: 775.4, right: 385, espaciado: 0.75, color: "#333333" },
      dispositivos: [
        { src: "/img/audifonos/v3/bte-1.webp", left: 358, top: 215, ancho: 420 },
        disp("bte", 2, 1276, 1095, 420),
        { src: "/img/audifonos/v3/bte-3.webp", left: 1261, top: 2085, ancho: 434 },
      ],
      bloque: {
        etiqueta: "Diseño",
        titulo: ["Retroauricular"],
        texto:
          "Disponibles en diferentes diseños, los audífonos retroauriculares se ubican detrás de la oreja y se conectan al canal auditivo mediante un molde o tubo. Ofrecen una adaptación cómoda y versátil, con opciones para distintas necesidades auditivas.",
        left: 166,
        ancho: 775,
        color: "#363636",
        y: { etiqueta: 1271, titulo: 1324, texto: 1472 },
        tamano: { etiqueta: 33, titulo: 73, texto: 31, textoAlto: 40 },
        espaciado: { etiqueta: 0.33, titulo: 0.04 },
      },
      marcas: [
        { texto: "BTE", left: 1140, y: 1540, tamano: 423 },
        { texto: "BTE", left: 1140, y: 2500, tamano: 423 },
      ],
      modelosExtra: -20,
      otros: { tras: 329, antes: 335 },
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
      acordeonLeft: 221,
      tema: "beige",
      letras: { texto: "INTRACANAL", tamano: 151, top: 453.1, right: 290 },
      subtitulo: { tamano: 28, top: 622.6, right: 290 },
      dispositivos: [
        disp("intracanal", 1, 245, 369, 780),
        disp("intracanal", 1, 1000, 1212, 780),
        disp("intracanal", 2, 1026, 1950, 756),
      ],
      bloque: {
        etiqueta: "Estilo",
        titulo: ["Discreto"],
        texto:
          "Se adaptan parcial o completamente dentro del canal auditivo, ofreciendo una solución discreta y personalizada.",
        left: 265,
        ancho: 604,
        color: "#64463b",
        etiquetaColor: "#5c3d32",
        y: { etiqueta: 1290, titulo: 1344, texto: 1495 },
        tamano: { etiqueta: 31, titulo: 103, texto: 30.5, textoAlto: 40 },
        espaciado: { etiqueta: 0.33, titulo: 0.06 },
      },
      panelAlto: 2719,
      acordeonTop: 2076,
      modelosExtra: -59,
      modelosFilaExtra: -57,
      otros: { tras: 256, antes: 398 },
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
      acordeonLeft: 211,
      fondo: "/img/audifonos/fondos/recargables.webp",
      tema: "azul",
      // en Figma dice "RECAR / GABLE" (singular, en dos líneas)
      letras: {
        texto: "RECARGABLE",
        lineas: ["RECAR", "GABLE"],
        alto: 180,
        tamano: 200,
        top: 396.3,
        left: 792,
        degradado: ["#1b3358", "#7e8794"],
      },
      subtitulo: { tamano: 34, top: 342.6, left: 1117, espaciado: 0.66, color: "#041e42" },
      dispositivos: [
        disp("recargables", 1, 50, 273, 904),
        disp("recargables", 2, 752, 1146, 1168),
        disp("recargables", 3, 976, 1958, 860),
      ],
      bloque: {
        etiqueta: "Energía",
        titulo: ["Continua"],
        texto:
          "Disponibles en estilos BTE y RIC, nuestros audífonos recargables cuentan con baterías integradas que eliminan la necesidad de cambiar pilas.",
        left: 170,
        ancho: 677,
        color: "#041e42",
        y: { etiqueta: 1265, titulo: 1325, texto: 1508 },
        tamano: { etiqueta: 31, titulo: 113, texto: 29.5, textoAlto: 40 },
        espaciado: { etiqueta: 0.33, titulo: 0.06 },
      },
      otros: { tras: 309, antes: 335 },
    },
  },
];

/** Fila de enlaces a los otros tipos (orden del diseño v3, 17-nov-2026) */
export const otrosTipos: Record<string, { slug: string; etiqueta?: string; nombre: string }[]> = {
  "receptor-en-el-canal": [
    { slug: "retroauriculares", etiqueta: "BTE", nombre: "Retroauriculares" },
    { slug: "recargables", nombre: "Recargables" },
    { slug: "intracanal", etiqueta: "ITC/CIC", nombre: "Intracanal" },
  ],
  // en el diseño esta fila repetía "Retroauriculares"; Jean aprobó poner RIC en su lugar
  retroauriculares: [
    { slug: "receptor-en-el-canal", etiqueta: "RIC", nombre: "Receptor en el Canal" },
    { slug: "recargables", nombre: "Recargables" },
    { slug: "intracanal", etiqueta: "ITC/CIC", nombre: "Intracanal" },
  ],
  intracanal: [
    { slug: "retroauriculares", etiqueta: "BTE", nombre: "Retroauriculares" },
    { slug: "recargables", nombre: "Recargables" },
    { slug: "receptor-en-el-canal", etiqueta: "RIC", nombre: "Receptor en el Canal" },
  ],
  recargables: [
    { slug: "receptor-en-el-canal", etiqueta: "RIC", nombre: "Receptor en el Canal" },
    { slug: "retroauriculares", etiqueta: "BTE", nombre: "Retroauriculares" },
    { slug: "intracanal", etiqueta: "ITC/CIC", nombre: "Intracanal" },
  ],
};

export const tipoPorSlug = (slug: string) => tipos.find((t) => t.slug === slug);
