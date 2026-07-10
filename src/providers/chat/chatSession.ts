import type { AppContext } from '../../types';
import type { ChatMessage } from '../../types';

export class ChatSession {
  private readonly messages: ChatMessage[] = [];

  constructor(private readonly app: AppContext) {}

  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  async *ask(userText: string): AsyncGenerator<string> {
    this.messages.push({ role: 'user', content: userText });
    const editorContext = this.app.context.buildFromActiveEditor(this.app.settings.getContextLines());

    let assistantText = '';
    for await (const chunk of this.app.agents.chat.reply(this.messages, editorContext)) {
      assistantText += chunk.text;
      if (chunk.text) {
        yield chunk.text;
      }
    }
    this.messages.push({ role: 'assistant', content: assistantText });
  }

  async persist(): Promise<void> {
    if (this.messages.length > 0) {
      await this.app.history.save(this.messages);
    }
  }

  reset(): void {
    this.messages.length = 0;
  }
}
