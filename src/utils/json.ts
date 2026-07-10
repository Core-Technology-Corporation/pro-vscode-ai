export function safeJsonParse<T>(text: string): T | undefined {
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}

/** Pulls the first JSON object/array out of a larger LLM response (e.g. fenced in ```json). */
export function extractJson<T>(text: string): T | undefined {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced) {
    const parsed = safeJsonParse<T>(fenced[1]);
    if (parsed !== undefined) {
      return parsed;
    }
  }
  const start = text.search(/[[{]/);
  if (start === -1) {
    return undefined;
  }
  for (let end = text.length; end > start; end--) {
    const candidate = text.slice(start, end);
    const parsed = safeJsonParse<T>(candidate);
    if (parsed !== undefined) {
      return parsed;
    }
  }
  return undefined;
}
