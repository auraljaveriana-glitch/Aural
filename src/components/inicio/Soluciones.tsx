import Link from "next/link";
import { soluciones } from "@/content/soluciones";
import styles from "./Soluciones.module.css";

// Las medidas de la foto están en px de Figma sobre una tarjeta de 784 px de ancho.
const pct = (v: number) => `${(v / 784) * 100}cqi`;

export default function Soluciones() {
  return (
    <section className={styles.seccion} aria-labelledby="soluciones-titulo">
      <div className={styles.ondas} aria-hidden="true" />
      <h2 id="soluciones-titulo" className={styles.titulo}>
        <span className={styles.ligero}>Un diseño perfecto para</span> cada oído y estilo de vida.
      </h2>

      <ul className={styles.grilla}>
        {soluciones.map((s) => (
          <li key={s.slug}>
            <Link href={`/audifonos/${s.slug}`} className={styles.tarjeta}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.foto}
                alt=""
                className={styles.foto}
                style={{ left: pct(s.img.left), top: pct(s.img.top), width: pct(s.img.width) }}
                loading="lazy"
              />
              <span className={`${styles.texto} ${s.titulo.includes("\n") ? styles.dosLineas : ""}`}>
                <span className={styles.etiqueta}>Audífonos</span>
                <span className={styles.nombre}>{s.titulo}</span>
                <span className={styles.raya} aria-hidden="true" />
                <span className={styles.sigla}>{s.sigla}</span>
              </span>
              <span className={styles.flecha} aria-hidden="true">
                <svg viewBox="0 0 32 18">
                  <path d="M1 9h29M22 1l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
