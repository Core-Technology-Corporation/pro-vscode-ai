import * as vscode from 'vscode';
import { formatDiagnostics } from '../tools/diagnostics';
import type { EditorContext } from '../types';

export class ContextService {
  buildFromActiveEditor(contextLines: number): EditorContext | undefined {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return undefined;
    }

    const document = editor.document;
    const selection = editor.selection;
    const hasSelection = !selection.isEmpty;

    const startLine = hasSelection ? selection.start.line : Math.max(0, editor.selection.active.line - contextLines / 2);
    const endLine = hasSelection
      ? selection.end.line
      : Math.min(document.lineCount - 1, editor.selection.active.line + contextLines / 2);

    const range = new vscode.Range(
      new vscode.Position(Math.floor(startLine), 0),
      new vscode.Position(Math.floor(endLine), document.lineAt(Math.floor(endLine)).text.length)
    );

    return {
      filePath: vscode.workspace.asRelativePath(document.uri),
      languageId: document.languageId,
      selectedText: hasSelection ? document.getText(selection) : undefined,
      fullText: document.getText(range),
      startLine: Math.floor(startLine) + 1,
      endLine: Math.floor(endLine) + 1,
      diagnostics: formatDiagnostics(document.uri, hasSelection ? selection : undefined),
      workspaceRoot: vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath
    };
  }
}
