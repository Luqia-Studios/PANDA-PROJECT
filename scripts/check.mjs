import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = [
  "index.html",
  "src/home.html",
  "public/proposta-partner/about/index.html",
  "public/proposta-partner/shared/header.css",
  "public/proposta-partner/index.html",
  "public/proposta-partner/shared/site.js",
  "public/proposta-partner/journal/diario.js",
  "public/proposta-partner/journal/content.js",
  "public/proposta-partner/maps/index.html",
  "public/proposta-partner/projects/pandanna/index.html",
  "public/proposta-partner/projects/pandanna/gallery/index.html"
];

await Promise.all(requiredFiles.map((file) => access(file, constants.R_OK)));

const textFiles = await Promise.all(requiredFiles.map(async (file) => [file, await readFile(file, "utf8")]));
const forbiddenGalleryReference = /foto\.html|journal-gallery/i;

for (const [file, content] of textFiles) {
  if (forbiddenGalleryReference.test(content)) {
    throw new Error(`Riferimento alla galleria rimosso trovato in ${file}`);
  }
}

const home = await readFile("index.html", "utf8");
if (/<iframe\b/i.test(home)) throw new Error("La homepage non deve usare iframe");
if (!/projects\/pandanna\/gallery\//i.test(home)) throw new Error("La homepage deve includere il link alla galleria di Panda Anna");

const seoPages = [
  ["index.html", "https://panda-project.it/"],
  ["public/proposta-partner/about/index.html", "https://panda-project.it/about/"],
  ["public/proposta-partner/projects/pandanna/index.html", "https://panda-project.it/projects/pandanna/"],
  ["public/proposta-partner/maps/index.html", "https://panda-project.it/maps/"],
  ["public/proposta-partner/journal/diario.html", "https://panda-project.it/journal/diario/"]
];

const sitemap = await readFile("sitemap.xml", "utf8");
if (sitemap.includes("proposta-partner")) throw new Error("La sitemap non deve esporre cartelle interne di sviluppo");
for (const [file, canonical] of seoPages) {
  const page = await readFile(file, "utf8");
  if (!page.includes('name="robots" content="index, follow"')) throw new Error(`${file}: direttiva robots indicizzabile mancante`);
  if (!page.includes(`rel="canonical" href="${canonical}"`)) throw new Error(`${file}: canonical mancante o non coerente`);
  if (!page.includes('application/ld+json')) throw new Error(`${file}: dati strutturati mancanti`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) throw new Error(`${file}: URL canonica mancante dalla sitemap`);
}

const generatedPages = [
  ["about/index.html", "https://panda-project.it/about/"],
  ["projects/pandanna/index.html", "https://panda-project.it/projects/pandanna/"],
  ["maps/index.html", "https://panda-project.it/maps/"],
  ["journal/diario/index.html", "https://panda-project.it/journal/diario/"]
];
for (const [file, canonical] of generatedPages) {
  const page = await readFile(file, "utf8");
  if (!page.includes(`rel="canonical" href="${canonical}"`)) throw new Error(`${file}: pagina pubblica con canonical errata`);
}

new Function(await readFile("public/proposta-partner/shared/site.js", "utf8"));
new Function(await readFile("public/proposta-partner/journal/diario.js", "utf8"));
new Function(await readFile("public/proposta-partner/journal/content.js", "utf8"));

console.log("Controlli statici completati.");
