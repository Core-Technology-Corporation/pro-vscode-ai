"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaProvider = void 0;
class OllamaProvider {
    baseUrl;
    id = 'ollama';
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async *chatStream(messages, options) {
        const chatMessages = options.system
            ? [{ role: 'system', content: options.system }, ...messages.filter((m) => m.role !== 'system')]
            : messages;
        const response = await fetch(`${this.baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: options.model,
                messages: chatMessages,
                stream: true,
                options: {
                    temperature: options.temperature,
                    num_predict: options.maxTokens
                }
            })
        });
        if (!response.ok || !response.body) {
            throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
                if (!line.trim()) {
                    continue;
                }
                const parsed = JSON.parse(line);
                if (parsed.message?.content) {
                    yield { text: parsed.message.content, done: false };
                }
            }
        }
        yield { text: '', done: true };
    }
}
exports.OllamaProvider = OllamaProvider;
//# sourceMappingURL=ollama.js.map