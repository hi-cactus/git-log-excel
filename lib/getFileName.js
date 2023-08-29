"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var node_util_1 = tslib_1.__importDefault(require("node:util"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var readFile = node_util_1.default.promisify(fs_1.default.readFile);
var access = node_util_1.default.promisify(fs_1.default.access);
var getFileName = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var pkgPath, fok, error_1, dirname, data, pkg, error_2;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pkgPath = path_1.default.resolve("./package.json");
                fok = true;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, access(pkgPath, fs_1.default.constants.F_OK)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                if (error_1)
                    fok = false;
                return [3 /*break*/, 4];
            case 4:
                dirname = path_1.default.resolve().split("/").reverse()[0];
                if (!fok) return [3 /*break*/, 8];
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, readFile(pkgPath, "utf-8")];
            case 6:
                data = _b.sent();
                pkg = JSON.parse(data);
                return [2 /*return*/, (_a = pkg.name) !== null && _a !== void 0 ? _a : dirname];
            case 7:
                error_2 = _b.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/, dirname];
        }
    });
}); };
exports.getFileName = getFileName;
