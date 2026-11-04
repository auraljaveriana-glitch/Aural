import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Cierre.module.css";

function Flecha() {
  return (
    <svg viewBox="0 0 32 20" aria-hidden="true" className={styles.flecha}>
      <path d="M1 10h29M21 1.5l9 8.5-9 8.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Cierre() {
  return (
    <section className={styles.seccion} aria-label="Encuentra tu centro o agenda tu cita">
      <div className={styles.foto}>
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
