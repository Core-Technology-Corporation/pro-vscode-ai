export function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  return `${text.slice(0, maxChars)}\n… (truncated)`;
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function dedent(text: string): string {
  const lines = text.replace(/^\n/, '').split('\n');
  const indents = lines.filter((l) => l.trim().length > 0).map((l) => l.match(/^\s*/)?.[0].length ?? 0);
  const minIndent = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(minIndent)).join('\n').trimEnd();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function extractCodeBlock(text: string): string {
  const match = text.match(/```[a-zA-Z0-9]*\n([\s\S]*?)```/);
  return match ? match[1].trimEnd() : text.trim();
}
