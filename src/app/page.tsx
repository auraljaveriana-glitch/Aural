import Hero from "@/components/inicio/Hero";
import Camino from "@/components/inicio/Camino";
import Soluciones from "@/components/inicio/Soluciones";
import Servicios from "@/components/inicio/Servicios";
import PorQue from "@/components/inicio/PorQue";
import Widex from "@/components/inicio/Widex";
import Sedes from "@/components/inicio/Sedes";
import Momento from "@/components/inicio/Momento";
import Intro from "@/components/inicio/Intro";
import styles from "./page.module.css";

// Inicio — se construye por secciones siguiendo "INICIO PAG" de Figma.
export default function Inicio() {
  return (
    <>
      <Intro />
      <div className={styles.arriba}>
        <Hero />
        <Camino />
      </div>
      {/* espacio entre secciones (Jean, 20-nov-2026) */}
      <div className={styles.secciones}>
        <Soluciones />
        <Servicios />
        <PorQue />
        <Widex />
        <Sedes />
        <Momento />
      </div>
    </>
  );
}
