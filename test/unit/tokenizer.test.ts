import { describe, expect, it } from 'vitest';
import { estimateTokens, fitsInBudget, truncateToTokenBudget } from '../../src/utils/tokenizer';

describe('estimateTokens', () => {
  it('estimates roughly 4 chars per token', () => {
    expect(estimateTokens('12345678')).toBe(2);
  });

  it('returns 0 for empty text', () => {
    expect(estimateTokens('')).toBe(0);
  });
});

describe('fitsInBudget', () => {
  it('accepts text within budget', () => {
    expect(fitsInBudget('1234', 1)).toBe(true);
  });

  it('rejects text over budget', () => {
    expect(fitsInBudget('12345678901', 1)).toBe(false);
  });
});

describe('truncateToTokenBudget', () => {
  it('truncates text exceeding the token budget', () => {
    expect(truncateToTokenBudget('0123456789', 2)).toBe('01234567');
  });
});
