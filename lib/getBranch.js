"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranch = void 0;
var tslib_1 = require("tslib");
var node_util_1 = tslib_1.__importDefault(require("node:util"));
var node_child_process_1 = tslib_1.__importDefault(require("node:child_process"));
var exec = node_util_1.default.promisify(node_child_process_1.default.exec);
var getBranch = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, stderr, stdout, list, error_1;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exec("git branch -r")];
            case 1:
                _a = _b.sent(), stderr = _a.stderr, stdout = _a.stdout;
                if (stderr) {
                    console.log(stderr);
                    return [2 /*return*/];
                }
                list = stdout
                    .split("\n")
                    .map(function (o) { return o.trim().replace("origin/HEAD -> ", ""); })
                    .filter(function (o) { return !!o; });
                return [2 /*return*/, Array.from(new Set(list))];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBranch = getBranch;
