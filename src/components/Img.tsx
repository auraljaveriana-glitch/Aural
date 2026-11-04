"use client";

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/**
 * <img> que se oculta si el archivo aún no existe (assets de Figma pendientes),
 * para que la maqueta no muestre íconos rotos.
 */
export default function Img({ alt = "", style, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [error, setError] = useState(false);

  // Si la imagen falló antes de hidratar, onError no se dispara: lo revisamos aquí
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setError(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
      style={error ? { ...style, visibility: "hidden" } : style}
      onError={() => setError(true)}
    />
  );
}
