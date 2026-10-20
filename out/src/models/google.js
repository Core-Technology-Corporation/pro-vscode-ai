"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleProvider = void 0;
const generative_ai_1 = require("@google/generative-ai");
class GoogleProvider {
    apiKey;
    id = 'google';
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async *chatStream(messages, options) {
        const client = new generative_ai_1.GoogleGenerativeAI(this.apiKey);
        const systemInstruction = options.system ?? messages.find((m) => m.role === 'system')?.content;
        const model = client.getGenerativeModel({
            model: options.model,
            systemInstruction,
            generationConfig: {
                temperature: options.temperature,
                maxOutputTokens: options.maxTokens
            }
        });
        const history = messages
            .filter((m) => m.role !== 'system')
            .slice(0, -1)
            .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
        const last = messages.filter((m) => m.role !== 'system').at(-1);
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(last?.content ?? '');
        for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
                yield { text, done: false };
            }
        }
        yield { text: '', done: true };
    }
}
exports.GoogleProvider = GoogleProvider;
//# sourceMappingURL=google.js.map