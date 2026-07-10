import * as vscode from 'vscode';
import type { AppContext } from '../types';
import { applyInlineEdit } from '../providers/inline/inlineEditController';
import { withProgress, warn, error } from '../ui/notifications/notify';

export function fixCommand(app: AppContext) {
  return async (): Promise<void> => {
    const editor = vscode.window.activeTextEditor;
    const context = app.context.buildFromActiveEditor(app.settings.getContextLines());
    if (!editor || !context?.selectedText) {
      warn('Selecciona el código con el problema para arreglarlo.');
      return;
    }
    try {
      const fixed = await withProgress('Arreglando código…', () => app.agents.refactor.fix(context));
      await applyInlineEdit(editor.document, editor.selection, fixed);
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
    }
  };
}
