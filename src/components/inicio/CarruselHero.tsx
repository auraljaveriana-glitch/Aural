"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

/*
 * Carrusel del hero. Cambia de diapositiva solo al tocar los puntos,
 * sin transición (las animaciones se definen después).
 * `posicion` ajusta el encuadre de las imágenes que no tienen la proporción
 * del recuadro (918 × 688). `completa` muestra la imagen entera (sin recortar)
 * sobre un fondo del mismo color de su borde.
 *
 * OJO: la promoción de octubre vence el 31-oct-2026; quitarla después.
 */
const diapositivas = [
  {
    src: "/img/hero/slide-1.png",
    alt: "La mejor experiencia auditiva. Con la experiencia Widex.",
    posicion: "center",
  },
  {
    src: "/img/hero/banner-1.jpg",
    alt: "Tecnología Widex.",
    posicion: "center 35%",
  },
  {
    src: "/img/hero/banner-2.jpg",
    alt: "La mejor experiencia auditiva. Con la tecnología Widex.",
    posicion: "center top",
  },
  {
    src: "/img/hero/campana-octubre.jpg",
    alt: "En octubre, 15% de descuento en Smart RIC. Escríbenos y llévatelo hoy.",
    posicion: "right center",
    completa: "#021b43",
  },
];

export default function CarruselHero() {
  const [actual, setActual] = useState(0);

  return (
    <div className={styles.carrusel} aria-roledescription="carrusel" aria-label="Novedades Aural y Widex">
      {diapositivas.map((d, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={d.src}
          src={d.src}
          alt={d.alt}
          className={styles.slide}
          style={{
            objectPosition: d.posicion,
            ...("completa" in d ? { objectFit: "contain", background: d.completa } : {}),
          }}
          hidden={i !== actual}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className={styles.puntos}>
        {diapositivas.map((d, i) => (
          <button
            key={d.src}
            type="button"
            className={styles.punto}
            aria-label={`Ver diapositiva ${i + 1} de ${diapositivas.length}`}
            aria-current={i === actual}
            onClick={() => setActual(i)}
          />
        ))}
      </div>
    </div>
  );
}
