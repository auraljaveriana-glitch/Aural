"use client";

import Link from "next/link";
import { useState } from "react";
import { servicioInicial, servicios } from "@/content/servicios";
import styles from "./Servicios.module.css";

/* "Nuestros servicios": diagrama de 4 servicios.
   Sin selección está activo "Entrenamiento auditivo" (círculo azul) y se ve el texto general.
   Al pasar el mouse (o tocar) un servicio, aparece su círculo de color y cambia el texto. */
export default function Servicios() {
  const [activo, setActivo] = useState<string | null>(null);
  const actual = servicios.find((s) => s.id === activo);
  const resaltado = activo ?? servicioInicial;

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

      <div className={styles.diagrama} onMouseLeave={() => setActivo(null)}>
        {servicios.map((s) => (
          // círculos de color: todos cargados, solo el activo visible
          <span
            key={s.id}
            className={`${styles.color} ${s.id === resaltado ? styles.colorVisible : ""}`}
            style={{ "--x": s.centro.x, "--y": s.centro.y, backgroundImage: `url(${s.circulo})` } as React.CSSProperties}
            aria-hidden="true"
          />
        ))}
        <ul className={styles.nodos}>
          {servicios.map((s) => {
            const esActivo = s.id === resaltado;
            return (
              <li
                key={s.id}
                className={`${styles.nodo} ${esActivo ? styles.activo : styles.blanco}`}
                style={
                  {
                    "--x": s.centro.x,
                    "--y": s.centro.y,
                    "--fondo": s.interior.fondo,
                    "--contenido": s.interior.contenido,
                  } as React.CSSProperties
                }
              >
                <button
                  type="button"
                  aria-pressed={s.id === activo}
                  onMouseEnter={() => setActivo(s.id)}
                  onFocus={() => setActivo(s.id)}
                  onClick={() => setActivo(s.id)}
                >
                  <span className={styles.circulo}>
                    <span
                      className={styles.icono}
                      aria-hidden="true"
                      style={
                        {
                          "--il": s.icono.left,
                          "--it": s.icono.top,
                          "--iw": s.icono.ancho,
                          "--ih": s.icono.alto,
                          maskImage: `url(${s.icono.src})`,
                          WebkitMaskImage: `url(${s.icono.src})`,
                        } as React.CSSProperties
                      }
                    />
                    <span className={styles.nombre}>
                      {s.nombre[0]}
                      <br />
                      {s.nombre[1]}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
