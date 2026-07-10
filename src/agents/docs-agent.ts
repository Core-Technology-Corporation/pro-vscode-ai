import type { AIService } from '../services/ai.service';
import type { PromptService } from '../services/prompt.service';
import { extractCodeBlock } from '../utils/strings';
import type { EditorContext } from '../types';

export class DocsAgent {
  constructor(private readonly ai: AIService, private readonly prompts: PromptService) {}

  async document(context: EditorContext): Promise<string> {
    const code = context.selectedText ?? context.fullText ?? '';
    const prompt = await this.prompts.render('generate', {
      instruction: 'Add concise, accurate documentation comments to this code. Only document non-obvious behavior; do not restate what the code already makes clear.',
      language: context.languageId ?? '',
      context: code
    });
    const response = await this.ai.complete([{ role: 'user', content: prompt }]);
    return extractCodeBlock(response);
  }

  async writeTests(context: EditorContext): Promise<string> {
    const code = context.selectedText ?? context.fullText ?? '';
    const prompt = await this.prompts.render('tests', {
      language: context.languageId ?? '',
      filePath: context.filePath ?? '',
      code
    });
    const response = await this.ai.complete([{ role: 'user', content: prompt }]);
    return extractCodeBlock(response);
  }
}
