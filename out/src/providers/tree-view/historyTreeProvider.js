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
exports.HistoryTreeProvider = void 0;
const vscode = __importStar(require("vscode"));
class HistoryTreeProvider {
    history;
    emitter = new vscode.EventEmitter();
    onDidChangeTreeData = this.emitter.event;
    constructor(history) {
        this.history = history;
        this.history.onDidChange(() => this.emitter.fire());
    }
    getTreeItem(element) {
        const item = new vscode.TreeItem(element.title, vscode.TreeItemCollapsibleState.None);
        item.description = new Date(element.timestamp).toLocaleString();
        item.iconPath = new vscode.ThemeIcon('comment-discussion');
        item.tooltip = element.messages.map((m) => `${m.role}: ${m.content}`).join('\n\n');
        return item;
    }
    getChildren() {
        return this.history.getAll();
    }
}
exports.HistoryTreeProvider = HistoryTreeProvider;
//# sourceMappingURL=historyTreeProvider.js.map