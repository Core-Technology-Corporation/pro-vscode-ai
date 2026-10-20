"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LMStudioProvider = void 0;
const openai_1 = require("./openai");
/** LM Studio exposes an OpenAI-compatible /v1 endpoint, so we just point the OpenAI client at it. */
class LMStudioProvider {
    id = 'lmstudio';
    delegate;
    constructor(baseUrl) {
        this.delegate = new openai_1.OpenAIProvider('lm-studio', baseUrl);
    }
    chatStream(messages, options) {
        return this.delegate.chatStream(messages, options);
    }
}
exports.LMStudioProvider = LMStudioProvider;
//# sourceMappingURL=lmstudio.js.map