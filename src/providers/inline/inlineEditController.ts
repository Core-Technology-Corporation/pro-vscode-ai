import * as vscode from 'vscode';

/** Applies AI-generated text as a replacement over a range, via a WorkspaceEdit so it's undoable in one step. */
export async function applyInlineEdit(document: vscode.TextDocument, range: vscode.Range, newText: string): Promise<void> {
  const edit = new vscode.WorkspaceEdit();
  edit.replace(document.uri, range, newText);
  await vscode.workspace.applyEdit(edit);
}

export async function promptForInstruction(placeHolder: string): Promise<string | undefined> {
  return vscode.window.showInputBox({
    prompt: 'Pro AI',
    placeHolder,
    ignoreFocusOut: true
  });
}
