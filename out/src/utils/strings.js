"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = truncate;
exports.escapeHtml = escapeHtml;
exports.dedent = dedent;
exports.slugify = slugify;
exports.extractCodeBlock = extractCodeBlock;
function truncate(text, maxChars) {
    if (text.length <= maxChars) {
        return text;
    }
    return `${text.slice(0, maxChars)}\n… (truncated)`;
}
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
function dedent(text) {
    const lines = text.replace(/^\n/, '').split('\n');
    const indents = lines.filter((l) => l.trim().length > 0).map((l) => l.match(/^\s*/)?.[0].length ?? 0);
    const minIndent = indents.length ? Math.min(...indents) : 0;
    return lines.map((l) => l.slice(minIndent)).join('\n').trimEnd();
}
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}
function extractCodeBlock(text) {
    const match = text.match(/```[a-zA-Z0-9]*\n([\s\S]*?)```/);
    return match ? match[1].trimEnd() : text.trim();
}
//# sourceMappingURL=strings.js.map