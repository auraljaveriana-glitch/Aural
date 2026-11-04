"use client";

import { useState } from "react";
import { sedes } from "@/content/site";
import styles from "./Sedes.module.css";

export default function Sedes() {
  // En el diseño aparece seleccionada Cartagena
  const [actual, setActual] = useState(sedes.length - 1);
  const sede = sedes[actual];

  return (
    <section id="sedes" className={styles.seccion} aria-labelledby="sedes-titulo">
      <p className={styles.etiqueta}>Nuestras sedes</p>
      <h2 id="sedes-titulo" className={styles.titulo}>
        Estamos donde <b>nos necesitas</b>
      </h2>

      <div className={styles.cuerpo}>
        <div className={styles.mapa}>
          <div className={styles.mapaRecorte}>
          <div className={styles.mapaImagen}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/sedes/mapa-colombia.jpg" alt="" className={styles.mapaFondo} />
            {sedes.map((s, i) => {
              const activo = i === actual;
              // medidas del pin en px de Figma: ancho, centro y punta (fondo del núcleo)
              const [w, cx, by] = activo ? [67, 33.25, 75.5] : [48, 23.75, 53.5];
              const k = s.pin.escala ?? 1;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.ciudad}
                  src={activo ? "/img/sedes/pin-amarillo.png" : "/img/sedes/pin-blanco.png"}
                  alt=""
                  className={`${styles.pin} ${activo ? styles.pinActivo : ""}`}
                  style={{
                    left: `${((s.pin.x - cx * k) / 731) * 100}%`,
                    top: `${((s.pin.y - by * k) / 1024) * 100}%`,
                    width: `${((w * k) / 731) * 100}%`,
                  }}
                />
              );
            })}
          </div>
          </div>
          <div
            className={`${styles.etiquetaSede} ${sede.etiqueta.lado === "izq" ? styles.aLaIzquierda : ""}`}
            aria-live="polite"
            style={
              {
                "--tag-x": sede.etiqueta.x,
                "--tag-top": sede.etiqueta.top - 226,
              } as React.CSSProperties
            }
          >
            <ul>
              {sede.centros.map((c) => (
                <li key={c.nombre}>
                  <span className={styles.direccion}>
                    {/* cada tramo ("local 2-282") se corta entero, no por el guion */}
                    {c.direccion.split(", ").map((t, j, arr) => (
                      <span key={j} className={t.startsWith("local") ? styles.tramo : undefined}>
                        {t}
                        {j < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                  <span className={styles.barrio}>{c.nombre}</span>
                </li>
              ))}
            </ul>
            <span className={styles.sigla}>{sede.sigla}</span>
          </div>
        </div>

        <ul className={styles.lista}>
          {sedes.map((s, i) => {
            const n = s.centros.length;
            return (
              <li key={s.ciudad}>
                <button
                  type="button"
                  className={`${styles.ciudad} ${i === actual ? styles.activa : ""}`}
                  aria-pressed={i === actual}
                  onClick={() => setActual(i)}
                >
                  <span className={styles.nombre}>{s.ciudad}</span>
                  <span className={styles.cantidad}>
                    <b>
                      {n} {n === 1 ? "centro" : "centros"}
                    </b>{" "}
                    {n === 1 ? "disponible" : "disponibles"}
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
