"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";

/* Pantalla de entrada del inicio (Jean, 13-nov-2026): animación del logo (After Effects "Comp 1")
   sobre blanco mientras carga la página; al terminar se desvanece y aparece el inicio.
   - Se muestra una vez por sesión del navegador (al volver al inicio no se repite).
   - Un clic o una tecla la salta. Con "reducir movimiento" no se muestra.
   - Si el video no carga, se quita sola a los 7 s. */

const CLAVE = "aural-intro-vista";

export default function Intro() {
  const [estado, setEstado] = useState<"visible" | "saliendo" | "fuera">("visible");
  const video = useRef<HTMLVideoElement>(null);

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
    const v = video.current;
    v?.play().catch(salir);
    v?.addEventListener("ended", salir);
    window.addEventListener("keydown", salir);
    const limite = window.setTimeout(salir, 7000);
    return () => {
      v?.removeEventListener("ended", salir);
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
      <video ref={video} className={styles.video} muted playsInline preload="auto" autoPlay>
        <source src="/video/intro-logo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
