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
exports.AiCodeActionProvider = void 0;
const vscode = __importStar(require("vscode"));
const constants_1 = require("../../utils/constants");
class AiCodeActionProvider {
    static metadata = {
        providedCodeActionKinds: [vscode.CodeActionKind.QuickFix, vscode.CodeActionKind.RefactorRewrite]
    };
    provideCodeActions(_document, range, context) {
        const actions = [];
        if (context.diagnostics.length > 0) {
            const fixAction = new vscode.CodeAction('Fix with Pro AI', vscode.CodeActionKind.QuickFix);
            fixAction.command = { command: constants_1.COMMANDS.fix, title: 'Fix with Pro AI' };
            fixAction.diagnostics = [...context.diagnostics];
            actions.push(fixAction);
        }
        if (!range.isEmpty) {
            const explainAction = new vscode.CodeAction('Explain with Pro AI', vscode.CodeActionKind.RefactorRewrite);
            explainAction.command = { command: constants_1.COMMANDS.explain, title: 'Explain with Pro AI' };
            actions.push(explainAction);
            const optimizeAction = new vscode.CodeAction('Optimize with Pro AI', vscode.CodeActionKind.RefactorRewrite);
            optimizeAction.command = { command: constants_1.COMMANDS.optimize, title: 'Optimize with Pro AI' };
            actions.push(optimizeAction);
        }
        return actions;
    }
}
exports.AiCodeActionProvider = AiCodeActionProvider;
//# sourceMappingURL=aiCodeActionProvider.js.map