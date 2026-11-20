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
  agendarUrl: "https://auralagenda.netlify.app/",
  valoracionUrl: "https://auralagenda.netlify.app/",

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

export type NavEnlace = { label: string; href: string; etiqueta?: string };
export type NavItem = { label: string; href: string; grupos?: { titulo: string; enlaces: NavEnlace[] }[] };

// Menú del diseño "INICIO PAG". Audífonos abre un desplegable (pedido de Jean, 19-nov-2026)
export const navegacion: NavItem[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/#servicios" },
  {
    label: "Audífonos",
    href: "/audifonos",
    grupos: [
      {
        titulo: "Audífonos",
        enlaces: [
          { label: "Receptor en el Canal", etiqueta: "RIC", href: "/audifonos/receptor-en-el-canal" },
          { label: "Retroauriculares", etiqueta: "BTE", href: "/audifonos/retroauriculares" },
          { label: "Intracanal", etiqueta: "ITC/CIC", href: "/audifonos/intracanal" },
          { label: "Recargables", href: "/audifonos/recargables" },
        ],
      },
      {
        titulo: "Plataformas",
        enlaces: [
          { label: "Allure", href: "/plataformas/allure" },
          { label: "SmartRIC", href: "/plataformas/smartric" },
          { label: "Moment", href: "/plataformas/moment" },
          { label: "Magnify", href: "/plataformas/magnify" },
          { label: "Ver todas", href: "/plataformas" },
        ],
      },
    ],
  },
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

export type Centro = { direccion: string; local?: string; barrio?: string };
export type Sede = {
  ciudad: string;
  sigla: string;
  centros: Centro[];
  /** pin sobre el mapa (centro del círculo, px de Figma desde la esquina de la sección); "chico" en la costa */
  pin: { x: number; y: number; chico?: boolean; soloActivo?: boolean };
  /** tarjeta amarilla: "caja" (título + filas) o "pildora" (dirección + sigla), px de Figma */
  tarjeta: { tipo: "caja" | "pildora"; x: number; y: number; ancho: number; alto?: number; titulo?: string };
};

// Sedes — inicio v3 (Figma, 20-nov-2026). Textos tal como vienen en el diseño. Sin teléfonos.
// Cartagena no venía en el diseño: se arma como Medellín con la dirección que ya teníamos.
export const sedes: Sede[] = [
  {
    ciudad: "Bogotá",
    sigla: "BOG",
    pin: { x: 551.5, y: 775 },
    tarjeta: { tipo: "caja", x: 616, y: 757, ancho: 374, titulo: "BOG" },
    centros: [
      { direccion: "Cr 7 # 119-50", barrio: "Usaquen" },
      { direccion: "Cr 7 # 45-10", local: "(L 2)", barrio: "Javeriana" },
      { direccion: "Cr 65# 11-50", local: "(L 2-50)", barrio: "Plaza Central" },
      { direccion: "Dig 57 Sur # 62-60", local: "(L 202)", barrio: "Paseo Villa del Rio" },
      { direccion: "Av. Cra 86 # 55-75", local: "(L 2 - 282)", barrio: "Nuestro Bogotá" },
    ],
  },
  {
    ciudad: "Medellín",
    sigla: "MDE",
    pin: { x: 483.5, y: 705 },
    tarjeta: { tipo: "pildora", x: 74, y: 593, ancho: 345, alto: 67 },
    centros: [{ direccion: "Calle 10 #43D-76", barrio: "Barrio el Poblado" }],
  },
  {
    ciudad: "Cali",
    sigla: "CLO",
    pin: { x: 432.5, y: 870 },
    tarjeta: { tipo: "caja", x: 133, y: 946, ancho: 478, titulo: "CALI" },
    centros: [
      { direccion: "Av 4 Norte #7-46", local: "(L 214)", barrio: "C.C. Centenario" },
      { direccion: "Av Roosevelt, Cr 50 #5d-37", local: "(L 23, Torre Cosmoplaza)", barrio: "Tequendama" },
    ],
  },
  {
    ciudad: "Barranquilla",
    sigla: "BAQ",
    pin: { x: 518.5, y: 481.5, chico: true },
    tarjeta: { tipo: "pildora", x: 68, y: 355, ancho: 396, alto: 107 },
    centros: [{ direccion: "Cr 53 #80-198", local: "(L 102, Torre Atlánta)", barrio: "Parque Washington" }],
  },
  {
    ciudad: "Cartagena",
    sigla: "CTG",
    pin: { x: 481.5, y: 548.5, chico: true },
    tarjeta: { tipo: "pildora", x: 40, y: 470, ancho: 396, alto: 107 },
    centros: [{ direccion: "Calle 6 # 4-20", local: "(L 2-07, C.C. La Estación)", barrio: "Bocagrande" }],
  },
  {
    ciudad: "Panamá",
    sigla: "PTY",
    pin: { x: 352, y: 462, soloActivo: true },
    tarjeta: { tipo: "pildora", x: 78, y: 560, ancho: 345, alto: 67 },
    centros: [{ direccion: "Hospital Pacifica Salud", barrio: "Planta baja, Local 5" }],
  },
];

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/${encodeURIComponent(q)}`;
