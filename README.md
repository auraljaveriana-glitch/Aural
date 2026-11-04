# Aural Centros Auditivos — sitio web

Sitio en **Next.js 16 (App Router) + TypeScript + CSS Modules**, construido a partir de los diseños de
Figma **"INICIO PAG"** y las páginas de audífonos (**RIC**, Retroauriculares, Intracanal, Recargables).
Se publica en **Netlify** desde la rama `main`.

## Páginas

| Ruta | Diseño |
|---|---|
| `/` | INICIO PAG |
| `/audifonos/receptor-en-el-canal` | RIC |

Las demás páginas de audífonos usan la misma plantilla y se activan cuando su contenido está completo
(`plantilla` en `src/content/audifonos.ts`).

## Cómo correrlo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
```

Versión estática de muestra (carpeta `out/`, para subir a Netlify Drop):

```bash
EXPORTAR=1 npm run build
```

## Dónde está cada cosa

- `src/content/` — textos, sedes, enlaces y datos de cada tipo de audífono (preparado para migrar a Sanity).
- `src/components/inicio/` — secciones del inicio.
- `src/components/audifonos/` — plantilla de las páginas de audífonos.
- `public/img/` — imágenes exportadas de Figma.

Las medidas se toman de Figma a 1920 px: `calc(N * var(--px))` equivale a N px de Figma y se reduce
proporcionalmente en pantallas más pequeñas; en tablet y celular cada sección se reorganiza con media queries.
