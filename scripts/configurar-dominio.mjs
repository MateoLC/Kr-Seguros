import { readFile, writeFile } from 'node:fs/promises';

// Updates metadata only; no credentials or deployment provider are required.
const input = process.argv[2];
if (!input) {
  console.error('Uso: node scripts/configurar-dominio.mjs https://tu-dominio.com');
  process.exit(1);
}
let target;
try { target = new URL(input); } catch {
  console.error('Introduce una URL válida, incluyendo https://.');
  process.exit(1);
}
if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password || target.search || target.hash || target.pathname !== '/') {
  console.error('Usa solo el origen del sitio, sin credenciales, rutas, parámetros ni fragmentos.');
  process.exit(1);
}
const file = new URL('../dist/index.html', import.meta.url);
const html = await readFile(file, 'utf8');
const current = html.match(/<link rel="canonical" href="([^"]+)"/);
if (!current) throw new Error('No se encontró la URL canonical en index.html.');
const previous = new URL(current[1]).origin;
const updated = html.replaceAll(previous, target.origin);
await writeFile(file, updated);
console.log('Metadatos actualizados para ' + target.origin);
