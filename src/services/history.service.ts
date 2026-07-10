import * as vscode from 'vscode';
import type { ChatMessage, HistoryEntry } from '../types';

const STORAGE_KEY = 'proAi.chatHistory';

export class HistoryService {
  private readonly emitter = new vscode.EventEmitter<void>();
  readonly onDidChange = this.emitter.event;

  constructor(private readonly memento: vscode.Memento) {}

  getAll(): HistoryEntry[] {
    return [...this.memento.get<HistoryEntry[]>(STORAGE_KEY, [])].sort((a, b) => b.timestamp - a.timestamp);
  }

  async save(messages: ChatMessage[]): Promise<HistoryEntry> {
    const firstUserMessage = messages.find((m) => m.role === 'user')?.content ?? 'Chat';
    const entry: HistoryEntry = {
      id: `${Date.now()}`,
      title: firstUserMessage.slice(0, 60),
      timestamp: Date.now(),
      messages
    };
    const all = this.memento.get<HistoryEntry[]>(STORAGE_KEY, []);
    all.push(entry);
    await this.memento.update(STORAGE_KEY, all);
    this.emitter.fire();
    return entry;
  }

  async clear(): Promise<void> {
    await this.memento.update(STORAGE_KEY, []);
    this.emitter.fire();
  }

  async remove(id: string): Promise<void> {
    const all = this.memento.get<HistoryEntry[]>(STORAGE_KEY, []).filter((e) => e.id !== id);
    await this.memento.update(STORAGE_KEY, all);
    this.emitter.fire();
  }
}
