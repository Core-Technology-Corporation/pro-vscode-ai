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
exports.ChatViewProvider = void 0;
const vscode = __importStar(require("vscode"));
const chatSession_1 = require("../chat/chatSession");
const logger_1 = require("../../utils/logger");
const constants_1 = require("../../utils/constants");
class ChatViewProvider {
    extensionUri;
    static viewType = constants_1.VIEWS.chatView;
    view;
    session;
    constructor(app, extensionUri) {
        this.extensionUri = extensionUri;
        this.session = new chatSession_1.ChatSession(app);
    }
    resolveWebviewView(webviewView) {
        this.view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')]
        };
        webviewView.webview.html = this.renderHtml(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (message) => {
            try {
                await this.handleMessage(message);
            }
            catch (error) {
                logger_1.logger.error('Chat webview message handling failed', error);
                this.post({ type: 'error', message: error instanceof Error ? error.message : String(error) });
            }
        });
    }
    async handleMessage(message) {
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
    post(message) {
        this.view?.webview.postMessage(message);
    }
    renderHtml(webview) {
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
exports.ChatViewProvider = ChatViewProvider;
function getNonce() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
//# sourceMappingURL=chatViewProvider.js.map