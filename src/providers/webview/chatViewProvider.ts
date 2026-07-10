import * as vscode from 'vscode';
import { ChatSession } from '../chat/chatSession';
import { logger } from '../../utils/logger';
import { VIEWS } from '../../utils/constants';
import type { AppContext } from '../../types';

type WebviewInMessage =
  | { type: 'sendMessage'; text: string }
  | { type: 'newChat' };

type WebviewOutMessage =
  | { type: 'assistantChunk'; text: string }
  | { type: 'assistantDone' }
  | { type: 'error'; message: string };

export class ChatViewProvider implements vscode.WebviewViewProvider {
  static readonly viewType = VIEWS.chatView;

  private view: vscode.WebviewView | undefined;
  private session: ChatSession;

  constructor(app: AppContext, private readonly extensionUri: vscode.Uri) {
    this.session = new ChatSession(app);
  }

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    this.view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')]
    };
    webviewView.webview.html = this.renderHtml(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message: WebviewInMessage) => {
      try {
        await this.handleMessage(message);
      } catch (error) {
        logger.error('Chat webview message handling failed', error);
        this.post({ type: 'error', message: error instanceof Error ? error.message : String(error) });
      }
    });
  }

  private async handleMessage(message: WebviewInMessage): Promise<void> {
    if (message.type === 'newChat') {
      await this.session.persist();
      this.session.reset();
      return;
    }
    if (message.type === 'sendMessage') {
      for await (const text of this.session.ask(message.text)) {
        this.post({ type: 'assistantChunk', text });
      }
      this.post({ type: 'assistantDone' });
      await this.session.persist();
    }
  }

  private post(message: WebviewOutMessage): void {
    this.view?.webview.postMessage(message);
  }

  private renderHtml(webview: vscode.Webview): string {
    const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.css'));
    const jsUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.js'));
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
  <link rel="stylesheet" href="${cssUri}" />
  <title>Pro AI Chat</title>
</head>
<body>
  <div id="messages"></div>
  <form id="composer">
    <textarea id="input" placeholder="Ask Pro AI..." rows="2"></textarea>
    <button type="submit">Send</button>
  </form>
  <script nonce="${nonce}" src="${jsUri}"></script>
</body>
</html>`;
  }
}

function getNonce(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
