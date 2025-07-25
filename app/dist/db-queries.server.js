"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getShopData = exports.changePlan = exports.updateMarketsRedirect = exports.updateMarketsWidget = exports.addMarketsData = exports.updateMarketSyncStatus = exports.getMarketConfigs = exports.getMarketsData = exports.getMarketSyncStatus = exports.createUpdateMarketConfigs = exports.createUpdateAllowedPages = exports.createUpdateConfigs = exports.getConfigs = exports.reorderRedirect = exports.deleteRedirect = exports.updateRedirectStatus = exports.updateRedirect = exports.getAllRedirects = exports.createRedirect = exports.getAnalyticsData = exports.removeShop = exports.disableShop = exports.getShopdb = exports.createInitialConfigs = exports.addActiveShop = void 0;
var _helpers_1 = require("./components/_helpers");
var db_server_1 = require("./db.server");
// App Plans
// Free  - 3
// Basic - 1
// Pro - 2
var FREE_PLAN_LIMIT = 1;
var BASIC_PLAN_LIMIT = 4;
function addActiveShop(_a) {
    var shop = _a.shop;
    return __awaiter(this, void 0, Promise, function () {
        var result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!shop)
                        throw new Error("shop undefined");
                    return [4 /*yield*/, db_server_1["default"].activeShops.upsert({
                            where: { shop: shop },
                            update: { status: 1 },
                            create: { shop: shop, status: 1 },
                            select: { createdDate: true }
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, { status: (result === null || result === void 0 ? void 0 : result.createdDate) ? true : false, data: result }];
                case 2:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [2 /*return*/, { status: false, error: error_1.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addActiveShop = addActiveShop;
exports.createInitialConfigs = function (_a) {
    var shop = _a.shop, basicConfigs = _a.basicConfigs, _b = _a.advancedConfigs, advancedConfigs = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _c.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].configs.upsert({
                            where: { shopId: activeShop.id },
                            update: {},
                            create: {
                                shopId: activeShop.id,
                                basicConfigs: basicConfigs,
                                advancedConfigs: advancedConfigs
                            }
                        })];
                case 2:
                    result = _c.sent();
                    return [2 /*return*/, { status: (result === null || result === void 0 ? void 0 : result.id) ? true : false, data: result }];
                case 3:
                    error_2 = _c.sent();
                    console.error(error_2);
                    return [2 /*return*/, { status: false, error: error_2.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
function getShopdb(_a) {
    var shop = _a.shop;
    return __awaiter(this, void 0, Promise, function () {
        var result, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!shop)
                        throw new Error("shop undefined");
                    return [4 /*yield*/, db_server_1["default"].activeShops.findFirst({
                            where: {
                                shop: shop
                            },
                            select: {
                                id: true,
                                shop: true,
                                plan: true,
                                shopifyPlanId: true,
                                dev: true,
                                veteran: true
                            }
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, { status: (result === null || result === void 0 ? void 0 : result.id) ? true : false, data: result }];
                case 2:
                    error_3 = _b.sent();
                    console.error(error_3);
                    return [2 /*return*/, { status: false, error: error_3.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getShopdb = getShopdb;
function disableShop(_a) {
    var shop = _a.shop;
    return __awaiter(this, void 0, Promise, function () {
        var result, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!shop)
                        throw new Error("shop undefined");
                    return [4 /*yield*/, db_server_1["default"].activeShops.update({
                            where: {
                                shop: shop
                            },
                            data: {
                                status: 0
                            }
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, { status: (result === null || result === void 0 ? void 0 : result.id) > 0, data: result }];
                case 2:
                    error_4 = _b.sent();
                    console.error(error_4);
                    return [2 /*return*/, { status: false, error: error_4.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.disableShop = disableShop;
function removeShop(_a) {
    var shop = _a.shop;
    return __awaiter(this, void 0, Promise, function () {
        var result, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!shop)
                        throw new Error("shop undefined");
                    return [4 /*yield*/, db_server_1["default"].activeShops["delete"]({
                            where: {
                                shop: shop
                            }
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, { status: (result === null || result === void 0 ? void 0 : result.id) ? true : false, data: result }];
                case 2:
                    error_5 = _b.sent();
                    console.error(error_5);
                    return [2 /*return*/, { status: false, error: error_5.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeShop = removeShop;
function getAnalyticsData(_a) {
    var shop = _a.shop;
    return __awaiter(this, void 0, Promise, function () {
        var analyticsData, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1["default"].analytics.findMany({
                            where: {
                                shop: shop
                            }
                        })];
                case 1:
                    analyticsData = _b.sent();
                    return [2 /*return*/, { status: (analyticsData === null || analyticsData === void 0 ? void 0 : analyticsData.length) > 0, data: analyticsData || [] }];
                case 2:
                    error_6 = _b.sent();
                    console.error(error_6);
                    return [2 /*return*/, { status: false, error: error_6.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAnalyticsData = getAnalyticsData;
function createRedirect(_a) {
    var shopId = _a.shopId, flag = _a.flag, label = _a.label, url = _a.url, _b = _a.order, order = _b === void 0 ? 1 : _b, _c = _a.conditional, conditional = _c === void 0 ? false : _c, conditionalLocation = _a.conditionalLocation, _d = _a.domainRedirection, domainRedirection = _d === void 0 ? false : _d, _e = _a.locales, locales = _e === void 0 ? {} : _e;
    return __awaiter(this, void 0, Promise, function () {
        var stringifyLocales, stringifyConditionalLocation, activeShop, redirectCount, plan, redirectLimit, dbResponse, error_7;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 4, , 5]);
                    stringifyLocales = locales && typeof locales === 'object' ? JSON.stringify(locales) : null;
                    stringifyConditionalLocation = conditionalLocation
                        ? JSON.stringify(conditionalLocation)
                        : null;
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { id: shopId },
                            select: { plan: true }
                        })];
                case 1:
                    activeShop = _f.sent();
                    if (!activeShop) {
                        throw new Error('Shop not found');
                    }
                    return [4 /*yield*/, db_server_1["default"].redirects.count({
                            where: { shopId: shopId }
                        })];
                case 2:
                    redirectCount = _f.sent();
                    plan = activeShop.plan;
                    redirectLimit = FREE_PLAN_LIMIT;
                    if (plan === 2) {
                        redirectLimit = 999;
                    }
                    else if (plan === 1) {
                        redirectLimit = BASIC_PLAN_LIMIT;
                    }
                    if (redirectCount >= redirectLimit) {
                        throw new Error("Plan limit");
                    }
                    return [4 /*yield*/, db_server_1["default"].redirects.create({
                            data: {
                                shopId: shopId,
                                flag: flag,
                                label: label,
                                url: url,
                                order: order,
                                conditional: conditional,
                                conditionalLocation: stringifyConditionalLocation,
                                domainRedirection: domainRedirection,
                                locales: stringifyLocales
                            },
                            select: { id: true }
                        })];
                case 3:
                    dbResponse = _f.sent();
                    return [2 /*return*/, { status: true, data: dbResponse }];
                case 4:
                    error_7 = _f.sent();
                    console.error(error_7);
                    return [2 /*return*/, { status: false, error: error_7.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createRedirect = createRedirect;
exports.getAllRedirects = function (_a) {
    var shop = _a.shop, localesAllowed = _a.localesAllowed;
    return __awaiter(void 0, void 0, Promise, function () {
        var selectFields, redirects, parsedRedirects, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    selectFields = {
                        id: true,
                        flag: true,
                        label: true,
                        url: true,
                        order: true,
                        conditional: true,
                        conditionalLocation: true,
                        domainRedirection: true,
                        status: true,
                        locales: true
                    };
                    return [4 /*yield*/, db_server_1["default"].redirects.findMany({
                            where: {
                                activeShop: {
                                    shop: shop
                                }
                            },
                            select: selectFields
                        })];
                case 1:
                    redirects = _b.sent();
                    parsedRedirects = redirects.map(function (redirect) { return (__assign(__assign({}, redirect), { locales: redirect.locales ? _helpers_1.jsonSafeParse(redirect.locales) : null, conditionalLocation: redirect.conditionalLocation
                            ? _helpers_1.jsonSafeParse(redirect.conditionalLocation)
                            : null })); });
                    return [2 /*return*/, { status: parsedRedirects.length > 0, data: parsedRedirects }];
                case 2:
                    error_8 = _b.sent();
                    console.error(error_8);
                    return [2 /*return*/, { status: false, error: error_8.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateRedirect = function (_a) {
    var id = _a.id, flag = _a.flag, label = _a.label, url = _a.url, locales = _a.locales, _b = _a.conditional, conditional = _b === void 0 ? false : _b, conditionalLocation = _a.conditionalLocation, _c = _a.domainRedirection, domainRedirection = _c === void 0 ? false : _c, _d = _a.status, status = _d === void 0 ? true : _d;
    return __awaiter(void 0, void 0, Promise, function () {
        var result, error_9;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1["default"].redirects.update({
                            where: { id: id },
                            data: {
                                flag: flag,
                                label: label,
                                url: url,
                                status: status,
                                locales: locales ? JSON.stringify(locales) : null,
                                conditional: conditional,
                                conditionalLocation: conditionalLocation ? JSON.stringify(conditionalLocation) : null,
                                domainRedirection: domainRedirection
                            },
                            select: { id: true }
                        })];
                case 1:
                    result = _e.sent();
                    return [2 /*return*/, { status: (result === null || result === void 0 ? void 0 : result.id) ? true : false, data: result }];
                case 2:
                    error_9 = _e.sent();
                    console.error(error_9);
                    return [2 /*return*/, { status: false, error: error_9.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateRedirectStatus = function (_a) {
    var id = _a.id, _b = _a.status, status = _b === void 0 ? true : _b;
    return __awaiter(void 0, void 0, Promise, function () {
        var result, error_10;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1["default"].redirects.update({
                            where: { id: id },
                            data: {
                                status: status
                            },
                            select: { id: true }
                        })];
                case 1:
                    result = _c.sent();
                    return [2 /*return*/, { status: (result === null || result === void 0 ? void 0 : result.id) ? true : false, data: result }];
                case 2:
                    error_10 = _c.sent();
                    console.error(error_10);
                    return [2 /*return*/, { status: false, error: error_10.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deleteRedirect = function (_a) {
    var id = _a.id, shop = _a.shop;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!id)
                        throw new Error("id undefined");
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].redirects.deleteMany({
                            where: {
                                id: id,
                                shopId: activeShop.id
                            }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { status: result.count > 0, data: result }];
                case 3:
                    error_11 = _b.sent();
                    console.error(error_11);
                    return [2 /*return*/, { status: false, error: error_11.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.reorderRedirect = function (_a) {
    var ids = _a.ids, shop = _a.shop;
    return __awaiter(void 0, void 0, Promise, function () {
        var updatePromises, results, error_12;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    updatePromises = ids.map(function (id, index) {
                        return db_server_1["default"].redirects.update({
                            where: { id: id, activeShop: { shop: shop } },
                            data: { order: index + 1 }
                        });
                    });
                    return [4 /*yield*/, Promise.all(updatePromises)];
                case 1:
                    results = _b.sent();
                    return [2 /*return*/, { status: results.length > 0, data: results }];
                case 2:
                    error_12 = _b.sent();
                    console.error(error_12);
                    return [2 /*return*/, { status: false, error: error_12.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getConfigs = function (_a) {
    var shop = _a.shop;
    return __awaiter(void 0, void 0, Promise, function () {
        var configs, formattedConfigs, error_13;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1["default"].configs.findMany({
                            where: {
                                activeShop: {
                                    shop: shop
                                }
                            },
                            select: {
                                shopId: true,
                                basicConfigs: true,
                                advancedConfigs: true,
                                allowedPages: true,
                                hideOnAllowedPages: true,
                                status: true,
                                activeShop: {
                                    select: {
                                        shop: true
                                    }
                                }
                            }
                        })];
                case 1:
                    configs = _b.sent();
                    formattedConfigs = configs.map(function (config) { return (__assign(__assign({}, config), { basicConfigs: _helpers_1.jsonSafeParse(config === null || config === void 0 ? void 0 : config.basicConfigs), advancedConfigs: _helpers_1.jsonSafeParse(config === null || config === void 0 ? void 0 : config.advancedConfigs), allowedPages: _helpers_1.jsonSafeParse(config.allowedPages) })); });
                    return [2 /*return*/, { status: formattedConfigs.length > 0, data: formattedConfigs }];
                case 2:
                    error_13 = _b.sent();
                    console.error(error_13);
                    return [2 /*return*/, { status: false, error: error_13.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.createUpdateConfigs = function (_a) {
    var shop = _a.shop, basicConfigs = _a.basicConfigs, _b = _a.advancedConfigs, advancedConfigs = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, basicConfigsString, advancedConfigsString, result, error_14;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _c.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    basicConfigsString = basicConfigs ? JSON.stringify(basicConfigs) : null;
                    advancedConfigsString = advancedConfigs ? JSON.stringify(advancedConfigs) : null;
                    return [4 /*yield*/, db_server_1["default"].configs.upsert({
                            where: { shopId: activeShop.id },
                            update: {
                                basicConfigs: basicConfigsString,
                                advancedConfigs: advancedConfigsString
                            },
                            create: {
                                shopId: activeShop.id,
                                basicConfigs: basicConfigsString,
                                advancedConfigs: advancedConfigsString
                            }
                        })];
                case 2:
                    result = _c.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_14 = _c.sent();
                    console.error(error_14);
                    return [2 /*return*/, { status: false, error: error_14.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.createUpdateAllowedPages = function (_a) {
    var shop = _a.shop, allowedPages = _a.allowedPages, _b = _a.hideOnAllowedPages, hideOnAllowedPages = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, allowedPagesString, result, error_15;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _c.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    allowedPagesString = allowedPages ? JSON.stringify(allowedPages) : null;
                    return [4 /*yield*/, db_server_1["default"].configs.upsert({
                            where: { shopId: activeShop.id },
                            update: {
                                allowedPages: allowedPagesString,
                                hideOnAllowedPages: hideOnAllowedPages
                            },
                            create: {
                                shopId: activeShop.id,
                                allowedPages: allowedPagesString,
                                hideOnAllowedPages: hideOnAllowedPages
                            }
                        })];
                case 2:
                    result = _c.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_15 = _c.sent();
                    console.error(error_15);
                    return [2 /*return*/, { status: false, error: error_15.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.createUpdateMarketConfigs = function (_a) {
    var shop = _a.shop, basicConfigs = _a.basicConfigs, _b = _a.advancedConfigs, advancedConfigs = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, basicConfigsString, advancedConfigsString, result, error_16;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _c.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    basicConfigsString = basicConfigs ? JSON.stringify(basicConfigs) : null;
                    advancedConfigsString = advancedConfigs ? JSON.stringify(advancedConfigs) : null;
                    return [4 /*yield*/, db_server_1["default"].marketsConfigs.upsert({
                            where: { shopId: activeShop.id },
                            update: {
                                basicConfigs: basicConfigsString,
                                advancedConfigs: advancedConfigsString
                            },
                            create: {
                                shopId: activeShop.id,
                                basicConfigs: basicConfigsString,
                                advancedConfigs: advancedConfigsString
                            }
                        })];
                case 2:
                    result = _c.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_16 = _c.sent();
                    console.error(error_16);
                    return [2 /*return*/, { status: false, error: error_16.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getMarketSyncStatus = function (_a) {
    var shop = _a.shop;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_17;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].markets.findFirst({
                            where: { shopId: activeShop.id },
                            select: { syncStatus: true }
                        })];
                case 2:
                    result = _b.sent();
                    // console.log('getMarketSyncStatus', result);
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_17 = _b.sent();
                    console.error(error_17);
                    return [2 /*return*/, { status: false, error: error_17.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getMarketsData = function (_a) {
    var shop = _a.shop;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_18;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].markets.findFirst({
                            where: { shopId: activeShop.id },
                            select: { markets: true, syncStatus: true, lastSyncTimestamp: true }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_18 = _b.sent();
                    console.error(error_18);
                    return [2 /*return*/, { status: false, error: error_18.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getMarketConfigs = function (_a) {
    var shop = _a.shop;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_19;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].marketsConfigs.findFirst({
                            where: { shopId: activeShop.id },
                            select: { basicConfigs: true, advancedConfigs: true, widget: true, autoRedirect: true }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { status: result ? true : false, data: __assign(__assign({}, result), { basicConfigs: _helpers_1.jsonSafeParse((result === null || result === void 0 ? void 0 : result.basicConfigs) || '{}'), advancedConfigs: _helpers_1.jsonSafeParse((result === null || result === void 0 ? void 0 : result.advancedConfigs) || '{}') }) }];
                case 3:
                    error_19 = _b.sent();
                    console.error(error_19);
                    return [2 /*return*/, { status: false, error: error_19.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.updateMarketSyncStatus = function (_a) {
    var shop = _a.shop, syncStatus = _a.syncStatus;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_20;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].markets.upsert({
                            where: { shopId: activeShop.id },
                            update: { syncStatus: syncStatus },
                            create: { shopId: activeShop.id, syncStatus: syncStatus }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_20 = _b.sent();
                    console.error(error_20);
                    return [2 /*return*/, { status: false, error: error_20.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.addMarketsData = function (_a) {
    var shop = _a.shop, markets = _a.markets, backupRegion = _a.backupRegion;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, timestamp, marketsString, result, error_21;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    timestamp = new Date().toISOString();
                    marketsString = JSON.stringify(__assign(__assign({}, markets), { "BackupRegion": backupRegion }));
                    return [4 /*yield*/, db_server_1["default"].markets.upsert({
                            where: { shopId: activeShop.id },
                            update: { markets: marketsString, syncStatus: "SUCCESS", lastSyncTimestamp: timestamp },
                            create: { shopId: activeShop.id, markets: marketsString, syncStatus: "SUCCESS", lastSyncTimestamp: timestamp }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_21 = _b.sent();
                    console.error(error_21);
                    return [2 /*return*/, { status: false, error: error_21.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.updateMarketsWidget = function (_a) {
    var shop = _a.shop, widget = _a.widget;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_22;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].marketsConfigs.update({
                            where: { shopId: activeShop.id },
                            data: { widget: widget }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_22 = _b.sent();
                    console.error(error_22);
                    return [2 /*return*/, { status: false, error: error_22.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.updateMarketsRedirect = function (_a) {
    var shop = _a.shop, autoRedirect = _a.autoRedirect;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop, result, error_23;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: { shop: shop },
                            select: { id: true }
                        })];
                case 1:
                    activeShop = _b.sent();
                    if (!activeShop) {
                        throw new Error("Shop not found");
                    }
                    return [4 /*yield*/, db_server_1["default"].marketsConfigs.update({
                            where: { shopId: activeShop.id },
                            data: { autoRedirect: autoRedirect }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 3:
                    error_23 = _b.sent();
                    console.error(error_23);
                    return [2 /*return*/, { status: false, error: error_23.toString() }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.changePlan = function (_a) {
    var shop = _a.shop, plan = _a.plan, _b = _a.shopifyPlanId, shopifyPlanId = _b === void 0 ? "" : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, error_24;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.update({
                            where: { shop: shop },
                            data: { plan: plan, shopifyPlanId: shopifyPlanId }
                        })];
                case 1:
                    result = _c.sent();
                    return [2 /*return*/, { status: result ? true : false, data: result }];
                case 2:
                    error_24 = _c.sent();
                    console.error(error_24);
                    return [2 /*return*/, { status: false, error: error_24.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getShopData = function (_a) {
    var shop = _a.shop;
    return __awaiter(void 0, void 0, Promise, function () {
        var activeShop_1, isProPlan_1, isBasicPlan, redirects, configs, error_25;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1["default"].activeShops.findUnique({
                            where: {
                                shop: shop,
                                status: 1,
                                OR: [
                                    { plan: { gt: 0 } },
                                    { veteran: true }
                                ]
                            },
                            select: {
                                id: true,
                                plan: true,
                                dev: true,
                                redirects: {
                                    where: {
                                        status: true
                                    },
                                    orderBy: {
                                        order: 'asc'
                                    },
                                    select: {
                                        flag: true,
                                        label: true,
                                        url: true,
                                        order: true,
                                        locales: true,
                                        domainRedirection: true,
                                        conditional: true,
                                        conditionalLocation: true
                                    }
                                },
                                configs: {
                                    where: {
                                        status: true
                                    },
                                    select: {
                                        basicConfigs: true,
                                        allowedPages: true,
                                        hideOnAllowedPages: true,
                                        advancedConfigs: true
                                    }
                                }
                            }
                        })];
                case 1:
                    activeShop_1 = _b.sent();
                    if (!activeShop_1) {
                        throw new Error("Shop not found");
                    }
                    isProPlan_1 = activeShop_1.plan === 2;
                    isBasicPlan = activeShop_1.plan === 1;
                    redirects = activeShop_1.redirects.map(function (redirect) { return (__assign(__assign({}, redirect), { locales: isProPlan_1 || activeShop_1.dev ? _helpers_1.jsonSafeParse(redirect.locales) : null, domainRedirection: isProPlan_1 || activeShop_1.dev ? redirect.domainRedirection : null, conditional: isProPlan_1 || activeShop_1.dev ? redirect.conditional : null, conditionalLocation: isProPlan_1 || activeShop_1.dev ? redirect.conditionalLocation : null, plan: activeShop_1.plan })); });
                    configs = activeShop_1.configs[0];
                    if (configs) {
                        configs.basicConfigs = __assign(__assign({}, _helpers_1.default_basic_configs), _helpers_1.jsonSafeParse(configs.basicConfigs));
                        configs.allowedPages = isProPlan_1 || activeShop_1.dev ? _helpers_1.jsonSafeParse(configs.allowedPages) : null;
                        configs.hideOnAllowedPages = isProPlan_1 || activeShop_1.dev ? configs.hideOnAllowedPages : false;
                        configs.advancedConfigs = isProPlan_1 || activeShop_1.dev ? _helpers_1.jsonSafeParse(configs.advancedConfigs) : null;
                        configs.plan = activeShop_1.plan;
                    }
                    return [2 /*return*/, {
                            status: !!configs,
                            data: {
                                redirects: isProPlan_1 ? redirects : redirects.slice(0, isBasicPlan ? BASIC_PLAN_LIMIT : FREE_PLAN_LIMIT),
                                configs: configs
                            }
                        }];
                case 2:
                    error_25 = _b.sent();
                    console.error(error_25);
                    return [2 /*return*/, { status: false, error: error_25.toString() }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// export const getMarketsData = async (shop: string) => {
//   try {
//     const activeShop = await prisma.activeShops.findFirst({
//       where: {
//         shop,
//         status: true,
//         plan: {
//           gt: 0
//         }
//       },
//       select: {
//         id: true,
//         plan: true,
//         dev: true,
//         markets: {
//           select: {
//             markets: true
//           }
//         },
//         marketsConfigs: {
//           select: {
//             shop_id: true,
//             basic_configs: true,
//             widget: true,
//             auto_redirect: true,
//             advanced_configs: true
//           }
//         }
//       }
//     });
//     if (!activeShop) {
//       return {
//         status: false,
//         data: null
//       };
//     }
//     const configs = activeShop.marketsConfigs[0];
//     if (configs && (activeShop.plan === 2 || activeShop.dev)) {
//       configs.advanced_configs = configs.advanced_configs;
//     } else if (configs) {
//       configs.advanced_configs = null;
//     }
//     return {
//       status: true,
//       data: {
//         markets: activeShop.markets[0]?.markets,
//         configs
//       }
//     };
//   } catch (error) {
//     console.error(error); 
//     return {
//       status: false,
//       data: null
//     };
//   }
// };
// export const runMarketsSync = async ({ shop }: Shop): Promise<DBResponse> => {
//   try {
//     const result = await prisma.activeShops.update({
//       where: { shop },
//       data: {
//         marketsSync: true,
//       },
//     });
//     return { status: result ? true : false, data: result };
//   } catch (error: any) {
//     console.error(error);
//     return { status: false, error: (error as Error).toString() };
//   }
// };
//   shop_id,
//   flag,
//   label,
//   url,
//   order_r = 1,
//   conditional = false,
//   conditional_location,
//   domain_redirection = false,
//   locales = null,
// }) {
//   try {
//     const redirectLocales = locales ? JSON.stringify(locales) : null;
//     const conditionalLocation = conditional_location
//       ? JSON.stringify(conditional_location)
//       : null;
//     const planQuery = "SELECT plan FROM active_shops WHERE id = $1";
//     const redirectCountQuery =
//       "SELECT COUNT(*) FROM redirects WHERE shop_id = $1";
//     const planResult = await pool.query(planQuery, [shop_id]);
//     const redirectCountResult = await pool.query(redirectCountQuery, [shop_id]);
//     const plan = planResult.rows[0].plan;
//     const redirectCount = parseInt(redirectCountResult.rows[0].count, 10);
//     let redirectLimit = FREE_PLAN_LIMIT; // Default redirect limit
//     if (plan === 2) {
//       redirectLimit = 999;
//     } else if (plan === 1) {
//       redirectLimit = BASIC_PLAN_LIMIT;
//     }
//     if (redirectCount >= redirectLimit) {
//       return 0; // Return early if redirect limit is reached
//     }
//     const insertQuery = `
//     INSERT INTO redirects (shop_id, flag, label, url, order_r, conditional, conditional_location, domain_redirection, locales)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);;
//     `;
//     const insertParams = [
//       shop_id,
//       flag,
//       label,
//       url,
//       order_r,
//       conditional,
//       conditionalLocation,
//       domain_redirection,
//       redirectLocales,
//     ];
//     const dbResponse = await pool.query(insertQuery, insertParams);
//     const { rowCount } = dbResponse;
//     return rowCount;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };
