const reducedQuery = '(prefers-reduced-motion: reduce)';

/** True when the visitor has not asked for reduced motion. */
export function motionOK(): boolean {
  return !window.matchMedia(reducedQuery).matches;
}

/** Reflect motion preference on <html> so CSS can opt in to animation. */
export function initMotionFlag(): void {
  const apply = () => {
    document.documentElement.classList.toggle('motion-ok', motionOK());
  };
  apply();
  window.matchMedia(reducedQuery).addEventListener('change', apply);
}

/** Reveal-on-scroll for elements marked .reveal (no-op visually under reduced motion). */
export function observeReveals(root: ParentNode = document): void {
  const targets = [...root.querySelectorAll<HTMLElement>('.reveal')];
  if (targets.length === 0) return;
  if (!('IntersectionObserver' in window) || !motionOK()) {
    for (const t of targets) t.classList.add('is-visible');
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  for (const t of targets) io.observe(t);
}
