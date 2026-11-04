import type { TipoAudifono } from "@/content/audifonos";
import Img from "@/components/Img";
import styles from "./Modelos.module.css";

/* Título + modelos en óvalos de vidrio (plantilla de audífonos, Figma nov-2026).
   El nombre lleva la primera palabra en negrita: "RIC 10" → **RIC** 10 */
export default function Modelos({ tipo }: { tipo: TipoAudifono }) {
  return (
    <section className={styles.seccion} aria-labelledby="modelos-titulo">
      <h2 id="modelos-titulo" className={styles.titulo}>
        {tipo.modelosTitulo.suave} <b>{tipo.modelosTitulo.fuerte}</b>
      </h2>
      <ul className={styles.fila}>
        {tipo.modelos.map((m) => {
          const [primera, ...resto] = m.nombre.split(" ");
          return (
            <li key={m.nombre} className={styles.modelo}>
              <span className={styles.ovalo}>
                <Img
                  src={m.imagen}
                  alt={`Audífono ${m.nombre}`}
                  className={m.foto ? styles.fotoUbicada : undefined}
                  style={
                    m.foto
                      ? ({ "--l": m.foto.left, "--t": m.foto.top, "--w": m.foto.ancho } as React.CSSProperties)
                      : undefined
                  }
                />
              </span>
              <span className={styles.nombre}>
                <b>{primera}</b> {resto.join(" ")}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
