import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = [
  "index.html",
  "src/home.html",
  "public/proposta-partner/index.html",
  "public/proposta-partner/shared/site.js",
  "public/proposta-partner/journal/diario.js",
  "public/proposta-partner/journal/content.js",
  "public/proposta-partner/maps/index.html",
  "public/proposta-partner/projects/pandanna/index.html"
];

await Promise.all(requiredFiles.map((file) => access(file, constants.R_OK)));

const textFiles = await Promise.all(requiredFiles.map(async (file) => [file, await readFile(file, "utf8")]));
const forbiddenGalleryReference = /foto\.html|journal-gallery|"gallery"/i;

for (const [file, content] of textFiles) {
  if (forbiddenGalleryReference.test(content)) {
    throw new Error(`Riferimento alla galleria rimosso trovato in ${file}`);
  }
}

const home = await readFile("index.html", "utf8");
if (/<iframe\b/i.test(home)) throw new Error("La homepage non deve usare iframe");

new Function(await readFile("public/proposta-partner/shared/site.js", "utf8"));
new Function(await readFile("public/proposta-partner/journal/diario.js", "utf8"));
new Function(await readFile("public/proposta-partner/journal/content.js", "utf8"));

console.log("Controlli statici completati.");
