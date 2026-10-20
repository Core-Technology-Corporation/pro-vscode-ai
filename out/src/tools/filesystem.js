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
exports.readWorkspaceFile = readWorkspaceFile;
exports.writeWorkspaceFile = writeWorkspaceFile;
exports.listWorkspaceFiles = listWorkspaceFiles;
const vscode = __importStar(require("vscode"));
function assertInsideWorkspace(uri) {
    const folder = vscode.workspace.getWorkspaceFolder(uri);
    if (!folder) {
        throw new Error(`El archivo ${uri.fsPath} está fuera del workspace abierto.`);
    }
}
async function readWorkspaceFile(uri) {
    try {
        assertInsideWorkspace(uri);
        const bytes = await vscode.workspace.fs.readFile(uri);
        return { ok: true, data: Buffer.from(bytes).toString('utf-8') };
    }
    catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
}
async function writeWorkspaceFile(uri, content) {
    try {
        assertInsideWorkspace(uri);
        await vscode.workspace.fs.writeFile(uri, Buffer.from(content, 'utf-8'));
        return { ok: true };
    }
    catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
}
async function listWorkspaceFiles(globPattern, maxResults = 200) {
    return vscode.workspace.findFiles(globPattern, '**/node_modules/**', maxResults);
}
//# sourceMappingURL=filesystem.js.map