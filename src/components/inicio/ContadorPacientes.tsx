"use client";

import { useEffect, useRef, useState } from "react";

/* Contador de "Pacientes satisfechos" (pedido de Jean, 13-nov-2026):
   arranca en 5.000 el viernes 13-nov-2026 y cada día hábil (lunes a viernes, hora de Colombia)
   suma una cantidad aleatoria entre 1 y 11. Sábados y domingos no cambia.
   El "aleatorio" sale de la fecha (semilla), así todos los visitantes ven el mismo número el
   mismo día, nunca baja y no hace falta servidor ni actualizarlo a mano.
   25-nov-2026 (Jean): son más de 15.000; desde hoy arranca en 15.000 y sigue subiendo igual.
   Al cargar, el número cuenta desde 0 hasta el de hoy. */

const BASE = 15000;
const INICIO = Date.UTC(2026, 10, 25); // 25-nov-2026
const DURACION = 2200; // ms del conteo
const DIA = 86_400_000;

// número pseudoaleatorio estable a partir de un entero (mulberry32)
function azar(semilla: number) {
  let t = (semilla + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function pacientesHoy(ahora = new Date()) {
  // fecha de hoy en Colombia (UTC−5, sin horario de verano)
  const col = new Date(ahora.getTime() - 5 * 3600_000);
  const hoy = Date.UTC(col.getUTCFullYear(), col.getUTCMonth(), col.getUTCDate());
  let total = BASE;
  for (let d = INICIO + DIA; d <= hoy; d += DIA) {
    const semana = new Date(d).getUTCDay(); // 0 domingo, 6 sábado
    if (semana === 0 || semana === 6) continue;
    total += 1 + Math.floor(azar(d / DIA) * 11); // 1 a 11
  }
  return total;
}

const formato = (n: number) => n.toLocaleString("es-CO").replace(/,/g, ".");

export default function ContadorPacientes() {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const meta = pacientesHoy();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValor(meta);
      return;
    }
    let cuadro = 0;
    let inicio = 0;
    const paso = (t: number) => {
      if (!inicio) inicio = t;
      const p = Math.min(1, (t - inicio) / DURACION);
      const suave = 1 - Math.pow(1 - p, 4); // rápido al principio, despacio al llegar
      setValor(Math.round(meta * suave));
      if (p < 1) cuadro = requestAnimationFrame(paso);
    };
    // espera a que termine la animación de entrada de la página (si está) y a que el número se vea
    let espera = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      espera = window.setTimeout(() => (cuadro = requestAnimationFrame(paso)), 250);
    });
    const observar = () => ref.current && io.observe(ref.current);
    const introActiva =
      document.querySelector("[data-intro]") && !(window as Window & { auralIntroFin?: boolean }).auralIntroFin;
    if (introActiva) window.addEventListener("aural-intro-fin", observar, { once: true });
    else observar();
    return () => {
      window.removeEventListener("aural-intro-fin", observar);
      io.disconnect();
      clearTimeout(espera);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }} aria-label={`Más de ${formato(pacientesHoy())} pacientes`}>
      {formato(valor)} +
    </span>
  );
}
