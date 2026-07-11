import type { ExhibitId } from '../content/types';

export interface ExhibitModule {
  mount(host: HTMLElement): void;
}

type Loader = () => Promise<ExhibitModule>;

/** Exhibits are code-split; each loads as it approaches the viewport. */
export const EXHIBITS: Partial<Record<ExhibitId, Loader>> = {
  frequency: () => import('./frequency'),
};

/** Watch exhibit slots and hydrate them on approach. */
export function initExhibits(): void {
  const slots = [...document.querySelectorAll<HTMLElement>('[data-exhibit]')];
  if (slots.length === 0) return;

  const hydrate = async (slot: HTMLElement) => {
    if (slot.dataset.hydrated) return;
    slot.dataset.hydrated = 'true';
    const id = slot.dataset.exhibit as ExhibitId;
    const loader = EXHIBITS[id];
    if (!loader) return;
    const mountPoint = slot.querySelector<HTMLElement>('[data-exhibit-mount]');
    if (!mountPoint) return;
    try {
      const module = await loader();
      mountPoint.textContent = '';
      module.mount(mountPoint);
    } catch (err) {
      slot.dataset.hydrated = '';
      console.error(`Failed to load exhibit "${id}"`, err);
    }
  };

  if (!('IntersectionObserver' in window)) {
    for (const slot of slots) void hydrate(slot);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          void hydrate(entry.target as HTMLElement);
        }
      }
    },
    { rootMargin: '600px 0px' },
  );
  for (const slot of slots) io.observe(slot);
}
