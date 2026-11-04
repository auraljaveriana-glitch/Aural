/**
 * Configuración general del sitio.
 * Todo el contenido vive en /src/content para poder migrarlo a Sanity
 * sin tocar los componentes: cada objeto tiene la forma de un documento.
 */

export const site = {
  nombre: "Aural Centros Auditivos",
  dominio: "https://www.auralcolombia.com",
  descripcion:
    "Especialistas en salud auditiva con más de 60 años de experiencia. Exámenes audiológicos, prueba y adaptación de audífonos Widex en Colombia.",

  // Sistema de agendamiento de Aural (confirmado por Jean, 1-nov-2026)
  agendarUrl: "https://agendaaural.netlify.app/",
  valoracionUrl: "https://agendaaural.netlify.app/",

  contacto: {
    // Confirmado por Jean (30-oct-2026)
    lineaNacional: "601 794 4497",
    lineaNacionalTel: "+576017944497",
    email: "info@auralcolombia.com",
  },

  redes: {
    // Usuario confirmado por Jean: auralcolombiaoficial en las tres redes
    facebook: "https://www.facebook.com/auralcolombiaoficial",
    instagram: "https://www.instagram.com/auralcolombiaoficial",
    youtube: "https://www.youtube.com/@auralcolombiaoficial",
  },
};

export type NavItem = { label: string; href: string };

// Menú del diseño "INICIO PAG"
export const navegacion: NavItem[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Audífonos", href: "/audifonos" },
];

export const footer = {
  servicios: [
    { label: "Exámenes Auditivos", href: "/#servicios" },
    { label: "Prueba de Audífonos", href: "/#servicios" },
    { label: "Adaptación Profesional", href: "/#servicios" },
    { label: "Entrenamiento Auditivo", href: "/#servicios" },
  ],
  soluciones: [
    { label: "Audífonos Retroauriculares", href: "/audifonos/retroauriculares" },
    { label: "Audífonos RIC / RITE", href: "/audifonos/receptor-en-el-canal" },
    { label: "Audífonos Recargables", href: "/audifonos/recargables" },
    { label: "Audífonos Bluetooth", href: "/audifonos/recargables" }, // Bluetooth va dentro de Recargables
  ],
  legales: [
    { label: "Política de Privacidad", href: "/politica-de-privacidad" },
    { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
    { label: "Tratamiento de Datos", href: "/tratamiento-de-datos" },
  ],
};

export type Centro = { nombre: string; direccion: string };
export type Sede = {
  ciudad: string;
  sigla: string;
  centros: Centro[];
  /** punta del pin, en px de Figma sobre el mapa (731 × 1024) */
  pin: { x: number; y: number; escala?: number };
  /** etiqueta amarilla, en px de Figma desde la esquina de la sección.
   *  lado "izq": la etiqueta queda a la izquierda del pin y x es su borde derecho
   *  (en Figma, Cartagena: 72 → 417); lado "der": x es su borde izquierdo. */
  etiqueta: { lado: "izq" | "der"; x: number; top: number };
};

// Direcciones entregadas por Jean (29-oct-2026). Sin teléfonos, por indicación suya.
// TODO: confirmar las siglas de cada ciudad.
export const sedes: Sede[] = [
  {
    ciudad: "Bogotá",
    sigla: "BOG",
    pin: { x: 320.5, y: 529 }, etiqueta: { lado: "der", x: 610, top: 572 },
    centros: [
      { nombre: "Usaquén", direccion: "Carrera 7 # 119-50, local 3" },
      { nombre: "Javeriana", direccion: "Carrera 7 # 45-10, local 2" },
      { nombre: "Plaza Central", direccion: "Carrera 65 # 11-50, local 2-50" },
      { nombre: "C.C. Paseo Villa del Río", direccion: "Diagonal 57C Sur # 62-60, local 202" },
      { nombre: "C.C. Nuestro Bogotá", direccion: "Av. Carrera 86 # 55A-75, local 2-282" },
    ],
  },
  {
    ciudad: "Medellín",
    sigla: "MDE",
    pin: { x: 253, y: 444 }, etiqueta: { lado: "izq", x: 427, top: 575 },
    centros: [{ nombre: "El Poblado", direccion: "Calle 10 # 43D-76" }],
  },
  {
    ciudad: "Cali",
    sigla: "CLO",
    pin: { x: 202.5, y: 608 }, etiqueta: { lado: "der", x: 488, top: 717 },
    centros: [
      { nombre: "Tequendama", direccion: "Carrera 50 con Av. Roosevelt # 5D-37" },
      { nombre: "C.C. Centenario", direccion: "Avenida 4 Norte # 7-46, local 214" },
    ],
  },
  {
    ciudad: "Barranquilla",
    sigla: "BAQ",
    pin: { x: 288.5, y: 213, escala: 0.69 }, etiqueta: { lado: "izq", x: 466, top: 350 },
    centros: [{ nombre: "Parque Washington", direccion: "Carrera 53 # 80-198" }],
  },
  {
    ciudad: "Cartagena",
    sigla: "CTG",
    pin: { x: 250.5, y: 290 }, etiqueta: { lado: "izq", x: 417, top: 410 },
    centros: [{ nombre: "Bocagrande", direccion: "Calle 6 # 4-20, local 2-07, C.C. La Estación" }],
  },
];

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/${encodeURIComponent(q)}`;
