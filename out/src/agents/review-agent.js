"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAgent = void 0;
class ReviewAgent {
    ai;
    prompts;
    constructor(ai, prompts) {
        this.ai = ai;
        this.prompts = prompts;
    }
    async review(context) {
        const code = context.selectedText ?? context.fullText ?? '';
        const prompt = await this.prompts.render('review', {
            language: context.languageId ?? '',
            filePath: context.filePath ?? '',
            diagnostics: context.diagnostics ? `\nDiagnostics:\n${context.diagnostics}` : '',
            code
        });
        return this.ai.complete([{ role: 'user', content: prompt }]);
    }
}
exports.ReviewAgent = ReviewAgent;
//# sourceMappingURL=review-agent.js.map