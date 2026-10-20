"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHistoryCommand = clearHistoryCommand;
const notify_1 = require("../ui/notifications/notify");
function clearHistoryCommand(app) {
    return async () => {
        await app.history.clear();
        (0, notify_1.info)('Historial de chat borrado.');
    };
}
//# sourceMappingURL=clearHistory.js.map