export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type AIProviderId = 'anthropic' | 'openai' | 'google' | 'ollama' | 'lmstudio';

export interface ModelRequestOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
  system?: string;
}

export interface StreamChunk {
  text: string;
  done: boolean;
}

export interface AIModelProvider {
  readonly id: AIProviderId;
  chatStream(messages: ChatMessage[], options: ModelRequestOptions): AsyncGenerator<StreamChunk>;
}

export interface EditorContext {
  filePath?: string;
  languageId?: string;
  selectedText?: string;
  fullText?: string;
  startLine?: number;
  endLine?: number;
  diagnostics?: string;
  workspaceRoot?: string;
}

export interface AgentResult {
  text: string;
}

export interface HistoryEntry {
  id: string;
  title: string;
  timestamp: number;
  messages: ChatMessage[];
}

export interface ToolResult<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

// Forward declarations to avoid circular imports between services/agents and consumers.
import type { AIService } from '../services/ai.service';
import type { PromptService } from '../services/prompt.service';
import type { SettingsService } from '../services/settings.service';
import type { HistoryService } from '../services/history.service';
import type { ContextService } from '../services/context.service';
import type { WorkspaceService } from '../services/workspace.service';
import type { ChatAgent } from '../agents/chat-agent';
import type { CodingAgent } from '../agents/coding-agent';
import type { ReviewAgent } from '../agents/review-agent';
import type { RefactorAgent } from '../agents/refactor-agent';
import type { DocsAgent } from '../agents/docs-agent';
import type * as vscode from 'vscode';

export interface AppContext {
  extensionContext: vscode.ExtensionContext;
  ai: AIService;
  prompts: PromptService;
  settings: SettingsService;
  history: HistoryService;
  context: ContextService;
  workspace: WorkspaceService;
  agents: {
    chat: ChatAgent;
    coding: CodingAgent;
    review: ReviewAgent;
    refactor: RefactorAgent;
    docs: DocsAgent;
  };
}
