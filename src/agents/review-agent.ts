import type { AIService } from '../services/ai.service';
import type { PromptService } from '../services/prompt.service';
import type { EditorContext } from '../types';

export class ReviewAgent {
  constructor(private readonly ai: AIService, private readonly prompts: PromptService) {}

  async review(context: EditorContext): Promise<string> {
    const code = context.selectedText ?? context.fullText ?? '';
    const prompt = await this.prompts.render('review', {
      language: context.languageId ?? '',
      filePath: context.filePath ?? '',
      diagnostics: context.diagnostics ? `\nDiagnostics:\n${context.diagnostics}` : '',
      code
    });
    return this.ai.complete([{ role: 'user', content: prompt }]);
  }
}
