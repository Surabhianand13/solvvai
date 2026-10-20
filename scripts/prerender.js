#!/usr/bin/env node
/*
 * Writes the shared tool-page sections (nav, pitch + lead form, related tools,
 * footer, hub grid) into each tool page's HTML, so search engines see every
 * internal link without running JavaScript.
 *
 * The markup comes from tools/tools.js (S.render), so that file stays the single
 * source of truth. Re-run after changing tools.js or adding a tool:
 *
 *   node scripts/prerender.js
 *
 * Sections are wrapped in <!--t-xxx--> … <!--/t-xxx--> markers so re-runs replace
 * them in place. A fresh page only needs the empty placeholders, e.g.
 * <div id="t-nav"></div>.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function loadRenderer() {
  const noop = () => {};
  const el = () => null;
  const document = {
    body: { dataset: { tool: '' }, classList: { add: noop, contains: () => false }, style: {} },
    getElementById: el,
    querySelector: el,
    querySelectorAll: () => [],
    addEventListener: noop,
    createElement: () => ({ style: {}, classList: { add: noop } })
  };
  const window = { addEventListener: noop };
  const sandbox = { window, document, localStorage: { getItem: () => null, setItem: noop }, navigator: {}, location: { href: '', origin: '', pathname: '' }, console };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'tools/tools.js'), 'utf8'), sandbox);
  return window.Solvv;
}

function replaceSection(html, name, inner) {
  const wrapped = `<!--${name}-->${inner}<!--/${name}-->`;
  const marked = new RegExp(`<!--${name}-->[\\s\\S]*?<!--/${name}-->`);
  if (marked.test(html)) return html.replace(marked, () => wrapped);
  const placeholder = `<div id="${name}"></div>`;
  if (html.includes(placeholder)) return html.replace(placeholder, () => wrapped);
  return html;
}

const S = loadRenderer();
let count = 0;
for (const dir of fs.readdirSync(ROOT)) {
  const file = path.join(ROOT, dir, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<body data-tool="([^"]+)">/);
  if (!m) continue;
  const r = S.render(m[1]);
  const before = html;
  html = replaceSection(html, 't-nav', r.nav);
  html = replaceSection(html, 't-pitch', r.pitch);
  html = replaceSection(html, 't-related', r.related);
  html = replaceSection(html, 't-footer', r.footer);
  /* Hub grid lives inside a kept container */
  html = html.replace(/<div id="t-hub">[\s\S]*?<!--\/hub-->|<div id="t-hub"><\/div>/, () => `<div id="t-hub">${r.hub}</div><!--/hub-->`);
  if (html !== before) { fs.writeFileSync(file, html); count++; }
}
console.log(`Pre-rendered ${count} pages`);
