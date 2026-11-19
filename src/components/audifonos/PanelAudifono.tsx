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
    let actual: number | null = null; // avance suavizado del viaje (0 = audífono 1, 1 = audífono 2, 2 = audífono 3)
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const k = Math.min(1, window.innerWidth / ANCHO); // 1 px de Figma en px de pantalla
      // indicador de avance
      const recorrido = r.height - window.innerHeight;
      const avance = recorrido > 0 ? limitar(-r.top / recorrido) : 0;
      barra.current?.style.setProperty("--avance", String(avance));

      // posición del centro de la pantalla, en px de Figma sobre el panel
      const yVista = (window.innerHeight / 2 - r.top) / k;
      imgs.forEach((img, i) => {
        alturas[i] = img.naturalWidth ? (centros[i].d.ancho * img.naturalHeight) / img.naturalWidth : 0;
      });
      const cy = centros.map((c, i) => c.d.top + alturas[i] / 2);
      const objetivo =
        yVista < cy[1]
          ? limitar((yVista - cy[0]) / (cy[1] - cy[0] || 1))
          : 1 + limitar((yVista - cy[1]) / (cy[2] - cy[1] || 1));

      // inercia: el audífono sigue al scroll con un pequeño retraso, así el movimiento es continuo
      // aunque la rueda del mouse avance a saltos
      actual = actual === null ? objetivo : actual + (objetivo - actual) * 0.14;
      if (Math.abs(objetivo - actual) < 0.0005) actual = objetivo;
      else raf = requestAnimationFrame(medir);

      const tramo = actual < 1 ? 0 : 1;
      const a = tramo, b = Math.min(2, tramo + 1);
      const t = actual - tramo;
      const ts = suave(t);
      const x = centros[a].x + (centros[b].x - centros[a].x) * ts;
      const y = cy[a] + (cy[b] - cy[a]) * ts;
      // cambio de foto: fundido largo y suave, con un leve cambio de escala (sale uno, entra el otro)
      const mezcla = suave(limitar((t - 0.2) / 0.6));
      imgs.forEach((img, i) => {
        const op = i === a ? 1 - mezcla : i === b ? mezcla : 0;
        const escala = i === a ? 1 - 0.12 * mezcla : i === b ? 0.88 + 0.12 * mezcla : 1;
        img.style.opacity = String(op);
        img.style.setProperty("--escala", escala.toFixed(4));
      });
      viajero.current?.style.setProperty("--x", x.toFixed(2));
      viajero.current?.style.setProperty("--y", y.toFixed(2));
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
  const bq = p.bloque;
  const pos = (d: { left: number; top: number; ancho: number }) =>
    ({ "--l": d.left, "--t": d.top, "--w": d.ancho }) as React.CSSProperties;
  // letras del hero: caja anclada a la izquierda o a la derecha (px de Figma)
  const ubicar = (l: { tamano: number; top: number; left?: number; right?: number; espaciado?: number }) =>
    ({
      "--s": l.tamano,
      "--t": l.top,
      ...(l.left !== undefined ? { "--l": l.left } : { "--r": l.right }),
      ...(l.espaciado !== undefined ? { "--e": l.espaciado } : {}),
      textAlign: l.left !== undefined ? "left" : "right",
    }) as unknown as React.CSSProperties;

  return (
    <section
      ref={panel}
      className={`${styles.panel} ${p.tema === "beige" ? styles.beige : p.tema === "azul" ? styles.azul : ""}`}
      style={
        {
          "--alto": p.panelAlto ?? 2916,
          "--acordeon": p.acordeonTop ?? 2293,
          "--acordeon-x": p.acordeonLeft ?? 222,
          ...(p.fondo ? { backgroundImage: `url("${p.fondo}")`, backgroundSize: "100% 100%" } : {}),
        } as React.CSSProperties
      }
      aria-labelledby="audifono-titulo"
    >
      <div className={styles.riel} aria-hidden="true">
        <div className={styles.indicador}>
          <span className={styles.pista} />
          <span ref={barra} className={styles.barra} />
        </div>
      </div>

      {/* ondas de fondo: una franja por cada bloque */}
      {[282, 1117.5, 2101].map((t) => (
        <div key={t} className={styles.ondas} style={{ "--t": t } as React.CSSProperties} aria-hidden="true" />
      ))}

      {/* letras enormes y casi transparentes detrás de los audífonos 2 y 3 */}
      {p.marcas?.map((m, i) => (
        <span
          key={i}
          className={styles.marca}
          aria-hidden="true"
          style={{ "--l": m.left, "--y": m.y, "--s": m.tamano } as React.CSSProperties}
        >
          {m.texto}
        </span>
      ))}

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
          <span
            className={`${styles.letras} ${p.letras.degradado ? styles.degradado : ""}`}
            style={
              {
                ...ubicar(p.letras),
                "--n": p.letras.lineas ? Math.max(...p.letras.lineas.map((l) => l.length)) : p.letras.texto.length,
                ...(p.letras.alto ? { "--a": p.letras.alto } : {}),
                ...(p.letras.degradado ? { "--c1": p.letras.degradado[0], "--c2": p.letras.degradado[1] } : {}),
              } as React.CSSProperties
            }
            aria-label={p.letras.texto}
          >
            {p.letras.lineas
              ? p.letras.lineas.map((l) => (
                  <span key={l} className={styles.linea} aria-hidden="true">
                    {l}
                  </span>
                ))
              : p.letras.texto}
          </span>{" "}
          <span
            className={styles.subtitulo}
            style={{ ...ubicar(p.subtitulo), ...(p.subtitulo.color ? { color: p.subtitulo.color } : {}) } as React.CSSProperties}
          >
            {p.subtitulo.texto ?? "Audífonos"}
          </span>
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d1.src} alt={`Audífono ${tipo.titulo.fuerte}`} className={`${styles.dispositivo} ${styles.fijo}`} style={pos(d1)} />
      </div>

      {/* 2 · texto */}
      <div className={styles.bloqueTexto}>
        <div
          className={styles.bloque}
          style={
            {
              "--l": bq.left,
              "--w": bq.ancho,
              "--c": bq.color,
              "--ce": bq.etiquetaColor ?? bq.color,
            } as React.CSSProperties
          }
        >
          <p
            className={styles.etiqueta}
            style={{ "--y": bq.y.etiqueta, "--s": bq.tamano.etiqueta, "--e": bq.espaciado?.etiqueta ?? 0.33 } as React.CSSProperties}
          >
            {bq.etiqueta}
          </p>
          <h2
            className={styles.titulo}
            style={
              {
                "--y": bq.y.titulo,
                "--s": bq.tamano.titulo,
                "--a": bq.tamano.tituloAlto ?? bq.tamano.titulo,
                "--e": bq.espaciado?.titulo ?? 0,
              } as React.CSSProperties
            }
          >
            {bq.titulo.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
          <p
            className={styles.texto}
            style={{ "--y": bq.y.texto, "--s": bq.tamano.texto, "--a": bq.tamano.textoAlto } as React.CSSProperties}
          >
            {bq.texto}
          </p>
        </div>

        {/* RIC: etiquetas ovaladas unidas por una línea */}
        {p.pildoras && (
          <div
            className={styles.pildoras}
            aria-hidden="true"
            style={
              {
                "--l": p.pildoras.left,
                "--w": p.pildoras.ancho,
                "--h": p.pildoras.alto,
                "--lx": p.pildoras.lineaX,
                "--t0": p.pildoras.tops[0],
                "--t1": p.pildoras.tops[p.pildoras.tops.length - 1],
              } as React.CSSProperties
            }
          >
            <span className={styles.corchete} />
            {p.pildoras.items.map((it, i) => (
              <span key={it} className={styles.pildora} style={{ "--t": p.pildoras!.tops[i] } as React.CSSProperties}>
                {it}
              </span>
            ))}
          </div>
        )}
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
