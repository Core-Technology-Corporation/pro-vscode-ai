import * as vscode from 'vscode';
import type { AppContext } from '../types';
import { promptForInstruction } from '../providers/inline/inlineEditController';
import { withProgress, error } from '../ui/notifications/notify';

export function generateCommand(app: AppContext) {
  return async (): Promise<void> => {
    const instruction = await promptForInstruction('Describe el código que quieres generar…');
    if (!instruction) {
      return;
    }
    const editor = vscode.window.activeTextEditor;
    const context = app.context.buildFromActiveEditor(app.settings.getContextLines());
    try {
      const code = await withProgress('Generando código…', () => app.agents.coding.generate(instruction, context));
      if (editor) {
        await editor.edit((builder) => builder.insert(editor.selection.active, code));
      } else {
        const doc = await vscode.workspace.openTextDocument({ content: code });
        await vscode.window.showTextDocument(doc);
      }
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
    }
  };
}
