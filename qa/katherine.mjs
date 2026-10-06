// Katherine — une visiteuse qui ouvre le portfolio et fait ce qu'une vraie
// personne fait : elle attend l'intro, elle descend la page, elle change de
// langue, elle copie le courriel, sur ordi et sur téléphone.
//
// Elle juge sur ce que le navigateur AFFICHE (opacité, visibilité, défilement),
// jamais sur ce que le code prétend. Et elle commence par un contrôle négatif :
// si elle ne sait pas voir un projet caché exprès, elle ne prouve rien.
//
//   npm install
//   node katherine.mjs                       # le fichier local ../index.html
//   node katherine.mjs https://katherinemli.github.io/Portafolio/
//
// Verdicts : PASS · DEFECT · INCONCLUSIVE. Code de sortie 1 s'il y a un DEFECT.

import { chromium } from 'playwright';

const TARGET = process.argv[2] || new URL('../index.html', import.meta.url).href;
const results = [];
const verdict = (id, status, what) => { results.push({ id, status, what }); console.log(`${status.padEnd(12)} ${id}  ${what}`); };

// Every element of real content in the hero and sections must end up visible.
// Decoration (aria-hidden: blinking caret, illustrations) and the translucent
// orbit path are allowed to move and fade.
const findHidden = page => page.evaluate(() =>
  [...document.querySelectorAll('.hero *, section *')]
    .filter(e => !e.closest('[aria-hidden="true"]') && !e.closest('.scope .path'))
    .filter(e => { const c = getComputedStyle(e); return c.visibility === 'hidden' || +c.opacity < 0.99; })
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
  const hero = await page.evaluate(() => ['h1', '.role', '.lede', '.facts', '.scope'].map(s => {
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
    const comtech = [...document.querySelectorAll('.hero b, .companies span')].find(e => e.textContent.trim() === 'Comtech');
    return { nom: ok(document.querySelector('h1')), metier: ok(document.querySelector('.role')), comtech: ok(comtech), linkedin: ok(document.querySelector('.hero a[href*="linkedin.com/in/"]')) };
  });
  const missing = Object.entries(seen).filter(([, v]) => !v).map(([k]) => k);
  if (!missing.length) verdict('K10', 'PASS', `${label} : à 1,5 s, nom + métier + Comtech + LinkedIn visibles sans défiler`);
  else verdict('K10', 'DEFECT', `${label} : à 1,5 s, pas encore lisible : ${missing.join(', ')}`);
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

const count = s => results.filter(r => r.status === s).length;
console.log(`\n${count('PASS')} PASS · ${count('DEFECT')} DEFECT · ${count('INCONCLUSIVE')} INCONCLUSIVE`);
process.exit(count('DEFECT') ? 1 : 0);
