import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = await readFile(resolve("src/home.html"), "utf8");
const html = source.replace(
  "<head>",
  '<head>\n    <base href="./public/proposta-partner/" />'
);

await writeFile(resolve("index.html"), html, "utf8");
console.log("Homepage statica generata: index.html");
