// Bakes the fully rendered narrative into dist/index.html after `vite build`,
// so the story is readable without JavaScript and paints immediately.
import fs from 'node:fs';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { renderSite } = await server.ssrLoadModule('/src/render/page.ts');
  const html = renderSite();
  const marker = '<div id="app"><!--app-html--></div>';
  const file = 'dist/index.html';
  let out = fs.readFileSync(file, 'utf8');
  if (!out.includes(marker)) {
    throw new Error('prerender marker not found in dist/index.html');
  }
  out = out.replace(marker, `<div id="app" data-prerendered="true">${html}</div>`);
  fs.writeFileSync(file, out);
  console.log(`prerender: injected ${(html.length / 1024).toFixed(1)} kB of narrative HTML`);
} finally {
  await server.close();
}
