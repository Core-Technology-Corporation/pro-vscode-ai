import * as vscode from 'vscode';
import type { AppContext } from '../types';
import { DEFAULT_MODELS } from '../utils/constants';
import type { AIProviderId } from '../types';

const PROVIDERS: AIProviderId[] = ['anthropic', 'openai', 'google', 'ollama', 'lmstudio'];

export function selectModelCommand(app: AppContext) {
  return async (): Promise<void> => {
    const provider = (await vscode.window.showQuickPick(PROVIDERS, {
      title: 'Selecciona un proveedor de IA',
      placeHolder: app.settings.getProvider()
    })) as AIProviderId | undefined;
    if (!provider) {
      return;
    }
    await app.settings.setProvider(provider);

    const model = await vscode.window.showInputBox({
      title: 'Modelo',
      prompt: `Identificador del modelo para ${provider}`,
      value: DEFAULT_MODELS[provider]
    });
    if (model) {
      await app.settings.setModel(model);
    }

    if (provider === 'anthropic' || provider === 'openai' || provider === 'google') {
      const hasKey = await app.settings.getApiKey(provider);
      if (!hasKey) {
        const key = await vscode.window.showInputBox({
          title: `API key de ${provider}`,
          password: true,
          ignoreFocusOut: true
        });
        if (key) {
          await app.settings.setApiKey(provider, key);
        }
      }
    }
  };
}
