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
exports.searchWorkspace = searchWorkspace;
const vscode = __importStar(require("vscode"));
const filesystem_1 = require("./filesystem");
async function searchWorkspace(query, globPattern = '**/*', maxResults = 50) {
    const files = await (0, filesystem_1.listWorkspaceFiles)(globPattern, 500);
    const pattern = new RegExp(query, 'i');
    const matches = [];
    for (const uri of files) {
        if (matches.length >= maxResults) {
            break;
        }
        let bytes;
        try {
            bytes = await vscode.workspace.fs.readFile(uri);
        }
        catch {
            continue;
        }
        const lines = Buffer.from(bytes).toString('utf-8').split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (pattern.test(lines[i])) {
                matches.push({ uri, line: i + 1, text: lines[i].trim() });
                if (matches.length >= maxResults) {
                    break;
                }
            }
        }
    }
    return matches;
}
//# sourceMappingURL=search.js.map