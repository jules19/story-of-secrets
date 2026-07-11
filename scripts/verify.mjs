// End-to-end verification: internal links, exhibit interactions, TOC, no console errors.
import { preview } from 'vite';
import { chromium } from 'playwright';

const server = await preview({ preview: { port: 4179, strictPort: true }, logLevel: 'error' });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});

await page.goto('http://localhost:4179/', { waitUntil: 'networkidle' });

// 1. Internal link integrity
const badLinks = await page.evaluate(() => {
  const bad = [];
  for (const a of document.querySelectorAll('a[href^="#"]')) {
    const id = a.getAttribute('href').slice(1);
    if (id && !document.getElementById(id)) bad.push(id);
  }
  return [...new Set(bad)];
});
console.log(
  badLinks.length
    ? `✗ broken internal links: ${badLinks.join(', ')}`
    : '✓ all internal anchors resolve',
);

// 2. TOC open/close
await page.click('[data-toc-open]');
console.log((await page.isVisible('[data-toc]')) ? '✓ TOC opens' : '✗ TOC failed to open');
await page.keyboard.press('Escape');
console.log((await page.isHidden('[data-toc]')) ? '✓ TOC closes on Escape' : '✗ TOC did not close');

// 3. Hydrate all exhibits by scrolling
await page.evaluate(async () => {
  const step = window.innerHeight * 0.9;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
});
await page.waitForTimeout(1200);
const hydrated = await page.evaluate(() =>
  [...document.querySelectorAll('[data-exhibit]')].map(
    (e) => `${e.dataset.exhibit}:${e.dataset.hydrated ? 'ok' : 'MISSING'}`,
  ),
);
console.log('exhibit hydration →', hydrated.join(' '));

// 4. Exercise each exhibit
const tap = async (sel, nth = 0) => {
  const loc = page.locator(sel).nth(nth);
  await loc.scrollIntoViewIfNeeded();
  await loc.tap();
};

// frequency: hint + guess
await tap('[data-exhibit="frequency"] .x-btn'); // hint
await tap('[data-exhibit="frequency"] .fq-strip .fq-key', 1);
await tap('[data-exhibit="frequency"] .fq-key-plain', 1);
console.log(
  '✓ frequency:',
  (await page.locator('[data-exhibit="frequency"] .x-status').textContent()).slice(0, 60),
);

// rotor: press letters, run 20, freeze
await tap('[data-exhibit="rotor"] .rt-key', 4);
await tap('[data-exhibit="rotor"] .rt-key', 4);
await page.locator('[data-exhibit="rotor"] .x-btn', { hasText: 'twenty' }).tap();
await page.locator('[data-exhibit="rotor"] .x-btn', { hasText: 'Rotors step' }).tap();
await tap('[data-exhibit="rotor"] .rt-key', 4);
console.log(
  '✓ rotor:',
  (await page.locator('[data-exhibit="rotor"] .x-status').textContent()).slice(0, 60),
);

// otp: toggle fresh/reuse
await page.locator('[data-exhibit="otp"] .x-btn', { hasText: 'Fresh key' }).tap();
console.log(
  '✓ otp:',
  (await page.locator('[data-exhibit="otp"] .x-status').textContent()).slice(0, 60),
);

// keyexchange: move sliders
await page.locator('#kx-a').fill('9');
await page.locator('#kx-b').fill('4');
console.log(
  '✓ keyexchange:',
  (await page.locator('[data-exhibit="keyexchange"] .x-status').textContent()).slice(0, 70),
);

// bruteforce: slider + attacker
await page.locator('#bf-bits').fill('5');
await page.locator('#bf-attacker').selectOption('4');
console.log('✓ bruteforce:', (await page.locator('.bf-verdict').textContent()).slice(0, 80));

// tls: walk all steps + without toggle
for (let i = 0; i < 5; i++)
  await page.locator('[data-exhibit="tls"] .x-btn', { hasText: 'Continue' }).tap();
await page.locator('[data-exhibit="tls"] .x-btn', { hasText: 'closing thought' }).tap();
console.log(
  '✓ tls: reached final step, without-panel visible =',
  await page.isVisible('.tl-without'),
);

// sidechannel: probe + lock slowest 4x
for (let pos = 0; pos < 4; pos++) {
  await page.locator('[data-exhibit="sidechannel"] .x-btn', { hasText: 'Time all' }).tap();
  await page.waitForTimeout(100);
  const idx = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.sc-bar-btn')];
    const times = btns.map((b) => parseFloat(b.querySelector('.sc-bar-time').textContent));
    return times.indexOf(Math.max(...times));
  });
  await tap('.sc-bar-btn', idx);
}
console.log(
  '✓ sidechannel:',
  (await page.locator('[data-exhibit="sidechannel"] .x-status').textContent()).slice(0, 80),
);

// harvest: hybrid + scrub
await page.locator('[data-exhibit="harvest"] .x-btn', { hasText: 'hybrid' }).tap();
await page.locator('#hv-year').fill('2055');
console.log(
  '✓ harvest:',
  (await page.locator('[data-exhibit="harvest"] .x-status').textContent()).slice(0, 70),
);

console.log(
  errors.length
    ? `✗ ERRORS:\n${errors.join('\n')}`
    : '✓ zero console/page errors across all interactions',
);
await browser.close();
await new Promise((r) => server.httpServer.close(r));
process.exit(errors.length || badLinks.length ? 1 : 0);
