"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
class AIService {
    settings;
    constructor(settings) {
        this.settings = settings;
    }
    async *stream(messages, overrides = {}) {
        const providerId = this.settings.getProvider();
        const credentials = await this.settings.getCredentials();
        const provider = (0, models_1.createModelProvider)(providerId, credentials);
        const options = {
            model: overrides.model ?? this.settings.getModel(),
            temperature: overrides.temperature ?? this.settings.getTemperature(),
            maxTokens: overrides.maxTokens ?? this.settings.getMaxTokens(),
            system: overrides.system
        };
        logger_1.logger.info(`AI request via ${providerId}/${options.model}`);
        try {
            yield* provider.chatStream(messages, options);
        }
        catch (error) {
            logger_1.logger.error(`AI request failed (${providerId})`, error);
            throw error;
        }
    }
    async complete(messages, overrides = {}) {
        let full = '';
        for await (const chunk of this.stream(messages, overrides)) {
            full += chunk.text;
        }
        return full;
    }
}
exports.AIService = AIService;
//# sourceMappingURL=ai.service.js.map