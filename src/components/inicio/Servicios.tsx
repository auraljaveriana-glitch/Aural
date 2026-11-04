import Link from "next/link";
import Img from "@/components/Img";
import { servicios } from "@/content/servicios";
import styles from "./Servicios.module.css";

const cq = (v: number) => `${(v / 340) * 100}cqi`;

export default function Servicios() {
  return (
    <section id="servicios" className={styles.seccion} aria-labelledby="servicios-titulo">
      <div className={styles.izquierda}>
        <p className={styles.etiqueta}>Nuestros servicios</p>
        <h2 id="servicios-titulo" className={styles.titulo}>
          <span className={styles.linea}>Todo lo que necesitas </span>
          <span className={styles.linea}>
            para oír bien, <b>en un solo</b>{" "}
          </span>
          <b className={styles.linea}>lugar.</b>
        </h2>
        {/* TODO: definir a dónde lleva la flecha */}
        <Link href="#servicios" className={styles.flecha} aria-label="Ver todos los servicios">
          <svg viewBox="0 0 52 47" aria-hidden="true">
            <path d="M1 23.5h49M28 1l22.5 22.5L28 46" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>

      <ul className={styles.grilla}>
        {servicios.map((s) => (
          <li key={s.segunda + s.fuerte} className={styles.tarjeta}>
            {s.icono && (
              <Img
                src={s.icono.src}
                className={styles.icono}
                style={{
                  left: cq(s.icono.box.left),
                  top: cq(s.icono.box.top),
                  width: cq(s.icono.box.width),
                  height: cq(s.icono.box.height),
                }}
              />
            )}
            <h3 className={styles.nombre}>
              <span>
                <b>{s.fuerte}</b>
                {s.suave}
              </span>
              <span>{s.segunda}</span>
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
