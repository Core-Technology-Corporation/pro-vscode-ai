import * as vscode from 'vscode';

/** Shows read-only AI output (explanations, reviews) as an untitled Markdown document. */
export async function showMarkdownResult(title: string, markdown: string): Promise<void> {
  const doc = await vscode.workspace.openTextDocument({
    content: `# ${title}\n\n${markdown}`,
    language: 'markdown'
  });
  await vscode.window.showTextDocument(doc, { preview: true, viewColumn: vscode.ViewColumn.Beside });
}
