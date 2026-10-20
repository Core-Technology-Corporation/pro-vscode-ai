"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAgent = void 0;
const SYSTEM_PROMPT = `You are Pro AI, an AI coding assistant embedded in VS Code. Be concise and
practical. When you include code, use fenced code blocks with the correct
language tag. Only use the provided editor context when it is relevant to the
user's question.`;
class ChatAgent {
    ai;
    constructor(ai) {
        this.ai = ai;
    }
    async *reply(history, editorContext) {
        const system = editorContext ? `${SYSTEM_PROMPT}\n\n${formatContext(editorContext)}` : SYSTEM_PROMPT;
        yield* this.ai.stream(history, { system });
    }
}
exports.ChatAgent = ChatAgent;
function formatContext(context) {
    const parts = [`Current file: ${context.filePath ?? 'unknown'} (${context.languageId ?? 'unknown'})`];
    if (context.fullText) {
        parts.push(`\nVisible code:\n\`\`\`${context.languageId ?? ''}\n${context.fullText}\n\`\`\``);
    }
    if (context.diagnostics) {
        parts.push(`\nDiagnostics:\n${context.diagnostics}`);
    }
    return parts.join('\n');
}
//# sourceMappingURL=chat-agent.js.map