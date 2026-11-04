import { site } from "@/content/site";
import styles from "./Momento.module.css";

const garantias = ["Sin costo", "Sin compromiso", "Atención inmediata"];

export default function Momento() {
  return (
    <section className={styles.seccion} aria-labelledby="momento-titulo">
      <div className={styles.tarjeta}>
        <h2 id="momento-titulo" className={styles.titulo}>
          <span className={styles.linea1}>No te pierdas ni un solo</span>{" "}
          <span className={styles.linea2}>momento importante.</span>
        </h2>

        <p className={styles.texto}>
          <b>
            La pérdida auditiva no tratada afecta tu
            <br className={styles.corte} /> bienestar emocional.
          </b>{" "}
          Empieza hoy mismo tu
          <br className={styles.corte} /> cambio con una cita profesional.
        </p>

        <a href={site.agendarUrl} className={styles.boton}>
          Agenda tu cita
        </a>

        <ul className={styles.garantias}>
          {garantias.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
