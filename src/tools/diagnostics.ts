import * as vscode from 'vscode';

const SEVERITY_LABEL: Record<vscode.DiagnosticSeverity, string> = {
  [vscode.DiagnosticSeverity.Error]: 'Error',
  [vscode.DiagnosticSeverity.Warning]: 'Warning',
  [vscode.DiagnosticSeverity.Information]: 'Info',
  [vscode.DiagnosticSeverity.Hint]: 'Hint'
};

export function formatDiagnostics(uri: vscode.Uri, range?: vscode.Range): string {
  const diagnostics = vscode.languages.getDiagnostics(uri);
  const relevant = range ? diagnostics.filter((d) => d.range.intersection(range)) : diagnostics;
  if (relevant.length === 0) {
    return '';
  }
  return relevant
    .map((d) => `${SEVERITY_LABEL[d.severity]} (line ${d.range.start.line + 1}): ${d.message}`)
    .join('\n');
}
