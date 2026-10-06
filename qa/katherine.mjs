// Katherine — une visiteuse qui ouvre le portfolio et fait ce qu'une vraie
// personne fait : elle attend l'intro, elle descend la page, elle change de
// langue, elle copie le courriel, sur ordi et sur téléphone.
//
// Elle juge sur ce que le navigateur AFFICHE (opacité, visibilité, défilement),
// jamais sur ce que le code prétend. Et elle commence par un contrôle négatif :
// si elle ne sait pas voir un projet caché exprès, elle ne prouve rien.
//
//   npm install
//   node katherine.mjs                       # le dépôt local, servi en HTTP sur 127.0.0.1
//   node katherine.mjs https://katherinemli.github.io/Portafolio/
//
// Verdicts : PASS · DEFECT · INCONCLUSIVE. Code de sortie 1 s'il y a un DEFECT.

import { chromium } from 'playwright';

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

// Without a URL, serve the repo over HTTP on localhost: a real visitor never sees file://.
let server, TARGET = process.argv[2];
if (!TARGET) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const types = { '.html': 'text/html; charset=utf-8', '.pdf': 'application/pdf', '.m4a': 'audio/mp4', '.js': 'text/javascript', '.json': 'application/json' };
  server = http.createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
    const file = path || 'index.html';
    try { const body = await readFile(join(root, file)); res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }); res.end(body); }
    catch { res.writeHead(404); res.end(); }
  });
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  TARGET = `http://127.0.0.1:${server.address().port}/`;
}
const results = [];
const verdict = (id, status, what) => { results.push({ id, status, what }); console.log(`${status.padEnd(12)} ${id}  ${what}`); };

// Every element of real content in the hero and sections must end up visible.
// Decoration (aria-hidden: blinking caret, illustrations) and the translucent
// orbit path are allowed to move and fade.
const findHidden = page => page.evaluate(() =>
  [...document.querySelectorAll('.hero *, section *')]
    .filter(e => !e.closest('[aria-hidden="true"]') && !e.closest('.scope .path'))
    .filter(e => {
      const c = getComputedStyle(e);
      if (c.visibility === 'hidden' || +c.opacity < 0.99) return true;
      // shrunk to nothing (scale 0, collapsed): text that exists but takes no space can't be read
      const r = e.getBoundingClientRect();
      return e.children.length === 0 && e.textContent.trim() && c.display !== 'none' && (r.width < 1 || r.height < 1);
    })
    .map(e => `${e.tagName.toLowerCase()}.${e.getAttribute('class') || ''}`.replace(/\.$/, ''))
);

async function scrollLikeAPerson(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 350) { await page.mouse.wheel(0, 350); await page.waitForTimeout(220); }
  await page.waitForTimeout(1500);
}

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const errors = [];
const open = async (opts = {}) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ...opts });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  return page;
};

console.log(`Katherine → ${TARGET}\n`);

// K0 — contrôle négatif : un projet caché exprès DOIT être vu.
{
  const page = await open();
  await page.goto(TARGET); await page.waitForTimeout(5500);
  await scrollLikeAPerson(page);
  await page.addStyleTag({ content: '.jobs-past .job:nth-child(2) { opacity: 0 !important; }' });
  const hidden = await findHidden(page);
  if (hidden.some(h => h.startsWith('article.job'))) verdict('K0', 'PASS', 'le contrôle voit un emploi caché exprès');
  else verdict('K0', 'INCONCLUSIVE', 'le contrôle n’a PAS vu l’emploi caché : les jugements suivants ne prouvent rien');
  await page.close();
}

