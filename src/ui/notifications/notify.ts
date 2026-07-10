import * as vscode from 'vscode';

export function info(message: string): void {
  vscode.window.showInformationMessage(`Pro AI: ${message}`);
}

export function warn(message: string): void {
  vscode.window.showWarningMessage(`Pro AI: ${message}`);
}

export function error(message: string): void {
  vscode.window.showErrorMessage(`Pro AI: ${message}`);
}

export async function withProgress<T>(title: string, task: () => Promise<T>): Promise<T> {
  return vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: `Pro AI: ${title}`, cancellable: false },
    task
  );
}
