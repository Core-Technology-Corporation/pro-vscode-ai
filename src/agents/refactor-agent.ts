import type { AIService } from '../services/ai.service';
import type { PromptService } from '../services/prompt.service';
import { extractCodeBlock } from '../utils/strings';
import type { EditorContext } from '../types';

export class RefactorAgent {
  constructor(private readonly ai: AIService, private readonly prompts: PromptService) {}

  async rewrite(context: EditorContext, goal: string): Promise<string> {
    const code = context.selectedText ?? context.fullText ?? '';
    const prompt = await this.prompts.render('refactor', {
      goal,
      language: context.languageId ?? '',
      filePath: context.filePath ?? '',
      diagnostics: context.diagnostics ? `\nDiagnostics:\n${context.diagnostics}` : '',
      code
    });
    const response = await this.ai.complete([{ role: 'user', content: prompt }]);
    return extractCodeBlock(response);
  }

  fix(context: EditorContext): Promise<string> {
    return this.rewrite(context, 'Fix the bugs and diagnostics reported for this code.');
  }

  optimize(context: EditorContext): Promise<string> {
    return this.rewrite(context, 'Improve performance and readability without changing behavior.');
  }
}
