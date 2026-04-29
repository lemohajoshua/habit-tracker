import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '../../src/lib/streaks';


describe('calculateCurrentStreak', () => {
  it('returns 0 when completions is empty', () => {
    expect(calculateCurrentStreak([])).toBe(0);
  });
});