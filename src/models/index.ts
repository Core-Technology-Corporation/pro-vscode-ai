import { AnthropicProvider } from './anthropic';
import { OpenAIProvider } from './openai';
import { GoogleProvider } from './google';
import { OllamaProvider } from './ollama';
import { LMStudioProvider } from './lmstudio';
import type { AIModelProvider, AIProviderId } from '../types';

export { AnthropicProvider, OpenAIProvider, GoogleProvider, OllamaProvider, LMStudioProvider };

export interface ProviderCredentials {
  anthropicApiKey?: string;
  openaiApiKey?: string;
  googleApiKey?: string;
  ollamaBaseUrl: string;
  lmstudioBaseUrl: string;
}

export function createModelProvider(providerId: AIProviderId, creds: ProviderCredentials): AIModelProvider {
  switch (providerId) {
    case 'anthropic':
      if (!creds.anthropicApiKey) {
        throw new Error('Falta la API key de Anthropic. Configúrala con "Pro AI: Select Model".');
      }
      return new AnthropicProvider(creds.anthropicApiKey);
    case 'openai':
      if (!creds.openaiApiKey) {
        throw new Error('Falta la API key de OpenAI. Configúrala con "Pro AI: Select Model".');
      }
      return new OpenAIProvider(creds.openaiApiKey);
    case 'google':
      if (!creds.googleApiKey) {
        throw new Error('Falta la API key de Google. Configúrala con "Pro AI: Select Model".');
      }
      return new GoogleProvider(creds.googleApiKey);
    case 'ollama':
      return new OllamaProvider(creds.ollamaBaseUrl);
    case 'lmstudio':
      return new LMStudioProvider(creds.lmstudioBaseUrl);
    default: {
      const exhaustiveCheck: never = providerId;
      throw new Error(`Proveedor desconocido: ${exhaustiveCheck}`);
    }
  }
}
