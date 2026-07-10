import { createModelProvider } from '../models';
import type { ChatMessage, ModelRequestOptions, StreamChunk } from '../types';
import type { SettingsService } from './settings.service';
import { logger } from '../utils/logger';

export class AIService {
  constructor(private readonly settings: SettingsService) {}

  async *stream(messages: ChatMessage[], overrides: Partial<ModelRequestOptions> = {}): AsyncGenerator<StreamChunk> {
    const providerId = this.settings.getProvider();
    const credentials = await this.settings.getCredentials();
    const provider = createModelProvider(providerId, credentials);

    const options: ModelRequestOptions = {
      model: overrides.model ?? this.settings.getModel(),
      temperature: overrides.temperature ?? this.settings.getTemperature(),
      maxTokens: overrides.maxTokens ?? this.settings.getMaxTokens(),
      system: overrides.system
    };

    logger.info(`AI request via ${providerId}/${options.model}`);

    try {
      yield* provider.chatStream(messages, options);
    } catch (error) {
      logger.error(`AI request failed (${providerId})`, error);
      throw error;
    }
  }

  async complete(messages: ChatMessage[], overrides: Partial<ModelRequestOptions> = {}): Promise<string> {
    let full = '';
    for await (const chunk of this.stream(messages, overrides)) {
      full += chunk.text;
    }
    return full;
  }
}
