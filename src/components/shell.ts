/** Top bar, reading progress, contents panel, chapter rail. */
export function initShell(): void {
  initProgress();
  initToc();
  initCurrentChapter();
}

function initProgress(): void {
  const line = document.querySelector<HTMLElement>('[data-progress]');
  if (!line) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    line.style.transform = `scaleX(${ratio})`;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

function initToc(): void {
  const openBtn = document.querySelector<HTMLButtonElement>('[data-toc-open]');
  const panel = document.querySelector<HTMLElement>('[data-toc]');
  const closeBtn = panel?.querySelector<HTMLButtonElement>('[data-toc-close]');
  if (!openBtn || !panel || !closeBtn) return;

  const open = () => {
    panel.hidden = false;
    panel.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    panel.classList.remove('is-open');
    panel.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  panel.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) {
      // navigate, then close without stealing focus back
      panel.classList.remove('is-open');
      panel.hidden = true;
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else if (target === panel) {
      close();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
  });
}

function initCurrentChapter(): void {
  const nowLabel = document.querySelector<HTMLElement>('[data-now]');
  const railLinks = [...document.querySelectorAll<HTMLAnchorElement>('.rail a')];
  const sections = [...document.querySelectorAll<HTMLElement>('.chapter[data-chapter-title]')];
  if (sections.length === 0 || !('IntersectionObserver' in window)) return;

  const setCurrent = (section: HTMLElement) => {
    const era = section.dataset.era;
    if (era) document.documentElement.dataset.era = era;
    if (nowLabel) nowLabel.textContent = section.dataset.chapterTitle ?? '';
    for (const link of railLinks) {
      link.classList.toggle('is-current', link.dataset.target === section.id);
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setCurrent(entry.target as HTMLElement);
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  for (const s of sections) io.observe(s);
}
