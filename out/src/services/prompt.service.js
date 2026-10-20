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
exports.PromptService = void 0;
const vscode = __importStar(require("vscode"));
class PromptService {
    extensionUri;
    cache = new Map();
    constructor(extensionUri) {
        this.extensionUri = extensionUri;
    }
    async load(name) {
        const cached = this.cache.get(name);
        if (cached) {
            return cached;
        }
        const uri = vscode.Uri.joinPath(this.extensionUri, 'src', 'prompts', `${name}.md`);
        const bytes = await vscode.workspace.fs.readFile(uri);
        const text = Buffer.from(bytes).toString('utf-8');
        this.cache.set(name, text);
        return text;
    }
    async render(name, vars) {
        const template = await this.load(name);
        return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => vars[key] ?? '');
    }
}
exports.PromptService = PromptService;
//# sourceMappingURL=prompt.service.js.map