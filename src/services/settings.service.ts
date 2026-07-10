import * as vscode from 'vscode';
import { CONFIG_KEYS, DEFAULT_MODELS, EXTENSION_ID, SECRET_KEYS } from '../utils/constants';
import type { ProviderCredentials } from '../models';
import type { AIProviderId } from '../types';

export class SettingsService {
  constructor(private readonly secrets: vscode.SecretStorage) {}

  private get config(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(EXTENSION_ID);
  }

  getProvider(): AIProviderId {
    return this.config.get<AIProviderId>(CONFIG_KEYS.provider, 'anthropic');
  }

  async setProvider(provider: AIProviderId): Promise<void> {
    await this.config.update(CONFIG_KEYS.provider, provider, vscode.ConfigurationTarget.Global);
  }

  getModel(): string {
    const configured = this.config.get<string>(CONFIG_KEYS.model);
    return configured && configured.trim().length > 0 ? configured : DEFAULT_MODELS[this.getProvider()];
  }

  async setModel(model: string): Promise<void> {
    await this.config.update(CONFIG_KEYS.model, model, vscode.ConfigurationTarget.Global);
  }

  getTemperature(): number {
    return this.config.get<number>(CONFIG_KEYS.temperature, 0.3);
  }

  getMaxTokens(): number {
    return this.config.get<number>(CONFIG_KEYS.maxTokens, 4096);
  }

  getContextLines(): number {
    return this.config.get<number>(CONFIG_KEYS.contextLines, 200);
  }

  getOllamaBaseUrl(): string {
    return this.config.get<string>(CONFIG_KEYS.ollamaBaseUrl, 'http://localhost:11434');
  }

  getLmStudioBaseUrl(): string {
    return this.config.get<string>(CONFIG_KEYS.lmstudioBaseUrl, 'http://localhost:1234/v1');
  }

  async setApiKey(provider: 'anthropic' | 'openai' | 'google', key: string): Promise<void> {
    const secretKey = this.secretKeyFor(provider);
    await this.secrets.store(secretKey, key);
  }

  async getApiKey(provider: 'anthropic' | 'openai' | 'google'): Promise<string | undefined> {
    return this.secrets.get(this.secretKeyFor(provider));
  }

  private secretKeyFor(provider: 'anthropic' | 'openai' | 'google'): string {
    switch (provider) {
      case 'anthropic':
        return SECRET_KEYS.anthropicApiKey;
      case 'openai':
        return SECRET_KEYS.openaiApiKey;
      case 'google':
        return SECRET_KEYS.googleApiKey;
    }
  }

  async getCredentials(): Promise<ProviderCredentials> {
    const [anthropicApiKey, openaiApiKey, googleApiKey] = await Promise.all([
      this.getApiKey('anthropic'),
      this.getApiKey('openai'),
      this.getApiKey('google')
    ]);
    return {
      anthropicApiKey,
      openaiApiKey,
      googleApiKey,
      ollamaBaseUrl: this.getOllamaBaseUrl(),
      lmstudioBaseUrl: this.getLmStudioBaseUrl()
    };
  }
}
