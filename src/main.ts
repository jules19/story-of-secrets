import './styles/tokens.css';
import './styles/base.css';
import './styles/shell.css';
import './styles/prologue.css';
import './styles/chapter.css';
import './styles/exhibit.css';

import { initMotionFlag, observeReveals } from './core/motion';
import { initShell } from './components/shell';
import { initPrologue } from './components/prologue';
import { initExhibits } from './exhibits/registry';

async function boot(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  if (!app.dataset.prerendered) {
    // Dev / fallback path: build the page client-side. In production the same
    // markup is baked into index.html at build time (scripts/prerender.mjs).
    const { renderSite } = await import('./render/page');
    app.innerHTML = renderSite();
  }

  initMotionFlag();
  observeReveals();
  initShell();
  initPrologue();
  initExhibits();
}

void boot();
