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
exports.runCommand = runCommand;
exports.runInVisibleTerminal = runInVisibleTerminal;
const node_child_process_1 = require("node:child_process");
const vscode = __importStar(require("vscode"));
/** Runs a command headlessly and captures output, for feeding results back to the AI. */
function runCommand(command, cwd) {
    return new Promise((resolve) => {
        (0, node_child_process_1.exec)(command, { cwd, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
                resolve({ ok: false, error: stderr || error.message });
                return;
            }
            resolve({ ok: true, data: stdout });
        });
    });
}
/** Runs a command in a visible integrated terminal for the user to watch/interact with. */
function runInVisibleTerminal(command, name = 'Pro AI') {
    const terminal = vscode.window.terminals.find((t) => t.name === name) ?? vscode.window.createTerminal(name);
    terminal.show();
    terminal.sendText(command);
}
//# sourceMappingURL=terminal.js.map