"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicProvider = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
class AnthropicProvider {
    apiKey;
    id = 'anthropic';
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async *chatStream(messages, options) {
        const client = new sdk_1.default({ apiKey: this.apiKey });
        const systemMessage = options.system ?? messages.find((m) => m.role === 'system')?.content;
        const conversation = messages
            .filter((m) => m.role !== 'system')
            .map((m) => ({ role: m.role, content: m.content }));
        const stream = client.messages.stream({
            model: options.model,
            max_tokens: options.maxTokens ?? 4096,
            temperature: options.temperature,
            system: systemMessage,
            messages: conversation
        });
        for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                yield { text: event.delta.text, done: false };
            }
        }
        yield { text: '', done: true };
    }
}
exports.AnthropicProvider = AnthropicProvider;
//# sourceMappingURL=anthropic.js.map