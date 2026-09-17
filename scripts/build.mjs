import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = await readFile(resolve("src/home.html"), "utf8");
const html = source.replace(
  "<head>",
  '<head>\n    <base href="./public/proposta-partner/" />'
);

await writeFile(resolve("index.html"), html, "utf8");

const cleanPages = [
  { source: "public/proposta-partner/about/index.html", output: "about/index.html", base: "/public/proposta-partner/about/", replacements: [["href=\"../index.html\"", "href=\"/\""]] },
  { source: "public/proposta-partner/maps/index.html", output: "maps/index.html", base: "/public/proposta-partner/maps/", replacements: [["href=\"../\"", "href=\"/\""]] },
  { source: "public/proposta-partner/journal/index.html", output: "journal/index.html", base: "/public/proposta-partner/journal/", replacements: [["href=\"../index.html\"", "href=\"/\""], ["href=\"./diario.html\"", "href=\"/journal/diario/\""]] },
  { source: "public/proposta-partner/journal/diario.html", output: "journal/diario/index.html", base: "/public/proposta-partner/journal/", replacements: [["href=\"./index.html\"", "href=\"/journal/\""]] },
  { source: "public/proposta-partner/projects/pandanna/index.html", output: "projects/pandanna/index.html", base: "/public/proposta-partner/projects/pandanna/", replacements: [["href=\"../../index.html\"", "href=\"/\""], ["href=\"../../about/\"", "href=\"/about/\""], ["href=\"../../maps/index.html\"", "href=\"/maps/\""], ["href=\"./gallery/\"", "href=\"/projects/pandanna/gallery/\""], ["href=\"./index.html\"", "href=\"/projects/pandanna/\""]] },
  { source: "public/proposta-partner/projects/pandanna/gallery/index.html", output: "projects/pandanna/gallery/index.html", base: "/public/proposta-partner/projects/pandanna/gallery/", replacements: [] }
];

for (const page of cleanPages) {
  let output = await readFile(resolve(page.source), "utf8");
  output = output.replace("<head>", `<head>\n    <base href="${page.base}" />`);
  for (const [from, to] of page.replacements) output = output.replaceAll(from, to);
  await mkdir(resolve(page.output, ".."), { recursive: true });
  await writeFile(resolve(page.output), output, "utf8");
}

console.log("Pagine statiche generate con URL pubbliche pulite.");
