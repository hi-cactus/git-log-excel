"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genFile = exports.ExcelHeader = void 0;
var tslib_1 = require("tslib");
var node_xlsx_1 = tslib_1.__importDefault(require("node-xlsx"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
exports.ExcelHeader = [
    "Commit ID",
    "Author name",
    "Author email",
    "Submit date",
    "Submit information",
    "Out of 18:30",
];
var genFile = function (sheets, filename, genPath) {
    if (genPath === void 0) { genPath = ""; }
    var buffer = node_xlsx_1.default.build(sheets, {
        sheetOptions: {},
    });
    fs_1.default.writeFile(path_1.default.resolve(genPath || "", "".concat(filename, ".xlsx")), buffer, function (err) {
        if (err) {
            console.log("generate .xlsx failed \n", err);
            return;
        }
        console.log("generate successfully \n");
        console.log("commit log excel path: \n");
        console.log(path_1.default.resolve(genPath || "", "".concat(filename, ".xlsx")));
    });
};
exports.genFile = genFile;
