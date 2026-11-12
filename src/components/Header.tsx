"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navegacion, site } from "@/content/site";
import styles from "./Header.module.css";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  // En las páginas de audífonos (plantilla "RIC") la barra flota sobre el panel gris
  const ruta = usePathname() ?? "";
  const flotante = ruta.startsWith("/audifonos/") || ruta.startsWith("/nosotros");
  // diseño v2 de Nosotros (nov-2026): barra delgada de lado a lado, logo sin "Centros auditivos"
  const delgado = ruta.startsWith("/nosotros");

  return (
    <header className={`${styles.header} ${flotante ? styles.flotante : ""} ${delgado ? styles.delgado : ""}`}>
      <Link href="/" className={styles.logo} aria-label="Aural Centros Auditivos, inicio">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {delgado ? (
          <img src="/img/logo-aural-sin-subtitulo.svg" alt="Aural Centros Auditivos" width={160} height={38} />
        ) : (
          <img src="/img/logo-aural.svg" alt="Aural Centros Auditivos" width={160} height={54} />
        )}
      </Link>

      <nav aria-label="Principal" className={`${styles.menu} ${abierto ? styles.abierto : ""}`} id="menu-principal">
        <ul className={styles.nav}>
          {navegacion.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setAbierto(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={site.agendarUrl} className={`${styles.cta} ${styles.ctaMenu}`} onClick={() => setAbierto(false)}>
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
