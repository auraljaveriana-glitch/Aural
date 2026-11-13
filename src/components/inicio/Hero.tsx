import Link from "next/link";
import { site } from "@/content/site";
import CarruselHero from "./CarruselHero";
import ContadorPacientes from "./ContadorPacientes";
import styles from "./Hero.module.css";

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
      <div className={styles.texto}>
        <h1 className={styles.titulo}>
          <span className={styles.ligero}>Vuelve a escuchar</span> lo que más te importa
        </h1>

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

        <ul className={styles.cifras}>
          {cifras.map((c) => (
            <li key={c.etiqueta}>
              <strong>{c.valor}</strong>
              <span>{c.etiqueta}</span>
            </li>
          ))}
        </ul>
      </div>

      <CarruselHero />
    </section>
  );
}
