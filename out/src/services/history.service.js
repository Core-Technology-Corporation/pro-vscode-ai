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
exports.HistoryService = void 0;
const vscode = __importStar(require("vscode"));
const STORAGE_KEY = 'proAi.chatHistory';
class HistoryService {
    memento;
    emitter = new vscode.EventEmitter();
    onDidChange = this.emitter.event;
    constructor(memento) {
        this.memento = memento;
    }
    getAll() {
        return [...this.memento.get(STORAGE_KEY, [])].sort((a, b) => b.timestamp - a.timestamp);
    }
    async save(messages) {
        const firstUserMessage = messages.find((m) => m.role === 'user')?.content ?? 'Chat';
        const entry = {
            id: `${Date.now()}`,
            title: firstUserMessage.slice(0, 60),
            timestamp: Date.now(),
            messages
        };
        const all = this.memento.get(STORAGE_KEY, []);
        all.push(entry);
        await this.memento.update(STORAGE_KEY, all);
        this.emitter.fire();
        return entry;
    }
    async clear() {
        await this.memento.update(STORAGE_KEY, []);
        this.emitter.fire();
    }
    async remove(id) {
        const all = this.memento.get(STORAGE_KEY, []).filter((e) => e.id !== id);
        await this.memento.update(STORAGE_KEY, all);
        this.emitter.fire();
    }
}
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map