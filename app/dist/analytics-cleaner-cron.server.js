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
exports.cronJobs = void 0;
var node_cron_1 = require("node-cron");
var pg_1 = require("pg");
var pg_cursor_1 = require("pg-cursor");
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var path_2 = require("path");
var __filename = url_1.fileURLToPath(import.meta.url);
var __dirname = path_2.dirname(__filename);
var dotenv_1 = require("dotenv");
var _helpers_server_1 = require("./components/_helpers.server");
dotenv_1["default"].config({ path: "../.env" });
var Pool = pg_1["default"].Pool;
var connectionString = process.env.DATABASE_URL;
var pool = new Pool({ connectionString: connectionString });
pool.on("error", function (err) {
    console.log(err);
    // logger.info("idle client error", err.message, err.stack);
});
function runCleaner() {
    return __awaiter(this, void 0, void 0, function () {
        var DAYS, pool_client, sql, cursor;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    DAYS = 30;
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    pool_client = _a.sent();
                    sql = "SELECT * FROM analytics;";
                    cursor = pool_client.query(new pg_cursor_1["default"](sql));
                    cursor.read(100, function (err, rows) {
                        rows === null || rows === void 0 ? void 0 : rows.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
                            var shop, data_button, data_auto, data_markets_button, data_markets_auto, updatedDataButton, updatedDataAuto, updatedDataMarketsButton, updatedDataMarketsAuto, parsedDataButton, lastDate, index, current, diffTime, diffDays, parsedDataAuto, lastDate, index, current, diffTime, diffDays, parsedDataButton, lastDate, index, current, diffTime, diffDays, parsedDataButton, lastDate, index, current, diffTime, diffDays, updateSql, _a, rows, rowCount;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        shop = row.shop, data_button = row.data_button, data_auto = row.data_auto, data_markets_button = row.data_markets_button, data_markets_auto = row.data_markets_auto;
                                        console.log("SHOP: ", shop);
                                        updatedDataButton = data_button.split(",");
                                        updatedDataAuto = data_auto.split(",");
                                        updatedDataMarketsButton = data_markets_button.split(",");
                                        updatedDataMarketsAuto = data_markets_auto.split(",");
                                        if (shop && data_button) {
                                            parsedDataButton = data_button.split(",").sort(function (a, b) { return a - b; });
                                            lastDate = parsedDataButton[parsedDataButton.length - 1];
                                            if (parsedDataButton.length) {
                                                updatedDataButton = [];
                                                for (index = 0; index < parsedDataButton.length; index++) {
                                                    current = parsedDataButton[index];
                                                    diffTime = Math.abs(lastDate - current);
                                                    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                    if (diffDays <= DAYS) {
                                                        updatedDataButton.push(current);
                                                    }
                                                }
                                            }
                                        }
                                        if (shop && data_auto) {
                                            parsedDataAuto = data_auto.split(",").sort(function (a, b) { return a - b; });
                                            lastDate = parsedDataAuto[parsedDataAuto.length - 1];
                                            if (parsedDataAuto.length) {
                                                updatedDataAuto = [];
                                                for (index = 0; index < parsedDataAuto.length; index++) {
                                                    current = parsedDataAuto[index];
                                                    diffTime = Math.abs(lastDate - current);
                                                    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                    if (diffDays <= DAYS) {
                                                        updatedDataAuto.push(current);
                                                    }
                                                }
                                            }
                                        }
                                        if (shop && data_markets_button) {
                                            parsedDataButton = data_markets_button
                                                .split(",")
                                                .sort(function (a, b) { return a - b; });
                                            lastDate = parsedDataButton[parsedDataButton.length - 1];
                                            if (parsedDataButton.length) {
                                                updatedDataMarketsButton = [];
                                                for (index = 0; index < parsedDataButton.length; index++) {
                                                    current = parsedDataButton[index];
                                                    diffTime = Math.abs(lastDate - current);
                                                    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                    if (diffDays <= DAYS) {
                                                        updatedDataMarketsButton.push(current);
                                                    }
                                                }
                                            }
                                        }
                                        if (shop && data_markets_auto) {
                                            parsedDataButton = data_markets_auto
                                                .split(",")
                                                .sort(function (a, b) { return a - b; });
                                            lastDate = parsedDataButton[parsedDataButton.length - 1];
                                            if (parsedDataButton.length) {
                                                updatedDataMarketsAuto = [];
                                                for (index = 0; index < parsedDataButton.length; index++) {
                                                    current = parsedDataButton[index];
                                                    diffTime = Math.abs(lastDate - current);
                                                    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                    if (diffDays <= DAYS) {
                                                        updatedDataMarketsAuto.push(current);
                                                    }
                                                }
                                            }
                                        }
                                        updateSql = "UPDATE analytics SET  data_button='" + updatedDataButton.join(",") + "', data_auto='" + updatedDataAuto.join(",") + "', data_markets_auto='" + updatedDataMarketsAuto.join(",") + "', data_markets_button='" + updatedDataMarketsButton.join(",") + "' WHERE shop='" + shop + "'";
                                        return [4 /*yield*/, pool.query(updateSql)];
                                    case 1:
                                        _a = _b.sent(), rows = _a.rows, rowCount = _a.rowCount;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        cursor.close(function () {
                            pool_client.release();
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function saveAnalyticsToDatabase() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var analyticsFolderPath, subfolders, errors, success, _i, subfolders_1, storeName, storeFolderPath, buttonFilePath, autoFilePath, marketsButtonFilePath, marketsAutoFilePath, buttonFileClonePath, data, response, error_1, autoFileClonePath, data, response, error_2, marketsFileClonePath, data, response, error_3, marketsFileClonePath, data, response, error_4;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    analyticsFolderPath = __dirname + "/analytics";
                    // Check if analytics folder exists
                    if (!fs_1["default"].existsSync(analyticsFolderPath))
                        throw new Error("Folder not found: " + analyticsFolderPath);
                    subfolders = fs_1["default"]
                        .readdirSync(analyticsFolderPath, { withFileTypes: true })
                        .filter(function (dirent) { return dirent.isDirectory(); })
                        .map(function (dirent) { return dirent.name; });
                    errors = [];
                    success = [];
                    _i = 0, subfolders_1 = subfolders;
                    _e.label = 1;
                case 1:
                    if (!(_i < subfolders_1.length)) return [3 /*break*/, 18];
                    storeName = subfolders_1[_i];
                    storeFolderPath = path_1["default"].join(analyticsFolderPath, storeName);
                    buttonFilePath = path_1["default"].join(storeFolderPath, "button.json");
                    autoFilePath = path_1["default"].join(storeFolderPath, "auto.json");
                    marketsButtonFilePath = path_1["default"].join(storeFolderPath, "markets_button.json");
                    marketsAutoFilePath = path_1["default"].join(storeFolderPath, "markets_auto.json");
                    if (!fs_1["default"].existsSync(buttonFilePath)) return [3 /*break*/, 5];
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 4, , 5]);
                    buttonFileClonePath = path_1["default"].join(storeFolderPath, "button-cloned.json");
                    fs_1["default"].renameSync(buttonFilePath, buttonFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(buttonFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "button", data)];
                case 3:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_a = response[0]) === null || _a === void 0 ? void 0 : _a.shop) === storeName) {
                        fs_1["default"].unlinkSync(buttonFileClonePath);
                        success.push({ type: "button", store: storeName });
                    }
                    else {
                        console.error("Error removing Button analytics file");
                        errors.push({ type: "button", store: storeName });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _e.sent();
                    console.error("Analytics button error");
                    return [3 /*break*/, 5];
                case 5:
                    if (!fs_1["default"].existsSync(autoFilePath)) return [3 /*break*/, 9];
                    _e.label = 6;
                case 6:
                    _e.trys.push([6, 8, , 9]);
                    autoFileClonePath = path_1["default"].join(storeFolderPath, "auto-cloned.json");
                    fs_1["default"].renameSync(autoFilePath, autoFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(autoFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "auto", data)];
                case 7:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_b = response[0]) === null || _b === void 0 ? void 0 : _b.shop) === storeName) {
                        fs_1["default"].unlinkSync(autoFileClonePath);
                        success.push({ type: "auto", store: storeName });
                    }
                    else {
                        console.error("Error removing Button analytics file");
                        errors.push({ type: "auto", store: storeName });
                    }
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _e.sent();
                    console.error("Analytics auto error");
                    return [3 /*break*/, 9];
                case 9:
                    if (!fs_1["default"].existsSync(marketsButtonFilePath)) return [3 /*break*/, 13];
                    _e.label = 10;
                case 10:
                    _e.trys.push([10, 12, , 13]);
                    marketsFileClonePath = path_1["default"].join(storeFolderPath, "markets_button-cloned.json");
                    fs_1["default"].renameSync(marketsButtonFilePath, marketsFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(marketsFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "markets_button", data)];
                case 11:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_c = response[0]) === null || _c === void 0 ? void 0 : _c.shop) === storeName) {
                        fs_1["default"].unlinkSync(marketsFileClonePath);
                        success.push({ type: "markets_button", store: storeName });
                    }
                    else {
                        console.error("Error removing Markets button analytics file");
                        errors.push({ type: "markets_button", store: storeName });
                    }
                    return [3 /*break*/, 13];
                case 12:
                    error_3 = _e.sent();
                    console.error("Analytics markets error");
                    return [3 /*break*/, 13];
                case 13:
                    if (!fs_1["default"].existsSync(marketsAutoFilePath)) return [3 /*break*/, 17];
                    _e.label = 14;
                case 14:
                    _e.trys.push([14, 16, , 17]);
                    marketsFileClonePath = path_1["default"].join(storeFolderPath, "markets_auto-cloned.json");
                    fs_1["default"].renameSync(marketsAutoFilePath, marketsFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(marketsFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "markets_auto", data)];
                case 15:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_d = response[0]) === null || _d === void 0 ? void 0 : _d.shop) === storeName) {
                        fs_1["default"].unlinkSync(marketsFileClonePath);
                        success.push({ type: "markets_auto", store: storeName });
                    }
                    else {
                        console.error("Error removing Markets auto analytics file");
                        errors.push({ type: "markets_auto", store: storeName });
                    }
                    return [3 /*break*/, 17];
                case 16:
                    error_4 = _e.sent();
                    console.error("Analytics markets error");
                    return [3 /*break*/, 17];
                case 17:
                    _i++;
                    return [3 /*break*/, 1];
                case 18:
                    if (errors === null || errors === void 0 ? void 0 : errors.length) {
                        _helpers_server_1.sendExportToEmail("Analytics error", { success: success, errors: errors });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// HELPERS
var analyticsTracker = function (shop, type, dateNow) { return __awaiter(void 0, void 0, void 0, function () {
    var dataType, sql, _a, rows, rowCount, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dataType = "";
                if (type === "button") {
                    dataType =
                        "data_auto = analytics.data_auto, data_markets_button = analytics.data_markets_button, data_markets_auto = analytics.data_markets_auto, data_button = analytics.data_button";
                }
                else if (type === "auto") {
                    dataType =
                        "data_markets_button = analytics.data_markets_button, data_markets_auto = analytics.data_markets_auto, data_button = analytics.data_button, data_auto = analytics.data_auto";
                }
                else if (type === "markets_button") {
                    dataType =
                        "data_button = analytics.data_button, data_auto = analytics.data_auto, data_markets_auto = analytics.data_markets_auto, data_markets_button = analytics.data_markets_button";
                }
                else if (type === "markets_auto") {
                    dataType =
                        "data_button = analytics.data_button, data_auto = analytics.data_auto, data_markets_button = analytics.data_markets_button, data_markets_auto = analytics.data_markets_auto";
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                sql = "INSERT INTO analytics(shop, data_button, data_markets_auto, data_markets_button, data_auto)\n    VALUES ('" + shop + "', '" + dateNow + "', '" + dateNow + "', '" + dateNow + "', '" + dateNow + "') \n    ON CONFLICT (shop) \n    DO \n      UPDATE SET " + dataType + " || ',' || '" + dateNow + "' RETURNING shop;";
                return [4 /*yield*/, pool.query(sql)];
            case 2:
                _a = _b.sent(), rows = _a.rows, rowCount = _a.rowCount;
                // console.log(rows);
                return [2 /*return*/, rowCount ? rows : null];
            case 3:
                error_5 = _b.sent();
                console.error(error_5);
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
// saveAnalyticsToDatabase();
function cronJobs() {
    node_cron_1["default"].schedule("0 0 * * 0", function () {
        runCleaner();
    });
    // "0 * * * *"
    // */30 * * * *
    // */5 * * * *
    // * * * * *
    node_cron_1["default"].schedule("*/30 * * * *", function () {
        saveAnalyticsToDatabase();
    });
}
exports.cronJobs = cronJobs;
