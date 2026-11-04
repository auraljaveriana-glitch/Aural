"use client";

import { useEffect, useRef, useState } from "react";
import type { TipoAudifono } from "@/content/audifonos";
import styles from "./PanelAudifono.module.css";

/* Panel gris de la plantilla de audífonos: hero con las letras grandes, texto y "Ideales para / Beneficios".
   Escritorio: un solo audífono "viaja" con el scroll por las 3 posiciones de Figma, cambiando de foto
   entre una y otra. Celular o "reducir movimiento": los audífonos quedan fijos. */

const ANCHO = 1920; // ancho de Figma
const suave = (t: number) => t * t * (3 - 2 * t);
const limitar = (v: number) => Math.min(1, Math.max(0, v));

export default function PanelAudifono({ tipo }: { tipo: TipoAudifono }) {
  const p = tipo.plantilla!;
  const panel = useRef<HTMLElement>(null);
  const viajero = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLSpanElement>(null);
  const [abierto, setAbierto] = useState<number | null>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    // centros de cada audífono en px de Figma
    const centros = p.dispositivos.map((d) => ({ x: d.left + d.ancho / 2, d }));
    const alturas: number[] = [0, 0, 0];
    const imgs = viajero.current ? Array.from(viajero.current.querySelectorAll("img")) : [];

    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const k = Math.min(1, window.innerWidth / ANCHO); // 1 px de Figma en px de pantalla
      // indicador de avance
      const recorrido = r.height - window.innerHeight;
      const avance = recorrido > 0 ? limitar(-r.top / recorrido) : 0;
      barra.current?.style.setProperty("--avance", String(avance));

      // posición del audífono: el centro de la pantalla, en px de Figma sobre el panel
      const yVista = (window.innerHeight / 2 - r.top) / k;
      imgs.forEach((img, i) => {
        alturas[i] = img.naturalWidth ? (centros[i].d.ancho * img.naturalHeight) / img.naturalWidth : 0;
      });
      const cy = centros.map((c, i) => c.d.top + alturas[i] / 2);
      // tramo actual (0: de la 1 a la 2, 1: de la 2 a la 3)
      const tramo = yVista < cy[1] ? 0 : 1;
      const a = tramo, b = tramo + 1;
      const t = limitar((yVista - cy[a]) / (cy[b] - cy[a] || 1));
      const ts = suave(t);
      const x = centros[a].x + (centros[b].x - centros[a].x) * ts;
      const y = cy[a] + (cy[b] - cy[a]) * t;
      // la foto cambia en la mitad del trayecto
      const mezcla = limitar((t - 0.35) / 0.3);
      imgs.forEach((img, i) => {
        const op = i === a ? 1 - mezcla : i === b ? mezcla : 0;
        img.style.opacity = String(op);
      });
      viajero.current?.style.setProperty("--x", String(x));
      viajero.current?.style.setProperty("--y", String(y));
    };
    const alMover = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    imgs.forEach((img) => img.addEventListener("load", alMover));
    medir();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      imgs.forEach((img) => img.removeEventListener("load", alMover));
      if (raf) cancelAnimationFrame(raf);
    };
  }, [p.dispositivos]);

  const grupos = [
    { titulo: "Ideales para", items: tipo.ideales },
    { titulo: "Beneficios", items: tipo.beneficios },
  ];
  const [d1, d2, d3] = p.dispositivos;
  const pos = (d: { left: number; top: number; ancho: number }) =>
    ({ "--l": d.left, "--t": d.top, "--w": d.ancho }) as React.CSSProperties;

  return (
    <section ref={panel} className={styles.panel} aria-labelledby="audifono-titulo">
      <div className={styles.riel} aria-hidden="true">
        <div className={styles.indicador}>
          <span className={styles.pista} />
          <span ref={barra} className={styles.barra} />
        </div>
      </div>

      {/* audífono que se mueve (solo escritorio) */}
      <div ref={viajero} className={styles.viajero} aria-hidden="true">
        {p.dispositivos.map((d, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={d.src + i} src={d.src} alt="" style={{ "--w": d.ancho, opacity: i === 0 ? 1 : 0 } as React.CSSProperties} />
        ))}
      </div>

      {/* 1 · hero */}
      <div className={styles.hero}>
        <h1 id="audifono-titulo" className={styles.sigla}>
          <span className={styles.letras}>{p.sigla}</span>
          <span className={styles.subtitulo}>Audífonos</span>
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d1.src} alt={`Audífono ${tipo.titulo.fuerte}`} className={`${styles.dispositivo} ${styles.fijo}`} style={pos(d1)} />
      </div>

      {/* 2 · texto */}
      <div className={styles.bloqueTexto}>
        {p.frase && (
          <h2 className={styles.frase}>
            {p.frase.normal} <b>{p.frase.fuerte}</b>
          </h2>
        )}
        <p className={styles.texto}>{p.texto}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d2.src} alt="" className={`${styles.dispositivo} ${styles.fijo} ${styles.d2}`} style={pos(d2)} />
      </div>

      {/* 3 · ideales para / beneficios */}
      <div className={styles.bloqueLista}>
        <div className={styles.acordeon}>
          {grupos.map((g, i) => {
            const activo = abierto === i;
            return (
              <div key={g.titulo} className={styles.item}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={activo}
                    aria-controls={`grupo-${i}`}
                    onClick={() => setAbierto(activo ? null : i)}
                  >
                    {g.titulo}
                    <svg viewBox="0 0 28 15" aria-hidden="true" className={activo ? styles.girado : ""}>
                      <path d="M2 2l12 11L26 2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h3>
                <ul id={`grupo-${i}`} hidden={!activo}>
                  {g.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d3.src} alt="" className={`${styles.dispositivo} ${styles.fijo} ${styles.d3}`} style={pos(d3)} />
      </div>
    </section>
  );
}
