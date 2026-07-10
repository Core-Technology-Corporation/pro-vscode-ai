import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIModelProvider, ChatMessage, ModelRequestOptions, StreamChunk } from '../types';

export class GoogleProvider implements AIModelProvider {
  readonly id = 'google' as const;

  constructor(private readonly apiKey: string) {}

  async *chatStream(messages: ChatMessage[], options: ModelRequestOptions): AsyncGenerator<StreamChunk> {
    const client = new GoogleGenerativeAI(this.apiKey);
    const systemInstruction = options.system ?? messages.find((m) => m.role === 'system')?.content;
    const model = client.getGenerativeModel({
      model: options.model,
      systemInstruction,
      generationConfig: {
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens
      }
    });

    const history = messages
      .filter((m) => m.role !== 'system')
      .slice(0, -1)
      .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
    const last = messages.filter((m) => m.role !== 'system').at(-1);

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(last?.content ?? '');

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield { text, done: false };
      }
    }
    yield { text: '', done: true };
  }
}
