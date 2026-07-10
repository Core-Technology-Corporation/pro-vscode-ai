import { describe, expect, it } from 'vitest';
import { truncate, escapeHtml, dedent, slugify, extractCodeBlock } from '../../src/utils/strings';

describe('truncate', () => {
  it('leaves short text untouched', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates and marks long text', () => {
    expect(truncate('0123456789', 4)).toBe('0123\n… (truncated)');
  });
});

describe('escapeHtml', () => {
  it('escapes html-sensitive characters', () => {
    expect(escapeHtml(`<div class="a">'x'</div>`)).toBe(
      '&lt;div class=&quot;a&quot;&gt;&#039;x&#039;&lt;/div&gt;'
    );
  });
});

describe('dedent', () => {
  it('removes common leading whitespace', () => {
    expect(dedent('\n  foo\n  bar\n')).toBe('foo\nbar');
  });
});

describe('slugify', () => {
  it('converts to a url-safe slug', () => {
    expect(slugify('Hello, World!  Foo')).toBe('hello-world-foo');
  });
});

describe('extractCodeBlock', () => {
  it('extracts a fenced code block', () => {
    expect(extractCodeBlock('here:\n```ts\nconst a = 1;\n```')).toBe('const a = 1;');
  });

  it('falls back to trimmed text when no fence is present', () => {
    expect(extractCodeBlock('  const a = 1;  ')).toBe('const a = 1;');
  });
});
