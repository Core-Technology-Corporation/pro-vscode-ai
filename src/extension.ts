import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { AIService } from './services/ai.service';
import { PromptService } from './services/prompt.service';
import { SettingsService } from './services/settings.service';
import { HistoryService } from './services/history.service';
import { ContextService } from './services/context.service';
import { WorkspaceService } from './services/workspace.service';
import { ChatAgent } from './agents/chat-agent';
import { CodingAgent } from './agents/coding-agent';
import { ReviewAgent } from './agents/review-agent';
import { RefactorAgent } from './agents/refactor-agent';
import { DocsAgent } from './agents/docs-agent';
import { ChatViewProvider } from './providers/webview/chatViewProvider';
import { HistoryTreeProvider } from './providers/tree-view/historyTreeProvider';
import { AiCodeActionProvider } from './providers/code-actions/aiCodeActionProvider';
import { AiInlineCompletionProvider } from './providers/completion/inlineCompletionProvider';
import { ModelStatusBar } from './ui/statusbar/modelStatusBar';
import { VIEWS } from './utils/constants';
import { logger } from './utils/logger';
import type { AppContext } from './types';

export function activate(context: vscode.ExtensionContext): void {
  const settings = new SettingsService(context.secrets);
  const ai = new AIService(settings);
  const prompts = new PromptService(context.extensionUri);
  const history = new HistoryService(context.globalState);
  const contextService = new ContextService();
  const workspace = new WorkspaceService();

  const app: AppContext = {
    extensionContext: context,
    ai,
    prompts,
    settings,
    history,
    context: contextService,
    workspace,
    agents: {
      chat: new ChatAgent(ai),
      coding: new CodingAgent(ai, prompts),
      review: new ReviewAgent(ai, prompts),
      refactor: new RefactorAgent(ai, prompts),
      docs: new DocsAgent(ai, prompts)
    }
  };

  const statusBar = new ModelStatusBar(settings);
  const historyTree = new HistoryTreeProvider(history);

  context.subscriptions.push(
    ...registerCommands(app),
    statusBar,
    vscode.window.registerWebviewViewProvider(VIEWS.chatView, new ChatViewProvider(app, context.extensionUri)),
    vscode.window.registerTreeDataProvider(VIEWS.chatHistory, historyTree),
    vscode.languages.registerCodeActionsProvider('*', new AiCodeActionProvider(), AiCodeActionProvider.metadata),
    vscode.languages.registerInlineCompletionItemProvider('*', new AiInlineCompletionProvider(app)),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('proAi')) {
        statusBar.refresh();
      }
    })
  );

  logger.info('Pro AI activated');
}

export function deactivate(): void {
  logger.dispose();
}
