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
exports.ContextService = void 0;
const vscode = __importStar(require("vscode"));
const diagnostics_1 = require("../tools/diagnostics");
class ContextService {
    buildFromActiveEditor(contextLines) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return undefined;
        }
        const document = editor.document;
        const selection = editor.selection;
        const hasSelection = !selection.isEmpty;
        const startLine = hasSelection ? selection.start.line : Math.max(0, editor.selection.active.line - contextLines / 2);
        const endLine = hasSelection
            ? selection.end.line
            : Math.min(document.lineCount - 1, editor.selection.active.line + contextLines / 2);
        const range = new vscode.Range(new vscode.Position(Math.floor(startLine), 0), new vscode.Position(Math.floor(endLine), document.lineAt(Math.floor(endLine)).text.length));
        return {
            filePath: vscode.workspace.asRelativePath(document.uri),
            languageId: document.languageId,
            selectedText: hasSelection ? document.getText(selection) : undefined,
            fullText: document.getText(range),
            startLine: Math.floor(startLine) + 1,
            endLine: Math.floor(endLine) + 1,
            diagnostics: (0, diagnostics_1.formatDiagnostics)(document.uri, hasSelection ? selection : undefined),
            workspaceRoot: vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath
        };
    }
}
exports.ContextService = ContextService;
//# sourceMappingURL=context.service.js.map