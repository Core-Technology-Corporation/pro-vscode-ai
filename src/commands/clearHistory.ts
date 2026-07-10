import type { AppContext } from '../types';
import { info } from '../ui/notifications/notify';

export function clearHistoryCommand(app: AppContext) {
  return async (): Promise<void> => {
    await app.history.clear();
    info('Historial de chat borrado.');
  };
}
