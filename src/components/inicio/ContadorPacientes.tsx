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

/* 25-nov-2026 (Jean): números más grandes "en forma de calendario": cada dígito va en su ficha,
   como un calendario de hojas, y al cambiar la hoja se voltea. Cuenta desde 0 hasta el número
   en ~2.5 s, en pasos, para que alcance a verse el volteo. */
const PASOS = 28;

function useConteo(meta: number, ref: React.RefObject<HTMLElement | null>) {
  const [valor, setValor] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValor(meta);
      return;
    }
    let paso = 0;
    let reloj = 0;
    let espera = 0;
    const avanzar = () => {
      paso++;
      const p = paso / PASOS;
      const suave = 1 - Math.pow(1 - p, 3);
      setValor(Math.round(meta * suave));
      if (paso < PASOS) reloj = window.setTimeout(avanzar, 40 + 140 * p * p); // frena al final
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      espera = window.setTimeout(avanzar, 250);
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
      clearTimeout(reloj);
    };
  }, [meta, ref]);
  return valor;
}

/** número en fichas de calendario; meta "pacientes" = el contador diario */
export default function NumeroCalendario({ meta, sufijo }: { meta: number | "pacientes"; sufijo: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [objetivo, setObjetivo] = useState(meta === "pacientes" ? BASE : meta);
  useEffect(() => {
    if (meta === "pacientes") setObjetivo(pacientesHoy());
  }, [meta]);
  const valor = useConteo(objetivo, ref);
  const texto = formato(valor);
  const ancho = formato(objetivo).length;
  // ceros a la izquierda ocultos para que las fichas no cambien de lugar mientras cuenta
  const relleno = Math.max(0, ancho - texto.length);
  const caracteres = (" ".repeat(relleno) + texto).split("");

  return (
    <span ref={ref} className="calendario" aria-label={`${formato(objetivo)} ${sufijo}`}>
      {caracteres.map((c, i) =>
        c === "." ? (
          <span key={i} className="calendario-punto" aria-hidden="true">
            .
          </span>
        ) : (
          <span key={i} className={`calendario-ficha ${c === " " ? "calendario-vacia" : ""}`} aria-hidden="true">
            {/* la key cambia con el dígito: así se vuelve a ejecutar la animación de volteo */}
            <span key={c} className="calendario-hoja">
              {c === " " ? "0" : c}
            </span>
          </span>
        ),
      )}
      <span className="calendario-sufijo" aria-hidden="true">
        {sufijo}
      </span>
    </span>
  );
}
