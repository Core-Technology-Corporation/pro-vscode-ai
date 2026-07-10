import * as vscode from 'vscode';
import type { ToolResult } from '../types';

function assertInsideWorkspace(uri: vscode.Uri): void {
  const folder = vscode.workspace.getWorkspaceFolder(uri);
  if (!folder) {
    throw new Error(`El archivo ${uri.fsPath} está fuera del workspace abierto.`);
  }
}

export async function readWorkspaceFile(uri: vscode.Uri): Promise<ToolResult<string>> {
  try {
    assertInsideWorkspace(uri);
    const bytes = await vscode.workspace.fs.readFile(uri);
    return { ok: true, data: Buffer.from(bytes).toString('utf-8') };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function writeWorkspaceFile(uri: vscode.Uri, content: string): Promise<ToolResult<void>> {
  try {
    assertInsideWorkspace(uri);
    await vscode.workspace.fs.writeFile(uri, Buffer.from(content, 'utf-8'));
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function listWorkspaceFiles(globPattern: string, maxResults = 200): Promise<vscode.Uri[]> {
  return vscode.workspace.findFiles(globPattern, '**/node_modules/**', maxResults);
}
