import * as vscode from 'vscode';
import { COMMANDS } from '../../utils/constants';
import type { SettingsService } from '../../services/settings.service';

export class ModelStatusBar implements vscode.Disposable {
  private readonly item: vscode.StatusBarItem;

  constructor(private readonly settings: SettingsService) {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.item.command = COMMANDS.selectModel;
    this.refresh();
    this.item.show();
  }

  refresh(): void {
    this.item.text = `$(sparkle) ${this.settings.getProvider()}: ${this.settings.getModel()}`;
    this.item.tooltip = 'Click to change the Pro AI provider/model';
  }

  dispose(): void {
    this.item.dispose();
  }
}
