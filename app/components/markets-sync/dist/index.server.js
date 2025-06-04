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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MarketsProcess = void 0;
var fs_1 = require("fs");
var got_1 = require("got");
var node_stream_1 = require("node:stream");
var util_1 = require("util");
var path_1 = require("path");
var db_queries_server_1 = require("app/db-queries.server");
var _helpers_js_1 = require("../_helpers.js");
var admin_queries_server_js_1 = require("app/admin-queries.server.js");
var lineReader_server_1 = require("./lineReader.server");
var MarketsProcess = /** @class */ (function () {
    function MarketsProcess() {
        this.tempFolder = "marketsSync";
        this.lineReader = null;
        this.result = {};
    }
    MarketsProcess.prototype. = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (fs_1["default"].existsSync(fileName)) {
                        console.log("Removing old csv: ", fileName);
                        fs_1["default"].unlinkSync(fileName);
                    }
                }
                catch (err) {
                    console.error(err);
                }
                return [2 /*return*/];
            });
        });
    };
    MarketsProcess.prototype. = function (lineData) {
        return __awaiter(this, void 0, void 0, function () {
            var result, lineParsed, __typename;
            return __generator(this, function (_a) {
                result = this.result;
                lineParsed = _helpers_js_1.isJson(lineData) && JSON.parse(lineData);
                if (!lineParsed) {
                    this.lineReader.pause();
                    this.lineReader.resume();
                }
                __typename = lineParsed.__typename;
                result[__typename] = result[__typename]
                    ? __spreadArrays(result[__typename], [lineParsed]) : [lineParsed];
                return [2 /*return*/];
            });
        });
    };
    MarketsProcess.prototype.initSync = function (_a) {
        var admin = _a.admin, session = _a.session, bulkId = _a.bulkId;
        return __awaiter(this, void 0, void 0, function () {
            var bulkResponse, url, status, errorCode, fileName, pipeline, error_1, lineR, _self_1, error_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, admin_queries_server_js_1.getBulkOperation({ admin: admin, bulkId: bulkId })];
                    case 1:
                        bulkResponse = _b.sent();
                        url = bulkResponse.url, status = bulkResponse.status, errorCode = bulkResponse.errorCode;
                        // X-Shopify-API-Request-Failure-Reauthorize
                        if (errorCode === "ACCESS_DENIED") {
                            db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "REAUTH" });
                            return [2 /*return*/, {
                                    status: false,
                                    restart: false,
                                    reAuth: true
                                }];
                        }
                        if (!url) {
                            console.error("No URL provided in bulk response");
                            db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
                            return [2 /*return*/, {
                                    status: false,
                                    restart: true
                                }];
                        }
                        if (status === "RUNNING") {
                            db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "RUNNING" });
                            return [2 /*return*/, {
                                    status: false,
                                    restart: false
                                }];
                        }
                        if (status !== "COMPLETED") {
                            db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
                            return [2 /*return*/, {
                                    status: false,
                                    restart: true
                                }];
                        }
                        if (!fs_1["default"].existsSync("./" + this.tempFolder)) {
                            fs_1["default"].mkdirSync("./" + this.tempFolder);
                        }
                        db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "RUNNING" });
                        fileName = "/" + this.tempFolder + "/" + session.shop + ".jsonl";
                        pipeline = util_1.promisify(node_stream_1["default"].pipeline);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log('lineR0');
                        return [4 /*yield*/, pipeline(got_1["default"].stream(url), fs_1["default"].createWriteStream(path_1.resolve() + fileName))];
                    case 3:
                        _b.sent();
                        console.log('lineR1');
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error("Error downloading file:", error_1);
                        db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
                        return [2 /*return*/, {
                                status: false,
                                restart: true
                            }];
                    case 5: return [4 /*yield*/, this..call(this, fileName)];
                    case 6:
                        _b.sent();
                        lineR = new lineReader_server_1["default"](path_1.resolve() + fileName, {
                            skipEmptyLines: true
                        });
                        console.log('lineR');
                        this.lineReader = lineR;
                        _self_1 = this;
                        lineR.on("line", function (lineData) {
                            if (lineData) {
                                _self_1..call(_self_1, lineData);
                            }
                        });
                        lineR.on("error", function (err) {
                            console.log("err", err);
                            db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
                        });
                        lineR.on("end", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                // console.log("FINAL: ", _self.result);
                                try {
                                    if (!_self_1.result)
                                        throw new Error("[MARKETS SYNC] _self.result is empty or undefined");
                                    console.log("[MARKETS SYNC] Markets Saved");
                                    db_queries_server_1.addMarketsData({ shop: session.shop, markets: _self_1.result });
                                }
                                catch (error) {
                                    console.log(error);
                                    db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _b.sent();
                        console.log(error_2);
                        db_queries_server_1.updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return MarketsProcess;
}());
exports.MarketsProcess = MarketsProcess;
