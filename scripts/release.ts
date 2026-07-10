import { spawnSync } from 'node:child_process';

type Bump = 'patch' | 'minor' | 'major';

function run(command: string, args: string[]): void {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const bump = (process.argv[2] as Bump | undefined) ?? 'patch';
const shouldPublish = process.argv.includes('--publish');

if (!['patch', 'minor', 'major'].includes(bump)) {
  console.error(`Uso: tsx scripts/release.ts <patch|minor|major> [--publish]`);
  process.exit(1);
}

console.log(`Remember to update CHANGELOG.md before releasing.`);
console.log(`Bumping version (${bump})...`);
run('npm', ['version', bump, '--no-git-tag-version']);

console.log('Building production bundle...');
run('npx', ['tsx', 'scripts/build.ts', '--production']);

if (shouldPublish) {
  console.log('Publishing to the VS Code Marketplace via vsce...');
  run('npx', ['vsce', 'publish']);
} else {
  console.log('Skipping publish (pass --publish to run "vsce publish").');
  run('npx', ['vsce', 'package']);
}
