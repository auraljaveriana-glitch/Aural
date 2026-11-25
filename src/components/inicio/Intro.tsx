"use client";

import { useEffect, useState } from "react";
import { Arco, Letras, Punto } from "./LogoPiezas";
import styles from "./Intro.module.css";

/* Pantalla de entrada del inicio (Jean, 17-nov-2026: reemplaza la animación anterior por su video nuevo).
   Se reproduce con el logo vectorial oficial, así se ve nítida en cualquier pantalla:
   1) el punto aparece y crece (0,25–1,4 s) · 2) el arco se dibuja alrededor (1,4–1,87 s) y el punto
   da un pequeño salto · 3) el símbolo se corre a la izquierda (2,53–3 s) · 4) aparece "Aural" (3,07 s)
   · 5) a los 5,4 s se desvanece y aparece el inicio.
   - Una vez por sesión del navegador; un clic o una tecla la salta; con "reducir movimiento" no se muestra. */

const CLAVE = "aural-intro-vista";
const DURACION = 5400;

export default function Intro() {
  const [estado, setEstado] = useState<"visible" | "saliendo" | "fuera">("visible");

  useEffect(() => {
    let vista = false;
    try {
      vista = sessionStorage.getItem(CLAVE) === "1";
    } catch {}
    if (vista || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEstado("fuera");
      return;
    }
    try {
      sessionStorage.setItem(CLAVE, "1");
    } catch {}

    document.documentElement.style.overflow = "hidden";
    const salir = () => setEstado((e) => (e === "visible" ? "saliendo" : e));
    window.addEventListener("keydown", salir);
    const limite = window.setTimeout(salir, DURACION);
    return () => {
      window.removeEventListener("keydown", salir);
      window.clearTimeout(limite);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (estado === "visible") return;
    document.documentElement.style.overflow = "";
    // avisa que ya se ve la página (el contador de pacientes empieza a contar)
    (window as Window & { auralIntroFin?: boolean }).auralIntroFin = true;
    window.dispatchEvent(new Event("aural-intro-fin"));
    if (estado === "saliendo") {
      const t = window.setTimeout(() => setEstado("fuera"), 450);
      return () => window.clearTimeout(t);
    }
  }, [estado]);

  if (estado === "fuera") return null;

  return (
    <div
      data-intro=""
      className={`${styles.intro} ${estado === "saliendo" ? styles.saliendo : ""}`}
      onClick={() => setEstado("saliendo")}
      aria-hidden="true"
    >
      {/* sin JavaScript no se muestra */}
      <noscript>
        <style>{`.${styles.intro} { display: none !important; }`}</style>
      </noscript>
      <svg className={styles.logo} viewBox="-4 -2 168 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* trazo que "dibuja" el arco de izquierda a derecha pasando por abajo */}
          <mask id="intro-trazo" maskUnits="userSpaceOnUse" x="-10" y="-10" width="70" height="60">
            <path
              className={styles.trazo}
              d="M5.9 8.9A15 15 0 1 0 34.1 8.9"
              pathLength={1}
              stroke="white"
              strokeWidth="26"
              fill="none"
            />
          </mask>
        </defs>
        <g className={styles.simbolo}>
          <g mask="url(#intro-trazo)">
            <Arco />
          </g>
          <g className={styles.punto}>
            <Punto />
          </g>
        </g>
        <g className={styles.letras}>
          <Letras />
        </g>
      </svg>
    </div>
  );
}
