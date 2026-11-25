import Link from "next/link";
import { Fragment } from "react";
import type { Bloque, PaginaLegal as Pagina } from "@/content/legales";
import CierreEquipo from "@/components/CierreEquipo";
import styles from "./PaginaLegal.module.css";

/* Páginas legales (diseños de Jean, 25-nov-2026): título centrado, introducción y secciones
   numeradas en dos columnas (título a la izquierda con su número dorado abajo, texto a la derecha),
   separadas por una raya navy. Al final, el mismo cierre de "Conoce el proceso". */

/** **negrita** y [texto](/ruta) dentro de un texto */
function Texto({ t }: { t: string }) {
  const partes = t.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {partes.map((parte, i) => {
        const enlace = parte.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (enlace)
          return (
            <Link key={i} href={enlace[2]} className={styles.enlace}>
              <Texto t={enlace[1]} />
            </Link>
          );
        const negrita = parte.match(/^\*\*([^*]+)\*\*$/);
        if (negrita) return <b key={i}>{negrita[1]}</b>;
        return <Fragment key={i}>{parte}</Fragment>;
      })}
    </>
  );
}

function Bloques({ bloques }: { bloques: Bloque[] }) {
  return (
    <>
      {bloques.map((b, i) => {
        switch (b.tipo) {
          case "parrafo":
            return (
              <p key={i} className={styles.parrafo}>
                <Texto t={b.texto} />
              </p>
            );
          case "lista":
            return (
              <ul key={i} className={styles.lista}>
                {b.items.map((it) => (
                  <li key={it}>
                    <Texto t={it} />
                  </li>
                ))}
              </ul>
            );
          case "tabla":
            return (
              <dl key={i} className={styles.tabla}>
                {b.filas.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            );
          case "subtitulo":
            return (
              <h3 key={i} className={styles.subtitulo}>
                {b.texto}
              </h3>
            );
          case "grupos":
            return (
              <dl key={i} className={styles.grupos}>
                {b.grupos.map((g) => (
                  <div key={g.nombre}>
                    <dt>{g.nombre}</dt>
                    <dd>
                      <ul className={styles.lista}>
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            );
          case "tipos":
            return (
              <div key={i} className={styles.tipos}>
                {b.tipos.map((t) => (
                  <div key={t.nombre} className={styles.tipo}>
                    <h3>{t.nombre}</h3>
                    <Bloques bloques={t.bloques} />
                  </div>
                ))}
              </div>
            );
        }
      })}
    </>
  );
}

export default function PaginaLegal({ pagina }: { pagina: Pagina }) {
  return (
    <>
      <article className={styles.pagina} aria-labelledby="legal-titulo">
        <p className={styles.etiqueta}>Aural Colombia S.A.S</p>
        <h1 id="legal-titulo" className={styles.titulo}>
          {pagina.titulo.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h1>
        <div className={styles.intro}>
          {pagina.intro.map((t, i) => (
            <p key={i}>
              <Texto t={t} />
            </p>
          ))}
        </div>

        <ol className={styles.secciones}>
          {pagina.secciones.map((s, i) => (
            <li key={s.titulo} className={styles.seccion}>
              <div className={styles.izquierda}>
                <h2>{s.titulo}</h2>
                <span className={styles.numero} aria-hidden="true">
                  {i + 1}
                </span>
              </div>
              <div className={styles.derecha}>
                <Bloques bloques={s.bloques} />
              </div>
            </li>
          ))}
        </ol>
      </article>
      <CierreEquipo />
    </>
  );
}
