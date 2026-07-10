import { spawnSync } from 'node:child_process';

function run(command: string, args: string[]): void {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('Building extension bundle (production)...');
run('npx', ['tsx', 'scripts/build.ts', '--production']);

console.log('Packaging .vsix with vsce...');
run('npx', ['vsce', 'package']);
