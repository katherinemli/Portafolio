// Renders cv.html to ../cv-fr.pdf and ../cv-en.pdf with headless Chrome.
//   cd qa && npm install && node ../cv/build.mjs
import { chromium } from '../qa/node_modules/playwright/index.mjs';

const src = new URL('./cv.html', import.meta.url).href;
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
for (const lang of ['fr', 'en']) {
  const page = await browser.newPage();
  await page.goto(`${src}?lang=${lang}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = new URL(`../cv-${lang}.pdf`, import.meta.url).pathname;
  await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
  console.log('wrote', out);
  await page.close();
}
await browser.close();
