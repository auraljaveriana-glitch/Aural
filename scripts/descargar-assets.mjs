#!/usr/bin/env node
/**
 * Descarga las imágenes e íconos del diseño de Figma ("informe") a public/figma.
 *
 * Uso:  npm run assets
 *
 * Los enlaces de Figma son temporales (expiran ~7 días después de generarse,
 * generados el 27-oct-2026). Si un enlace ya expiró, exporta esa capa desde Figma
 * manualmente con el mismo nombre de archivo (ver README.md).
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://www.figma.com/api/mcp/asset/";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "figma");

/** destino (relativo a public/figma) → id del asset en Figma */
const ASSETS = {
  // Logo a color (header)
  "logo/c-group.svg": "d250007c-f3fe-4ac8-8f1a-9dc4fafee102.svg",
  "logo/c-group1.svg": "748faa7b-967a-4e3a-8924-006db50e2479.svg",
  "logo/c-group2.svg": "e1162948-e533-4a8c-aca2-0fa462ed0115.svg",
  "logo/c-group3.svg": "8218c04c-1190-4690-9809-f41e2c45ad31.svg",
  "logo/c-group4.svg": "d4918b56-734a-494e-b9ce-448be85deab1.svg",
  "logo/c-vector.svg": "fb408dd5-9a74-46be-aec3-c6413da58cd9.svg",
  "logo/c-group5.svg": "cfaa25f9-240c-4e08-aa8d-537534c9376b.svg",
  "logo/c-group6.svg": "bd395367-5675-4e92-8968-9b43964ba062.svg",
  "logo/c-vector1.svg": "f73a6c9f-fa63-44ca-ae17-ecc1096480ed.svg",
  "logo/c-group7.svg": "41c3e9b6-ec0a-414f-b26f-83c1b2be7540.svg",
  "logo/c-group8.svg": "5809025b-c225-4b65-911b-71c2b8cb571f.svg",
  "logo/c-vector2.svg": "29528e1c-0823-4c7c-a066-3f5d6c35d203.svg",
  "logo/c-vector3.svg": "3244bb81-6403-4a24-b71b-69a5abf6e2f1.svg",
  "logo/c-vector4.svg": "f9778be2-6ccc-4ba4-b919-eadf0823b369.svg",
  "logo/c-vector5.svg": "cf04a85b-12c0-4a10-8d32-820e9b200d17.svg",
  "logo/c-group9.svg": "1de0aeca-3595-42be-ba81-97b9582e9743.svg",
  "logo/c-vector6.svg": "e51d7f1e-b994-47c6-b7a8-5d43bff76f0e.svg",
  "logo/c-vector7.svg": "21d5ab48-8e42-4d10-a029-dc369067aa58.svg",
  "logo/c-vector8.svg": "1d8a6264-e8b1-4bbc-bf83-85597d56b158.svg",
  "logo/c-vector9.svg": "281598a6-7c5d-41ee-8eb7-78338548f8e4.svg",
  "logo/c-vector10.svg": "dbeefc1e-9ff8-4160-99ab-b79d398b6d83.svg",
  "logo/c-vector11.svg": "89abe179-8f4f-4830-a65e-c0f62369067c.svg",
  "logo/c-group10.svg": "a636ce58-64e4-47eb-9110-c2cf8c37dab5.svg",
  // Logo blanco (footer)
  "logo/w-group14.svg": "98c465d8-9ebb-4b7f-90dc-8f4bfd654501.svg",
  "logo/w-group15.svg": "7d530cc9-c244-40ff-bdf2-71c7849de38c.svg",
  "logo/w-group16.svg": "9926ddb4-b188-4052-ac9b-c83e602c43a3.svg",
  "logo/w-group17.svg": "e91fe34d-457e-493b-a89f-bc57b94f2925.svg",
  "logo/w-group18.svg": "37147818-c17d-4fab-b0dd-0843e69f87c2.svg",
  "logo/w-vector14.svg": "5b139e48-5d5d-4e3a-bead-12207eef0ed7.svg",
  "logo/w-group19.svg": "6e107972-ce28-477f-ba24-11300192ad2f.svg",
  "logo/w-group20.svg": "8e29fd3f-a5c4-4c56-8847-fc553f9f5d7f.svg",
  "logo/w-vector15.svg": "1ae80e3b-0856-4ae0-800d-d07e50781756.svg",
  "logo/w-group21.svg": "13628116-c5de-4e90-8a35-67a6deb74efa.svg",
  "logo/w-group22.svg": "39b5b458-a613-4d26-a75a-3586db130131.svg",
  "logo/w-vector16.svg": "19c02941-0121-4e9a-b607-bfc9c110a567.svg",
  "logo/w-vector17.svg": "ef37cc67-65f3-4a0c-979a-bf0e5b893cf1.svg",
  "logo/w-vector18.svg": "38f548f9-74cc-4acb-b118-1c128bd75d8d.svg",
  "logo/w-vector19.svg": "3b053dbc-0c3c-4ab7-b274-cae3577106fa.svg",
  "logo/w-group23.svg": "e1223108-e57b-4305-b8f6-ea7be4395f91.svg",
  "logo/w-vector20.svg": "effe59d3-7499-4cde-a6c1-4711850b7ab2.svg",
  "logo/w-vector21.svg": "3c4b57a1-b75e-428b-a802-09b56bdd6db2.svg",
  "logo/w-vector22.svg": "fb6f7eb8-d498-4139-a4bd-80b5a2e520b1.svg",
  "logo/w-vector23.svg": "ebaba3de-56d1-4f9c-a2be-995ccda8511f.svg",
  "logo/w-vector24.svg": "9f4878e5-fb1c-4345-bec0-af515ca711cc.svg",
  "logo/w-vector25.svg": "35d3e260-52d0-4fd2-bde8-6807cdf432fa.svg",
  "logo/w-group24.svg": "e289927d-e3b9-421d-adb5-c5060e2a06ba.svg",

  // Footer
  "iconos/facebook.svg": "2b026fe6-0ce1-4c97-9c51-e6d2aabf0003.svg",
  "iconos/instagram-1.svg": "33917f73-39ae-4148-9523-27d1449ac608.svg",
  "iconos/instagram-2.svg": "45f1b6a3-3361-4517-a49f-cf476744ca44.svg",
  "iconos/instagram-3.svg": "10f0db7f-c325-4557-80d8-092de6fb3a7d.svg",
  "iconos/youtube.svg": "642ea4e9-9176-4e7b-aeb0-e3d115b55f68.svg",
  "iconos/telefono.svg": "f695f099-09dc-4b68-8c37-ff6ae88b35d5.svg",
  "iconos/email.svg": "6e596d41-9322-4861-b413-e31f31f90c49.svg",

  // Accesos rápidos e íconos generales
  "iconos/ubicacion.svg": "d4117e2e-ff72-46cf-bdb2-1abdaab3f131.svg",
  "iconos/calendario.svg": "89a67b81-b56b-451e-b92c-e1eefbe52ae1.svg",
  "iconos/oido.svg": "a1434ee4-775f-459b-9353-3265771d8537.svg",
  "iconos/insignia-1.svg": "61d90be8-ccfe-4e02-a44a-ddf1b94580a1.svg",
  "iconos/insignia-2.svg": "0699e3b8-0c80-4237-9ab0-265117d13978.svg",
  "iconos/flecha.svg": "8cc59052-02f5-4d24-accc-4f2021883321.svg",
  "iconos/check.svg": "23542d8f-a6df-4ee6-90e8-d09ada70d9b5.svg",
  "iconos/pacientes-1.svg": "b75b9164-6df6-4617-9a7b-4a57e1b45df3.svg",
  "iconos/pacientes-2.svg": "bd1b1a24-c96d-4f2e-96fd-99a80914d964.svg",
  "iconos/sede-pin-1.svg": "78fec2cc-c626-4008-b8f2-04dbea02dd8c.svg",
  "iconos/sede-pin-2.svg": "520ea609-5726-485c-9c0e-6cf6c0770d08.svg",

  // Servicios
  "servicios/examenes.svg": "91d5502a-345c-4d5d-bd18-fdd1222a522c.svg",
  "servicios/prueba.svg": "bfe55bc1-de87-40e1-93e4-e36672695ed8.svg",
  "servicios/adaptacion.svg": "ab72713e-d289-4773-b778-0d1b5a8db508.svg",
  "servicios/entrenamiento.svg": "d93d0def-aebf-46e7-a181-699f665cf69b.svg",

  // Inicio – fotos (renders de Figma)
  "inicio/hero.png": "94628635-c810-419e-919a-96043088c03e.png",
  "inicio/servicios-fondo.png": "1268c6ec-0c7e-455d-adb0-05872b707fa7.png",
  "inicio/por-que-aural.png": "5b49b7ca-5a8c-41b0-bca7-61f449f5f2ba.png",
  "inicio/widex-foto.png": "5c7d7d8e-487a-4a98-8e39-7a7ee1f3291a.png",
  "inicio/widex-logo.png": "2c761988-da6a-4a92-af53-d86b8d4e3f59.png",
  "inicio/cta-foto.png": "f70185b3-599b-4e16-9d50-3a4ff1d7b86f.png",
  "inicio/cta-capa.svg": "2be87263-af5e-4183-8607-90b0970896e4.svg",
  "inicio/mapa-colombia.svg": "d6ad1922-791b-4acb-aeb3-dd25d3200e91.svg",
  "inicio/pin-a.svg": "1c9a413d-92bd-4069-a03f-9f768651a89c.svg",
  "inicio/pin-b.svg": "9e96c551-cb43-46a5-a080-b86059139a34.svg",
  "inicio/pin-c.svg": "a9a5114c-45c3-4ca2-afce-7cd87aed707b.svg",
  "inicio/pin-d.svg": "f2d54115-c207-4d1b-b211-571163f4b83b.svg",

  // Tarjetas de soluciones auditivas
  "soluciones/retroauriculares.png": "8a3a4262-bb63-4615-a123-afb14589c5be.png",
  "soluciones/receptor-en-el-canal.png": "a657d3e3-547a-4d2b-9b77-8e237f9caad1.png",
  "soluciones/intracanal.png": "d78a6ad5-74fc-4afe-83cf-85e624362380.png",
  "soluciones/recargables.png": "a36d78d1-8176-4422-8ce9-d4f86434eb66.png",
  "soluciones/bluetooth.png": "aeb293cb-437e-41fe-8e7f-e3113cfcb1bc.png",

  // Camino Aural
  "camino/hero.png": "0ced89d5-9868-4bfb-bed8-622788bb1893.png",
  "camino/cta-foto.png": "f00ef7b1-ffc0-483b-8d3b-9e28b9ed6f61.png",
  "camino/paso-1.png": "8b1efd15-9c6d-4eda-aaa3-194ffc17cfcc.png",
  "camino/paso-2.png": "c6ae3f0b-0e12-4487-b31b-00a064e6f7c3.png",
  "camino/paso-3.png": "657b0a83-af81-43b7-8de0-e379b1e5472b.png",
  "camino/paso-4.png": "4bccb503-b5e7-4014-9cbc-deb2e632b4ab.png",
  "camino/paso-5.png": "d8b27c13-74ac-4c90-be84-f153a7333633.png",
  "camino/icono-estetoscopio.svg": "a30a8146-ccbb-46cf-a492-5b3c34e000cc.svg",
  "camino/icono-diagnostico.svg": "498920ba-1b8d-4025-b128-6616596aefe8.svg",
  "camino/icono-audifono.svg": "1ffbd838-eb90-4d4f-97d4-6635df367a56.svg",
  "camino/icono-ajuste.svg": "dae6125c-bee3-41b0-8057-821047ade108.svg",
  "camino/icono-seguimiento.svg": "2a21dfdc-d7d5-4cd7-b981-40c3126fe8fb.svg",
  "camino/circulo.svg": "dcbbf82e-76d4-498d-b744-17f9df62a580.svg",
  "camino/circulo-1.svg": "39089e1f-bf84-4600-a982-808f5bbc6c1a.svg",
  "camino/circulo-2.svg": "ec85a324-2e15-40df-8466-e69d75b4b6dd.svg",
  "camino/circulo-3-completo.svg": "ec98cae1-db88-458d-9c68-c2ebc5401d4d.svg",
  "camino/circulo-4.svg": "c247f127-c4dc-4a7f-a87e-e5c35da7bc02.svg",
  "camino/circulo-5.svg": "ea8e6aba-023b-4d7c-985a-8fdb7938ad0a.svg",
};

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

const force = process.argv.includes("--force");
let ok = 0, skipped = 0;
const failed = [];

for (const [dest, id] of Object.entries(ASSETS)) {
  const out = join(root, dest);
  if (!force && (await exists(out))) { skipped++; continue; }
  try {
    const res = await fetch(BASE + id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    ok++;
    process.stdout.write(`✓ ${dest}\n`);
  } catch (err) {
    failed.push(`${dest} (${err.message})`);
  }
}

console.log(`\n${ok} descargados, ${skipped} ya existían, ${failed.length} fallidos.`);
if (failed.length) {
  console.log("\nNo se pudieron descargar (expórtalos desde Figma con este nombre):");
  for (const f of failed) console.log("  - public/figma/" + f);
  process.exitCode = 1;
}
