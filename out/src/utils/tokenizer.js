"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateTokens = estimateTokens;
exports.fitsInBudget = fitsInBudget;
exports.truncateToTokenBudget = truncateToTokenBudget;
/**
 * Rough token estimate (~4 chars/token for English-like text). Good enough for
 * budgeting context windows without pulling in a full tokenizer dependency.
 */
function estimateTokens(text) {
    if (!text) {
        return 0;
    }
    return Math.ceil(text.length / 4);
}
function fitsInBudget(text, maxTokens) {
    return estimateTokens(text) <= maxTokens;
}
function truncateToTokenBudget(text, maxTokens) {
    const maxChars = maxTokens * 4;
    if (text.length <= maxChars) {
        return text;
    }
    return text.slice(0, maxChars);
}
//# sourceMappingURL=tokenizer.js.map