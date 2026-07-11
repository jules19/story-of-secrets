import { describe, expect, it } from 'vitest';
import {
  SEND_YEAR,
  TIMELINE_END,
  damaged,
  moscaLate,
  secrecyUntil,
  status,
  timelinePos,
  type HarvestState,
} from '../src/exhibits/harvest/logic';

const base: HarvestState = {
  scheme: 'classical',
  crqcYear: 2040,
  viewYear: 2026,
  secrecyYears: 25,
};

describe('status', () => {
  it('classical ciphertext opens exactly when the scenario CRQC arrives', () => {
    expect(status({ ...base, viewYear: 2039 })).toBe('sealed');
    expect(status({ ...base, viewYear: 2040 })).toBe('opened');
    expect(status({ ...base, viewYear: 2055 })).toBe('opened');
  });

  it('hybrid post-quantum ciphertext stays sealed across the timeline', () => {
    for (let y = SEND_YEAR; y <= TIMELINE_END; y++) {
      expect(status({ ...base, scheme: 'hybrid', viewYear: y })).toBe('sealed');
    }
  });
});

describe('damage', () => {
  it('is exposure before the secrecy requirement expires', () => {
    expect(damaged({ ...base, secrecyYears: 25, crqcYear: 2040 })).toBe(true); // needs until 2051
    expect(damaged({ ...base, secrecyYears: 10, crqcYear: 2040 })).toBe(false); // needed until 2036
    expect(damaged({ ...base, scheme: 'hybrid', secrecyYears: 50 })).toBe(false);
  });

  it('secrecyUntil adds the requirement to the send year', () => {
    expect(secrecyUntil({ ...base, secrecyYears: 25 })).toBe(SEND_YEAR + 25);
  });
});

describe('Mosca inequality', () => {
  it('flags lateness when secrecy + migration exceed the runway', () => {
    expect(moscaLate(25, 8, 14)).toBe(true);
    expect(moscaLate(10, 8, 30)).toBe(false);
  });
});

describe('timelinePos', () => {
  it('maps the window to [0, 1]', () => {
    expect(timelinePos(SEND_YEAR)).toBe(0);
    expect(timelinePos(TIMELINE_END)).toBe(1);
    expect(timelinePos(2043)).toBeGreaterThan(0.4);
    expect(timelinePos(2099)).toBe(1);
  });
});
