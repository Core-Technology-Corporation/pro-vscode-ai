"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LMStudioProvider = exports.OllamaProvider = exports.GoogleProvider = exports.OpenAIProvider = exports.AnthropicProvider = void 0;
exports.createModelProvider = createModelProvider;
const anthropic_1 = require("./anthropic");
Object.defineProperty(exports, "AnthropicProvider", { enumerable: true, get: function () { return anthropic_1.AnthropicProvider; } });
const openai_1 = require("./openai");
Object.defineProperty(exports, "OpenAIProvider", { enumerable: true, get: function () { return openai_1.OpenAIProvider; } });
const google_1 = require("./google");
Object.defineProperty(exports, "GoogleProvider", { enumerable: true, get: function () { return google_1.GoogleProvider; } });
const ollama_1 = require("./ollama");
Object.defineProperty(exports, "OllamaProvider", { enumerable: true, get: function () { return ollama_1.OllamaProvider; } });
const lmstudio_1 = require("./lmstudio");
Object.defineProperty(exports, "LMStudioProvider", { enumerable: true, get: function () { return lmstudio_1.LMStudioProvider; } });
function createModelProvider(providerId, creds) {
    switch (providerId) {
        case 'anthropic':
            if (!creds.anthropicApiKey) {
                throw new Error('Falta la API key de Anthropic. Configúrala con "Pro AI: Select Model".');
            }
            return new anthropic_1.AnthropicProvider(creds.anthropicApiKey);
        case 'openai':
            if (!creds.openaiApiKey) {
                throw new Error('Falta la API key de OpenAI. Configúrala con "Pro AI: Select Model".');
            }
            return new openai_1.OpenAIProvider(creds.openaiApiKey);
        case 'google':
            if (!creds.googleApiKey) {
                throw new Error('Falta la API key de Google. Configúrala con "Pro AI: Select Model".');
            }
            return new google_1.GoogleProvider(creds.googleApiKey);
        case 'ollama':
            return new ollama_1.OllamaProvider(creds.ollamaBaseUrl);
        case 'lmstudio':
            return new lmstudio_1.LMStudioProvider(creds.lmstudioBaseUrl);
        default: {
            const exhaustiveCheck = providerId;
            throw new Error(`Proveedor desconocido: ${exhaustiveCheck}`);
        }
    }
}
//# sourceMappingURL=index.js.map