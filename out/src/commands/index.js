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
exports.registerCommands = registerCommands;
const vscode = __importStar(require("vscode"));
const constants_1 = require("../utils/constants");
const chat_1 = require("./chat");
const explain_1 = require("./explain");
const fix_1 = require("./fix");
const optimize_1 = require("./optimize");
const generate_1 = require("./generate");
const commit_1 = require("./commit");
const clearHistory_1 = require("./clearHistory");
const selectModel_1 = require("./selectModel");
function registerCommands(app) {
    return [
        vscode.commands.registerCommand(constants_1.COMMANDS.openChat, chat_1.openChatCommand),
        vscode.commands.registerCommand(constants_1.COMMANDS.explain, (0, explain_1.explainCommand)(app)),
        vscode.commands.registerCommand(constants_1.COMMANDS.fix, (0, fix_1.fixCommand)(app)),
        vscode.commands.registerCommand(constants_1.COMMANDS.optimize, (0, optimize_1.optimizeCommand)(app)),
        vscode.commands.registerCommand(constants_1.COMMANDS.generate, (0, generate_1.generateCommand)(app)),
        vscode.commands.registerCommand(constants_1.COMMANDS.generateCommitMessage, (0, commit_1.generateCommitMessageCommand)(app)),
        vscode.commands.registerCommand(constants_1.COMMANDS.clearHistory, (0, clearHistory_1.clearHistoryCommand)(app)),
        vscode.commands.registerCommand(constants_1.COMMANDS.selectModel, (0, selectModel_1.selectModelCommand)(app))
    ];
}
//# sourceMappingURL=index.js.map