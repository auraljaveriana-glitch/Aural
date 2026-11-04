import { footer, site } from "@/content/site";
import styles from "./Footer.module.css";

const redes = [
  { nombre: "Facebook", href: site.redes.facebook, icono: "/img/footer/facebook.svg", ancho: 54, alto: 54 },
  { nombre: "Instagram", href: site.redes.instagram, icono: "/img/footer/instagram.svg", ancho: 31, alto: 31 },
  { nombre: "YouTube", href: site.redes.youtube, icono: "/img/footer/youtube.svg", ancho: 33, alto: 27 },
];

/* Íconos de teléfono y correo: trazos tipo Lucide, como en el diseño (24 × 24, línea de 2 px). */
function IconoTelefono() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconoCorreo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.arriba}>
        <div className={styles.marca}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/footer/logo-aural-blanco.svg" alt={site.nombre} width={256} height={86} className={styles.logo} />
          <ul className={styles.redes}>
            {redes.map((r) => (
              <li key={r.nombre}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" aria-label={`Aural en ${r.nombre}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.icono}
                    alt=""
                    style={{ width: `calc(${r.ancho} * var(--px))`, height: `calc(${r.alto} * var(--px))` }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.columna} aria-labelledby="footer-servicios">
          <h2 id="footer-servicios">Servicios</h2>
          <ul>
            {footer.servicios.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.columna} aria-labelledby="footer-soluciones">
          <h2 id="footer-soluciones">Soluciones</h2>
          <ul>
            {footer.soluciones.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.columna}>
          <h2>Contacto</h2>
          <ul className={styles.contacto}>
            <li>
              <span className={styles.icono}>
                <IconoTelefono />
              </span>
              <span>
                <span className={styles.etiqueta}>Línea Nacional</span>
                <a href={`tel:${site.contacto.lineaNacionalTel}`}>{site.contacto.lineaNacional}</a>
              </span>
            </li>
            <li>
              <span className={styles.icono}>
                <IconoCorreo />
              </span>
              <span>
                <span className={styles.etiqueta}>Email</span>
                <a href={`mailto:${site.contacto.email}`}>{site.contacto.email}</a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.abajo}>
        <p>© {new Date().getFullYear()} Aural Colombia. Todos los derechos reservados.</p>
        <ul>
          {footer.legales.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
