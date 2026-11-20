"use client";

import { useState } from "react";
import { sedes } from "@/content/site";
import styles from "./Sedes.module.css";

/* "Nuestras sedes" — inicio v3 (Figma "mapa BOGOTA / MEDELLIN / CALI / BARRANQUILLA / PANAMA", 20-nov-2026).
   Mapa en relieve con un pin por ciudad; la ciudad elegida tiene el pin amarillo y su tarjeta
   amarilla translúcida. Por defecto está elegida Bogotá. */
type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

/* raya de cada fila de la lista (px de Figma desde el borde superior de la sección) */
const filas = [563.5, 688.5, 815.5, 923.5, 1041.5, 1159.5];

export default function Sedes() {
  const [actual, setActual] = useState(0);
  const sede = sedes[actual];
  const t = sede.tarjeta;

  return (
    <section id="sedes" className={styles.seccion} aria-labelledby="sedes-titulo">
      <p className={styles.etiqueta}>Nuestras sedes</p>
      <h2 id="sedes-titulo" className={styles.titulo}>
        Estamos donde <b>nos necesitas</b>
      </h2>

      <div className={styles.lienzo}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.mapa} src="/img/sedes2/mapa.webp" srcSet="/img/sedes2/mapa.webp 1x, /img/sedes2/mapa@2x.webp 2x" alt="" aria-hidden="true" />

      {sedes.map((s, i) =>
        s.pin.soloActivo && i !== actual ? null : (
          <button
            key={s.ciudad}
            type="button"
            className={`${styles.pin} ${i === actual ? styles.pinActivo : s.pin.chico ? styles.pinChico : ""}`}
            style={{ "--x": s.pin.x, "--y": s.pin.y } as Vars}
            aria-label={`Ver sedes en ${s.ciudad}`}
            tabIndex={-1}
            onClick={() => setActual(i)}
          />
        ),
      )}

      <div
        key={sede.ciudad}
        className={`${styles.tarjeta} ${t.tipo === "caja" ? styles.caja : styles.pildora}`}
        style={{ "--x": t.x, "--y": t.y, "--w": t.ancho, "--h": t.alto ?? 0 } as Vars}
        aria-live="polite"
      >
        {t.tipo === "caja" ? (
          <>
            <p className={styles.cajaTitulo}>{t.titulo}</p>
            <ul>
              {sede.centros.map((c) => (
                <li key={c.direccion}>
                  <span className={styles.direccion}>
                    {c.direccion}
                    {c.local && <small>{c.local}</small>}
                  </span>
                  {c.barrio && <span className={styles.barrio}>{c.barrio}</span>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className={styles.direccion}>
              {sede.centros[0].direccion}
              {sede.centros[0].local && <small>{sede.centros[0].local}</small>}
              {sede.centros[0].barrio && <small>{sede.centros[0].barrio}</small>}
            </p>
            <span className={styles.sigla}>{sede.sigla}</span>
          </>
        )}
      </div>
      </div>

      <ul className={styles.lista}>
        {sedes.map((s, i) => {
          const n = s.centros.length;
          return (
            <li key={s.ciudad} style={{ "--y": filas[i] } as Vars}>
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
    </section>
  );
}
