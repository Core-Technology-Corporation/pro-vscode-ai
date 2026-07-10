import * as vscode from 'vscode';
import type { HistoryService } from '../../services/history.service';
import type { HistoryEntry } from '../../types';

export class HistoryTreeProvider implements vscode.TreeDataProvider<HistoryEntry> {
  private readonly emitter = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this.emitter.event;

  constructor(private readonly history: HistoryService) {
    this.history.onDidChange(() => this.emitter.fire());
  }

  getTreeItem(element: HistoryEntry): vscode.TreeItem {
    const item = new vscode.TreeItem(element.title, vscode.TreeItemCollapsibleState.None);
    item.description = new Date(element.timestamp).toLocaleString();
    item.iconPath = new vscode.ThemeIcon('comment-discussion');
    item.tooltip = element.messages.map((m) => `${m.role}: ${m.content}`).join('\n\n');
    return item;
  }

  getChildren(): HistoryEntry[] {
    return this.history.getAll();
  }
}
