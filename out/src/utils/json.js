"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJsonParse = safeJsonParse;
exports.extractJson = extractJson;
function safeJsonParse(text) {
    try {
        return JSON.parse(text);
    }
    catch {
        return undefined;
    }
}
/** Pulls the first JSON object/array out of a larger LLM response (e.g. fenced in ```json). */
function extractJson(text) {
    const fenced = text.match(/```json\s*([\s\S]*?)```/i);
    if (fenced) {
        const parsed = safeJsonParse(fenced[1]);
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
        const parsed = safeJsonParse(candidate);
        if (parsed !== undefined) {
            return parsed;
        }
    }
    return undefined;
}
//# sourceMappingURL=json.js.map