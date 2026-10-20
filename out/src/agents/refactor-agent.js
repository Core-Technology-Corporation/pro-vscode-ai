"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefactorAgent = void 0;
const strings_1 = require("../utils/strings");
class RefactorAgent {
    ai;
    prompts;
    constructor(ai, prompts) {
        this.ai = ai;
        this.prompts = prompts;
    }
    async rewrite(context, goal) {
        const code = context.selectedText ?? context.fullText ?? '';
        const prompt = await this.prompts.render('refactor', {
            goal,
            language: context.languageId ?? '',
            filePath: context.filePath ?? '',
            diagnostics: context.diagnostics ? `\nDiagnostics:\n${context.diagnostics}` : '',
            code
        });
        const response = await this.ai.complete([{ role: 'user', content: prompt }]);
        return (0, strings_1.extractCodeBlock)(response);
    }
    fix(context) {
        return this.rewrite(context, 'Fix the bugs and diagnostics reported for this code.');
    }
    optimize(context) {
        return this.rewrite(context, 'Improve performance and readability without changing behavior.');
    }
}
exports.RefactorAgent = RefactorAgent;
//# sourceMappingURL=refactor-agent.js.map