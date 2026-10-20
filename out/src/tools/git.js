"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStagedDiff = getStagedDiff;
exports.getWorkingDiff = getWorkingDiff;
exports.getStatus = getStatus;
exports.commit = commit;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
async function runGit(cwd, args) {
    try {
        const { stdout } = await execFileAsync('git', args, { cwd, maxBuffer: 10 * 1024 * 1024 });
        return { ok: true, data: stdout.trim() };
    }
    catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
}
function getStagedDiff(cwd) {
    return runGit(cwd, ['diff', '--staged']);
}
function getWorkingDiff(cwd) {
    return runGit(cwd, ['diff']);
}
function getStatus(cwd) {
    return runGit(cwd, ['status', '--porcelain']);
}
function commit(cwd, message) {
    return runGit(cwd, ['commit', '-m', message]);
}
//# sourceMappingURL=git.js.map