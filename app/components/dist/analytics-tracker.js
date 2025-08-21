"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getAnalyticsSummary = exports.readAnalyticsData = exports.createFolderAndSaveDate = void 0;
var promises_1 = require("fs/promises");
var path_1 = require("path");
function createFolderAndSaveDate(storeName, type) {
    return __awaiter(this, void 0, Promise, function () {
        var rootPath, analyticsFolderPath, folderPath, fileName, filePath, data, fileContents, parsedData, readError_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    rootPath = process.cwd();
                    analyticsFolderPath = path_1["default"].join(rootPath, "analytics");
                    folderPath = path_1["default"].join(analyticsFolderPath, storeName);
                    fileName = type + ".json";
                    filePath = path_1["default"].join(folderPath, fileName);
                    // Create directories if they don't exist
                    return [4 /*yield*/, promises_1["default"].mkdir(analyticsFolderPath, { recursive: true })];
                case 1:
                    // Create directories if they don't exist
                    _a.sent();
                    return [4 /*yield*/, promises_1["default"].mkdir(folderPath, { recursive: true })];
                case 2:
                    _a.sent();
                    data = [];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, promises_1["default"].readFile(filePath, "utf-8")];
                case 4:
                    fileContents = _a.sent();
                    parsedData = JSON.parse(fileContents);
                    // Validate that parsed data is an array of numbers
                    if (Array.isArray(parsedData) && parsedData.every(function (item) { return typeof item === 'number'; })) {
                        data = parsedData;
                    }
                    else {
                        console.warn("Invalid data format in " + filePath + ", initializing empty array");
                        data = [];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    readError_1 = _a.sent();
                    // File doesn't exist or is invalid, start with empty array
                    data = [];
                    return [3 /*break*/, 6];
                case 6:
                    // Add new timestamp
                    data.push(Date.now());
                    // Write data back to file
                    return [4 /*yield*/, promises_1["default"].writeFile(filePath, JSON.stringify(data, null, 2))];
                case 7:
                    // Write data back to file
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error("Failed to save analytics data for " + storeName + ":", error_1);
                    throw new Error("Analytics save failed: " + (error_1 instanceof Error ? error_1.message : 'Unknown error'));
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.createFolderAndSaveDate = createFolderAndSaveDate;
// Utility function to read analytics data
function readAnalyticsData(storeName, type) {
    return __awaiter(this, void 0, Promise, function () {
        var rootPath, analyticsFolderPath, folderPath, fileName, filePath, fileContents, parsedData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    rootPath = process.cwd();
                    analyticsFolderPath = path_1["default"].join(rootPath, "analytics");
                    folderPath = path_1["default"].join(analyticsFolderPath, storeName);
                    fileName = type + ".json";
                    filePath = path_1["default"].join(folderPath, fileName);
                    return [4 /*yield*/, promises_1["default"].readFile(filePath, "utf-8")];
                case 1:
                    fileContents = _a.sent();
                    parsedData = JSON.parse(fileContents);
                    if (Array.isArray(parsedData) && parsedData.every(function (item) { return typeof item === 'number'; })) {
                        return [2 /*return*/, parsedData];
                    }
                    else {
                        console.warn("Invalid data format in " + filePath);
                        return [2 /*return*/, []];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error && 'code' in error_2 && error_2.code === 'ENOENT') {
                        // File doesn't exist, return empty array
                        return [2 /*return*/, []];
                    }
                    console.error("Failed to read analytics data for " + storeName + ":", error_2);
                    throw new Error("Analytics read failed: " + (error_2 instanceof Error ? error_2.message : 'Unknown error'));
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.readAnalyticsData = readAnalyticsData;
// Utility function to get analytics summary
function getAnalyticsSummary(storeName, type) {
    return __awaiter(this, void 0, Promise, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readAnalyticsData(storeName, type)];
                case 1:
                    data = _a.sent();
                    if (data.length === 0) {
                        return [2 /*return*/, { count: 0, latest: null, oldest: null }];
                    }
                    return [2 /*return*/, {
                            count: data.length,
                            latest: Math.max.apply(Math, data),
                            oldest: Math.min.apply(Math, data)
                        }];
            }
        });
    });
}
exports.getAnalyticsSummary = getAnalyticsSummary;
