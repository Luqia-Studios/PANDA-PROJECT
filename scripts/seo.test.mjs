import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { runInNewContext } from 'node:vm';
import { publicPages } from './layout.mjs';

const origin = 'https://panda-project.it';
const fileFor = path => path.endsWith('/') ? `${path.slice(1)}index.html` : path.slice(1);
const pages = await Promise.all(Object.entries(publicPages).map(async ([path, policy]) => ({path, policy, html:await readFile(fileFor(path), 'utf8')})));

test('canonical, robots, language, sharing and sitemap agree with public route policy', async () => {
  const sitemap = await readFile('sitemap.xml', 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(urls, pages.filter(page => page.policy.indexable !== false).map(page => origin + page.path));
  const titles = new Set();
  for (const {path, policy, html} of pages) {
    assert.match(html, /<html lang="it">/);
    assert.match(html, new RegExp(`name="robots" content="${policy.indexable === false ? 'noindex' : 'index'}, follow"`));
    assert.doesNotMatch(html, /hreflang=/);
    const title = html.match(/<title[^>]*>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `Duplicate title: ${title}`); titles.add(title);
    if (path === '/404.html') { assert.doesNotMatch(html, /rel="canonical"/); continue; }
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`));
    for (const key of ['og:title','og:description','og:url','og:image','og:image:alt','twitter:title','twitter:description','twitter:image','twitter:image:alt']) assert.ok(html.includes(`="${key}" content="`), `${path}: ${key}`);
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      const schema = JSON.parse(match[1]); assert.equal(schema['@context'], 'https://schema.org');
      assert.doesNotMatch(match[1], /datePublished|dateModified/);
    }
  }
  assert.match(await readFile('robots.txt','utf8'), /Sitemap: https:\/\/panda-project\.it\/sitemap\.xml/);
});

test('internal links, fragments, scripts, styles and sharing images exist', async () => {
  for (const {path, html} of pages) {
    const base = new URL(html.match(/<base href="([^"]+)"/)?.[1] || path, origin + path);
    const markup = html.replace(/<base[^>]+>/g,'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, tag => tag.match(/^<script[^>]+src=/) ? tag : '');
    for (const match of markup.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;','&'), base);
      if (url.origin !== origin) continue;
      const target = fileFor(decodeURIComponent(url.pathname));
      await access(target).catch(() => assert.fail(`${path}: missing ${url.pathname}`));
      if (url.hash) assert.ok((await readFile(target,'utf8')).includes(`id="${url.hash.slice(1)}"`), `${path}: missing fragment ${url.hash}`);
    }
    for (const match of html.matchAll(/(?:og:image|twitter:image)" content="([^"]+)"/g)) {
      const url = new URL(match[1]); await access(fileFor(url.pathname));
    }
  }
});


test('dynamic gallery resources exist and internal source copies remain excluded', async () => {
  const context = {window:{}};
  await runInNewContext(await readFile('public/proposta-partner/projects/pandanna/gallery/photos.js','utf8'), context);
  for (const photo of context.window.PANDA_GALLERY_PHOTOS) {
    for (const size of ['thumb','small','preview','full']) await access(`public/assets/images/gallery/${photo.id}-${size}.webp`);
  }
  const gallery = await readFile('public/proposta-partner/projects/pandanna/gallery/gallery.js','utf8');
  for (const video of gallery.matchAll(/"([^"]+\.mp4)"/g)) await access(`public/assets/videos/${video[1]}`);
  for (const file of ['src/home.html','public/proposta-partner/about/index.html','public/proposta-partner/projects/pandanna/index.html','public/proposta-partner/maps/index.html']) assert.match(await readFile(file,'utf8'), /name="robots" content="noindex, follow"/);
});

test('missing pages return HTTP 404 with useful navigation, never a home redirect', async () => {
  const server = spawn(process.execPath, ['scripts/dev-server.mjs'], {env:{...process.env,PORT:'0'},windowsHide:true,stdio:['ignore','pipe','pipe']});
  try {
    const address = await new Promise((resolve,reject) => {
      const timeout = setTimeout(() => reject(new Error('Server did not start')), 10000);
      server.once('error', reject);
      server.stdout.on('data', data => { const url = String(data).match(/http:\/\/localhost:\d+/)?.[0]; if(url){clearTimeout(timeout);resolve(url);} });
    });
    for (const route of ['/seo-page-that-does-not-exist/', '/missing-image.webp', '/journal/', '/journal/diario/', '/public/proposta-partner/journal/diario.html']) {
      const response = await fetch(address + route);
      assert.equal(response.status,404); assert.equal(response.redirected,false);
      const html = await response.text(); assert.match(html,/noindex, follow/); assert.match(html,/href="\/projects\/pandanna\/"/);
    }
    assert.equal((await fetch(address + '/projects/pandanna/')).status,200);
  } finally { server.kill(); }
});
