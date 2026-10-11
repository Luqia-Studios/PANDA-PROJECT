import { readFile, writeFile, mkdir } from 'node:fs/promises';
await mkdir('.tmp/performance', { recursive:true });
await writeFile('.tmp/performance/probe.js', await readFile('scripts/performance-probe.js'));
for (const [name, file, base] of [
  ['home', 'index.html', '/public/proposta-partner/'],
  ['gallery', 'projects/pandanna/gallery/index.html', '/public/proposta-partner/projects/pandanna/gallery/'],
  ['maps', 'maps/index.html', '/public/proposta-partner/maps/']
]) {
  const html = (await readFile(file, 'utf8')).replace(/<base href="[^"]+"/, `<base href="${base}"`).replace('<head>', '<head><script src="/.tmp/performance/probe.js"></script>');
  await writeFile(`.tmp/performance/${name}.html`, html);
}
console.log('Fixture di laboratorio: /.tmp/performance/{home,gallery,maps}.html; dati nel nodo #performance-report dopo 3 secondi.');
