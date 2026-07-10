import * as vscode from 'vscode';
import { OUTPUT_CHANNEL_NAME } from './constants';

class Logger {
  private channel: vscode.OutputChannel | undefined;

  private get out(): vscode.OutputChannel {
    if (!this.channel) {
      this.channel = vscode.window.createOutputChannel(OUTPUT_CHANNEL_NAME);
    }
    return this.channel;
  }

  private write(level: string, message: string, ...args: unknown[]): void {
    const line = `[${new Date().toISOString()}] [${level}] ${message}`;
    this.out.appendLine(args.length ? `${line} ${JSON.stringify(args)}` : line);
  }

  info(message: string, ...args: unknown[]): void {
    this.write('INFO', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.write('WARN', message, ...args);
  }

  error(message: string, error?: unknown): void {
    const details = error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : error;
    this.write('ERROR', message, details);
  }

  show(): void {
    this.out.show(true);
  }

  dispose(): void {
    this.channel?.dispose();
  }
}

export const logger = new Logger();
