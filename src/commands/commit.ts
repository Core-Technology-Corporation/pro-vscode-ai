import * as vscode from 'vscode';
import type { AppContext } from '../types';
import { getStagedDiff, getWorkingDiff } from '../tools/git';
import { withProgress, warn, error } from '../ui/notifications/notify';

const COMMIT_INSTRUCTION = `Write a concise, conventional-commit style git commit message (type: summary,
then body if needed) for the following diff. Return only the commit message,
no extra commentary.`;

export function generateCommitMessageCommand(app: AppContext) {
  return async (): Promise<void> => {
    const root = app.workspace.getRootPath();
    if (!root) {
      warn('Abre un repositorio Git para generar el mensaje de commit.');
      return;
    }
    try {
      const staged = await getStagedDiff(root);
      const diff = staged.ok && staged.data ? staged : await getWorkingDiff(root);
      if (!diff.ok || !diff.data?.trim()) {
        warn('No hay cambios para generar un mensaje de commit.');
        return;
      }

      const message = await withProgress('Generando mensaje de commit…', () =>
        app.ai.complete([{ role: 'user', content: `${COMMIT_INSTRUCTION}\n\n${diff.data}` }])
      );

      const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
      const api = gitExtension?.getAPI(1);
      const repo = api?.repositories?.[0];
      if (repo) {
        repo.inputBox.value = message.trim();
      } else {
        await vscode.env.clipboard.writeText(message.trim());
        vscode.window.showInformationMessage('Pro AI: mensaje de commit copiado al portapapeles.');
      }
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
    }
  };
}
