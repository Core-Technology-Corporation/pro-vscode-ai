import type { AppContext } from '../types';
import { showMarkdownResult } from '../ui/panels/resultPanel';
import { withProgress, warn, error } from '../ui/notifications/notify';

export function explainCommand(app: AppContext) {
  return async (): Promise<void> => {
    const context = app.context.buildFromActiveEditor(app.settings.getContextLines());
    if (!context?.selectedText) {
      warn('Selecciona código primero para explicarlo.');
      return;
    }
    try {
      const prompt = await app.prompts.render('explain', {
        language: context.languageId ?? '',
        filePath: context.filePath ?? '',
        code: context.selectedText
      });
      const explanation = await withProgress('Explicando código…', () =>
        app.ai.complete([{ role: 'user', content: prompt }])
      );
      await showMarkdownResult(`Explanation: ${context.filePath ?? ''}`, explanation);
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
    }
  };
}
