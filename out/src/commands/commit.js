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
exports.generateCommitMessageCommand = generateCommitMessageCommand;
const vscode = __importStar(require("vscode"));
const git_1 = require("../tools/git");
const notify_1 = require("../ui/notifications/notify");
const COMMIT_INSTRUCTION = `Write a concise, conventional-commit style git commit message (type: summary,
then body if needed) for the following diff. Return only the commit message,
no extra commentary.`;
function generateCommitMessageCommand(app) {
    return async () => {
        const root = app.workspace.getRootPath();
        if (!root) {
            (0, notify_1.warn)('Abre un repositorio Git para generar el mensaje de commit.');
            return;
        }
        try {
            const staged = await (0, git_1.getStagedDiff)(root);
            const diff = staged.ok && staged.data ? staged : await (0, git_1.getWorkingDiff)(root);
            if (!diff.ok || !diff.data?.trim()) {
                (0, notify_1.warn)('No hay cambios para generar un mensaje de commit.');
                return;
            }
            const message = await (0, notify_1.withProgress)('Generando mensaje de commit…', () => app.ai.complete([{ role: 'user', content: `${COMMIT_INSTRUCTION}\n\n${diff.data}` }]));
            const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
            const api = gitExtension?.getAPI(1);
            const repo = api?.repositories?.[0];
            if (repo) {
                repo.inputBox.value = message.trim();
            }
            else {
                await vscode.env.clipboard.writeText(message.trim());
                vscode.window.showInformationMessage('Pro AI: mensaje de commit copiado al portapapeles.');
            }
        }
        catch (err) {
            (0, notify_1.error)(err instanceof Error ? err.message : String(err));
        }
    };
}
//# sourceMappingURL=commit.js.map