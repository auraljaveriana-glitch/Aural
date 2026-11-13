"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Proceso.module.css";

/* Animaciones de Conoce el proceso — estilo editorial (pedido de Jean, 13-nov-2026, 2.ª versión):
   lentas y elegantes, nunca exageradas.
   - Los números grandes aparecen suavemente al entrar en pantalla.
   - Títulos y textos: opacidad + desplazamiento vertical.
   - Imágenes: un pequeño desplazamiento vertical al aparecer.
   - Parallax leve en las fotos del inicio y las ondas.
   - Los 5 pasos se apilan con ScrollStack (React Bits).
   Cada elemento se anima una vez al entrar (y se deshace si se vuelve arriba del todo).
   Las posiciones finales son las del diseño. Con "reducir movimiento" no se anima nada. */

gsap.registerPlugin(ScrollTrigger);

const LENTO = 1.4;
const SUAVE = "power3.out";

export default function Cinematico({ children }: { children: React.ReactNode }) {
  const raiz = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.remove(styles.preparando);
      return;
    }

    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add({ escritorio: "(min-width: 1024px)", celular: "(max-width: 1023px)" }, (ctx) => {
      const { escritorio } = ctx.conditions as { escritorio: boolean };
      const d = escritorio ? 40 : 24; // desplazamiento vertical de entrada

      // aparece al entrar en pantalla (se repite si el usuario vuelve a subir por encima)
      const aparecer = (objetivos: gsap.TweenTarget, trigger: Element, extra: gsap.TweenVars = {}) =>
        gsap.from(objetivos, {
          y: d,
          autoAlpha: 0,
          duration: LENTO,
          ease: SUAVE,
          stagger: 0.12,
          ...extra,
          scrollTrigger: { trigger, start: "top 85%", toggleActions: "play none none reverse" },
        });

      /* ---------- inicio ---------- */
      gsap
        .timeline({ defaults: { ease: SUAVE, duration: LENTO } })
        .from(q('[data-a="hero-linea"]'), { yPercent: 100, stagger: 0.12 }, 0.1)
        .from(q('[data-a="hero-entra"]'), { y: d * 0.6, autoAlpha: 0, stagger: 0.1 }, 0.45)
        .from(q('[data-a="hero-circulo"]'), { y: d, autoAlpha: 0, stagger: 0.1 }, 0.3)
        .from(q('[data-a="hero-punto"]'), { autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.8)
        .from(q('[data-a="hero-bajar"]'), { y: -10, autoAlpha: 0, duration: 1 }, 1.1);
      el.classList.remove(styles.preparando);

      // parallax leve al bajar: cada foto a una velocidad un poco distinta
      const hero = q('[data-a="hero"]')[0];
      const alBajar = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      q('[data-a="hero-circulo"], [data-a="hero-punto"]').forEach((c, i) => {
        gsap.to(c, { y: -(30 + (i % 4) * 22) * (escritorio ? 1 : 0.5), ease: "none", scrollTrigger: alBajar });
      });
      gsap.to(q('[data-a="hero-titulo"]'), { y: -30, ease: "none", scrollTrigger: alBajar });
      gsap.to(q('[data-a="ondas"]'), { y: 60, ease: "none", scrollTrigger: alBajar });

      aparecer(q('[data-a="etiqueta2"]'), q('[data-a="etiqueta2"]')[0]);

      /* ---------- pasos ---------- */
      // las tarjetas las mueve ScrollStack (se apilan); aquí solo se anima su contenido
      q(`.${styles.paso}`).forEach((paso) => {
        const p = gsap.utils.selector(paso);

        // número grande: aparece suave
        aparecer(p('[data-a="numero"]'), paso, { y: d * 1.2, duration: 1.8, delay: 0.1 });
        aparecer(p('[data-a="titulo"] > span'), paso, { delay: 0.2 });
        aparecer(p('[data-a="sube"]'), paso, { delay: 0.35, stagger: 0.15 });
        gsap.from(p('[data-a="linea"]'), {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: paso, start: "top 80%", toggleActions: "play none none reverse" },
        });

        // imagen: pequeño desplazamiento vertical
        const foto = p('[data-a="foto"]');
        if (foto.length) {
          aparecer(foto, paso, { y: d * 1.4, duration: 1.8, delay: 0.25 });
        }

        aparecer(p('[data-a="derecha"]'), paso, { delay: 0.3, stagger: 0.14 });
        gsap.from(p('[data-a="raya"]'), {
          scaleX: 0,
          transformOrigin: "0% 50%",
          duration: 1.4,
          ease: "power2.inOut",
          stagger: 0.14,
          delay: 0.5,
          scrollTrigger: { trigger: paso, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      /* ---------- cierre ---------- */
      const cierre = q('[data-a="cierre"]')[0];
      aparecer(q('[data-a="cierre-foto"]'), cierre, { y: d * 1.5, duration: 1.6 });
      gsap.from(q('[data-a="cierre-linea"]'), {
        yPercent: 100,
        duration: LENTO,
        ease: SUAVE,
        stagger: 0.12,
        delay: 0.3,
        scrollTrigger: { trigger: cierre, start: "top 75%", toggleActions: "play none none reverse" },
      });
      aparecer(q('[data-a="cierre-boton"]'), cierre, { delay: 0.6, stagger: 0.12 });
    });

    // recalcular cuando terminan de cargar las imágenes
    const refrescar = () => ScrollTrigger.refresh();
    window.addEventListener("load", refrescar);

    return () => {
      window.removeEventListener("load", refrescar);
      mm.revert();
    };
  }, []);

  return (
    <div ref={raiz} className={`${styles.cine} ${styles.preparando}`}>
      {/* sin JavaScript se ve todo, sin animación */}
      <noscript>
        <style>{`.${styles.preparando} [data-a] { opacity: 1 !important; visibility: visible !important; }`}</style>
      </noscript>
      {children}
    </div>
  );
}
