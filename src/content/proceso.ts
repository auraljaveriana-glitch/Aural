// Página "Conoce el proceso" (Figma "PROCESO", 13-nov-2026).
// Los "\n" marcan los saltos de línea del diseño (solo en escritorio).
// Coordenadas en px del diseño a 1920 de ancho, ABSOLUTAS en la página (mayúsculas = tope de la letra).
// Fotos e íconos: carpeta "Proceso" de Jean. PENDIENTE: foto del cierre (recorte temporal) y el diseño a tamaño completo (se midió sobre 675 px).

export type ItemLista = { texto: string[]; icono?: string; iconoAncho?: number; y: number }; // una entrada por línea
export type Prueba = { nombre: string; texto: string; foto: string };

export type Paso = {
  numero: string;
  titulo: string[]; // una entrada por línea, como en el diseño
  subtitulo: string[];
  texto: string;
  textoFuerte?: string;
  // tarjeta (fondo) y línea dorada
  tarjeta: { top: number; bottom: number };
  linea: { top: number; bottom: number };
  // tope de las mayúsculas de cada bloque
  y: { numero: number; titulo: number; subtitulo: number; texto: number; textoFuerte?: number };
  anchoTexto: number;
  colorSubtitulo?: "navy";
  foto?: string;
  pruebas?: Prueba[];
  lista?: ItemLista[];
  separadores?: number[];
  puntos?: { navy: [number, number]; dorado: [number, number] };
};

