/**
 * "Nuestros servicios" (INICIO PAG v2, nov-2026): diagrama de 4 círculos.
 * Al pasar el mouse (o tocar) un servicio, se muestra su foto y cambia el texto de la izquierda.
 *
 * Posiciones en px de Figma dentro de la caja del diagrama (784 × 728, esquina en x970 / y3417).
 * icono: caja del ícono respecto al centro del círculo.
 * Íconos: recortados del diseño a 2x (PENDIENTE: reemplazar por los SVG de Figma).
 * Fotos: PENDIENTES (exportar de Figma).
 */
export type Servicio = {
  id: string;
  nombre: [string, string]; // dos líneas
  centro: { x: number; y: number };
  icono: { src: string; left: number; top: number; ancho: number; alto: number };
  foto: string;
  texto: { normal: string; fuerte: string; despues?: string };
};

export const servicios: Servicio[] = [
  {
    id: "valoracion",
    nombre: ["Valoración", "auditiva"],
    centro: { x: 378.75, y: 178.25 },
    icono: { src: "/img/servicios/v2/valoracion.png", left: -26.5, top: -71, ancho: 82, alto: 80 },
    foto: "/img/servicios/v2/foto-valoracion.webp",
    texto: { normal: "Conoce cómo escuchas con una", fuerte: "valoración auditiva completa." },
  },
  {
    id: "adaptacion",
    nombre: ["Adaptación de", "audífonos"],
    centro: { x: 615.25, y: 362.25 },
    icono: { src: "/img/servicios/v2/adaptacion.png", left: -33, top: -70, ancho: 76, alto: 90 },
    foto: "/img/servicios/v2/foto-adaptacion.webp",
    texto: { normal: "Ajustamos tus audífonos", fuerte: "a tu oído y a tu día a día." },
  },
  {
    id: "seguimiento",
    nombre: ["Seguimiento y", "controles"],
    centro: { x: 378.75, y: 550.75 },
    icono: { src: "/img/servicios/v2/seguimiento.png", left: -38, top: -71.5, ancho: 77, alto: 85 },
    foto: "/img/servicios/v2/foto-seguimiento.webp",
    texto: { normal: "Te acompañamos", fuerte: "en cada control,", despues: "después de la adaptación." },
  },
  {
    id: "entrenamiento",
    nombre: ["Entrenamiento", "auditivo"],
    centro: { x: 142.25, y: 362.25 },
    icono: { src: "/img/servicios/v2/entrenamiento.png", left: -35, top: -71, ancho: 70, alto: 70 },
    foto: "/img/servicios/v2/foto-entrenamiento.webp",
    texto: { normal: "Entrena tu oído para", fuerte: "volver a disfrutar cada sonido." },
  },
];
