/**
 * Tipos de audífonos (página /audifonos/[tipo]).
 * Textos tomados del diseño de Figma ("informe" → frames "Audifonos").
 *
 * Imágenes pendientes: el límite de Figma impidió exportarlas automáticamente.
 * Ver README.md → "Imágenes pendientes de Audífonos".
 */

export type Modelo = { nombre: string; imagen: string };
export type Dispositivo = { src: string; left: number; top: number; ancho: number };

export type TipoAudifono = {
  slug: string;
  pestana: { fuerte: string; suave?: string };
  titulo: { fuerte: string; suave?: string };
  descripcion: string;
  ideales: string[];
  beneficios: string[];
  modelosTitulo: { suave: string; fuerte: string };
  modelos: Modelo[];
  banner: string;
  icono: string;
  tarjeta: string; // imagen de la tarjeta en Inicio
  tarjetaTitulo: { fuerte: string; suave?: string };
  /** Plantilla "RIC" de Figma. Solo los tipos que la tienen completa generan página. */
  plantilla?: {
    sigla: string; // letras grandes del hero
    /** Los 3 audífonos grandes, en px de Figma sobre el panel (1920 de ancho):
     *  borde superior izquierdo y ancho de la imagen. Al bajar, el audífono pasa de uno a otro. */
    dispositivos: [Dispositivo, Dispositivo, Dispositivo];
    frase?: { normal: string; fuerte: string };
    texto: string;
  };
};

const m = (nombre: string): Modelo => ({
  nombre,
  imagen: `/img/audifonos/modelos/${nombre.toLowerCase().replace(/\s+/g, "-")}.webp`,
});

export const tipos: TipoAudifono[] = [
  {
    slug: "retroauriculares",
    pestana: { fuerte: "Retroauriculares", suave: "(BTE)" },
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
    modelos: [m("BTE R D"), m("BTE 13 D"), m("BTE 312"), m("Impact")],
    banner: "/figma/audifonos/retroauriculares/banner.png",
    icono: "/figma/audifonos/retroauriculares/icono.svg",
    tarjeta: "/figma/soluciones/retroauriculares.png",
    tarjetaTitulo: { fuerte: "Audífonos Retroauriculares", suave: "(BTE)" },
  },
  {
    slug: "receptor-en-el-canal",
    pestana: { fuerte: "Receptor en el Canal", suave: "(RIC / RITE)" },
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
    modelos: [m("RIC 10"), m("RIC 312 D")],
    banner: "/figma/audifonos/receptor-en-el-canal/banner.png",
    icono: "/figma/audifonos/receptor-en-el-canal/icono.svg",
    tarjeta: "/figma/soluciones/receptor-en-el-canal.png",
    tarjetaTitulo: { fuerte: "Audífonos Receptor en el Canal", suave: "(RIC / RITE)" },
    plantilla: {
      sigla: "RIC",
      dispositivos: [
        { src: "/img/audifonos/ric/ric-1.webp", left: 291.5, top: 211, ancho: 663 },
        { src: "/img/audifonos/ric/ric-2.webp", left: 1338.5, top: 1079, ancho: 220 },
        { src: "/img/audifonos/ric/ric-3.webp", left: 1141, top: 2032, ancho: 663 },
      ],
      frase: { normal: "Discreción, naturalidad y tecnología en", fuerte: "equilibrio perfecto." },
      texto:
        "Estos audífonos ubican el receptor dentro del canal auditivo, permitiendo una experiencia de sonido más natural, cómoda y casi imperceptible en el día a día.",
    },
  },
  {
    slug: "intracanal",
    pestana: { fuerte: "Intracanal", suave: "(ITC / CIC)" },
    titulo: { fuerte: "Intracanal", suave: "(ITC / CIC)" },
    descripcion:
      "Se adaptan parcial o completamente dentro del canal auditivo, ofreciendo una solución discreta y personalizada.",
    ideales: ["Pérdidas auditivas leves a moderadas", "Usuarios que buscan máxima discreción"],
    beneficios: [
      "Prácticamente invisibles",
      "Experiencia de sonido más natural y envolvente",
      "Ajuste personalizado para mayor comodidad y adaptación",
    ],
    modelosTitulo: { suave: "Audífonos", fuerte: "Intracanal (ITC / CIC)" },
    modelos: [m("CIC-M"), m("CIC"), m("XP")],
    banner: "/figma/audifonos/intracanal/banner.png",
    icono: "/figma/audifonos/intracanal/icono.svg",
    tarjeta: "/figma/soluciones/intracanal.png",
    tarjetaTitulo: { fuerte: "Audífonos Intracanal", suave: "(ITC / CIC)" },
  },
  {
    slug: "recargables",
    pestana: { fuerte: "Recargables" },
    titulo: { fuerte: "Recargables" },
    descripcion:
      "Disponibles en diferentes estilos (BTE y RIC), eliminan el uso de pilas y simplifican tu día a día.",
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
    modelos: [m("BTE R D"), m("RIC R D"), m("Smartric")],
    banner: "/figma/audifonos/recargables/banner.png",
    icono: "/figma/audifonos/recargables/icono.svg",
    tarjeta: "/figma/soluciones/recargables.png",
    tarjetaTitulo: { fuerte: "Audífonos Recargables" },
  },
  {
    slug: "bluetooth",
    pestana: { fuerte: "Conectividad Bluetooth" },
    titulo: { fuerte: "Conectividad Bluetooth" },
    descripcion:
      "Conéctate de forma directa a tu celular, televisor y otros dispositivos, integrando tu audición a tu vida digital.",
    ideales: [
      "Personas que usan su celular de forma frecuente en el día a día",
      "Usuarios que disfrutan llamadas, música y contenido multimedia",
      "Quienes buscan una experiencia más conectada y práctica",
    ],
    beneficios: [
      "Transmisión directa del sonido a tus audífonos",
      "Llamadas más claras sin necesidad de accesorios adicionales",
      "Disfruta música, videos y TV con mayor calidad y detalle",
      "Control fácil y discreto desde tu celular",
    ],
    // En Figma este título dice "Audífonos Recargables" (parece copiado del frame anterior)
    modelosTitulo: { suave: "Audífonos con", fuerte: "Conectividad Bluetooth" },
    modelos: [m("BTE R D"), m("RIC 312 D"), m("Smartric"), m("RIC R D")],
    banner: "/figma/audifonos/bluetooth/banner.png",
    icono: "/figma/audifonos/bluetooth/icono.svg",
    tarjeta: "/figma/soluciones/bluetooth.png",
    tarjetaTitulo: { fuerte: "Audífonos con Conectividad Bluetooth" },
  },
];

export const tipoPorSlug = (slug: string) => tipos.find((t) => t.slug === slug);
