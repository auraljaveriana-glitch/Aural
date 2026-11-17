"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";

/* Pantalla de entrada del inicio (Jean, 13-nov-2026): animación del logo (After Effects "Comp 1")
   sobre blanco mientras carga la página; al terminar se desvanece y aparece el inicio.
   La animación está pasada a SVG (vectorizada cuadro a cuadro del video de Jean): se ve nítida en
   cualquier pantalla y sin los bordes/rayas del video comprimido. Dura 4,64 s.
   - Se muestra una vez por sesión del navegador (al volver al inicio no se repite).
   - Un clic o una tecla la salta. Con "reducir movimiento" no se muestra.
   - Se quita sola al terminar la animación. */

const CLAVE = "aural-intro-vista";
const DURACION = 4640 + 350; // animación + una pausa corta con el logo completo

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
    if (estado === "saliendo") {
      const t = window.setTimeout(() => setEstado("fuera"), 700);
      return () => window.clearTimeout(t);
    }
  }, [estado]);

  if (estado === "fuera") return null;

  return (
    <div
      className={`${styles.intro} ${estado === "saliendo" ? styles.saliendo : ""}`}
      onClick={() => setEstado("saliendo")}
      aria-hidden="true"
    >
      {/* sin JavaScript no se muestra */}
      <noscript>
        <style>{`.${styles.intro} { display: none !important; }`}</style>
      </noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.logo} src="/video/intro-logo.svg" alt="" />
    </div>
  );
}
