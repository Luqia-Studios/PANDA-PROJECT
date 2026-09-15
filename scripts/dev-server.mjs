import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 5173);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".glb": "model/gltf-binary",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".lottie": "application/zip",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    const requestedPath = decodeURIComponent(url.pathname);
    let filePath = normalize(join(root, requestedPath === "/" ? "index.html" : requestedPath));

    if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end("Access denied");
      return;
    }

    if ((await stat(filePath)).isDirectory()) filePath = join(filePath, "index.html");
    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Page not found");
  }
});

const startServer = (portToUse) => {
  server.once("error", (error) => {
    if (error.code !== "EADDRINUSE") throw error;
    server.removeAllListeners("listening");
    console.warn(`La porta ${portToUse} è già in uso: provo la ${portToUse + 1}.`);
    startServer(portToUse + 1);
  });

  server.listen(portToUse, () => {
    console.log(`Panda Project disponibile su http://localhost:${portToUse}`);
  });
};

startServer(port);
