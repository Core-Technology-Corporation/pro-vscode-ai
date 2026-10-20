"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodingAgent = void 0;
const strings_1 = require("../utils/strings");
class CodingAgent {
    ai;
    prompts;
    constructor(ai, prompts) {
        this.ai = ai;
        this.prompts = prompts;
    }
    async generate(instruction, context) {
        const prompt = await this.prompts.render('generate', {
            instruction,
            language: context?.languageId ?? '',
            context: context?.fullText ?? ''
        });
        const response = await this.ai.complete([{ role: 'user', content: prompt }]);
        return (0, strings_1.extractCodeBlock)(response);
    }
}
exports.CodingAgent = CodingAgent;
//# sourceMappingURL=coding-agent.js.map