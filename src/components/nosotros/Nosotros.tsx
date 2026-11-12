"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import styles from "./Nosotros.module.css";

/* Página Nosotros (Figma "nosotros", 12-nov-2026).
   Animación principal (especificación de Jean): una sola foto del centro se parte por la mitad al hacer scroll;
   cada mitad se abre hacia su lado y revela el contenido blanco detrás; al final las dos mitades vuelven a
   juntarse en el centro, recomponen la foto y aparece el cierre. Todo va ligado al scroll (y se revierte al subir).
   Técnica: capa sticky con dos contenedores overflow:hidden que usan la misma imagen alineada; JS solo
   calcula el progreso (--abre, --inicio, --cierra) con interpolación suave.
   PENDIENTE (exportar de Figma): foto del edificio sin tono, logo gris, símbolo y gráfico de "Lo que nos guía";
   mientras tanto se usan recortes del diseño. */

const hitos = [
  // ya / ca: separación extra (px de diseño) del año y del texto, que en el diseño varía en cada hito
  {
    anio: "1983",
    texto: "Nace Aural en España",
    x: 185,
    y: 1630,
    ya: 5,
    ca: 0,
  },
  {
    anio: "2016",
    texto: "Llegamos a Colombia",
    x: 503,
    y: 1576,
    ya: 12,
    ca: 6,
  },
  {
    anio: "HOY",
    texto: "10 sedes en el país",
    x: 777,
    y: 1620,
    ya: 20,
    ca: -8,
  },
];

