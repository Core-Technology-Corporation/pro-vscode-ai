import * as vscode from 'vscode';
import { VIEWS } from '../utils/constants';

export async function openChatCommand(): Promise<void> {
  await vscode.commands.executeCommand(`${VIEWS.chatView}.focus`);
}
