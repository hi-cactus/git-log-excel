"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPath = exports.getEmail = exports.isEmail = void 0;
var tslib_1 = require("tslib");
var node_util_1 = tslib_1.__importDefault(require("node:util"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var readFile = node_util_1.default.promisify(fs_1.default.readFile);
var access = node_util_1.default.promisify(fs_1.default.access);
var isEmail = function (email) {
    return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(email);
};
exports.isEmail = isEmail;
var getEmail = function (args) {
    if (args.email) {
        if (typeof args.email === "string" && (0, exports.isEmail)(args.email)) {
            console.log("commit author email " + args.email);
            return args.email;
        }
        else
            console.log("Please enter a valid e-mail! ---" + args.email, ". Email has ignored!");
    }
    return null;
};
exports.getEmail = getEmail;
var genPath = function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var fok, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!args.exportPath) return [3 /*break*/, 6];
                if (!(typeof args.exportPath === "string")) return [3 /*break*/, 5];
                fok = true;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, access(args.exportPath, fs_1.default.constants.F_OK)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (error_1)
                    fok = false;
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, fok ? args.exportPath : null];
            case 5:
                console.log("Please enter a valid path! " + ". Export Path has ignored!");
                _a.label = 6;
            case 6: return [2 /*return*/, null];
        }
    });
}); };
exports.genPath = genPath;
