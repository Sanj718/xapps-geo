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
exports.stopCronJobs = exports.cronJobs = exports.runCleaner = void 0;
var node_cron_1 = require("node-cron");
var pg_1 = require("pg");
var pg_cursor_1 = require("pg-cursor");
var fs_1 = require("fs");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var _helpers_server_1 = require("./components/_helpers.server");
dotenv_1["default"].config({ path: "../.env" });
var Pool = pg_1["default"].Pool;
var connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error("DATABASE_URL environment variable is required");
    process.exit(1);
}
var pool = new Pool({ connectionString: connectionString });
pool.on("error", function (err) {
    console.error("Database pool error:", err.message);
    console.error("Error stack:", err.stack);
});
function runCleaner() {
    return __awaiter(this, void 0, void 0, function () {
        var DAYS, currentTime, cutoffTime, pool_client_1, sql, cursor_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    DAYS = 20;
                    currentTime = Date.now();
                    cutoffTime = currentTime - (DAYS * 24 * 60 * 60 * 1000);
                    console.log("\uD83E\uDDF9 Starting analytics cleanup with " + DAYS + "-day retention");
                    console.log("\uD83D\uDCC5 Current time: " + new Date(currentTime).toISOString());
                    console.log("\uD83D\uDCC5 Cutoff time: " + new Date(cutoffTime).toISOString());
                    console.log("\u23F0 Cutoff timestamp: " + cutoffTime);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.connect()];
                case 2:
                    pool_client_1 = _a.sent();
                    try {
                        sql = "SELECT * FROM analytics;";
                        cursor_1 = pool_client_1.query(new pg_cursor_1["default"](sql));
                        cursor_1.read(100, function (err, rows) {
                            if (err) {
                                console.error("Cursor read error:", err);
                                return;
                            }
                            rows === null || rows === void 0 ? void 0 : rows.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
                                var shop, data_button, data_auto, data_markets_button, data_markets_auto, updatedDataButton, updatedDataAuto, updatedDataMarketsButton, updatedDataMarketsAuto, parsedDataButton, index, current, parsedDataAuto, index, current, parsedDataButton, index, current, parsedDataAuto, index, current, updateSql, _a, rows_1, rowCount, rowError_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 2, , 3]);
                                            shop = row.shop, data_button = row.data_button, data_auto = row.data_auto, data_markets_button = row.data_markets_button, data_markets_auto = row.data_markets_auto;
                                            console.log("SHOP: ", shop);
                                            updatedDataButton = data_button ? data_button.split(",") : [];
                                            updatedDataAuto = data_auto ? data_auto.split(",") : [];
                                            updatedDataMarketsButton = data_markets_button ? data_markets_button.split(",") : [];
                                            updatedDataMarketsAuto = data_markets_auto ? data_markets_auto.split(",") : [];
                                            // Process data_button - keep only events within 20 days from today
                                            if (shop && data_button) {
                                                parsedDataButton = data_button.split(",").map(Number).sort(function (a, b) { return a - b; });
                                                if (parsedDataButton.length) {
                                                    updatedDataButton = [];
                                                    for (index = 0; index < parsedDataButton.length; index++) {
                                                        current = parsedDataButton[index];
                                                        // Check if this timestamp is within 20 days from today
                                                        if (current >= cutoffTime) {
                                                            updatedDataButton.push(current.toString());
                                                        }
                                                    }
                                                }
                                            }
                                            // Process data_auto - keep only events within 20 days from today
                                            if (shop && data_auto) {
                                                parsedDataAuto = data_auto.split(",").map(Number).sort(function (a, b) { return a - b; });
                                                if (parsedDataAuto.length) {
                                                    updatedDataAuto = [];
                                                    for (index = 0; index < parsedDataAuto.length; index++) {
                                                        current = parsedDataAuto[index];
                                                        // Check if this timestamp is within 20 days from today
                                                        if (current >= cutoffTime) {
                                                            updatedDataAuto.push(current.toString());
                                                        }
                                                    }
                                                }
                                            }
                                            // Process data_markets_button - keep only events within 20 days from today
                                            if (shop && data_markets_button) {
                                                parsedDataButton = data_markets_button
                                                    .split(",")
                                                    .map(Number)
                                                    .sort(function (a, b) { return a - b; });
                                                if (parsedDataButton.length) {
                                                    updatedDataMarketsButton = [];
                                                    for (index = 0; index < parsedDataButton.length; index++) {
                                                        current = parsedDataButton[index];
                                                        // Check if this timestamp is within 20 days from today
                                                        if (current >= cutoffTime) {
                                                            updatedDataMarketsButton.push(current.toString());
                                                        }
                                                    }
                                                }
                                            }
                                            // Process data_markets_auto - keep only events within 20 days from today
                                            if (shop && data_markets_auto) {
                                                parsedDataAuto = data_markets_auto
                                                    .split(",")
                                                    .map(Number)
                                                    .sort(function (a, b) { return a - b; });
                                                if (parsedDataAuto.length) {
                                                    updatedDataMarketsAuto = [];
                                                    for (index = 0; index < parsedDataAuto.length; index++) {
                                                        current = parsedDataAuto[index];
                                                        // Check if this timestamp is within 20 days from today
                                                        if (current >= cutoffTime) {
                                                            updatedDataMarketsAuto.push(current.toString());
                                                        }
                                                    }
                                                }
                                            }
                                            updateSql = "UPDATE analytics SET  data_button='" + updatedDataButton.join(",") + "', data_auto='" + updatedDataAuto.join(",") + "', data_markets_auto='" + updatedDataMarketsAuto.join(",") + "', data_markets_button='" + updatedDataMarketsButton.join(",") + "' WHERE shop='" + shop + "'";
                                            return [4 /*yield*/, pool.query(updateSql)];
                                        case 1:
                                            _a = _b.sent(), rows_1 = _a.rows, rowCount = _a.rowCount;
                                            return [3 /*break*/, 3];
                                        case 2:
                                            rowError_1 = _b.sent();
                                            console.error("Error processing row:", rowError_1, { shop: row.shop });
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                            cursor_1.close(function () {
                                pool_client_1.release();
                            });
                        });
                    }
                    catch (cursorError) {
                        pool_client_1.release();
                        throw cursorError;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error in runCleaner:", error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.runCleaner = runCleaner;
function saveAnalyticsToDatabase() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var rootPath, analyticsFolderPath, subfolders, errors, success, _i, subfolders_1, storeName, storeFolderPath, buttonFilePath, autoFilePath, marketsButtonFilePath, marketsAutoFilePath, buttonFileClonePath, data, response, error_2, autoFileClonePath, data, response, error_3, marketsFileClonePath, data, response, error_4, marketsFileClonePath, data, response, error_5, storeError_1, emailError_1, error_6;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 28, , 29]);
                    rootPath = process.cwd();
                    analyticsFolderPath = path_1["default"].join(rootPath, "analytics");
                    // Check if analytics folder exists
                    if (!fs_1["default"].existsSync(analyticsFolderPath)) {
                        fs_1["default"].mkdirSync(analyticsFolderPath);
                    }
                    subfolders = fs_1["default"]
                        .readdirSync(analyticsFolderPath, { withFileTypes: true })
                        .filter(function (dirent) { return dirent.isDirectory(); })
                        .map(function (dirent) { return dirent.name; });
                    errors = [];
                    success = [];
                    _i = 0, subfolders_1 = subfolders;
                    _e.label = 1;
                case 1:
                    if (!(_i < subfolders_1.length)) return [3 /*break*/, 21];
                    storeName = subfolders_1[_i];
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 19, , 20]);
                    storeFolderPath = path_1["default"].join(analyticsFolderPath, storeName);
                    buttonFilePath = path_1["default"].join(storeFolderPath, "button.json");
                    autoFilePath = path_1["default"].join(storeFolderPath, "auto.json");
                    marketsButtonFilePath = path_1["default"].join(storeFolderPath, "markets_button.json");
                    marketsAutoFilePath = path_1["default"].join(storeFolderPath, "markets_auto.json");
                    if (!fs_1["default"].existsSync(buttonFilePath)) return [3 /*break*/, 6];
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 5, , 6]);
                    buttonFileClonePath = path_1["default"].join(storeFolderPath, "button-cloned.json");
                    fs_1["default"].renameSync(buttonFilePath, buttonFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(buttonFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "button", data)];
                case 4:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_a = response[0]) === null || _a === void 0 ? void 0 : _a.shop) === storeName) {
                        fs_1["default"].unlinkSync(buttonFileClonePath);
                        success.push({ type: "button", store: storeName });
                    }
                    else {
                        console.error("Error removing Button analytics file");
                        errors.push({ type: "button", store: storeName });
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _e.sent();
                    console.error("Analytics button error:", error_2);
                    errors.push({ type: "button", store: storeName, error: error_2.message });
                    return [3 /*break*/, 6];
                case 6:
                    if (!fs_1["default"].existsSync(autoFilePath)) return [3 /*break*/, 10];
                    _e.label = 7;
                case 7:
                    _e.trys.push([7, 9, , 10]);
                    autoFileClonePath = path_1["default"].join(storeFolderPath, "auto-cloned.json");
                    fs_1["default"].renameSync(autoFilePath, autoFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(autoFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "auto", data)];
                case 8:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_b = response[0]) === null || _b === void 0 ? void 0 : _b.shop) === storeName) {
                        fs_1["default"].unlinkSync(autoFileClonePath);
                        success.push({ type: "auto", store: storeName });
                    }
                    else {
                        console.error("Error removing Button analytics file");
                        errors.push({ type: "auto", store: storeName });
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_3 = _e.sent();
                    console.error("Analytics auto error:", error_3);
                    errors.push({ type: "auto", store: storeName, error: error_3.message });
                    return [3 /*break*/, 10];
                case 10:
                    if (!fs_1["default"].existsSync(marketsButtonFilePath)) return [3 /*break*/, 14];
                    _e.label = 11;
                case 11:
                    _e.trys.push([11, 13, , 14]);
                    marketsFileClonePath = path_1["default"].join(storeFolderPath, "markets_button-cloned.json");
                    fs_1["default"].renameSync(marketsButtonFilePath, marketsFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(marketsFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "markets_button", data)];
                case 12:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_c = response[0]) === null || _c === void 0 ? void 0 : _c.shop) === storeName) {
                        fs_1["default"].unlinkSync(marketsFileClonePath);
                        success.push({ type: "markets_button", store: storeName });
                    }
                    else {
                        console.error("Error removing Markets button analytics file");
                        errors.push({ type: "markets_button", store: storeName });
                    }
                    return [3 /*break*/, 14];
                case 13:
                    error_4 = _e.sent();
                    console.error("Analytics markets error:", error_4);
                    errors.push({ type: "markets_button", store: storeName, error: error_4.message });
                    return [3 /*break*/, 14];
                case 14:
                    if (!fs_1["default"].existsSync(marketsAutoFilePath)) return [3 /*break*/, 18];
                    _e.label = 15;
                case 15:
                    _e.trys.push([15, 17, , 18]);
                    marketsFileClonePath = path_1["default"].join(storeFolderPath, "markets_auto-cloned.json");
                    fs_1["default"].renameSync(marketsAutoFilePath, marketsFileClonePath);
                    data = JSON.parse(fs_1["default"].readFileSync(marketsFileClonePath, 'utf8'));
                    return [4 /*yield*/, analyticsTracker(storeName, "markets_auto", data)];
                case 16:
                    response = _e.sent();
                    if (response && (response === null || response === void 0 ? void 0 : response.length) && ((_d = response[0]) === null || _d === void 0 ? void 0 : _d.shop) === storeName) {
                        fs_1["default"].unlinkSync(marketsFileClonePath);
                        success.push({ type: "markets_auto", store: storeName });
                    }
                    else {
                        console.error("Error removing Markets auto analytics file");
                        errors.push({ type: "markets_auto", store: storeName });
                    }
                    return [3 /*break*/, 18];
                case 17:
                    error_5 = _e.sent();
                    console.error("Analytics markets error:", error_5);
                    errors.push({ type: "markets_auto", store: storeName, error: error_5.message });
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 20];
                case 19:
                    storeError_1 = _e.sent();
                    console.error("Error processing store " + storeName + ":", storeError_1);
                    errors.push({ type: "store", store: storeName, error: storeError_1.message });
                    return [3 /*break*/, 20];
                case 20:
                    _i++;
                    return [3 /*break*/, 1];
                case 21:
                    if (!(errors === null || errors === void 0 ? void 0 : errors.length)) return [3 /*break*/, 26];
                    console.log("Analytics processing completed with errors:", { success: success, errors: errors });
                    _e.label = 22;
                case 22:
                    _e.trys.push([22, 24, , 25]);
                    return [4 /*yield*/, _helpers_server_1.sendExportToEmail("Analytics error", { success: success, errors: errors })];
                case 23:
                    _e.sent();
                    return [3 /*break*/, 25];
                case 24:
                    emailError_1 = _e.sent();
                    console.error("Failed to send error notification email:", emailError_1);
                    return [3 /*break*/, 25];
                case 25: return [3 /*break*/, 27];
                case 26:
                    console.log("Analytics processing completed successfully:", { success: success });
                    _e.label = 27;
                case 27: return [3 /*break*/, 29];
                case 28:
                    error_6 = _e.sent();
                    console.error("Error in saveAnalyticsToDatabase:", error_6);
                    throw error_6;
                case 29: return [2 /*return*/];
            }
        });
    });
}
// HELPERS
var analyticsTracker = function (shop, type, dateNow) { return __awaiter(void 0, void 0, void 0, function () {
    var dataType, sql, _a, rows, rowCount, error_7;
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
                error_7 = _b.sent();
                console.error("Analytics tracker error:", error_7, { shop: shop, type: type, dateNow: dateNow });
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
// saveAnalyticsToDatabase();
// Singleton pattern to prevent multiple cron job instances
var cronJobsInitialized = false;
var cronJobInstances = [];
// Enhanced cron job scheduler with error handling and singleton pattern
function cronJobs() {
    var _this = this;
    // Prevent multiple initializations
    if (cronJobsInitialized) {
        console.log("\u26A0\uFE0F Cron jobs already initialized (PID: " + process.pid + "), skipping...");
        return;
    }
    console.log("\uD83D\uDE80 Initializing cron jobs (PID: " + process.pid + ")...");
    console.log("\uD83D\uDCCA Process uptime: " + process.uptime() + "s");
    console.log("\uD83D\uDD27 Node version: " + process.version);
    // Weekly analytics cleaner - Sundays at midnight
    var weeklyCleaner = node_cron_1["default"].schedule("0 0 * * 0", function () { return __awaiter(_this, void 0, void 0, function () {
        var error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("\uD83D\uDD5B Running weekly analytics cleaner (PID: " + process.pid + ")...");
                    return [4 /*yield*/, runCleaner()];
                case 1:
                    _a.sent();
                    console.log("\u2705 Weekly analytics cleaner completed (PID: " + process.pid + ")");
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    console.error("\u274C Weekly analytics cleaner failed (PID: " + process.pid + "):", error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Analytics processor - every 30 minutes
    var analyticsProcessor = node_cron_1["default"].schedule("*/3 * * * *", function () { return __awaiter(_this, void 0, void 0, function () {
        var error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("\uD83D\uDD50 Running analytics processor (PID: " + process.pid + ")...");
                    return [4 /*yield*/, saveAnalyticsToDatabase()];
                case 1:
                    _a.sent();
                    console.log("\u2705 Analytics processor completed (PID: " + process.pid + ")");
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    console.error("\u274C Analytics processor failed (PID: " + process.pid + "):", error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Store references to stop them if needed
    cronJobInstances.push(weeklyCleaner, analyticsProcessor);
    // Mark as initialized
    cronJobsInitialized = true;
    console.log("\u2705 Cron jobs initialized successfully (PID: " + process.pid + ")");
    console.log("   - Weekly cleaner: Sundays at midnight");
    console.log("   - Analytics processor: Every 30 minutes");
    console.log("   - Total cron jobs: " + cronJobInstances.length);
}
exports.cronJobs = cronJobs;
// Function to stop all cron jobs (useful for testing or cleanup)
function stopCronJobs() {
    if (!cronJobsInitialized) {
        console.log("\u26A0\uFE0F No cron jobs to stop (PID: " + process.pid + ")");
        return;
    }
    console.log("\uD83D\uDED1 Stopping all cron jobs (PID: " + process.pid + ")...");
    cronJobInstances.forEach(function (job, index) {
        try {
            job.stop();
            console.log("   - Stopped cron job " + (index + 1));
        }
        catch (error) {
            console.error("   - Error stopping cron job " + (index + 1) + ":", error);
        }
    });
    cronJobInstances = [];
    cronJobsInitialized = false;
    console.log("\u2705 All cron jobs stopped (PID: " + process.pid + ")");
}
exports.stopCronJobs = stopCronJobs;
// Cleanup on process exit
process.on('SIGINT', function () {
    console.log("\uD83D\uDD04 Received SIGINT (PID: " + process.pid + "), cleaning up cron jobs...");
    stopCronJobs();
    process.exit(0);
});
process.on('SIGTERM', function () {
    console.log("\uD83D\uDD04 Received SIGTERM (PID: " + process.pid + "), cleaning up cron jobs...");
    stopCronJobs();
    process.exit(0);
});
// Debug: Log when this module is loaded
console.log("\uD83D\uDCE6 Analytics cleaner cron module loaded (PID: " + process.pid + ")");
