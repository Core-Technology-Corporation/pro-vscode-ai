import Anthropic from '@anthropic-ai/sdk';
import type { AIModelProvider, ChatMessage, ModelRequestOptions, StreamChunk } from '../types';

export class AnthropicProvider implements AIModelProvider {
  readonly id = 'anthropic' as const;

  constructor(private readonly apiKey: string) {}

  async *chatStream(messages: ChatMessage[], options: ModelRequestOptions): AsyncGenerator<StreamChunk> {
    const client = new Anthropic({ apiKey: this.apiKey });
    const systemMessage = options.system ?? messages.find((m) => m.role === 'system')?.content;
    const conversation = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

    const stream = client.messages.stream({
      model: options.model,
      max_tokens: options.maxTokens ?? 4096,
      temperature: options.temperature,
      system: systemMessage,
      messages: conversation
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield { text: event.delta.text, done: false };
      }
    }
    yield { text: '', done: true };
  }
}
