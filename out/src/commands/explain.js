"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainCommand = explainCommand;
const resultPanel_1 = require("../ui/panels/resultPanel");
const notify_1 = require("../ui/notifications/notify");
function explainCommand(app) {
    return async () => {
        const context = app.context.buildFromActiveEditor(app.settings.getContextLines());
        if (!context?.selectedText) {
            (0, notify_1.warn)('Selecciona código primero para explicarlo.');
            return;
        }
        try {
            const prompt = await app.prompts.render('explain', {
                language: context.languageId ?? '',
                filePath: context.filePath ?? '',
                code: context.selectedText
            });
            const explanation = await (0, notify_1.withProgress)('Explicando código…', () => app.ai.complete([{ role: 'user', content: prompt }]));
            await (0, resultPanel_1.showMarkdownResult)(`Explanation: ${context.filePath ?? ''}`, explanation);
        }
        catch (err) {
            (0, notify_1.error)(err instanceof Error ? err.message : String(err));
        }
    };
}
//# sourceMappingURL=explain.js.map