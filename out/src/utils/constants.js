"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OUTPUT_CHANNEL_NAME = exports.DEFAULT_MODELS = exports.SECRET_KEYS = exports.CONFIG_KEYS = exports.VIEWS = exports.COMMANDS = exports.EXTENSION_ID = void 0;
exports.EXTENSION_ID = 'proAi';
exports.COMMANDS = {
    openChat: 'proAi.openChat',
    explain: 'proAi.explain',
    fix: 'proAi.fix',
    optimize: 'proAi.optimize',
    generate: 'proAi.generate',
    generateCommitMessage: 'proAi.generateCommitMessage',
    clearHistory: 'proAi.clearHistory',
    selectModel: 'proAi.selectModel'
};
exports.VIEWS = {
    chatView: 'proAi.chatView',
    chatHistory: 'proAi.chatHistory'
};
exports.CONFIG_KEYS = {
    provider: 'provider',
    model: 'model',
    temperature: 'temperature',
    maxTokens: 'maxTokens',
    ollamaBaseUrl: 'ollama.baseUrl',
    lmstudioBaseUrl: 'lmstudio.baseUrl',
    contextLines: 'contextLines'
};
exports.SECRET_KEYS = {
    anthropicApiKey: 'proAi.anthropicApiKey',
    openaiApiKey: 'proAi.openaiApiKey',
    googleApiKey: 'proAi.googleApiKey'
};
exports.DEFAULT_MODELS = {
    anthropic: 'claude-sonnet-5',
    openai: 'gpt-4o',
    google: 'gemini-2.0-flash',
    ollama: 'llama3.1',
    lmstudio: 'local-model'
};
exports.OUTPUT_CHANNEL_NAME = 'Pro AI';
//# sourceMappingURL=constants.js.map