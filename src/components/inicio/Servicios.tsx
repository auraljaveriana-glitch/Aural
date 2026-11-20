"use client";

import Link from "next/link";
import { useState } from "react";
import { servicioInicial, servicios } from "@/content/servicios";
import styles from "./Servicios.module.css";

/* "Nuestros servicios" (inicio v3, 20-nov-2026): círculo de 4 fotos a la derecha.
   Sin selección está activa "Adaptación de audífonos" y a la izquierda se ve el texto general.
   Al pasar el mouse (o tocar) un servicio, su foto se agranda, su nombre va al centro y cambia el texto. */
export default function Servicios() {
  const [activo, setActivo] = useState<string | null>(null);
  const actual = servicios.find((s) => s.id === activo);
  const resaltado = activo ?? servicioInicial;
  const activoServicio = servicios.find((s) => s.id === resaltado)!;

  return (
    <section id="servicios" className={styles.seccion} aria-labelledby="servicios-titulo">
      <div className={styles.izquierda}>
        <p className={styles.etiqueta}>Nuestros servicios</p>
        <h2 id="servicios-titulo" className={styles.titulo} aria-live="polite">
          {actual ? (
            <>
              {actual.texto.normal} <b>{actual.texto.fuerte}</b>
              {actual.texto.despues ? ` ${actual.texto.despues}` : ""}
            </>
          ) : (
            <>
              <span className={styles.linea}>Todo lo que necesitas </span>
              <span className={styles.linea}>
                para oír bien, <b>en un solo</b>{" "}
              </span>
              <b className={styles.linea}>lugar.</b>
            </>
          )}
        </h2>
        {/* TODO: definir a dónde lleva la flecha */}
        <Link href="#servicios" className={styles.flecha} aria-label="Ver todos los servicios">
          <svg viewBox="0 0 52 47" aria-hidden="true">
            <path d="M1 23.5h49M28 1l22.5 22.5L28 46" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>

      <div className={styles.grafico} onMouseLeave={() => setActivo(null)}>
        {/* ondas de cada estado: todas cargadas, solo la del activo visible */}
        {[...new Set(servicios.map((s) => s.ondas))].map((o) => (
          <span
            key={o}
            className={`${styles.ondas} ${o === activoServicio.ondas ? styles.ondasVisible : ""}`}
            style={{ backgroundImage: `url(${o})` }}
            aria-hidden="true"
          />
        ))}
        <ul className={styles.cuadrantes}>
          {servicios.map((s) => (
            <li key={s.id} className={`${styles.cuadrante} ${styles[s.cuadrante]} ${s.id === resaltado ? styles.activo : ""}`}>
              <button
                type="button"
                aria-pressed={s.id === activo}
                aria-label={s.nombre.join(" ")}
                onMouseEnter={() => setActivo(s.id)}
                onFocus={() => setActivo(s.id)}
                onClick={() => setActivo(s.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.foto} alt="" loading="lazy" style={{ transformOrigin: s.foco }} />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.centro} aria-hidden="true" />
        <p
          className={`${styles.nombreCentro} ${activoServicio.cuadrante.startsWith("a") ? styles.abajo : styles.arriba}`}
          aria-live="polite"
        >
          {activoServicio.nombre[0]}
          <br />
          {activoServicio.nombre[1]}
        </p>
      </div>
    </section>
  );
}
