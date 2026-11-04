/**
 * Tarjetas de "Nuestros servicios" (INICIO PAG).
 * `icono.box` = posición del ícono dentro de la tarjeta de 340 × 298, en px de Figma.
 * Las cajas incluyen el margen transparente de cada SVG, para que el dibujo
 * visible caiga donde está en Figma. El ícono de Prueba de audífonos se agregó
 * después del diseño exportado y va centrado con el mismo alto que los demás.
 */
export type Servicio = {
  fuerte: string;
  suave: string; // va en la misma línea que `fuerte` si `mismaLinea`
  segunda: string;
  icono?: { src: string; box: { left: number; top: number; width: number; height: number } };
};

export const servicios: Servicio[] = [
  {
    fuerte: "Exámenes",
    suave: "",
    segunda: "audiológicos",
    icono: { src: "/img/servicios/examenes.svg", box: { left: 121.3, top: 44, width: 109.4, height: 110 } },
  },
  {
    fuerte: "Prueba de",
    suave: "",
    segunda: "audífonos",
    icono: { src: "/img/servicios/prueba.svg", box: { left: 126, top: 48, width: 88, height: 106 } },
  },
  {
    fuerte: "Adaptación",
    suave: " de",
    segunda: "audífonos",
    icono: { src: "/img/servicios/adaptacion.svg", box: { left: 84.9, top: 33.1, width: 130.3, height: 130.3 } },
  },
  {
    fuerte: "Entrenamiento",
    suave: "",
    segunda: "auditivo",
    icono: { src: "/img/servicios/entrenamiento.svg", box: { left: 127, top: 70, width: 85, height: 82 } },
  },
];
