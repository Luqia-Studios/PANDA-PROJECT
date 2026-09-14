import { createReadStream, stat } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve("public");
const port = 4173;
const mimeTypes = {
  ".css": "text/css",
  ".glb": "model/gltf-binary",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".webp": "image/webp",
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = normalize(join(root, relativePath));

  if (!filePath.startsWith(`${root}${sep}`) && filePath !== root) {
    response.writeHead(403).end();
    return;
  }

  stat(filePath, (error, details) => {
    if (error || details.isDirectory()) {
      response.writeHead(404).end();
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    createReadStream(filePath).pipe(response);
  });
}).listen(port, () => {
  console.log(`Panda Project: http://localhost:${port}`);
});
