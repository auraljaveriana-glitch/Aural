/** @type {import('next').NextConfig} */
// EXPORTAR=1 npm run build → genera la carpeta /out con el sitio estático
// (para subirlo a Netlify Drop sin GitHub, como versión de muestra).
const exportar = process.env.EXPORTAR === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(exportar ? { output: "export", trailingSlash: true } : {}),
};

export default nextConfig;
