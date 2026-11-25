import Link from "next/link";
import { site } from "@/content/site";
import TarjetasHero from "./TarjetasHero";
import ContadorPacientes from "./ContadorPacientes";
import styles from "./Hero.module.css";

/* Inicio v3 (Figma "INICIO PAG", 20-nov-2026): foto a todo lo ancho con un velo negro al 50 %,
   textos en blanco y tarjetas que rotan abajo a la derecha. */

const cifras = [
  { valor: <ContadorPacientes />, etiqueta: "Pacientes satisfechos" }, // sube cada día hábil
  { valor: "92%", etiqueta: "Nos recomiendan" },
];

function Chevron() {
  return (
    <svg className={styles.chevron} viewBox="0 0 8 16" aria-hidden="true">
      <path d="M1 1l6 7-6 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.fondo} aria-hidden="true" />

      <div className={styles.texto}>
        <h1 className={styles.titulo}>
          {/* en celular los cortes cambian: "Vuelve a escuchar / lo que más te / importa." */}
          <span className={styles.ligero}>Vuelve a</span>
          <br className={styles.soloEscritorio} /> <span className={styles.ligero}>escuchar</span>
          <br className={styles.soloMovil} /> lo que
          <br className={styles.soloEscritorio} /> más te importa
          <span className={styles.soloMovil}>.</span>
        </h1>

        <ul className={styles.cifras}>
          {cifras.map((c) => (
            <li key={c.etiqueta}>
              <strong>{c.valor}</strong>
              <span>{c.etiqueta}</span>
            </li>
          ))}
        </ul>

        <div className={styles.botones}>
          <Link href={site.agendarUrl} className={`${styles.boton} ${styles.botonDorado}`}>
            Agenda tu cita
            <Chevron />
          </Link>
          <Link href="/proceso" className={`${styles.boton} ${styles.botonContorno}`}>
            Conoce el proceso
            <Chevron />
          </Link>
        </div>
      </div>

      <TarjetasHero />
    </section>
  );
}
