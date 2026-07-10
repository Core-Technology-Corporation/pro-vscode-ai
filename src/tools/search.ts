import * as vscode from 'vscode';
import { listWorkspaceFiles } from './filesystem';

export interface SearchMatch {
  uri: vscode.Uri;
  line: number;
  text: string;
}

export async function searchWorkspace(
  query: string,
  globPattern = '**/*',
  maxResults = 50
): Promise<SearchMatch[]> {
  const files = await listWorkspaceFiles(globPattern, 500);
  const pattern = new RegExp(query, 'i');
  const matches: SearchMatch[] = [];

  for (const uri of files) {
    if (matches.length >= maxResults) {
      break;
    }
    let bytes: Uint8Array;
    try {
      bytes = await vscode.workspace.fs.readFile(uri);
    } catch {
      continue;
    }
    const lines = Buffer.from(bytes).toString('utf-8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i])) {
        matches.push({ uri, line: i + 1, text: lines[i].trim() });
        if (matches.length >= maxResults) {
          break;
        }
      }
    }
  }
  return matches;
}
