import Link from "next/link";
import styles from "./Widex.module.css";

export default function Widex() {
  return (
    <section className={styles.seccion} aria-labelledby="widex-titulo">
      <div className={styles.texto}>
        <p className={styles.etiqueta}>Nuestros audífonos</p>
        <h2 id="widex-titulo" className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/widex/logo-widex.svg" alt="Widex" width={575} height={166} />
        </h2>
        <p className={`${styles.parrafo} ${styles.primero}`}>Trabajamos con Widex, líderes mundiales en innovación.</p>
        <p className={styles.parrafo}>
          Desde la claridad esencial hasta el procesamiento inteligente de sonido, tenemos el nivel tecnológico
          ideal para ti.
        </p>
        <Link href="/audifonos" className={styles.boton}>
          Nuestras plataformas
          <svg viewBox="0 0 34 22" aria-hidden="true">
            <path d="M1 11h31M22 1l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </Link>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/widex/smartric.png"
        alt="Audífonos Widex SmartRIC en color oro rosa sobre su estuche cargador"
        className={styles.fotoGrande}
        width={503}
        height={884}
        loading="lazy"
      />
      {/* No aparece en la exportación de Figma: va arriba de la foto pequeña,
          en el espacio libre de la columna derecha (indicación de Jean). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/widex/cargador.png"
        alt="Audífonos Widex en su cargador"
        className={styles.fotoCargador}
        width={478}
        height={555}
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/widex/color-range.png"
        alt="Gama de colores de los audífonos Widex"
        className={styles.fotoPequena}
        width={478}
        height={322}
        loading="lazy"
      />
    </section>
  );
}
