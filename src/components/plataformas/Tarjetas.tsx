import Link from "next/link";
import { plataformas } from "@/content/plataformas";
import styles from "./Tarjetas.module.css";

/* "Nuestras Plataformas" (Figma PLATAFORMAS @1920): título centrado, 4 tarjetas de 385 × 309
   (x108 / 541 / 978 / 1411, y463) con la foto del audífono a la derecha y "Explorar" que abre la
   página de cada plataforma; logo Widex debajo. Posiciones de texto por tarjeta tal cual el diseño. */

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;
const IZQ = [108, 541, 978, 1411];

export default function Tarjetas() {
  return (
    <section className={styles.seccion} aria-labelledby="plataformas-titulo">
      <span className={styles.ondas} aria-hidden="true" />
      <p className={styles.antetitulo}>Nuestras</p>
      <h1 id="plataformas-titulo" className={styles.titulo}>
        Plataformas
      </h1>

      <ul className={styles.tarjetas}>
        {plataformas.map((p, i) => (
          <li
            key={p.slug}
            className={styles.tarjeta}
            style={
              {
                "--x": IZQ[i],
                "--ye": p.tarjeta.y.etiqueta - 463,
                "--yt": p.tarjeta.y.titulo - 463,
                "--yb": p.tarjeta.y.boton - 463,
                "--xt": p.tarjeta.x.texto - IZQ[i],
                "--xb": p.tarjeta.x.boton - IZQ[i],
                backgroundImage: `url(${p.tarjeta.imagen})`,
              } as Vars
            }
          >
            <p className={styles.etiqueta}>Plataforma</p>
            <h2 className={styles.nombre}>
              {p.tarjeta.lineas.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h2>
            <Link href={`/plataformas/${p.slug}`} className={styles.boton} aria-label={`Explorar ${p.nombre}`}>
              Explorar
              <svg viewBox="0 0 8 13" aria-hidden="true">
                <path d="M1.5 1.5 6.5 6.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.widex} src="/img/widex/logo-widex.svg" alt="Widex" />
    </section>
  );
}
