import * as vscode from 'vscode';
import type { AppContext } from '../types';
import { applyInlineEdit } from '../providers/inline/inlineEditController';
import { withProgress, warn, error } from '../ui/notifications/notify';

export function optimizeCommand(app: AppContext) {
  return async (): Promise<void> => {
    const editor = vscode.window.activeTextEditor;
    const context = app.context.buildFromActiveEditor(app.settings.getContextLines());
    if (!editor || !context?.selectedText) {
      warn('Selecciona el código a optimizar.');
      return;
    }
    try {
      const optimized = await withProgress('Optimizando código…', () => app.agents.refactor.optimize(context));
      await applyInlineEdit(editor.document, editor.selection, optimized);
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
    }
  };
}
