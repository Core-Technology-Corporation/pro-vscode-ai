import * as vscode from 'vscode';

export type PromptName = 'explain' | 'review' | 'refactor' | 'generate' | 'tests';

export class PromptService {
  private readonly cache = new Map<PromptName, string>();

  constructor(private readonly extensionUri: vscode.Uri) {}

  async load(name: PromptName): Promise<string> {
    const cached = this.cache.get(name);
    if (cached) {
      return cached;
    }
    const uri = vscode.Uri.joinPath(this.extensionUri, 'src', 'prompts', `${name}.md`);
    const bytes = await vscode.workspace.fs.readFile(uri);
    const text = Buffer.from(bytes).toString('utf-8');
    this.cache.set(name, text);
    return text;
  }

  async render(name: PromptName, vars: Record<string, string>): Promise<string> {
    const template = await this.load(name);
    return template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => vars[key] ?? '');
  }
}