// K1 — l'intro se termine : nom, rôle, texte et radar visibles, nom intact pour les lecteurs d'écran.
{
  const page = await open();
  await page.goto(TARGET); await page.waitForTimeout(6000);
  const hero = await page.evaluate(() => ['h1', '.role', '.lede', '.facts', '.avatar-wrap'].map(s => {
    const c = getComputedStyle(document.querySelector(s)); return c.visibility === 'visible' && +c.opacity > 0.99;
  }));
  const name = await page.$eval('.name', e => e.getAttribute('aria-label') || e.textContent.trim());
  if (hero.every(Boolean) && name === 'Katherine Liberona Irarrázabal') verdict('K1', 'PASS', 'intro terminée, tout est visible, le nom se lit en entier');
  else verdict('K1', 'DEFECT', `après l’intro : visibles=${JSON.stringify(hero)} nom="${name}"`);

  // K9 — le rideau est parti : c'est bien le nom qu'on touche au milieu du titre, pas une couche décorative.
  const top = await page.evaluate(() => {
    const r = document.querySelector('.name').getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return el && el.closest('h1') ? 'h1' : (el ? `${el.tagName.toLowerCase()}.${el.getAttribute('class') || ''}` : 'rien');
  });
  if (top === 'h1') verdict('K9', 'PASS', 'rien ne recouvre le nom après l’intro');
  else verdict('K9', 'DEFECT', `le nom est recouvert par ${top}`);

  // K2 — elle descend toute la page : rien ne reste caché derrière une animation.
  await scrollLikeAPerson(page);
  const hidden = await findHidden(page);
  if (!hidden.length) verdict('K2', 'PASS', 'toute la page est visible après défilement');
  else verdict('K2', 'DEFECT', `encore caché : ${hidden.slice(0, 5).join(', ')}`);

  // K3 — elle passe en anglais.
  await page.click('.lang button[data-lang="en"]'); await page.waitForTimeout(900);
  const en = await page.evaluate(() => ({ lang: document.documentElement.lang, role: document.querySelector('.role').textContent }));
  const hiddenAfter = await findHidden(page);
  if (en.lang === 'en-CA' && en.role === 'Full stack developer' && !hiddenAfter.length) verdict('K3', 'PASS', 'EN : texte changé et entièrement visible');
  else verdict('K3', 'DEFECT', `EN : ${JSON.stringify(en)} caché=${hiddenAfter.slice(0, 3)}`);

  // K4 — elle copie le courriel : le bouton répond, les cœurs partent et ne restent pas dans la page.
  await page.click('#copy'); await page.waitForTimeout(200);
  const label = await page.$eval('#copy', b => b.textContent);
  const sparks = await page.$$eval('.spark', s => s.length);
  await page.waitForTimeout(2000);
  const left = await page.$$eval('.spark', s => s.length);
  if (['Copied', 'Selected'].includes(label) && sparks > 0 && left === 0) verdict('K4', 'PASS', `« ${label} », ${sparks} cœurs, tous nettoyés`);
  else verdict('K4', 'DEFECT', `bouton="${label}" cœurs=${sparks} restants=${left}`);
  await page.close();
}

// K10 — la recruteuse : 3 secondes, sans défiler. Au bout de 1,5 s, ce qui compte doit
// déjà être lisible dans le premier écran : le nom, le métier, et Comtech.
for (const [label, viewport] of [['ordi', { width: 1440, height: 900 }], ['téléphone', { width: 390, height: 844 }]]) {
  const page = await open({ viewport });
  await page.goto(TARGET); await page.waitForTimeout(1500);
  const seen = await page.evaluate(() => {
    const ok = el => {
      if (!el) return false;
      const r = el.getBoundingClientRect(), c = getComputedStyle(el);
      return r.top >= 0 && r.bottom <= innerHeight && c.visibility === 'visible' && +c.opacity > .95;
    };
    const comtech = [...document.querySelectorAll('.hero b, .companies a')].find(e => e.textContent.trim() === 'Comtech');
    return { nom: ok(document.querySelector('h1')), metier: ok(document.querySelector('.role')), comtech: ok(comtech), linkedin: ok(document.querySelector('.hero a[href*="linkedin.com/in/"]')) };
  });
  const missing = Object.entries(seen).filter(([, v]) => !v).map(([k]) => k);
  if (!missing.length) verdict('K10', 'PASS', `${label} : à 1,5 s, nom + métier + Comtech + LinkedIn visibles sans défiler`);
  else verdict('K10', 'DEFECT', `${label} : à 1,5 s, pas encore lisible : ${missing.join(', ')}`);
  await page.close();
}

// K11 — elle passe la souris sur Falabella : la carte doit réagir (bordure, ombre).
{
  const page = await open();
  await page.goto(TARGET); await page.waitForTimeout(2500);
  const card = page.locator('#job-falabella');
  await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(1500);
  const look = () => card.evaluate(e => { const c = getComputedStyle(e); return c.borderTopColor + ' | ' + c.boxShadow; });
  await page.mouse.move(5, 5); await page.waitForTimeout(500);
  const before = await look();
  await card.hover(); await page.waitForTimeout(600);
  const after = await look();
  if (before !== after) verdict('K11', 'PASS', 'survol de Falabella : la carte réagit');
  else verdict('K11', 'DEFECT', `survol de Falabella : rien ne change (${before})`);
  await page.close();
}

