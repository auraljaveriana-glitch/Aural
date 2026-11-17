/**
 * Plataformas Widex (Figma "PLATAFORMAS" y las vistas ALLURE RIC / ALLURE BTE / MOMENT RIC / SMART RIC, nov-2026).
 * PENDIENTE: Jean exporta las fotos grandes de los audífonos en PNG transparente (hoy son recortes del diseño),
 * el diseño de Magnify y los textos propios de SmartRIC (en el diseño repite los de Allure).
 */

export type Caracteristica = { nombre: string; titulo: string; texto: string };

export type Plataforma = {
  slug: string;
  nombre: string; // como va en la tarjeta (ALLURE, SMART RIC…)
  titulo: { suave: string; fuerte: string; marca?: boolean }; // WIDEX + ALLURE + ™
  descripcion: string;
  caracteristicas: Caracteristica[];
  /** foto grande por estilo (RIC / BTE) */
  estilos: { nombre: "RIC" | "BTE"; imagen: string }[];
  galeria: string[];
  tarjeta: { imagen: string; lineas: string[]; y: { etiqueta: number; titulo: number; boton: number }; x: { texto: number; boton: number } };
  temporal?: boolean;
};

const img = (n: string) => `/img/plataformas/${n}.webp`;

const textosAllure = {
  descripcion:
    "Una experiencia auditiva diseñada para disfrutar de conversaciones claras y mantenerte conectado con tu entorno.",
  caracteristicas: [
    { nombre: "Procesamiento", titulo: "Chip W1", texto: "Procesamiento rápido para una experiencia sonora más natural." },
    {
      nombre: "Conversaciones",
      titulo: "Speech Enhancer Pro",
      texto: "Mejora la claridad del habla y ayuda a gestionar el ruido.",
    },
    { nombre: "Claridad", titulo: "PureSound™", texto: "Tecnología ZeroDelay™ para un habla nítida y menos distorsión." },
    {
      nombre: "Personalización",
      titulo: "App Widex Allure",
      texto: "Ajustes de sonido, transmisión de audio y asistentes con IA.",
    },
  ],
};

export const plataformas: Plataforma[] = [
  {
    slug: "allure",
    nombre: "Allure",
    titulo: { suave: "Widex", fuerte: "Allure", marca: true },
    ...textosAllure,
    estilos: [
      { nombre: "RIC", imagen: img("temp-allure-ric") },
      { nombre: "BTE", imagen: img("temp-allure-bte") },
    ],
    galeria: [1, 2, 3, 4].map((i) => img(`galeria-allure-${i}`)),
    tarjeta: { imagen: img("tarjeta-allure"), lineas: ["Allure"], y: { etiqueta: 502, titulo: 532, boton: 692 }, x: { texto: 138, boton: 132 } },
  },
  {
    slug: "smartric",
    nombre: "SmartRIC",
    titulo: { suave: "Widex", fuerte: "SmartRIC", marca: true },
    // en el diseño de SmartRIC los textos son los mismos de Allure (temporales)
    ...textosAllure,
    estilos: [{ nombre: "RIC", imagen: img("temp-smartric-ric") }],
    galeria: [1, 2, 3, 4].map((i) => img(`galeria-smartric-${i}`)),
    tarjeta: {
      imagen: img("tarjeta-smartric"),
      lineas: ["Smart", "RIC"],
      y: { etiqueta: 510, titulo: 543, boton: 699 },
      x: { texto: 577, boton: 567 },
    },
    temporal: true,
  },
  {
    slug: "moment",
    nombre: "Moment",
    titulo: { suave: "Widex", fuerte: "Moment" },
    descripcion:
      "Tecnología para un sonido natural. Integra tecnologías avanzadas de procesamiento digital que optimizan la reproducción del sonido y ofrecen una experiencia auditiva más natural y personalizada.",
    caracteristicas: [
      {
        nombre: "Tecnología",
        titulo: "PureSound™",
        texto: "Procesamiento de baja latencia para una reproducción sonora más natural.",
      },
      { nombre: "Procesamiento", titulo: "ZeroDelay™", texto: "Minimiza el retraso entre el sonido natural y el amplificado." },
      {
        nombre: "Adaptación",
        titulo: "TruAcoustics™",
        texto: "Ajusta el procesamiento acústico según las características del oído y el acoplamiento del audífono.",
      },
      {
        nombre: "Personalización",
        titulo: "SoundSense",
        texto: "Permite personalizar los ajustes auditivos según las preferencias y necesidades de cada usuario.",
      },
    ],
    estilos: [{ nombre: "RIC", imagen: img("temp-moment-ric") }],
    galeria: [1, 2, 3].map((i) => img(`galeria-moment-${i}`)),
    tarjeta: { imagen: img("tarjeta-moment"), lineas: ["Moment"], y: { etiqueta: 513, titulo: 545, boton: 702 }, x: { texto: 1005, boton: 1003 } },
  },
  {
    slug: "magnify",
    nombre: "Magnify",
    titulo: { suave: "Widex", fuerte: "Magnify" },
    // sin diseño propio todavía: misma plantilla con textos temporales
    ...textosAllure,
    estilos: [{ nombre: "RIC", imagen: img("tarjeta-magnify") }],
    galeria: [],
    tarjeta: { imagen: img("tarjeta-magnify"), lineas: ["Magnify"], y: { etiqueta: 513, titulo: 545, boton: 702 }, x: { texto: 1437, boton: 1420 } },
    temporal: true,
  },
];

export const plataformaPorSlug = (slug: string) => plataformas.find((p) => p.slug === slug);
