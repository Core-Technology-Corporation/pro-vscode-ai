import * as vscode from 'vscode';

export class WorkspaceService {
  getRootPath(): string | undefined {
    return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  }

  requireRootPath(): string {
    const root = this.getRootPath();
    if (!root) {
      throw new Error('Abre una carpeta de proyecto para usar esta función.');
    }
    return root;
  }

  getActiveDocument(): vscode.TextDocument | undefined {
    return vscode.window.activeTextEditor?.document;
  }
}
