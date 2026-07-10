import { describe, expect, it } from 'vitest';
import { safeJsonParse, extractJson } from '../../src/utils/json';

describe('safeJsonParse', () => {
  it('parses valid json', () => {
    expect(safeJsonParse<{ a: number }>('{"a":1}')).toEqual({ a: 1 });
  });

  it('returns undefined for invalid json', () => {
    expect(safeJsonParse('not json')).toBeUndefined();
  });
});

describe('extractJson', () => {
  it('extracts json from a fenced code block', () => {
    expect(extractJson<{ a: number }>('```json\n{"a": 1}\n```')).toEqual({ a: 1 });
  });

  it('extracts an inline json object from surrounding prose', () => {
    expect(extractJson<{ a: number }>('Sure, here it is: {"a": 1} hope that helps')).toEqual({ a: 1 });
  });

  it('returns undefined when no json is present', () => {
    expect(extractJson('no json here')).toBeUndefined();
  });
});
