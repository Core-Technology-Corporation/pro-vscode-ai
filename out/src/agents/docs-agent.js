"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsAgent = void 0;
const strings_1 = require("../utils/strings");
class DocsAgent {
    ai;
    prompts;
    constructor(ai, prompts) {
        this.ai = ai;
        this.prompts = prompts;
    }
    async document(context) {
        const code = context.selectedText ?? context.fullText ?? '';
        const prompt = await this.prompts.render('generate', {
            instruction: 'Add concise, accurate documentation comments to this code. Only document non-obvious behavior; do not restate what the code already makes clear.',
            language: context.languageId ?? '',
            context: code
        });
        const response = await this.ai.complete([{ role: 'user', content: prompt }]);
        return (0, strings_1.extractCodeBlock)(response);
    }
    async writeTests(context) {
        const code = context.selectedText ?? context.fullText ?? '';
        const prompt = await this.prompts.render('tests', {
            language: context.languageId ?? '',
            filePath: context.filePath ?? '',
            code
        });
        const response = await this.ai.complete([{ role: 'user', content: prompt }]);
        return (0, strings_1.extractCodeBlock)(response);
    }
}
exports.DocsAgent = DocsAgent;
//# sourceMappingURL=docs-agent.js.map