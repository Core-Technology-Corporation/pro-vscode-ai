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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const commands_1 = require("./commands");
const ai_service_1 = require("./services/ai.service");
const prompt_service_1 = require("./services/prompt.service");
const settings_service_1 = require("./services/settings.service");
const history_service_1 = require("./services/history.service");
const context_service_1 = require("./services/context.service");
const workspace_service_1 = require("./services/workspace.service");
const chat_agent_1 = require("./agents/chat-agent");
const coding_agent_1 = require("./agents/coding-agent");
const review_agent_1 = require("./agents/review-agent");
const refactor_agent_1 = require("./agents/refactor-agent");
const docs_agent_1 = require("./agents/docs-agent");
const chatViewProvider_1 = require("./providers/webview/chatViewProvider");
const historyTreeProvider_1 = require("./providers/tree-view/historyTreeProvider");
const aiCodeActionProvider_1 = require("./providers/code-actions/aiCodeActionProvider");
const inlineCompletionProvider_1 = require("./providers/completion/inlineCompletionProvider");
const modelStatusBar_1 = require("./ui/statusbar/modelStatusBar");
const constants_1 = require("./utils/constants");
const logger_1 = require("./utils/logger");
function activate(context) {
    const settings = new settings_service_1.SettingsService(context.secrets);
    const ai = new ai_service_1.AIService(settings);
    const prompts = new prompt_service_1.PromptService(context.extensionUri);
    const history = new history_service_1.HistoryService(context.globalState);
    const contextService = new context_service_1.ContextService();
    const workspace = new workspace_service_1.WorkspaceService();
    const app = {
        extensionContext: context,
        ai,
        prompts,
        settings,
        history,
        context: contextService,
        workspace,
        agents: {
            chat: new chat_agent_1.ChatAgent(ai),
            coding: new coding_agent_1.CodingAgent(ai, prompts),
            review: new review_agent_1.ReviewAgent(ai, prompts),
            refactor: new refactor_agent_1.RefactorAgent(ai, prompts),
            docs: new docs_agent_1.DocsAgent(ai, prompts)
        }
    };
    const statusBar = new modelStatusBar_1.ModelStatusBar(settings);
    const historyTree = new historyTreeProvider_1.HistoryTreeProvider(history);
    context.subscriptions.push(...(0, commands_1.registerCommands)(app), statusBar, vscode.window.registerWebviewViewProvider(constants_1.VIEWS.chatView, new chatViewProvider_1.ChatViewProvider(app, context.extensionUri)), vscode.window.registerTreeDataProvider(constants_1.VIEWS.chatHistory, historyTree), vscode.languages.registerCodeActionsProvider('*', new aiCodeActionProvider_1.AiCodeActionProvider(), aiCodeActionProvider_1.AiCodeActionProvider.metadata), vscode.languages.registerInlineCompletionItemProvider('*', new inlineCompletionProvider_1.AiInlineCompletionProvider(app)), vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('proAi')) {
            statusBar.refresh();
        }
    }));
    logger_1.logger.info('Pro AI activated');
}
function deactivate() {
    logger_1.logger.dispose();
}
//# sourceMappingURL=extension.js.map