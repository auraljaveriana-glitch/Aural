"use client";

import { useState } from "react";
import { razones } from "@/content/porque";
import styles from "./PorQue.module.css";

export default function PorQue() {
  // Solo una opción abierta a la vez; al tocar la abierta se cierra.
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className={styles.seccion} aria-labelledby="porque-titulo">
      <p className={styles.etiqueta}>Por qué elegir Aural</p>
      <h2 id="porque-titulo" className={styles.titulo}>
        Tu audición merece estar en <b>manos de expertos</b>
      </h2>

      <div className={styles.cuerpo}>
        <ul className={styles.lista}>
          {razones.map((r, i) => {
            const activa = abierta === i;
            return (
              <li key={r.titulo} className={`${styles.item} ${activa ? styles.activa : ""}`}>
                <h3>
                  <button
                    type="button"
                    className={styles.boton}
                    aria-expanded={activa}
                    aria-controls={`razon-${i}`}
                    id={`razon-boton-${i}`}
                    onClick={() => setAbierta(activa ? null : i)}
                  >
                    <span>{r.titulo}</span>
                    <svg className={styles.chevron} viewBox="0 0 12 22" aria-hidden="true">
                      <path d="M1.5 1.5l9 9.5-9 9.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h3>
                <p id={`razon-${i}`} role="region" aria-labelledby={`razon-boton-${i}`} className={styles.texto} hidden={!activa}>
                  {r.texto}
                </p>
              </li>
            );
          })}
        </ul>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/porque/foto.png"
          alt="Una especialista de Aural conversa con una paciente sonriente"
          className={styles.foto}
          width={986}
          height={627}
          loading="lazy"
        />
      </div>
    </section>
  );
}