// K12 — elle veut le CV : le bouton mène au PDF de la langue affichée, et ce PDF existe.
{
  const page = await open();
  await page.goto(TARGET); await page.waitForTimeout(2000);
  const res = [];
  for (const lang of ['fr', 'en']) {
    await page.click(`.lang button[data-lang="${lang}"]`); await page.waitForTimeout(300);
    const href = await page.$eval('.hero .cvlink', a => a.href);
    const status = await page.evaluate(async u => { try { const r = await fetch(u); const b = await r.arrayBuffer(); return r.ok && new TextDecoder().decode(b.slice(0, 5)) === '%PDF-' ? 'pdf' : `http ${r.status}`; } catch (e) { return 'fetch impossible'; } }, href);
    res.push([lang, href.split('/').pop(), status]);
  }
  const bad = res.filter(([l, f, st]) => f !== `cv-${l}.pdf` || (st !== 'pdf' && st !== 'fetch impossible'));
  const unsure = res.filter(([, , st]) => st === 'fetch impossible');
  if (bad.length) verdict('K12', 'DEFECT', `CV : ${JSON.stringify(bad)}`);
  else if (unsure.length) verdict('K12', 'INCONCLUSIVE', 'CV : le bon fichier est visé, mais je ne peux pas le télécharger depuis file:// — relancer avec l’URL publiée');
  else verdict('K12', 'PASS', 'CV : FR → cv-fr.pdf, EN → cv-en.pdf, deux vrais PDF');
  await page.close();
}

// K13 — l'œuf de Pâques : taper « minou » fait traverser le chat, puis il s'en va.
{
  const page = await open();
  await page.goto(TARGET); await page.waitForTimeout(2500);
  await page.keyboard.type('minou'); await page.waitForTimeout(400);
  const during = await page.$$eval('.runcat', c => c.length);
  await page.waitForTimeout(3800);
  const after = await page.$$eval('.runcat', c => c.length);
  if (during === 1 && after === 0) verdict('K13', 'PASS', '« minou » : le chat traverse et repart');
  else verdict('K13', 'DEFECT', `« minou » : pendant=${during} après=${after}`);
  await page.close();
}

// K14 — elle clique sur l'avatar : ma voix joue, la bouche bouge, les sous-titres défilent ; re-clic = pause.
{
  const page = await open();
  await page.goto(TARGET); await page.waitForTimeout(2500);
  await page.click('.avatar'); await page.waitForTimeout(3500);
  const playing = await page.evaluate(() => {
    const a = document.querySelector('#avatar audio');
    const ry = document.querySelector('.avatar .mouth-o') ? 'ouverte' : 'fermée';
    return { t: a.currentTime, paused: a.paused, caption: document.querySelector('.caption').textContent.trim(), ry };
  });
  await page.click('.avatar'); await page.waitForTimeout(400);
  const paused = await page.evaluate(() => document.querySelector('#avatar audio').paused);
  const ok = playing.t > 1.5 && !playing.paused && /Katherine/.test(playing.caption) && paused;
  if (ok) verdict('K14', 'PASS', `avatar : ${playing.t.toFixed(1)} s joués, sous-titre « ${playing.caption.slice(0, 40)}… », pause OK`);
  else verdict('K14', 'DEFECT', `avatar : ${JSON.stringify({ ...playing, pausedAfter: paused })}`);
  await page.close();
}

// K5 — sur téléphone : aucun défilement horizontal.
{
  const page = await open({ viewport: { width: 390, height: 844 } });
  await page.goto(TARGET); await page.waitForTimeout(5500);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (over <= 0) verdict('K5', 'PASS', 'téléphone 390 px : pas de défilement horizontal');
  else verdict('K5', 'DEFECT', `téléphone 390 px : déborde de ${over} px`);
  await page.close();
}

// K6 — « réduire les animations » : tout est là tout de suite, rien n'est découpé.
{
  const page = await open({ reducedMotion: 'reduce' });
  await page.goto(TARGET); await page.waitForTimeout(300);
  const split = await page.$$eval('.name .word', w => w.length);
  const hidden = await findHidden(page);
  if (!split && !hidden.length) verdict('K6', 'PASS', 'mouvement réduit : tout visible immédiatement, aucune animation');
  else verdict('K6', 'DEFECT', `mouvement réduit : découpé=${split} caché=${hidden.slice(0, 3)}`);
  await page.close();
}

// K7 — le CDN ne répond pas : la page doit quand même s'afficher.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route('**/cdnjs.cloudflare.com/**', r => r.abort());
  await page.goto(TARGET); await page.waitForTimeout(3000);
  const hidden = await findHidden(page);
  if (!hidden.length) verdict('K7', 'PASS', 'sans GSAP : la page s’affiche quand même');
  else verdict('K7', 'DEFECT', `sans GSAP : caché=${hidden.slice(0, 3)}`);
  await page.close();
}

// K8 — aucune erreur JavaScript pendant toute la visite.
if (!errors.length) verdict('K8', 'PASS', 'aucune erreur dans la console');
else verdict('K8', 'DEFECT', `erreurs : ${errors.slice(0, 3).join(' | ')}`);

await browser.close();
server?.close();

const count = s => results.filter(r => r.status === s).length;
console.log(`\n${count('PASS')} PASS · ${count('DEFECT')} DEFECT · ${count('INCONCLUSIVE')} INCONCLUSIVE`);
process.exit(count('DEFECT') ? 1 : 0);
