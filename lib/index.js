"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateXlsx = void 0;
var tslib_1 = require("tslib");
var getCommits_1 = require("./getCommits");
var utils_1 = require("./utils");
var getBranch_1 = require("./getBranch");
var genFile_1 = require("./genFile");
var getFileName_1 = require("./getFileName");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var generateXlsx = function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var email_1, exportPath, branchList_1, draftDate, branchCommitList, buffer, filename, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                email_1 = (0, utils_1.getEmail)(args);
                return [4 /*yield*/, (0, utils_1.genPath)(args)];
            case 1:
                exportPath = _a.sent();
                return [4 /*yield*/, (0, getBranch_1.getBranch)()];
            case 2:
                branchList_1 = _a.sent();
                if (!branchList_1)
                    return [2 /*return*/];
                return [4 /*yield*/, Promise.allSettled(branchList_1.map(function (o) { return (0, getCommits_1.getCommits)(o, email_1); }))];
            case 3:
                draftDate = _a.sent();
                branchCommitList = draftDate.map(function (o, idx) { return ({
                    branch: branchList_1[idx],
                    value: (o.status === "fulfilled" ? o.value : []).map(function (o) { return [
                        o.id,
                        o.name,
                        o.email,
                        o.date,
                        o.message,
                        o.endDate,
                    ]; }),
                }); });
                buffer = branchCommitList.map(function (o) { return ({
                    name: o.branch.replace("origin/", ""),
                    data: tslib_1.__spreadArray([genFile_1.ExcelHeader], o.value, true),
                    options: {},
                }); });
                return [4 /*yield*/, (0, getFileName_1.getFileName)()];
            case 4:
                filename = _a.sent();
                (0, genFile_1.genFile)(buffer, filename + (0, dayjs_1.default)().format("YYYY-MM-DD HH:mm:ss"), exportPath);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.generateXlsx = generateXlsx;
