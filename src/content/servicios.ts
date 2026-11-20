/**
 * "Nuestros servicios" — inicio v3 (Figma, 20-nov-2026): círculo de 4 fotos.
 * El servicio activo se agranda (cuarto de círculo completo, con sombra) y su nombre aparece en el
 * círculo blanco del centro. Por defecto está activo "Adaptación de audífonos".
 * Al pasar el mouse (o tocar) otro servicio cambia la foto activa y el texto de la izquierda.
 * cuadrante: posición en el círculo (arriba-izquierda, arriba-derecha, abajo-izquierda, abajo-derecha).
 * El estado de Entrenamiento auditivo no venía en el diseño: se arma igual que los otros tres.
 */
export type Cuadrante = "ai" | "ad" | "bi" | "bd";

export type Servicio = {
  id: string;
  nombre: [string, string]; // dos líneas
  cuadrante: Cuadrante;
  foto: string;
  /** punto de la foto que queda fijo al acercarse (cuando no está activa) */
  foco: string;
  /** ondas de alrededor para este estado (recortadas del diseño) */
  ondas: string;
  texto: { normal: string; fuerte: string; despues?: string };
};

/** servicio activo cuando nadie pasa el mouse */
export const servicioInicial = "adaptacion";

const img = (n: string) => `/img/servicios3/${n}.webp`;

export const servicios: Servicio[] = [
  {
    id: "adaptacion",
    nombre: ["Adaptación de", "audífonos"],
    cuadrante: "ai",
    foto: img("adaptacion"),
    foco: "70% 55%",
    ondas: img("ondas-adaptacion"),
    texto: { normal: "Ajustamos tus audífonos", fuerte: "a tu oído y a tu día a día." },
  },
  {
    id: "seguimiento",
    nombre: ["Seguimiento y", "controles"],
    cuadrante: "ad",
    foto: img("seguimiento"),
    foco: "60% 45%",
    ondas: img("ondas-seguimiento"),
    texto: { normal: "Te acompañamos", fuerte: "en cada control,", despues: "después de la adaptación." },
  },
  {
    id: "entrenamiento",
    nombre: ["Entrenamiento", "auditivo"],
    cuadrante: "bi",
    foto: img("entrenamiento"),
    foco: "40% 40%",
    ondas: img("ondas-valoracion"),
    texto: { normal: "Entrena tu oído para", fuerte: "volver a disfrutar cada sonido." },
  },
  {
    id: "valoracion",
    nombre: ["Valoración", "auditiva"],
    cuadrante: "bd",
    foto: img("valoracion"),
    foco: "40% 40%",
    ondas: img("ondas-valoracion"),
    texto: { normal: "Conoce cómo escuchas con una", fuerte: "valoración auditiva completa." },
  },
];
