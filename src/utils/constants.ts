export const EXTENSION_ID = 'proAi';

export const COMMANDS = {
  openChat: 'proAi.openChat',
  explain: 'proAi.explain',
  fix: 'proAi.fix',
  optimize: 'proAi.optimize',
  generate: 'proAi.generate',
  generateCommitMessage: 'proAi.generateCommitMessage',
  clearHistory: 'proAi.clearHistory',
  selectModel: 'proAi.selectModel'
} as const;

export const VIEWS = {
  chatView: 'proAi.chatView',
  chatHistory: 'proAi.chatHistory'
} as const;

export const CONFIG_KEYS = {
  provider: 'provider',
  model: 'model',
  temperature: 'temperature',
  maxTokens: 'maxTokens',
  ollamaBaseUrl: 'ollama.baseUrl',
  lmstudioBaseUrl: 'lmstudio.baseUrl',
  contextLines: 'contextLines'
} as const;

export const SECRET_KEYS = {
  anthropicApiKey: 'proAi.anthropicApiKey',
  openaiApiKey: 'proAi.openaiApiKey',
  googleApiKey: 'proAi.googleApiKey'
} as const;

export const DEFAULT_MODELS: Record<string, string> = {
  anthropic: 'claude-sonnet-5',
  openai: 'gpt-4o',
  google: 'gemini-2.0-flash',
  ollama: 'llama3.1',
  lmstudio: 'local-model'
};

export const OUTPUT_CHANNEL_NAME = 'Pro AI';
