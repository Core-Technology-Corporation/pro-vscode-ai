"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAIProvider {
    apiKey;
    baseURL;
    id = 'openai';
    constructor(apiKey, baseURL) {
        this.apiKey = apiKey;
        this.baseURL = baseURL;
    }
    async *chatStream(messages, options) {
        const client = new openai_1.default({ apiKey: this.apiKey, baseURL: this.baseURL });
        const chatMessages = options.system
            ? [{ role: 'system', content: options.system }, ...messages.filter((m) => m.role !== 'system')]
            : messages;
        const stream = await client.chat.completions.create({
            model: options.model,
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            messages: chatMessages.map((m) => ({ role: m.role, content: m.content })),
            stream: true
        });
        for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? '';
            if (text) {
                yield { text, done: false };
            }
        }
        yield { text: '', done: true };
    }
}
exports.OpenAIProvider = OpenAIProvider;
//# sourceMappingURL=openai.js.map