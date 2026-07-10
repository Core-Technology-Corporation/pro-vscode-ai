import { exec } from 'node:child_process';
import * as vscode from 'vscode';
import type { ToolResult } from '../types';

/** Runs a command headlessly and captures output, for feeding results back to the AI. */
export function runCommand(command: string, cwd: string): Promise<ToolResult<string>> {
  return new Promise((resolve) => {
    exec(command, { cwd, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ ok: false, error: stderr || error.message });
        return;
      }
      resolve({ ok: true, data: stdout });
    });
  });
}

/** Runs a command in a visible integrated terminal for the user to watch/interact with. */
export function runInVisibleTerminal(command: string, name = 'Pro AI'): void {
  const terminal = vscode.window.terminals.find((t) => t.name === name) ?? vscode.window.createTerminal(name);
  terminal.show();
  terminal.sendText(command);
}
