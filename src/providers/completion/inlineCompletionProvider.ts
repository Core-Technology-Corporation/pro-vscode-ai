import * as vscode from 'vscode';
import type { AppContext } from '../../types';
import { logger } from '../../utils/logger';

const DEBOUNCE_MS = 400;

export class AiInlineCompletionProvider implements vscode.InlineCompletionItemProvider {
  private debounceTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private readonly app: AppContext) {}

  async provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _context: vscode.InlineCompletionContext,
    token: vscode.CancellationToken
  ): Promise<vscode.InlineCompletionItem[]> {
    const prefix = document.getText(new vscode.Range(new vscode.Position(Math.max(0, position.line - 40), 0), position));
    const suffix = document.getText(new vscode.Range(position, new vscode.Position(Math.min(document.lineCount - 1, position.line + 10), 0)));

    if (!prefix.trim()) {
      return [];
    }

    await new Promise((resolve) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(resolve, DEBOUNCE_MS);
    });
    if (token.isCancellationRequested) {
      return [];
    }

    try {
      const suggestion = await this.app.ai.complete(
        [
          {
            role: 'user',
            content: `Continue this ${document.languageId} code. Return only the code to insert at the cursor, no explanation, no markdown fences.\n\n--- code before cursor ---\n${prefix}\n--- code after cursor ---\n${suffix}`
          }
        ],
        { maxTokens: 200, temperature: 0.1 }
      );
      if (token.isCancellationRequested || !suggestion.trim()) {
        return [];
      }
      return [new vscode.InlineCompletionItem(suggestion, new vscode.Range(position, position))];
    } catch (error) {
      logger.error('Inline completion failed', error);
      return [];
    }
  }
}
