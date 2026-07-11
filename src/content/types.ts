/** Epistemic status attached to claims and asides across the site. */
export type FactStatus = 'record' | 'estimate' | 'analogy' | 'mystery';

export type Era =
  | 'manuscript'
  | 'court'
  | 'chamber'
  | 'principle'
  | 'machine'
  | 'information'
  | 'cryptowars'
  | 'network'
  | 'quantum';

/** Ids of the interactive exhibits; each maps to src/exhibits/<id>/. */
export type ExhibitId =
  'frequency' | 'otp' | 'rotor' | 'keyexchange' | 'bruteforce' | 'tls' | 'sidechannel' | 'harvest';

export interface TimelineEvent {
  year: string;
  text: string;
}

export type Block =
  /** Narrative paragraph. `html` may contain inline em/strong/a. `sources` = bibliography ids. */
  | { kind: 'p'; html: string; sources?: string[] }
  /** A held, oversized line — the chapter's idea distilled. */
  | { kind: 'pull'; html: string }
  /** Bordered side panel; optionally chip-labelled with a fact status. */
  | { kind: 'aside'; title: string; status?: FactStatus; paragraphs: string[]; sources?: string[] }
  /** Collapsed optional depth. */
  | { kind: 'deeper'; title: string; paragraphs: string[]; sources?: string[] }
  /** Interactive exhibit slot. */
  | {
      kind: 'exhibit';
      id: ExhibitId;
      title: string;
      teaches: string;
      /** Static description rendered before hydration and for no-JS readers. */
      fallback: string;
      /** Honesty note, e.g. "Simplified demonstration: no plugboard or ring settings." */
      note?: string;
    }
  /** Horizontal era timeline strip. */
  | { kind: 'timeline'; events: TimelineEvent[] };

export interface Chapter {
  id: string;
  era: Era;
  /** Roman numeral, or undefined for prologue/epilogue. */
  number?: string;
  /** e.g. "England · 1586" */
  kicker: string;
  title: string;
  lede: string;
  blocks: Block[];
}

export interface Source {
  /** Short label used in running text, e.g. "Kahn 1996". */
  label: string;
  /** Full citation line. */
  detail: string;
  href?: string;
}
