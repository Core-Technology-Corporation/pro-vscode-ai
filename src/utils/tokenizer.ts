/**
 * Rough token estimate (~4 chars/token for English-like text). Good enough for
 * budgeting context windows without pulling in a full tokenizer dependency.
 */
export function estimateTokens(text: string): number {
  if (!text) {
    return 0;
  }
  return Math.ceil(text.length / 4);
}

export function fitsInBudget(text: string, maxTokens: number): boolean {
  return estimateTokens(text) <= maxTokens;
}

export function truncateToTokenBudget(text: string, maxTokens: number): string {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) {
    return text;
  }
  return text.slice(0, maxChars);
}