export const pasos: Paso[] = [
  {
    numero: "01",
    titulo: ["Escuchamos tu", "historia"],
    subtitulo: ["Todo comienza por conocer", "tu audición."],
    texto:
      "Conversamos contigo sobre tus antecedentes,\nlas dificultades que notas al escuchar y cómo\nafectan tu día a día. Con esa información\ndefinimos qué pruebas audiológicas necesitas.",
    tarjeta: { top: 1166, bottom: 1941 },
    linea: { top: 1230, bottom: 1874 },
    y: { numero: 1242, titulo: 1248, subtitulo: 1575, texto: 1704 },
    anchoTexto: 560,
    foto: "/img/proceso/escuchamos.webp",
    puntos: { navy: [64, 1866], dorado: [110, 1827] },
  },
  {
    numero: "02",
    titulo: ["Medimos cómo", "escuchas"],
    subtitulo: ["Conocemos cómo funciona tu", "audición."],
    texto:
      "Empezamos con una otoscopia para revisar el\nestado de tu oído. Después realizamos las pruebas\nque evalúan tu capacidad de escuchar, reconocer el\nhabla y conocer el estado del oído medio.",
    textoFuerte:
      "Con los resultados conocemos las características\nde tu audición y orientamos nuestras\nrecomendaciones.",
    tarjeta: { top: 2062, bottom: 2912 },
    linea: { top: 2147, bottom: 2830 },
    y: { numero: 2155, titulo: 2156, subtitulo: 2440, texto: 2565, textoFuerte: 2700 },
    anchoTexto: 605,
    colorSubtitulo: "navy",
    pruebas: [
      {
        nombre: "Audiometría tonal",
        texto: "Mide qué sonidos escuchas\ny desde qué volumen\nempiezas a percibirlos.",
        foto: "/img/proceso/prueba-1.webp",
      },
      {
        nombre: "Logoaudiometría",
        texto: "Evalúa qué tan bien\nreconoces y comprendes las\npalabras a diferentes\nvolúmenes.",
        foto: "/img/proceso/prueba-2.webp",
      },
      {
        nombre: "Impedanciometría",
        texto: "Revisa el estado del oído\nmedio y el movimiento del\ntímpano.",
        foto: "/img/proceso/prueba-3.webp",
      },
    ],
  },
  {
    numero: "03",
    titulo: ["Una solución", "pensada para", "ti"],
    subtitulo: ["Encontramos la opción que se", "adapta a tus necesidades."],
    texto:
      "Con los resultados, nuestros profesionales te\norientan sobre las alternativas disponibles. Si\nnecesitas audífonos, te ayudamos a elegir los que\nmejor se ajusten a tu audición, tu estilo de vida y\ntus preferencias.",
    tarjeta: { top: 3064, bottom: 3882 },
    linea: { top: 3178, bottom: 3792 },
    y: { numero: 3182, titulo: 3180, subtitulo: 3450, texto: 3614 },
    anchoTexto: 606,
    // PENDIENTE: ícono de "Tecnologías y funcionalidades disponibles"
    lista: [
      { texto: ["Tipos y diseños de", "audífonos"], icono: "/img/proceso/icono-audifono.png", iconoAncho: 48, y: 3197 },
      { texto: ["Tecnologías y", "funcionalidades", "disponibles"], y: 3381 },
      { texto: ["Recomendaciones", "según tus necesidades", "auditivas"], icono: "/img/proceso/icono-recomendaciones.png", iconoAncho: 47, y: 3608 },
    ],
    separadores: [3315, 3531],
    puntos: { navy: [51, 3828], dorado: [94, 3788] },
  },
  {
    numero: "04",
    titulo: ["Configuramos tus", "audífonos para ti"],
    subtitulo: ["Cada ajuste responde a tu", "audición."],
    texto:
      "Adaptamos y configuramos los dispositivos según\ntus necesidades auditivas. Además, te enseñamos\na colocarlos, usarlos, limpiarlos y aprovechar\ntodas sus funciones.",
    tarjeta: { top: 4017, bottom: 4866 },
    linea: { top: 4224, bottom: 4775 },
    y: { numero: 4233, titulo: 4237, subtitulo: 4469, texto: 4617 },
    anchoTexto: 590,
    lista: [
      { texto: ["Configuración", "personalizada"], icono: "/img/proceso/icono-configuracion.png", iconoAncho: 50, y: 4244 },
      { texto: ["Ajustes de acuerdo", "con tus necesidades"], icono: "/img/proceso/icono-ajustes.png", iconoAncho: 41, y: 4445 },
      { texto: ["Orientación sobre", "uso y cuidado"], icono: "/img/proceso/icono-orientacion.png", iconoAncho: 56, y: 4667 },
    ],
    separadores: [4362, 4578],
    puntos: { navy: [107, 4754], dorado: [57, 4790] },
  },
  {
    numero: "05",
    titulo: ["Te acompañamos", "en el proceso"],
    subtitulo: ["Escuchar con audífonos es un", "proceso, y no lo haces solo."],
    texto:
      "Acostumbrarse a escuchar con audífonos toma\ntiempo. Por eso hacemos seguimiento para conocer\ntu experiencia, revisar los ajustes y resolver tus\ndudas. Cuando está indicado, el entrenamiento\nauditivo te ayuda a reconocer y comprender mejor\nlos sonidos y el habla.",
    tarjeta: { top: 5062, bottom: 5830 },
    linea: { top: 5169, bottom: 5766 },
    y: { numero: 5182, titulo: 5188, subtitulo: 5425, texto: 5550 },
    anchoTexto: 612,
    lista: [
      { texto: ["Seguimiento de tu", "adaptación"], icono: "/img/proceso/icono-seguimiento.png", iconoAncho: 49, y: 5245 },
      { texto: ["Ajustes y", "orientación"], icono: "/img/proceso/icono-ajustes.png", iconoAncho: 41, y: 5441 },
      {
        texto: ["Entrenamiento auditivo", "según las necesidades", "de cada paciente"],
        icono: "/img/proceso/icono-entrenamiento.png", iconoAncho: 43,
        y: 5654,
      },
    ],
    separadores: [5361, 5578],
    puntos: { navy: [51, 5777], dorado: [95, 5737] },
  },
];

// fotos circulares del inicio: centro y radio
export const circulos = [
  { foto: "/img/proceso/hero-manos.webp", x: 1279, y: 355, r: 137 },
  { foto: "/img/proceso/hero-oido.webp", x: 1657, y: 377, r: 165 },
  { foto: "/img/proceso/hero-senor.webp", x: 1089, y: 621, r: 97 },
  { foto: "/img/proceso/hero-audiometria.webp", x: 1395, y: 689, r: 131 },
  { foto: "/img/proceso/hero-audifonos.webp", x: 1706, y: 738, r: 128 },
];

export const puntosHero = [
  { color: "navy", x: 1465.5, y: 278.5, r: 26.5 },
  { color: "navy", x: 1838, y: 509, r: 10 },
  { color: "navy", x: 1207.5, y: 726, r: 22.5 },
  { color: "dorado", x: 1200.5, y: 524, r: 10.5 },
  { color: "dorado", x: 1577.5, y: 591.5, r: 38 },
] as const;
