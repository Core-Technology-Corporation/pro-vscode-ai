import * as vscode from 'vscode';
import { COMMANDS } from '../../utils/constants';

export class AiCodeActionProvider implements vscode.CodeActionProvider {
  static readonly metadata: vscode.CodeActionProviderMetadata = {
    providedCodeActionKinds: [vscode.CodeActionKind.QuickFix, vscode.CodeActionKind.RefactorRewrite]
  };

  provideCodeActions(
    _document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext
  ): vscode.CodeAction[] {
    const actions: vscode.CodeAction[] = [];

    if (context.diagnostics.length > 0) {
      const fixAction = new vscode.CodeAction('Fix with Pro AI', vscode.CodeActionKind.QuickFix);
      fixAction.command = { command: COMMANDS.fix, title: 'Fix with Pro AI' };
      fixAction.diagnostics = [...context.diagnostics];
      actions.push(fixAction);
    }

    if (!range.isEmpty) {
      const explainAction = new vscode.CodeAction('Explain with Pro AI', vscode.CodeActionKind.RefactorRewrite);
      explainAction.command = { command: COMMANDS.explain, title: 'Explain with Pro AI' };
      actions.push(explainAction);

      const optimizeAction = new vscode.CodeAction('Optimize with Pro AI', vscode.CodeActionKind.RefactorRewrite);
      optimizeAction.command = { command: COMMANDS.optimize, title: 'Optimize with Pro AI' };
      actions.push(optimizeAction);
    }

    return actions;
  }
}
