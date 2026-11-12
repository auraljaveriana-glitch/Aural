/**
 * "Nuestros servicios" (Figma, 12-nov-2026): diagrama de 4 círculos.
 * Por defecto está activo "Entrenamiento auditivo" (círculo azul). Al pasar el mouse (o tocar)
 * otro servicio, aparece su círculo de color y cambia el texto de la izquierda.
 *
 * Posiciones en px de Figma dentro de la caja del diagrama (784 × 728, esquina en x970 / y3417).
 * icono: caja del ícono respecto al centro del círculo.
 * Íconos: recortados del diseño a 2x (PENDIENTE: reemplazar por los SVG de Figma).
 */
export type Servicio = {
  id: string;
  nombre: [string, string]; // dos líneas
  centro: { x: number; y: number };
  icono: { src: string; left: number; top: number; ancho: number; alto: number };
  /** círculo grande con degradado (recortado de Figma, 465 px) y círculo interior */
  circulo: string;
  interior: { fondo: string; contenido: string };
  texto: { normal: string; fuerte: string; despues?: string };
};

/** servicio activo cuando nadie pasa el mouse */
export const servicioInicial = "entrenamiento";

export const servicios: Servicio[] = [
  {
    id: "valoracion",
    nombre: ["Valoración", "auditiva"],
    centro: { x: 378.75, y: 178.25 },
    icono: { src: "/img/servicios/v2/valoracion.png", left: -26.5, top: -71, ancho: 82, alto: 80 },
    circulo: "/img/servicios/v2/circulo-valoracion.webp",
    interior: { fondo: "#eb5c41", contenido: "#ffffff" },
    texto: { normal: "Conoce cómo escuchas con una", fuerte: "valoración auditiva completa." },
  },
  {
    id: "adaptacion",
    nombre: ["Adaptación de", "audífonos"],
    centro: { x: 615.25, y: 362.25 },
    icono: { src: "/img/servicios/v2/adaptacion.png", left: -33, top: -70, ancho: 76, alto: 90 },
    circulo: "/img/servicios/v2/circulo-adaptacion.webp",
    interior: { fondo: "#8ed5de", contenido: "#041e42" },
    texto: { normal: "Ajustamos tus audífonos", fuerte: "a tu oído y a tu día a día." },
  },
  {
    id: "seguimiento",
    nombre: ["Seguimiento y", "controles"],
    centro: { x: 378.75, y: 550.75 },
    icono: { src: "/img/servicios/v2/seguimiento.png", left: -38, top: -71.5, ancho: 77, alto: 85 },
    circulo: "/img/servicios/v2/circulo-seguimiento.webp",
    interior: { fondo: "#f5c753", contenido: "#041e42" },
    texto: { normal: "Te acompañamos", fuerte: "en cada control,", despues: "después de la adaptación." },
  },
  {
    id: "entrenamiento",
    nombre: ["Entrenamiento", "auditivo"],
    centro: { x: 142.25, y: 362.25 },
    icono: { src: "/img/servicios/v2/entrenamiento.png", left: -35, top: -71, ancho: 70, alto: 70 },
    circulo: "/img/servicios/v2/circulo-entrenamiento.webp",
    interior: { fondo: "#041e42", contenido: "#ffffff" },
    texto: { normal: "Entrena tu oído para", fuerte: "volver a disfrutar cada sonido." },
  },
];
