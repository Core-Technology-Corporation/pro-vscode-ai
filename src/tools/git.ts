import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { ToolResult } from '../types';

const execFileAsync = promisify(execFile);

async function runGit(cwd: string, args: string[]): Promise<ToolResult<string>> {
  try {
    const { stdout } = await execFileAsync('git', args, { cwd, maxBuffer: 10 * 1024 * 1024 });
    return { ok: true, data: stdout.trim() };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export function getStagedDiff(cwd: string): Promise<ToolResult<string>> {
  return runGit(cwd, ['diff', '--staged']);
}

export function getWorkingDiff(cwd: string): Promise<ToolResult<string>> {
  return runGit(cwd, ['diff']);
}

export function getStatus(cwd: string): Promise<ToolResult<string>> {
  return runGit(cwd, ['status', '--porcelain']);
}

export function commit(cwd: string, message: string): Promise<ToolResult<string>> {
  return runGit(cwd, ['commit', '-m', message]);
}
