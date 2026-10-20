"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiInlineCompletionProvider = void 0;
const vscode = __importStar(require("vscode"));
const logger_1 = require("../../utils/logger");
const DEBOUNCE_MS = 400;
class AiInlineCompletionProvider {
    app;
    debounceTimer;
    constructor(app) {
        this.app = app;
    }
    async provideInlineCompletionItems(document, position, _context, token) {
        const prefix = document.getText(new vscode.Range(new vscode.Position(Math.max(0, position.line - 40), 0), position));
        const suffix = document.getText(new vscode.Range(position, new vscode.Position(Math.min(document.lineCount - 1, position.line + 10), 0)));
        if (!prefix.trim()) {
            return [];
        }
        await new Promise((resolve) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(resolve, DEBOUNCE_MS);
        });
        if (token.isCancellationRequested) {
            return [];
        }
        try {
            const suggestion = await this.app.ai.complete([
                {
                    role: 'user',
                    content: `Continue this ${document.languageId} code. Return only the code to insert at the cursor, no explanation, no markdown fences.\n\n--- code before cursor ---\n${prefix}\n--- code after cursor ---\n${suffix}`
                }
            ], { maxTokens: 200, temperature: 0.1 });
            if (token.isCancellationRequested || !suggestion.trim()) {
                return [];
            }
            return [new vscode.InlineCompletionItem(suggestion, new vscode.Range(position, position))];
        }
        catch (error) {
            logger_1.logger.error('Inline completion failed', error);
            return [];
        }
    }
}
exports.AiInlineCompletionProvider = AiInlineCompletionProvider;
//# sourceMappingURL=inlineCompletionProvider.js.map