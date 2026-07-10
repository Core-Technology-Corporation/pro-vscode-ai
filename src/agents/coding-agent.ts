import type { AIService } from '../services/ai.service';
import type { PromptService } from '../services/prompt.service';
import { extractCodeBlock } from '../utils/strings';
import type { EditorContext } from '../types';

export class CodingAgent {
  constructor(private readonly ai: AIService, private readonly prompts: PromptService) {}

  async generate(instruction: string, context?: EditorContext): Promise<string> {
    const prompt = await this.prompts.render('generate', {
      instruction,
      language: context?.languageId ?? '',
      context: context?.fullText ?? ''
    });
    const response = await this.ai.complete([{ role: 'user', content: prompt }]);
    return extractCodeBlock(response);
  }
}
