"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Camino.module.css";

/* "Tu camino hacia una mejor audición" — inicio v3 (Figma, 20-nov-2026).
   Cinco columnas; la etapa activa se abre como tarjeta con foto. Se activa al pasar el mouse
   (en celular, al tocar). Por defecto está abierta la primera.
   x: raya de la columna (px de Figma @1920); texto: corrimiento del texto respecto a la raya;
   tarjeta: borde izquierdo de la tarjeta abierta. */
type Etapa = { etiqueta: string; titulo: [string, string]; foto: string; x: number; texto: number; tarjeta: number };

const etapas: Etapa[] = [
  { etiqueta: "Te escuchamos", titulo: ["Escucha y", "evaluación"], foto: "escucha", x: 101, texto: 14, tarjeta: 61.5 },
  { etiqueta: "Analizamos", titulo: ["Diagnóstico", "profesional"], foto: "diagnostico", x: 440, texto: 20, tarjeta: 375 },
  { etiqueta: "A tu medida", titulo: ["Soluciones", "personalizadas"], foto: "soluciones", x: 792, texto: 20, tarjeta: 748 },
  { etiqueta: "Te acompañamos", titulo: ["Adaptación y", "acompañamiento"], foto: "adaptacion", x: 1159, texto: 24, tarjeta: 1119 },
  { etiqueta: "Seguimos contigo", titulo: ["Seguimiento", "continuo"], foto: "seguimiento", x: 1541, texto: 20, tarjeta: 1527 },
];

export default function Camino() {
  const [activa, setActiva] = useState(0);
  const lista = useRef<HTMLOListElement>(null);

  // en celular las tarjetas se pasan de lado: la que queda en el centro es la activa
  useEffect(() => {
    const el = lista.current;
    if (!el) return;
    const movil = window.matchMedia("(max-width: 1023px)");
    let cuadro = 0;
    const alMover = () => {
      if (!movil.matches) return;
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        const centro = el.scrollLeft + el.clientWidth / 2;
        let mejor = 0;
        let distancia = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const h = c as HTMLElement;
          const d = Math.abs(h.offsetLeft + h.offsetWidth / 2 - centro);
          if (d < distancia) {
            distancia = d;
            mejor = i;
          }
        });
        setActiva(mejor);
      });
    };
    el.addEventListener("scroll", alMover, { passive: true });
    return () => {
      el.removeEventListener("scroll", alMover);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <section className={styles.seccion} aria-labelledby="camino-titulo">
      <div className={styles.ondas} aria-hidden="true" />
      <h2 id="camino-titulo" className={styles.titulo}>
        Tu camino hacia una <b>mejor</b>
        <br className={styles.corte} /> <b>audición</b> empieza aquí
      </h2>
      <p className={styles.texto}>
        Te acompañamos en cada etapa, desde la evaluación
        <br className={styles.corte} /> auditiva hasta la adaptación de soluciones diseñadas para tu
        <br className={styles.corte} /> estilo de vida y necesidades reales.
      </p>

      <ol className={styles.etapas} ref={lista}>
        {etapas.map((e, i) => {
          const abierta = i === activa;
          return (
            <li
              key={e.foto}
              className={`${styles.etapa} ${abierta ? styles.abierta : ""}`}
              style={{ "--x": e.x, "--tx": e.texto, "--card": e.tarjeta } as React.CSSProperties}
              onMouseEnter={() => setActiva(i)}
            >
              <button type="button" className={styles.boton} aria-expanded={abierta} onClick={() => setActiva(i)} onFocus={() => setActiva(i)}>
                <span className={styles.etiqueta}>{e.etiqueta}</span>
                <span className={styles.nombre}>
                  {e.titulo[0]}
                  <br />
                  {e.titulo[1]}
                </span>
              </button>
              <div className={styles.tarjeta} aria-hidden={!abierta}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/camino2/${e.foto}.webp`} alt="" loading="lazy" />
                <span className={styles.etiqueta}>{e.etiqueta}</span>
                <span className={styles.nombre}>
                  {e.titulo[0]}
                  <br />
                  {e.titulo[1]}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
