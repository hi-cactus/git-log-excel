"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommits = void 0;
var tslib_1 = require("tslib");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var duration_1 = tslib_1.__importDefault(require("dayjs/plugin/duration"));
var node_util_1 = tslib_1.__importDefault(require("node:util"));
var node_child_process_1 = tslib_1.__importDefault(require("node:child_process"));
var exec = node_util_1.default.promisify(node_child_process_1.default.exec);
dayjs_1.default.extend(duration_1.default);
var getCommits = function (branch, email) {
    if (branch === void 0) { branch = ""; }
    if (email === void 0) { email = ""; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, stdout, stderr, commits, error_1;
        var _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exec("git log ".concat(branch))];
                case 1:
                    _a = _d.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    if (stderr) {
                        console.log(stderr);
                        return [2 /*return*/, []];
                    }
                    commits = (_c = (_b = stdout === null || stdout === void 0 ? void 0 : stdout.split(/(?=(commit [A-Za-z0-9]{40}))/g)) === null || _b === void 0 ? void 0 : _b.map(function (o) { return o.trim(); })) === null || _c === void 0 ? void 0 : _c.filter(function (o) { return !!o; }).map(function (o) {
                        return o
                            .split("\n")
                            .map(function (o) { return o.trim(); })
                            .filter(function (o) { return !!o; });
                    });
                    return [2 /*return*/, commits === null || commits === void 0 ? void 0 : commits.reduce(function (c, n) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                            if (n.length < 2)
                                return c;
                            var id = n[0], author = n[1], date = n[2], msgs = n.slice(3);
                            // ignore merge log
                            if (author.includes("Merge:"))
                                return c;
                            var draftDate = (_b = (_a = date === null || date === void 0 ? void 0 : date.replace("Date: ", "")) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
                            var formatDate = (0, dayjs_1.default)(draftDate);
                            var end = -1;
                            var a = (function () {
                                return 1;
                            })();
                            if (draftDate) {
                                var startDate = (0, dayjs_1.default)("".concat(formatDate.year(), "-").concat(formatDate.month() + 1, "-").concat(formatDate.date(), " 18:30:00"));
                                end = dayjs_1.default.duration(formatDate.diff(startDate)).as("hours");
                            }
                            return tslib_1.__spreadArray(tslib_1.__spreadArray([], c, true), [
                                {
                                    id: id.replace("commit ", ""),
                                    name: (_e = (_d = (_c = author === null || author === void 0 ? void 0 : author.split(" <")) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.replace("Author: ", "")) !== null && _e !== void 0 ? _e : "",
                                    email: (_h = (_g = (_f = author === null || author === void 0 ? void 0 : author.split(" <")) === null || _f === void 0 ? void 0 : _f[1]) === null || _g === void 0 ? void 0 : _g.replace(">", "")) !== null && _h !== void 0 ? _h : "",
                                    message: msgs === null || msgs === void 0 ? void 0 : msgs.join(),
                                    date: draftDate && formatDate.format("YYYY-MM-DD HH:mm:ss"),
                                    endDate: end < 0 ? "" : (_j = end === null || end === void 0 ? void 0 : end.toFixed(2)) !== null && _j !== void 0 ? _j : "",
                                },
                            ], false);
                        }, []).filter(function (o) { return (email ? o.email === email : true); })];
                case 2:
                    error_1 = _d.sent();
                    console.log(error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getCommits = getCommits;
