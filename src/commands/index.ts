import * as vscode from 'vscode';
import { COMMANDS } from '../utils/constants';
import type { AppContext } from '../types';
import { openChatCommand } from './chat';
import { explainCommand } from './explain';
import { fixCommand } from './fix';
import { optimizeCommand } from './optimize';
import { generateCommand } from './generate';
import { generateCommitMessageCommand } from './commit';
import { clearHistoryCommand } from './clearHistory';
import { selectModelCommand } from './selectModel';

export function registerCommands(app: AppContext): vscode.Disposable[] {
  return [
    vscode.commands.registerCommand(COMMANDS.openChat, openChatCommand),
    vscode.commands.registerCommand(COMMANDS.explain, explainCommand(app)),
    vscode.commands.registerCommand(COMMANDS.fix, fixCommand(app)),
    vscode.commands.registerCommand(COMMANDS.optimize, optimizeCommand(app)),
    vscode.commands.registerCommand(COMMANDS.generate, generateCommand(app)),
    vscode.commands.registerCommand(COMMANDS.generateCommitMessage, generateCommitMessageCommand(app)),
    vscode.commands.registerCommand(COMMANDS.clearHistory, clearHistoryCommand(app)),
    vscode.commands.registerCommand(COMMANDS.selectModel, selectModelCommand(app))
  ];
}
