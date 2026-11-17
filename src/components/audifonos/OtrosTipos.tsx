import Link from "next/link";
import { otrosTipos, type TipoAudifono } from "@/content/audifonos";
import styles from "./OtrosTipos.module.css";

/* Fila de enlaces a los otros tipos de audífonos (diseño v3, 17-nov-2026):
   etiqueta pequeña (BTE, RIC, ITC/CIC), nombre en negrita y flecha; separados por rayas verticales.
   El primero va a la izquierda, el del medio centrado y el último a la derecha. */

function Flecha() {
  return (
    <svg viewBox="0 0 34 22" aria-hidden="true" className={styles.flecha}>
      <path d="M1 11h31M23 2l9 9-9 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function OtrosTipos({ tipo }: { tipo: TipoAudifono }) {
  const lista = otrosTipos[tipo.slug] ?? [];
  const o = tipo.plantilla.otros;
  return (
    <nav
      className={styles.seccion}
      aria-label="Otros tipos de audífonos"
      style={{ "--tras": o.tras, "--antes": o.antes } as React.CSSProperties}
    >
      <ul className={styles.fila}>
        {lista.map((t) => (
          <li key={t.slug}>
            <Link href={`/audifonos/${t.slug}`} className={styles.enlace}>
              <span className={styles.etiqueta}>{t.etiqueta ?? " "}</span>
              <span className={styles.nombre}>{t.nombre}</span>
              <Flecha />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
