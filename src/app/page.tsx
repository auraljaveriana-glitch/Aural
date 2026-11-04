import Hero from "@/components/inicio/Hero";
import Camino from "@/components/inicio/Camino";
import Soluciones from "@/components/inicio/Soluciones";
import Servicios from "@/components/inicio/Servicios";
import PorQue from "@/components/inicio/PorQue";
import Widex from "@/components/inicio/Widex";
import Sedes from "@/components/inicio/Sedes";
import Momento from "@/components/inicio/Momento";

// Inicio — se construye por secciones siguiendo "INICIO PAG" de Figma.
export default function Inicio() {
  return (
    <>
      <Hero />
      <Camino />
      <Soluciones />
      <Servicios />
      <PorQue />
      <Widex />
      <Sedes />
      <Momento />
    </>
  );
}
