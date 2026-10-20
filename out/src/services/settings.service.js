"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const vscode = __importStar(require("vscode"));
const constants_1 = require("../utils/constants");
class SettingsService {
    secrets;
    constructor(secrets) {
        this.secrets = secrets;
    }
    get config() {
        return vscode.workspace.getConfiguration(constants_1.EXTENSION_ID);
    }
    getProvider() {
        return this.config.get(constants_1.CONFIG_KEYS.provider, 'anthropic');
    }
    async setProvider(provider) {
        await this.config.update(constants_1.CONFIG_KEYS.provider, provider, vscode.ConfigurationTarget.Global);
    }
    getModel() {
        const configured = this.config.get(constants_1.CONFIG_KEYS.model);
        return configured && configured.trim().length > 0 ? configured : constants_1.DEFAULT_MODELS[this.getProvider()];
    }
    async setModel(model) {
        await this.config.update(constants_1.CONFIG_KEYS.model, model, vscode.ConfigurationTarget.Global);
    }
    getTemperature() {
        return this.config.get(constants_1.CONFIG_KEYS.temperature, 0.3);
    }
    getMaxTokens() {
        return this.config.get(constants_1.CONFIG_KEYS.maxTokens, 4096);
    }
    getContextLines() {
        return this.config.get(constants_1.CONFIG_KEYS.contextLines, 200);
    }
    getOllamaBaseUrl() {
        return this.config.get(constants_1.CONFIG_KEYS.ollamaBaseUrl, 'http://localhost:11434');
    }
    getLmStudioBaseUrl() {
        return this.config.get(constants_1.CONFIG_KEYS.lmstudioBaseUrl, 'http://localhost:1234/v1');
    }
    async setApiKey(provider, key) {
        const secretKey = this.secretKeyFor(provider);
        await this.secrets.store(secretKey, key);
    }
    async getApiKey(provider) {
        return this.secrets.get(this.secretKeyFor(provider));
    }
    secretKeyFor(provider) {
        switch (provider) {
            case 'anthropic':
                return constants_1.SECRET_KEYS.anthropicApiKey;
            case 'openai':
                return constants_1.SECRET_KEYS.openaiApiKey;
            case 'google':
                return constants_1.SECRET_KEYS.googleApiKey;
        }
    }
    async getCredentials() {
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
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map