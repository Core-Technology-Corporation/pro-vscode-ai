import * as assert from 'node:assert';
import * as vscode from 'vscode';

suite('Pro AI extension', () => {
  test('activates and registers its commands', async () => {
    const extension = vscode.extensions.getExtension('alvarosiles.pro-vscode-ai');
    assert.ok(extension, 'extension should be discoverable by id');

    await extension?.activate();

    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('proAi.openChat'));
    assert.ok(commands.includes('proAi.explain'));
    assert.ok(commands.includes('proAi.fix'));
  });
});