function Flecha() {
  return (
    <svg viewBox="0 0 32 20" aria-hidden="true" className={styles.flecha}>
      <path
        d="M1 10h29M21 1.5l9 8.5-9 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const limitar = (v: number) => Math.min(1, Math.max(0, v));
const suave = (t: number) => t * t * (3 - 2 * t);

export default function Nosotros() {
  const escena = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // progreso de la animación de la foto partida, ligado al scroll
  useEffect(() => {
    const el = escena.current;
    const pn = panel.current;
    if (!el || !pn) return;
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const actual = { abre: 0, inicio: 0, cierra: 0 };
    let raf = 0;

    const objetivo = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const inicioEscena = el.getBoundingClientRect().top + y;
      const finPanel = pn.getBoundingClientRect().bottom + y;
      const inicio = limitar((y - inicioEscena) / (vh * 0.7)); // fases 2-3: se abre
      const cierra = limitar((y - (finPanel - vh * 0.65)) / (vh * 0.65)); // fase 4: se vuelve a unir
      return { abre: suave(inicio) * (1 - suave(cierra)), inicio, cierra };
    };

    const pintar = () => {
      el.style.setProperty("--abre", actual.abre.toFixed(4));
      el.style.setProperty("--inicio", actual.inicio.toFixed(4));
      el.style.setProperty("--cierra", actual.cierra.toFixed(4));
    };

    const paso = () => {
      const o = objetivo();
      let sigue = false;
      for (const k of ["abre", "inicio", "cierra"] as const) {
        const d = o[k] - actual[k];
        if (sinMovimiento || Math.abs(d) < 0.0008) actual[k] = o[k];
        else {
          actual[k] += d * 0.16;
          sigue = true;
        }
      }
      pintar();
      raf = sigue ? requestAnimationFrame(paso) : 0;
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(paso);
    };

    Object.assign(actual, objetivo());
    pintar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(raf);
    };
  }, []);

  // los bloques del contenido entran con opacidad y un leve desplazamiento vertical
  useEffect(() => {
    const pn = panel.current;
    if (!pn) return;
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).dataset.visible = "";
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    Array.from(pn.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // el video solo se reproduce cuando está en pantalla
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.escena} ref={escena}>
      {/* capa fija: la foto partida en dos mitades + el texto inicial */}
      <div className={styles.puertas}>
        <div className={styles.pegado}>
          <div
            className={`${styles.mitad} ${styles.izquierda}`}
            aria-hidden="true"
          />
          <div
            className={`${styles.mitad} ${styles.derecha}`}
            aria-hidden="true"
          />
          <section className={styles.hero} aria-labelledby="nosotros-titulo">
            <div className={styles.heroContenido}>
              <h1 id="nosotros-titulo" className={styles.heroTitulo}>
                <span>Escuchar mejor</span>
                <b>es vivir mejor</b>
              </h1>
              <p className={styles.heroTexto}>
                En Aural creemos que escuchar nos conecta con las personas, los
                momentos y las experiencias que hacen parte de nuestra vida.
              </p>
              <ul className={styles.cifras}>
                <li>
                  <b>2</b>
                  <span>Países</span>
                </li>
                <li>
                  <b>5</b>
                  <span>Ciudades</span>
                </li>
                <li>
                  <b>12</b>
                  <span>
                    Centros
                    <br />
                    auditivos
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* 1 · espacio de la foto completa antes de que se abra */}
      <div className={styles.inicio} aria-hidden="true" />

      {/* 2 · panel blanco */}
      <section
        ref={panel}
        className={styles.panel}
        aria-labelledby="nosotros-historia"
      >
        <p
          className={styles.etiqueta}
          style={{ "--l": 175, "--t": 205 } as React.CSSProperties}
        >
          Nosotros
        </p>
        <h2 id="nosotros-historia" className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/nosotros/temp-logo.jpg" alt="Aural" />
        </h2>
        <div className={styles.historia}>
          <p>
            Aural nació en España con una idea clara: que cada persona reciba
            atención auditiva cercana y profesional.
          </p>
          <p>
            Hoy somos una red de centros respaldada por Widex y llevamos más de
            10 años en Colombia. Nuestro compromiso es el mismo en todas partes:{" "}
            <b>acompañarte de principio a fin.</b>
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/nosotros/temp-simbolo.jpg"
          alt=""
          className={styles.simbolo}
        />

        <ol className={styles.hitos}>
          {hitos.map((h) => (
            <li
              key={h.anio}
              style={
                {
                  "--x": h.x,
                  "--y": h.y,
                  "--ya": h.ya,
                  "--ca": h.ca,
                } as React.CSSProperties
              }
            >
              <span className={styles.punto} aria-hidden="true" />
              <b>{h.anio}</b>
              <span>{h.texto}</span>
            </li>
          ))}
        </ol>

        <h2 className={styles.guiaTitulo}>Lo que nos guía</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/nosotros/temp-guia.jpg"
          alt="1. Atención profesional. 2. Adaptación personalizada. 3. Garantía de satisfacción. 4. Acompañamiento continuo."
          className={styles.guia}
        />

        <p
          className={styles.etiqueta}
          style={{ "--l": 149, "--t": 3120 } as React.CSSProperties}
        >
          Tecnología
        </p>
        <h2 className={styles.tecTitulo}>
          Tecnología que te conecta
          <br />
          con la vida
        </h2>
        <video
          ref={video}
          className={styles.video}
          src="/video/widex-tecnologia.mp4"
          poster="/video/widex-tecnologia.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Video: audífono Widex por dentro"
        />
        <p className={styles.tecTexto}>
          Creemos que la tecnología auditiva debe adaptarse a ti y a tu manera
          de vivir. Por eso, contamos con soluciones diseñadas para ofrecer una
          experiencia auditiva personalizada y ayudarte a disfrutar de los
          sonidos cotidianos.
        </p>
      </section>

      {/* 3 · cierre sobre la foto */}
      <section className={styles.cierre} aria-labelledby="nosotros-cierre">
        <h2 id="nosotros-cierre" className={styles.cierreTitulo}>
          <span>Nuestro equipo</span>
          <span>
            está listo <b>para</b>
          </span>
          <b>acompañarte</b>
        </h2>
        <div className={styles.botones}>
          <Link href="/#sedes" className={styles.boton}>
            <span>
              <b>Encuentra tu</b> centro
            </span>
            <Flecha />
          </Link>
          <Link href={site.agendarUrl} className={styles.boton}>
            <span>
              <b>Agenda tu</b> cita
            </span>
            <Flecha />
          </Link>
        </div>
      </section>
    </div>
  );
}
