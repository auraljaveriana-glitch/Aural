"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import styles from "./Nosotros.module.css";

/* Página Nosotros (Figma "nosotros", 12-nov-2026).
   Efecto (como el video de referencia de Jean): la foto del edificio queda fija de fondo a todo el ancho;
   al bajar, la imagen se parte a la mitad: el panel blanco sube por la derecha y el bloque "Escuchar mejor"
   baja con el scroll (se queda en pantalla, a la izquierda) hasta que llega la sección de Tecnología. Al final, la foto vuelve completa (cierre).
   PENDIENTE (exportar de Figma): foto del edificio sin tono, logo gris, símbolo y gráfico de "Lo que nos guía";
   mientras tanto se usan recortes del diseño. */

const hitos = [
  { anio: "1983", texto: "Nace Aural en España", x: 185, y: 1628 },
  { anio: "2017", texto: "Llegamos a Colombia", x: 503, y: 1574 },
  { anio: "HOY", texto: "10 sedes en el país", x: 777, y: 1618 },
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

export default function Nosotros() {
  const video = useRef<HTMLVideoElement>(null);

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
    <div className={styles.escena}>
      <div className={styles.fondo} aria-hidden="true" />

      {/* 1 · hero: el texto acompaña el scroll (pegado a la pantalla) mientras el panel sube a la derecha */}
      <div className={styles.carril}>
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
                <b>5</b>
                <span>Ciudades</span>
              </li>
              <li>
                <b>10</b>
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

      {/* 2 · panel blanco */}
      <section className={styles.panel} aria-labelledby="nosotros-historia">
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
              style={{ "--x": h.x, "--y": h.y } as React.CSSProperties}
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
          style={{ "--l": 153, "--t": 3170 } as React.CSSProperties}
        >
          Tecnología
        </p>
        <h2 className={styles.tecTitulo}>
          Tecnología que te conecta
          <br />
          con la vida
        </h2>
        <p className={styles.tecTexto}>
          Creemos que la tecnología auditiva debe adaptarse a ti y a tu manera
          de vivir. Por eso, contamos con soluciones diseñadas para ofrecer una
          experiencia auditiva personalizada y ayudarte a disfrutar de los
          sonidos cotidianos.
        </p>
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
