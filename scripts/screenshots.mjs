// Screenshot + console-error smoke harness against the production build.
// Usage: npm run build && npm run screenshots
import fs from 'node:fs';
import { preview } from 'vite';
import { chromium } from 'playwright';

const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 780 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

const OUT = 'screenshots';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const server = await preview({ preview: { port: 4173, strictPort: true }, logLevel: 'error' });
const executablePath = fs.existsSync('/opt/pw-browsers/chromium')
  ? '/opt/pw-browsers/chromium'
  : undefined;
const browser = await chromium.launch(executablePath ? { executablePath } : {});

let failures = 0;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    isMobile: vp.width < 700,
    hasTouch: vp.width < 700,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Horizontal-overflow check
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return Math.max(0, doc.scrollWidth - doc.clientWidth);
  });

  // Scroll through the page so lazy exhibits hydrate, then back to top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.9;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  await page.screenshot({ path: `${OUT}/${vp.name}-top.png` });

  // One shot per exhibit
  const exhibits = await page.$$('[data-exhibit]');
  for (const ex of exhibits) {
    const id = await ex.getAttribute('data-exhibit');
    await ex.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await ex
      .screenshot({ path: `${OUT}/${vp.name}-exhibit-${id}.png` })
      .catch((err) => console.error(`  exhibit shot ${vp.name}/${id} failed: ${err.message}`));
  }

  // Chapter mid-page shot
  const chapter = await page.$('.chapter');
  if (chapter) {
    await chapter.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/${vp.name}-chapter.png` });
  }

  if (overflow > 1) {
    failures++;
    console.error(`✗ ${vp.name}: horizontal overflow of ${overflow}px`);
  }
  if (errors.length > 0) {
    failures++;
    console.error(`✗ ${vp.name}: console errors:\n  ${errors.join('\n  ')}`);
  }
  if (overflow <= 1 && errors.length === 0) {
    console.log(`✓ ${vp.name}: no overflow, no console errors`);
  }
  await context.close();
}

await browser.close();
await new Promise((resolve) => server.httpServer.close(resolve));
if (failures > 0) process.exit(1);
console.log(`Screenshots written to ${OUT}/`);
