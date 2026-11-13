"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Proceso.module.css";

/* Experiencia "cinematográfica" de Conoce el proceso (pedido de Jean, 13-nov-2026):
   - Inicio: las fotos y el título entran con escala, opacidad y desenfoque; al bajar, el título se
     corre y se achica, y fotos, ondas y luz se mueven a distintas velocidades (parallax).
   - Pasos: cada tarjeta entra con desplazamiento, escala y desenfoque; el número llega desde la
     izquierda, el título se revela de forma horizontal, los textos suben, la foto hace zoom y lo de
     la derecha entra desde la derecha. Todo ligado al scroll (scrub), así que se revierte al subir.
   - Cierre: la foto crece hasta su tamaño y el título se revela línea por línea.
   Las posiciones finales son siempre las del diseño. Con "reducir movimiento" no se anima nada. */

gsap.registerPlugin(ScrollTrigger);

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
      const k = escritorio ? 1 : 0.5; // distancias más cortas en pantallas pequeñas
      const vw = window.innerWidth / 1920;

      /* ---------- inicio: entrada ---------- */
      const entrada = gsap.timeline({ defaults: { ease: "power3.out" } });
      entrada
        .from(q('[data-a="hero-circulo"]'), {
          scale: 0.55,
          autoAlpha: 0,
          filter: "blur(14px)",
          duration: 1.3,
          stagger: 0.12,
          ease: "back.out(1.4)",
        })
        .from(q('[data-a="hero-punto"]'), { scale: 0, duration: 0.8, stagger: 0.07, ease: "back.out(2.5)" }, 0.5)
        .from(q('[data-a="hero-linea"]'), { yPercent: 110, duration: 1.1, stagger: 0.14 }, 0.25)
        .from(q('[data-a="hero-entra"]'), { y: 30 * k, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.55)
        .from(q('[data-a="hero-bajar"]'), { y: -16, autoAlpha: 0, duration: 0.8 }, 1);

      el.classList.remove(styles.preparando);

      /* ---------- inicio: al hacer scroll ---------- */
      const hero = q('[data-a="hero"]')[0];
      const salida = { trigger: hero, start: "top top", end: () => `+=${window.innerHeight * 0.9}`, scrub: 0.8 };
      gsap.to(q('[data-a="hero-titulo"]'), {
        y: -140 * k,
        scale: 0.82,
        transformOrigin: "0% 0%",
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: salida,
      });
      gsap.to(q('[data-a="hero-entra"]'), { y: -90 * k, autoAlpha: 0, ease: "none", scrollTrigger: salida });
      gsap.to(q('[data-a="hero-bajar"]'), { autoAlpha: 0, ease: "none", scrollTrigger: salida });
      // cada foto a su propia velocidad, con un leve zoom: profundidad
      q('[data-a="hero-circulo"], [data-a="hero-punto"]').forEach((c, i) => {
        gsap.to(c, {
          y: -(110 + ((i * 53) % 190)) * k,
          scale: i % 2 ? 1.08 : 0.94,
          ease: "none",
          scrollTrigger: salida,
        });
      });
      gsap.to(q('[data-a="ondas"]'), { y: 220 * k, ease: "none", scrollTrigger: { ...salida, end: () => `+=${window.innerHeight * 1.4}` } });
      gsap.to(q('[data-a="brillo"]'), { y: 320 * k, scale: 1.2, ease: "none", scrollTrigger: salida });

      gsap.from(q('[data-a="etiqueta2"]'), {
        x: -120 * k,
        autoAlpha: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: q('[data-a="etiqueta2"]')[0], start: "top 95%", end: "top 70%", scrub: 0.8 },
      });

      /* ---------- pasos ---------- */
      q('[data-a="paso"]').forEach((paso) => {
        const p = gsap.utils.selector(paso);
        const llegada = { trigger: paso, start: "top 98%", end: "top 45%", scrub: 0.9 };

        // la tarjeta entra: sube, crece y se enfoca
        gsap.from(paso, {
          y: 140 * k,
          scale: 0.92,
          autoAlpha: 0,
          filter: "blur(12px)",
          ease: "power2.out",
          scrollTrigger: { ...llegada, end: "top 60%" },
        });

        // número desde la izquierda; luego flota más lento que la tarjeta (parallax)
        gsap.from(p('[data-a="numero"]'), { x: -160 * k, autoAlpha: 0, ease: "power3.out", scrollTrigger: llegada });
        gsap.fromTo(
          p('[data-a="numero"]'),
          { yPercent: 0 },
          {
            yPercent: 35,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: paso, start: "top 45%", end: "bottom top", scrub: true },
          },
        );

        // título: revelado horizontal, línea por línea
        gsap.from(p('[data-a="titulo"] > span'), {
          clipPath: "inset(0 100% 0 0)",
          x: 120 * k,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: llegada,
        });

        gsap.from(p('[data-a="sube"]'), {
          y: 60 * k,
          autoAlpha: 0,
          filter: "blur(6px)",
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: { ...llegada, start: "top 80%", end: "top 30%" },
        });

        // la línea dorada se dibuja de arriba hacia abajo
        gsap.from(p('[data-a="linea"]'), {
          clipPath: "inset(0 0 100% 0)",
          ease: "none",
          scrollTrigger: { ...llegada, end: "top 25%" },
        });

        // foto: zoom progresivo con desenfoque inicial
        const foto = p('[data-a="foto"]');
        if (foto.length) {
          gsap.from(foto, {
            scale: 1.25,
            autoAlpha: 0,
            filter: "blur(16px)",
            clipPath: `inset(12% 12% 12% 12% round ${10 * vw}px)`,
            ease: "power2.out",
            scrollTrigger: llegada,
          });
        }

        // lo de la derecha (pruebas o lista) entra desde la derecha
        gsap.from(p('[data-a="derecha"]'), {
          x: 180 * k,
          autoAlpha: 0,
          filter: "blur(8px)",
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: { ...llegada, start: "top 85%", end: "top 30%" },
        });
        gsap.from(p('[data-a="raya"]'), {
          scaleX: 0,
          transformOrigin: "0% 50%",
          stagger: 0.16,
          ease: "power2.out",
          scrollTrigger: { ...llegada, start: "top 75%", end: "top 25%" },
        });
      });

      // puntos difusos: movimiento sutil y continuo
      q('[data-a="flota"]').forEach((d, i) => {
        gsap.to(d, {
          y: i % 2 ? -14 : 12,
          x: i % 2 ? 6 : -8,
          duration: 2.6 + (i % 3) * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      /* ---------- cierre ---------- */
      const cierre = q('[data-a="cierre"]')[0];
      const tCierre = { trigger: cierre, start: "top 95%", end: "top 25%", scrub: 0.9 };
      gsap.from(q('[data-a="cierre-foto"]'), {
        scale: 0.86,
        y: 80 * k,
        autoAlpha: 0.3,
        filter: "blur(10px)",
        ease: "power2.out",
        scrollTrigger: tCierre,
      });
      gsap.from(q('[data-a="cierre-linea"]'), {
        yPercent: 110,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { ...tCierre, start: "top 70%", end: "top 15%" },
      });
      gsap.from(q('[data-a="cierre-boton"]'), {
        x: 80 * k,
        autoAlpha: 0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { ...tCierre, start: "top 55%", end: "top 5%" },
      });
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
