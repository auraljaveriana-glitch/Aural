"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navegacion, site } from "@/content/site";
import styles from "./Header.module.css";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  // desplegable de Audífonos: se abre con el mouse encima (escritorio) o con clic/toque
  const [desplegado, setDesplegado] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const abiertoConMouse = useRef(0); // evita que el clic justo después de pasar el mouse lo cierre
  const cerrar = () => {
    setAbierto(false);
    setDesplegado(null);
  };

  useEffect(() => {
    if (!desplegado) return;
    const fuera = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setDesplegado(null);
    };
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setDesplegado(null);
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [desplegado]);
  // En las páginas de audífonos (plantilla "RIC") la barra flota sobre el panel gris
  const ruta = usePathname() ?? "";
  const flotante = ruta.startsWith("/audifonos/") || ruta.startsWith("/nosotros") || ruta.startsWith("/plataformas/");
  // diseño v2 de Nosotros (nov-2026): barra delgada de lado a lado, logo sin "Centros auditivos"
  const delgado = ruta.startsWith("/nosotros");
  // páginas de cada plataforma Widex: logo blanco y botón blanco (Figma ALLURE RIC, MOMENT RIC…)
  const claro = ruta.startsWith("/plataformas/");
  // inicio v3 (20-nov-2026): el menú va sobre la foto oscura del hero, con letras blancas
  const oscuro = ruta === "/";

  return (
    <header className={`${styles.header} ${flotante ? styles.flotante : ""} ${delgado ? styles.delgado : ""} ${claro ? styles.claro : ""} ${oscuro ? styles.oscuro : ""}`}>
      <Link href="/" className={styles.logo} aria-label="Aural Centros Auditivos, inicio">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {delgado ? (
          <img src="/img/logo-aural-sin-subtitulo.svg" alt="Aural Centros Auditivos" width={160} height={38} />
        ) : (
          // en celular va sin "Centros auditivos" (diseño "MOVIL")
          <picture>
            <source media="(max-width: 1023px)" srcSet="/img/logo-aural-sin-subtitulo.svg" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-aural.svg" alt="Aural Centros Auditivos" width={160} height={54} />
          </picture>
        )}
      </Link>

      <nav aria-label="Principal" className={`${styles.menu} ${abierto ? styles.abierto : ""}`} id="menu-principal">
        <ul className={styles.nav} ref={navRef}>
          {navegacion.map((item) =>
            item.grupos ? (
              <li
                key={item.href}
                className={`${styles.conSubmenu} ${desplegado === item.label ? styles.desplegado : ""}`}
                onMouseEnter={() => {
                  if (!window.matchMedia("(hover: hover)").matches) return;
                  abiertoConMouse.current = Date.now();
                  setDesplegado(item.label);
                }}
                onMouseLeave={() => window.matchMedia("(hover: hover)").matches && setDesplegado(null)}
              >
                <button
                  type="button"
                  className={styles.disparador}
                  aria-expanded={desplegado === item.label}
                  aria-controls={`submenu-${item.label}`}
                  onClick={() => {
                    if (Date.now() - abiertoConMouse.current < 600) return;
                    setDesplegado((v) => (v === item.label ? null : item.label));
                  }}
                >
                  {item.label}
                  <svg viewBox="0 0 12 8" aria-hidden="true" className={styles.chevron}>
                    <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={styles.submenu} id={`submenu-${item.label}`}>
                  {item.grupos.map((g) => (
                    <div key={g.titulo} className={styles.grupo}>
                      <p className={styles.grupoTitulo}>{g.titulo}</p>
                      <ul>
                        {g.enlaces.map((e) => (
                          <li key={e.href}>
                            <Link href={e.href} onClick={cerrar} className={e.label === "Ver todas" ? styles.verTodas : undefined}>
                              {e.label}
                              {e.etiqueta && <span className={styles.sigla}>{e.etiqueta}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} onClick={cerrar}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <Link href={site.agendarUrl} className={`${styles.cta} ${styles.ctaMenu}`} onClick={cerrar}>
          Agenda tu cita
        </Link>
      </nav>

      <Link href={site.agendarUrl} className={`${styles.cta} ${styles.ctaHeader}`}>
        Agenda tu cita
      </Link>

      <button
        type="button"
        className={styles.hamburguesa}
        aria-expanded={abierto}
        aria-controls="menu-principal"
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setAbierto((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
