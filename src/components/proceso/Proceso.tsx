import Link from "next/link";
import { site } from "@/content/site";
import { circulos, pasos, puntosHero, type Paso } from "@/content/proceso";
import styles from "./Proceso.module.css";
import Cinematico from "./Cinematico";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack/ScrollStack";

/* Página "Conoce el proceso" (Figma "PROCESO", 13-nov-2026).
   Experiencia "cinematográfica" pedida por Jean: animaciones ligadas al scroll (GSAP ScrollTrigger) en
   Cinematico.tsx; los elementos se marcan con data-a. Las posiciones finales son las del diseño.
   En escritorio todo va posicionado con las coordenadas del diseño (px a 1920, absolutas en la página);
   en celular los bloques se apilan. */

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

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

function PasoTarjeta({ paso }: { paso: Paso }) {
  const t = paso.tarjeta.top;
  const v = (y: number) => y - t; // posición dentro de la tarjeta
  return (
    <ScrollStackItem
      itemClassName={styles.paso}
      style={{ "--top": t, "--alto": paso.tarjeta.bottom - t } as Vars}
    >
      {/* el mismo video del fondo, detrás del contenido de la tarjeta (cada paso empieza en otro punto) */}
      <span className={styles.pasoFondo} aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/proceso-fondo.jpg"
          data-solo-visible=""
        >
          <source src={`/video/proceso-fondo.mp4#t=${(Number(paso.numero) - 1) * 12}`} type="video/mp4" />
        </video>
      </span>
      <span
        className={styles.linea}
        data-a="linea"
        aria-hidden="true"
        style={{ "--y": v(paso.linea.top), "--h": paso.linea.bottom - paso.linea.top } as Vars}
      />
      {paso.puntos && (
        <>
          <span
            className={`${styles.puntoDifuso} ${styles.puntoNavy}`}
            data-a="flota"
            aria-hidden="true"
            style={{ "--x": paso.puntos.navy[0], "--y": v(paso.puntos.navy[1]) } as Vars}
          />
          <span
            className={`${styles.puntoDifuso} ${styles.puntoDorado}`}
            data-a="flota"
            aria-hidden="true"
            style={{ "--x": paso.puntos.dorado[0], "--y": v(paso.puntos.dorado[1]) } as Vars}
          />
        </>
      )}

      <div className={styles.encabezado}>
        <span className={styles.numero} data-a="numero" style={{ "--y": v(paso.y.numero) } as Vars}>
          {paso.numero}
        </span>
        <h2 id={`paso-${paso.numero}`} className={styles.pasoTitulo} data-a="titulo" style={{ "--y": v(paso.y.titulo) } as Vars}>
          {paso.titulo.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h2>
      </div>

      <p
        className={`${styles.subtitulo} ${paso.colorSubtitulo === "navy" ? styles.subtituloNavy : ""}`}
        data-a="sube"
        style={{ "--y": v(paso.y.subtitulo) } as Vars}
      >
        {paso.subtitulo.map((l, i) => (
          <span key={i}>{l} </span>
        ))}
      </p>
      <p className={styles.texto} data-a="sube" style={{ "--y": v(paso.y.texto), "--w": paso.anchoTexto } as Vars}>
        {paso.texto}
      </p>
      {paso.textoFuerte && paso.y.textoFuerte && (
        <p
          className={`${styles.texto} ${styles.textoFuerte}`}
          data-a="sube"
          style={{ "--y": v(paso.y.textoFuerte), "--w": paso.anchoTexto } as Vars}
        >
          {paso.textoFuerte}
        </p>
      )}

      {paso.foto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.foto} data-a="foto" src={paso.foto} alt="" loading="lazy" style={{ "--y": v(1234) } as Vars} />
      )}

      {paso.pruebas && (
        <ul className={styles.pruebas} style={{ "--y": v(2145) } as Vars}>
          {paso.pruebas.map((p) => (
            <li key={p.nombre} className={styles.prueba} data-a="derecha">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.foto} alt="" loading="lazy" />
              <div>
                <h3>{p.nombre}</h3>
                <p>{p.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {paso.lista && (
        <ul className={styles.lista}>
          {paso.lista.map((it) => (
            <li key={it.y} data-a="derecha" style={{ "--y": v(it.y) } as Vars}>
              {it.icono ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.icono} alt="" className={styles.icono} style={{ "--iw": it.iconoAncho ?? 44 } as Vars} />
              ) : (
                <span className={styles.icono} aria-hidden="true" />
              )}
              <span>
                {it.texto.map((l, i) => (
                  <span key={i}>{l} </span>
                ))}
              </span>
            </li>
          ))}
          {paso.separadores?.map((y) => (
            <li key={y} className={styles.separador} data-a="raya" aria-hidden="true" style={{ "--y": v(y) } as Vars} />
          ))}
        </ul>
      )}
    </ScrollStackItem>
  );
}

export default function Proceso() {
  return (
    <Cinematico>
      <div className={styles.pagina}>
        {/* video de fondo (Jean, 13-nov): queda fijo detrás de todo el contenido, con un velo claro */}
        <div className={styles.fondoVideo} aria-hidden="true">
          <div className={styles.fondoVideoPegado}>
            <video autoPlay muted loop playsInline preload="auto" poster="/video/proceso-fondo.jpg">
              <source src="/video/proceso-fondo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className={styles.arriba}>
        <span className={styles.ondas} data-a="ondas" aria-hidden="true" />
        <span className={styles.brillo} data-a="brillo" aria-hidden="true" />

        {/* inicio */}
        <section className={styles.hero} data-a="hero" aria-labelledby="proceso-titulo">
          <p className={styles.etiqueta} data-a="hero-entra">
            Camino Aural
          </p>
          <h1 id="proceso-titulo" className={styles.titulo} data-a="hero-titulo">
            <span className={styles.mascara}>
              <span data-a="hero-linea">Así es tu camino</span>
            </span>
            <span className={styles.mascara}>
              <span data-a="hero-linea">
                hacia una <b>mejor</b>
              </span>
            </span>
            <span className={styles.mascara}>
              <b data-a="hero-linea">audición</b>
            </span>
          </h1>
          <div className={styles.pasos5} data-a="hero-entra">
            <b>5</b>
            <span>Pasos</span>
          </div>
          <p className={styles.intro} data-a="hero-entra">
            <span>Acompañados por profesionales, desde tu </span>
            <span>primera consulta hasta que te sientas </span>
            <span>cómodo escuchando.</span>
          </p>
          <a href="#pasos" className={styles.bajar} data-a="hero-bajar" aria-label="Ver los pasos">
            <svg viewBox="0 0 16 30" aria-hidden="true">
              <path d="M8 1v27M1.5 21.5 8 28l6.5-6.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className={styles.collage} aria-hidden="true">
            {circulos.map((c) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={c.foto}
                src={c.foto}
                alt=""
                className={styles.circulo}
                data-a="hero-circulo"
                style={{ "--x": c.x, "--y": c.y, "--r": c.r } as Vars}
              />
            ))}
            {puntosHero.map((p, i) => (
              <span
                key={i}
                className={`${styles.punto} ${p.color === "navy" ? styles.puntoNavy : styles.puntoDorado}`}
                data-a="hero-punto"
                style={{ "--x": p.x, "--y": p.y, "--r": p.r } as Vars}
              />
            ))}
          </div>
        </section>

        <p className={`${styles.etiqueta} ${styles.etiqueta2}`} data-a="etiqueta2" id="pasos">
          Camino Aural
        </p>

        </div>

        {/* los 5 pasos se apilan al hacer scroll (ScrollStack de React Bits) */}
        <ScrollStack
          className={styles.pila}
          useWindowScroll
          stackPosition="7%"
          itemDistance={120}
          itemStackDistance={28}
          itemScale={0.035}
          baseScale={0.88}
          dimAmount={0.06}
          holdDistance={160}
        >
          {pasos.map((p) => (
            <PasoTarjeta key={p.numero} paso={p} />
          ))}
        </ScrollStack>
      </div>

      {/* cierre */}
      <section className={styles.cierre} data-a="cierre" aria-labelledby="proceso-cierre">
        <div className={styles.cierreFoto} data-a="cierre-foto">
          <h2 id="proceso-cierre" className={styles.cierreTitulo}>
            <span className={styles.mascara}>
              <span data-a="cierre-linea">Nuestro equipo</span>
            </span>
            <span className={styles.mascara}>
              <span data-a="cierre-linea">
                está listo <b>para</b>
              </span>
            </span>
            <span className={styles.mascara}>
              <b data-a="cierre-linea">acompañarte</b>
            </span>
          </h2>
          <div className={styles.botones}>
            <Link href="/#sedes" className={styles.boton} data-a="cierre-boton">
              <span>
                <b>Encuentra tu</b> centro
              </span>
              <Flecha />
            </Link>
            <Link href={site.agendarUrl} className={styles.boton} data-a="cierre-boton">
              <span>
                <b>Agenda tu</b> cita
              </span>
              <Flecha />
            </Link>
          </div>
        </div>
      </section>
    </Cinematico>
  );
}
