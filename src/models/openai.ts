import OpenAI from 'openai';
import type { AIModelProvider, ChatMessage, ModelRequestOptions, StreamChunk } from '../types';

export class OpenAIProvider implements AIModelProvider {
  readonly id = 'openai' as const;

  constructor(private readonly apiKey: string, private readonly baseURL?: string) {}

  async *chatStream(messages: ChatMessage[], options: ModelRequestOptions): AsyncGenerator<StreamChunk> {
    const client = new OpenAI({ apiKey: this.apiKey, baseURL: this.baseURL });
    const chatMessages = options.system
      ? [{ role: 'system' as const, content: options.system }, ...messages.filter((m) => m.role !== 'system')]
      : messages;

    const stream = await client.chat.completions.create({
      model: options.model,
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      messages: chatMessages.map((m) => ({ role: m.role, content: m.content })),
      stream: true
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      if (text) {
        yield { text, done: false };
      }
    }
    yield { text: '', done: true };
  }
}
