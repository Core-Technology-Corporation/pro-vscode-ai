"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSession = void 0;
class ChatSession {
    app;
    messages = [];
    constructor(app) {
        this.app = app;
    }
    getMessages() {
        return [...this.messages];
    }
    async *ask(userText) {
        this.messages.push({ role: 'user', content: userText });
        const editorContext = this.app.context.buildFromActiveEditor(this.app.settings.getContextLines());
        let assistantText = '';
        for await (const chunk of this.app.agents.chat.reply(this.messages, editorContext)) {
            assistantText += chunk.text;
            if (chunk.text) {
                yield chunk.text;
            }
        }
        this.messages.push({ role: 'assistant', content: assistantText });
    }
    async persist() {
        if (this.messages.length > 0) {
            await this.app.history.save(this.messages);
        }
    }
    reset() {
        this.messages.length = 0;
    }
}
exports.ChatSession = ChatSession;
//# sourceMappingURL=chatSession.js.map