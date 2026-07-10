import { OpenAIProvider } from './openai';
import type { AIModelProvider, ChatMessage, ModelRequestOptions, StreamChunk } from '../types';

/** LM Studio exposes an OpenAI-compatible /v1 endpoint, so we just point the OpenAI client at it. */
export class LMStudioProvider implements AIModelProvider {
  readonly id = 'lmstudio' as const;

  private readonly delegate: OpenAIProvider;

  constructor(baseUrl: string) {
    this.delegate = new OpenAIProvider('lm-studio', baseUrl);
  }

  chatStream(messages: ChatMessage[], options: ModelRequestOptions): AsyncGenerator<StreamChunk> {
    return this.delegate.chatStream(messages, options);
  }
}
