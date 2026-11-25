"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

/* Tarjetas del hero (Jean, 20-nov-2026): carrusel que rota solo; la tarjeta activa se ve grande
   (387 × 245) y las demás pequeñas (264 × 166, al 79 % de opacidad). Al pasar el mouse por una
   tarjeta, esa se agranda y el carrusel se detiene. */
const tarjetas = [
  { src: "/img/hero2/experiencia.webp", alt: "La mejor experiencia auditiva. Con la experiencia Widex." },
  { src: "/img/hero2/allure.webp", alt: "La diferencia es clara con Widex Allure: conectividad, experiencia personalizada, adaptación inteligente y sonido natural." },
  { src: "/img/hero2/black-week.webp", alt: "Black Week: 2x1 en audífonos Magnify de pila." },
];

const INTERVALO = 4500;
const n = tarjetas.length;
// la lista se repite para que siempre haya tarjetas a la derecha de la activa
const lista = [...tarjetas, ...tarjetas, ...tarjetas];

export default function TarjetasHero() {
  const [activa, setActiva] = useState(0); // índice dentro de `lista`
  const [encima, setEncima] = useState<number | null>(null);
  const [sinTransicion, setSinTransicion] = useState(false);

  useEffect(() => {
    if (encima !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActiva((a) => a + 1), INTERVALO);
    return () => clearTimeout(t);
  }, [activa, encima]);

  // al llegar a la segunda vuelta, vuelve a la primera sin que se note
  useEffect(() => {
    if (activa < n) return;
    const t = setTimeout(() => {
      setSinTransicion(true);
      setActiva((a) => a - n);
      requestAnimationFrame(() => requestAnimationFrame(() => setSinTransicion(false)));
    }, 800);
    return () => clearTimeout(t);
  }, [activa]);

  const grande = encima ?? activa;

  return (
    <div className={styles.tarjetas} aria-roledescription="carrusel" aria-label="Novedades Aural y Widex">
      <ul
        className={`${styles.pista} ${sinTransicion ? styles.quieta : ""}`}
        style={{ "--corrimiento": activa } as React.CSSProperties}
        onMouseLeave={() => setEncima(null)}
      >
        {lista.map((t, i) => (
          <li
            key={i}
            className={`${styles.tarjeta} ${i === grande ? styles.tarjetaGrande : ""} ${i === encima ? styles.tarjetaEncima : ""}`}
            aria-hidden={i < activa || i >= activa + n ? true : undefined}
            onMouseEnter={() => i >= activa && setEncima(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.src} alt={i >= activa && i < activa + n ? t.alt : ""} loading={i < 3 ? "eager" : "lazy"} />
          </li>
        ))}
      </ul>
    </div>
  );
}
