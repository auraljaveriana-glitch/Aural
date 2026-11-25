import Link from "next/link";
import { site } from "@/content/site";
import styles from "@/components/proceso/Proceso.module.css";

/* "Nuestro equipo está listo para acompañarte": el mismo cierre de Conoce el proceso
   (se usa también en las páginas legales). */

function Flecha() {
  return (
    <svg viewBox="0 0 32 20" aria-hidden="true" className={styles.flecha}>
      <path d="M1 10h29M21 1.5l9 8.5-9 8.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CierreEquipo() {
  return (
    <section className={styles.cierre} aria-labelledby="cierre-equipo">
      <div className={styles.cierreFoto}>
        <h2 id="cierre-equipo" className={styles.cierreTitulo}>
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
      </div>
    </section>
  );
}
