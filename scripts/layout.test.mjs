import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { navigation, renderLayout } from "./layout.mjs";

const root = "public/proposta-partner/";
const text = await readFile(`${root}shared/translations.json`, "utf8");
const translations = JSON.parse(text);
const pages = ["index.html", "about/index.html", "maps/index.html", "projects/pandanna/index.html", "projects/pandanna/gallery/index.html"];

test("translation keys are unique, complete in each language, and generated data agrees with the source", async () => {
  const stack = [];
  const tokens = text.match(/"(?:[^"\\]|\\.)*"|[{}\[\]:,]|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?/g);
  tokens.forEach((token, index) => {
    if (token === "{") stack.push(new Set());
    else if (token === "[") stack.push(null);
    else if (token === "}" || token === "]") stack.pop();
    else if (token.startsWith('"') && tokens[index + 1] === ":") {
      const key = JSON.parse(token);
      assert.ok(!stack.at(-1).has(key), `Chiave duplicata: ${key}`);
      stack.at(-1).add(key);
    }
  });
  assert.deepEqual(Object.keys(translations.languages), ["it", "en", "ru", "de"]);
  const keys = Object.keys(translations.copy.it).sort();
  for (const copy of Object.values(translations.copy)) {
    assert.deepEqual(Object.keys(copy).sort(), keys);
    assert.ok(Object.values(copy).every((value) => typeof value === "string"));
  }
  const context = {window:{}};
  vm.runInNewContext(await readFile(`${root}shared/translations.js`, 'utf8'), context);
  assert.deepEqual(JSON.parse(JSON.stringify(context.window.PANDA_TRANSLATIONS)), translations);
});

test('every public page has one shared header, menu and language selector, with all labels defined', async () => {
  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    for (const marker of ['data-site-header', 'data-site-menu', 'id="language-dialog"']) assert.equal(html.split(marker).length - 1, 1, `${page}: ${marker}`);
    assert.doesNotMatch(html, /<!-- site:|\{\{t:/);
    for (const match of html.matchAll(/data-i18n(?:-(?:aria|alt))?="(\w+)"/g)) assert.ok(match[1] in translations.copy.it, `${page}: ${match[1]}`);
  }
});

test('the layout preserves page-specific links and rejects missing or duplicate includes', async () => {
  const source = await readFile('src/home.html', 'utf8');
  for (const path of ['/maps/', '/projects/pandanna/gallery/']) assert.ok(renderLayout(source, {path}).includes('href="/projects/pandanna/" data-page-return data-i18n="backToPandanna"'));
  assert.throws(() => renderLayout('<!-- site:header -->'));
  assert.throws(() => renderLayout(source + '<!-- site:menu -->'));
  assert.throws(() => renderLayout(source, {path:'/missing/'}));
  assert.throws(() => renderLayout(source, {path:'/journal/diario/'}));
});

test('navigation targets are explicit and current-page markers agree with each public URL', async () => {
  const targets = ['/about/', '/projects/pandanna/', '/projects/pandanna/gallery/', '/maps/'];
  assert.deepEqual(navigation.map(item => item.path), targets);
  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    const path = page === 'index.html' ? '/' : `/${page.replace(/index\.html$/, '')}`;
    for (const tag of ['header', 'footer']) {
      const section = html.match(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>`))[0];
      const links = [...section.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*aria-current="([^"]+)"/g)];
      assert.equal(links.length, 1); assert.equal(links[0][1], path); assert.equal(links[0][2], 'page');
      const nav = section.match(/<nav\b[\s\S]*?<\/nav>/)[0];
      assert.deepEqual([...nav.matchAll(/href="([^"]+)"/g)].map(match => match[1]), targets);
    }
    const menu = html.match(/<dialog class="site-menu"[\s\S]*?<\/dialog>/)[0];
    assert.ok(menu.includes(`href="${path}"`));
    assert.doesNotMatch(html, /href="[^"]*journal|data-history-back/);
    assert.ok(html.includes('href="https://www.instagram.com/lucaorlandi____/"'));
  }
  assert.doesNotMatch(await readFile(`${root}shared/site.js`, 'utf8'), /history\.back|history\.length/);
});

test('public pages have one main H1 and global landmarks outside main', async () => {
  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    const main = html.match(/<main\b[\s\S]*?<\/main>/g);
    assert.equal(main?.length, 1, `${page}: main unico`);
    assert.match(main[0], /^<main\b[^>]*id="main-content"[^>]*tabindex="-1"/, `${page}: destinazione del salto focalizzabile`);
    const skip = html.match(/<a class="skip-link" href="([^"]+)"/);
    const publicPath = page === 'index.html' ? '/' : `/${page.replace(/index\.html$/, '')}`;
    assert.equal(skip?.[1], `${publicPath}#main-content`, `${page}: salto sulla URL pubblica, indipendente dal base`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: H1 unico`);
    assert.equal((main[0].match(/<h1\b/g) || []).length, 1, `${page}: H1 dentro main`);
    assert.doesNotMatch(main[0], /data-site-header|<footer\b/, `${page}: landmark globali fuori da main`);
    const levels = [...main[0].matchAll(/<h([123])\b/g)].map(match => Number(match[1]));
    levels.forEach((level, index) => assert.ok(index === 0 ? level === 1 : level <= levels[index - 1] + 1, `${page}: livelli senza salti`));
  }
});
