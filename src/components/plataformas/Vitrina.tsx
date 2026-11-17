"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { plataformas, type Plataforma } from "@/content/plataformas";
import styles from "./Vitrina.module.css";

/* Vitrina de una plataforma (Figma ALLURE RIC / ALLURE BTE / MOMENT RIC / SMART RIC @1920 × 970):
   título WIDEX + nombre, descripción, lista de 4 características que se resalta sola cada pocos
   segundos (pedido de Jean), selector RIC / BTE, foto grande del audífono, galería de miniaturas
   (al tocar una, su foto ocupa el lugar del audífono) y flechas a la plataforma anterior/siguiente. */

const INTERVALO = 3500;

export default function Vitrina({ plataforma, comoTitulo = "h1" }: { plataforma: Plataforma; comoTitulo?: "h1" | "h2" }) {
  const p = plataforma;
  const [activa, setActiva] = useState(1); // en el diseño arranca resaltada la segunda
  const [estilo, setEstilo] = useState(0);
  const [foto, setFoto] = useState<number | null>(null);
  const [pausa, setPausa] = useState(false);

  useEffect(() => {
    if (pausa || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActiva((a) => (a + 1) % p.caracteristicas.length), INTERVALO);
    return () => window.clearInterval(t);
  }, [pausa, p.caracteristicas.length]);

  const i = plataformas.findIndex((x) => x.slug === p.slug);
  const anterior = i > 0 ? plataformas[i - 1] : null;
  const siguiente = i < plataformas.length - 1 ? plataformas[i + 1] : null;
  const Titulo = comoTitulo;

  return (
    <section className={styles.vitrina} aria-labelledby={`plataforma-${p.slug}`}>
      <span className={styles.ondas} aria-hidden="true" />

      <Titulo id={`plataforma-${p.slug}`} className={styles.titulo}>
        <span className={styles.suave}>{p.titulo.suave}</span> <b>{p.titulo.fuerte}</b>
        {p.titulo.marca && <sup>™</sup>}
      </Titulo>
      <p className={styles.descripcion}>{p.descripcion}</p>

      {/* características: se resaltan una tras otra; al pasar el mouse se detiene en la elegida */}
      <ul className={styles.lista} onMouseLeave={() => setPausa(false)}>
        {p.caracteristicas.map((c, k) => (
          <li
            key={c.nombre}
            className={k === activa ? styles.activa : ""}
            onMouseEnter={() => {
              setActiva(k);
              setPausa(true);
            }}
            style={{ "--k": k } as React.CSSProperties}
          >
            <span className={styles.nombre}>{c.nombre}</span>
            <span className={styles.detalle}>
              <b>{c.titulo}</b>
              <span>{c.texto}</span>
            </span>
          </li>
        ))}
        <span className={styles.riel} aria-hidden="true">
          <span className={styles.marcador} style={{ "--k": activa } as React.CSSProperties} />
        </span>
      </ul>

      {/* RIC / BTE */}
      {p.estilos.length > 1 && (
        <div className={styles.estilos} role="tablist" aria-label="Estilo">
          {p.estilos.map((e, k) => (
            <button
              key={e.nombre}
              type="button"
              role="tab"
              aria-selected={k === estilo}
              className={k === estilo ? styles.estiloActivo : ""}
              onClick={() => {
                setEstilo(k);
                setFoto(null);
              }}
            >
              {e.nombre}
            </button>
          ))}
        </div>
      )}

      {/* foto grande: el audífono o la foto elegida de la galería */}
      <div className={styles.escenario}>
        {p.estilos.map((e, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={e.imagen}
            src={e.imagen}
            alt={`Widex ${p.nombre} ${e.nombre}`}
            className={`${styles.aparato} ${foto === null && k === estilo ? styles.visible : ""}`}
          />
        ))}
        {p.galeria.map((g, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={g}
            src={g}
            alt=""
            loading="lazy"
            className={`${styles.fotoGrande} ${foto === k ? styles.visible : ""}`}
          />
        ))}
      </div>

      {p.galeria.length > 0 && (
        <ul className={styles.galeria}>
          {p.galeria.map((g, k) => (
            <li key={g}>
              <button
                type="button"
                aria-label={`Ver foto ${k + 1} de Widex ${p.nombre}`}
                aria-pressed={foto === k}
                className={foto === k ? styles.miniActiva : ""}
                onClick={() => setFoto(foto === k ? null : k)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {anterior && (
        <Link href={`/plataformas/${anterior.slug}`} className={`${styles.flecha} ${styles.anterior}`} aria-label={`Ver Widex ${anterior.nombre}`}>
          <svg viewBox="0 0 10 16" aria-hidden="true">
            <path d="M8 2 2 8l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
      {siguiente && (
        <Link href={`/plataformas/${siguiente.slug}`} className={`${styles.flecha} ${styles.siguiente}`} aria-label={`Ver Widex ${siguiente.nombre}`}>
          <svg viewBox="0 0 10 16" aria-hidden="true">
            <path d="M2 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </section>
  );
}
