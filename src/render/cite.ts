import { SOURCES } from '../content/sources';
import { esc } from '../core/dom';

/** Assigns citation numbers in order of first use and renders superscript markers. */
export class CiteIndex {
  private order: string[] = [];

  num(id: string): number {
    let idx = this.order.indexOf(id);
    if (idx === -1) {
      if (!SOURCES[id]) throw new Error(`Unknown source id: ${id}`);
      this.order.push(id);
      idx = this.order.length - 1;
    }
    return idx + 1;
  }

  refs(ids: string[] | undefined): string {
    if (!ids || ids.length === 0) return '';
    const links = ids
      .map((id) => {
        const n = this.num(id);
        const source = SOURCES[id];
        if (!source) throw new Error(`Unknown source id: ${id}`);
        return `<a class="cite-ref" href="#src-${esc(id)}" aria-label="Source ${n}: ${esc(source.label)}">${n}</a>`;
      })
      .join('');
    return `<span class="cite-refs">${links}</span>`;
  }

  /** Bibliography entries in citation order. */
  entries(): Array<{ id: string; num: number }> {
    return this.order.map((id, i) => ({ id, num: i + 1 }));
  }
}
