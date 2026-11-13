"use client";

import { useEffect, useState } from "react";

/* Contador de "Pacientes satisfechos" (pedido de Jean, 13-nov-2026):
   arranca en 5.000 el viernes 13-nov-2026 y cada día hábil (lunes a viernes, hora de Colombia)
   suma una cantidad aleatoria entre 1 y 11. Sábados y domingos no cambia.
   El "aleatorio" sale de la fecha (semilla), así todos los visitantes ven el mismo número el
   mismo día, nunca baja y no hace falta servidor ni actualizarlo a mano. */

const BASE = 5000;
const INICIO = Date.UTC(2026, 10, 13); // 13-nov-2026
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
  const [valor, setValor] = useState(BASE);
  useEffect(() => setValor(pacientesHoy()), []);
  return <>{formato(valor)} +</>;
}
