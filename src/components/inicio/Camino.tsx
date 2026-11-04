"use client";

import { useState } from "react";
import Img from "@/components/Img";
import styles from "./Camino.module.css";

type Paso = { titulo: string; imagen: string; textoEnImagen?: boolean };

// Las 5 etapas del camino (Figma "INICIO PAG" + segunda página del carrusel enviada por Jean)
const pasos: Paso[] = [
  { titulo: "Escucha y evaluación", imagen: "/img/camino/escucha.png" },
  { titulo: "Diagnóstico profesional", imagen: "/img/camino/diagnostico.png" },
  { titulo: "Soluciones personalizadas", imagen: "/img/camino/soluciones.png" },
  { titulo: "Adaptación y acompañamiento", imagen: "/img/camino/adaptacion.png" },
  { titulo: "Seguimiento continuo", imagen: "/img/camino/seguimiento.png" },
];

// En escritorio se ven 3 tarjetas; la segunda página muestra las 3 últimas
const paginas = [0, 2];

export default function Camino() {
  const [pagina, setPagina] = useState(0);
  const inicio = paginas[pagina];

  return (
    <section className={styles.seccion} aria-labelledby="camino-titulo">
      <div className={styles.ondas} aria-hidden="true" />
      <h2 id="camino-titulo" className={styles.titulo}>
        Tu camino hacia una <b>mejor audición</b> empieza aquí
      </h2>
      <p className={styles.texto}>
        Te acompañamos en cada etapa, desde la evaluación
        <br className={styles.corte} /> auditiva hasta la adaptación de soluciones diseñadas para
        <br className={styles.corte} /> tu estilo de vida y necesidades reales.
      </p>

      <div className={styles.carrusel}>
        <ol className={styles.tarjetas}>
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              className={styles.tarjeta}
              data-visible={i >= inicio && i < inicio + 3 ? "" : undefined}
            >
              <Img src={p.imagen} alt="" />
              <span className={p.textoEnImagen ? "sr-only" : styles.nombre}>{p.titulo}</span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          className={styles.flecha}
          aria-label={pagina === 0 ? "Ver más etapas" : "Volver a las primeras etapas"}
          onClick={() => setPagina((v) => (v + 1) % paginas.length)}
        >
          <svg viewBox="0 0 8 16" aria-hidden="true">
            <path d="M1 1l6 7-6 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={styles.puntos}>
          {paginas.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === pagina ? styles.puntoActivo : styles.punto}
              aria-label={`Página ${i + 1} de ${paginas.length}`}
              aria-current={i === pagina}
              onClick={() => setPagina(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
