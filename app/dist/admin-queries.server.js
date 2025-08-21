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
exports.subscribeProPlan = exports.subscribeBasicPlan = exports.cancelSubscription = exports.setMarketsAutoRedirect = exports.registerBulkWebhookIfNotExists = exports.removeWebhook = exports.getAllRegisteredWebhooks = exports.getBulkOperation = exports.getBackupRegion = exports.runMarketsSync = exports.updateAutoRedirectsCustomCode = exports.updateAutoRedirectsCustomCodeStatus = exports.getAutoRedirectsCustomCode = exports.getAutoRedirectsCustomCodeStatus = exports.deleteAutoRedirect = exports.reOrderAutoRedirects = exports.updateAutoRedirect = exports.getAllAutoRedirects = exports.createAutoRedirect = exports.getButtonEditorCode = exports.getButtonEditorStatus = exports.updateButtonEditorCode = exports.updateButtonEditorStatus = exports.getWidgetEditorCode = exports.getWidgetEditorStatus = exports.updateWidgetEditorCode = exports.updateWidgetEditorStatus = exports.getThemeEmbed = void 0;
var uniqid_1 = require("uniqid");
function getThemeEmbed(_a) {
    var _b, _c, _d, _e, _f, _g;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!admin)
                        return [2 /*return*/, new Error("admin not defined")];
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query {\n                themes(first: 1, roles: [MAIN]) {\n                    nodes {\n                        id\n                        files(\n                        filenames: [\"config/settings_data.json\"]\n                        first: 1\n                        ) {\n                        nodes {\n                            body {\n                            ... on OnlineStoreThemeFileBodyText {\n                                content\n                            } \n                            }\n                        }\n                        }\n                    }\n                }\n            }")];
                case 2:
                    response = _h.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _h.sent();
                    return [2 /*return*/, (_g = (_f = (_e = (_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.themes) === null || _c === void 0 ? void 0 : _c.nodes[0]) === null || _d === void 0 ? void 0 : _d.files) === null || _e === void 0 ? void 0 : _e.nodes[0]) === null || _f === void 0 ? void 0 : _f.body) === null || _g === void 0 ? void 0 : _g.content];
                case 4:
                    error_1 = _h.sent();
                    console.error(error_1);
                    return [2 /*return*/, { status: false, error: error_1.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getThemeEmbed = getThemeEmbed;
function updateWidgetEditorStatus(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_2;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [
                                    {
                                        key: "widget_code_status",
                                        namespace: "widget_settings",
                                        ownerId: appId,
                                        type: "boolean",
                                        value: value
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _k.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _k.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]];
                case 4:
                    error_2 = _k.sent();
                    console.error(error_2);
                    return [2 /*return*/, { status: false, error: error_2.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateWidgetEditorStatus = updateWidgetEditorStatus;
function updateWidgetEditorCode(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_3;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [
                                    {
                                        key: "widget_show_code",
                                        namespace: "widget_settings",
                                        ownerId: appId,
                                        type: "multi_line_text_field",
                                        value: value
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _k.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _k.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]];
                case 4:
                    error_3 = _k.sent();
                    console.error(error_3);
                    return [2 /*return*/, { status: false, error: error_3.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateWidgetEditorCode = updateWidgetEditorCode;
function getWidgetEditorStatus(_a) {
    var _b, _c;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_4;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getMetafields($namespace: String!, $key: String!) {\n                appInstallation {\n                id\n                metafield(namespace: $namespace, key: $key) {\n                    id\n                    namespace\n                    key\n                    value\n                }\n                allSubscriptions(first: 10){\n                    edges{\n                    node{\n                        id\n                        createdAt\n                        name\n                        status\n                    }\n                    }\n                }\n                }\n            }\n            ", {
                            variables: {
                                namespace: "widget_settings",
                                key: "widget_code_status"
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appInstallation) === null || _c === void 0 ? void 0 : _c.metafield];
                case 4:
                    error_4 = _d.sent();
                    console.error(error_4);
                    return [2 /*return*/, { status: false, error: error_4.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getWidgetEditorStatus = getWidgetEditorStatus;
function getWidgetEditorCode(_a) {
    var _b, _c;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_5;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getMetafields($namespace: String!, $key: String!) {\n                appInstallation {\n                id\n                metafield(namespace: $namespace, key: $key) {\n                    id\n                    namespace\n                    key\n                    value\n                }\n                allSubscriptions(first: 10){\n                    edges{\n                    node{\n                        id\n                        createdAt\n                        name\n                        status\n                    }\n                    }\n                }\n                }\n            }\n            ", {
                            variables: {
                                namespace: "widget_settings",
                                key: "widget_show_code"
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appInstallation) === null || _c === void 0 ? void 0 : _c.metafield];
                case 4:
                    error_5 = _d.sent();
                    console.error(error_5);
                    return [2 /*return*/, { status: false, error: error_5.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getWidgetEditorCode = getWidgetEditorCode;
function updateButtonEditorStatus(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_6;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [
                                    {
                                        key: "buttons_code_status",
                                        namespace: "widget_settings",
                                        ownerId: appId,
                                        type: "boolean",
                                        value: value
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _k.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _k.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]];
                case 4:
                    error_6 = _k.sent();
                    console.error(error_6);
                    return [2 /*return*/, { status: false, error: error_6.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateButtonEditorStatus = updateButtonEditorStatus;
function updateButtonEditorCode(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_7;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [
                                    {
                                        key: "buttons_show_code",
                                        namespace: "widget_settings",
                                        ownerId: appId,
                                        type: "multi_line_text_field",
                                        value: value
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _k.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _k.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]];
                case 4:
                    error_7 = _k.sent();
                    console.error(error_7);
                    return [2 /*return*/, { status: false, error: error_7.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateButtonEditorCode = updateButtonEditorCode;
function getButtonEditorStatus(_a) {
    var _b, _c;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_8;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getMetafields($namespace: String!, $key: String!) {\n                appInstallation {\n                id\n                metafield(namespace: $namespace, key: $key) {\n                    id\n                    namespace\n                    key\n                    value\n                }\n                allSubscriptions(first: 10){\n                    edges{\n                    node{\n                        id\n                        createdAt\n                        name\n                        status\n                    }\n                    }\n                }\n                }\n            }\n            ", {
                            variables: {
                                namespace: "widget_settings",
                                key: "buttons_code_status"
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appInstallation) === null || _c === void 0 ? void 0 : _c.metafield];
                case 4:
                    error_8 = _d.sent();
                    console.error(error_8);
                    return [2 /*return*/, { status: false, error: error_8.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getButtonEditorStatus = getButtonEditorStatus;
function getButtonEditorCode(_a) {
    var _b, _c;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_9;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getMetafields($namespace: String!, $key: String!) {\n                appInstallation {\n                id\n                metafield(namespace: $namespace, key: $key) {\n                    id\n                    namespace\n                    key\n                    value\n                }\n                allSubscriptions(first: 10){\n                    edges{\n                    node{\n                        id\n                        createdAt\n                        name\n                        status\n                    }\n                    }\n                }\n                }\n            }\n            ", {
                            variables: {
                                namespace: "widget_settings",
                                key: "buttons_show_code"
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appInstallation) === null || _c === void 0 ? void 0 : _c.metafield];
                case 4:
                    error_9 = _d.sent();
                    console.error(error_9);
                    return [2 /*return*/, { status: false, error: error_9.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getButtonEditorCode = getButtonEditorCode;
function createAutoRedirect(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_10;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [{
                                        key: uniqid_1["default"].time(),
                                        namespace: "redirects",
                                        ownerId: appId,
                                        type: "json",
                                        value: JSON.stringify(value)
                                    }]
                            }
                        })];
                case 2:
                    response = _o.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _o.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, { status: ((_k = (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]) === null || _k === void 0 ? void 0 : _k.key) !== "", data: (_m = (_l = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _l === void 0 ? void 0 : _l.metafieldsSet) === null || _m === void 0 ? void 0 : _m.metafields[0] }];
                case 4:
                    error_10 = _o.sent();
                    console.error(error_10);
                    return [2 /*return*/, { status: false, error: error_10.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createAutoRedirect = createAutoRedirect;
function getAllAutoRedirects(_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_11;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getMetafields($namespace: String!) {\n                appInstallation {\n                    id\n                    metafields(namespace: $namespace, first: 100) {\n                        edges {\n                            node {\n                                id\n                                namespace\n                                key\n                                value\n                                jsonValue\n                            }\n                        }\n                    }\n                }\n            }\n            ", {
                            variables: {
                                namespace: "redirects"
                            }
                        })];
                case 2:
                    response = _j.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _j.sent();
                    return [2 /*return*/, { status: ((_e = (_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appInstallation) === null || _c === void 0 ? void 0 : _c.metafields) === null || _d === void 0 ? void 0 : _d.edges) === null || _e === void 0 ? void 0 : _e.length) > 0, data: (_h = (_g = (_f = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _f === void 0 ? void 0 : _f.appInstallation) === null || _g === void 0 ? void 0 : _g.metafields) === null || _h === void 0 ? void 0 : _h.edges }];
                case 4:
                    error_11 = _j.sent();
                    console.error(error_11);
                    return [2 /*return*/, { status: false, error: error_11.toString(), data: [] }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllAutoRedirects = getAllAutoRedirects;
function updateAutoRedirect(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var admin = _a.admin, appId = _a.appId, key = _a.key, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_12;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        id\n                        key\n                        namespace\n                        value       \n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [{ key: key, ownerId: appId, value: JSON.stringify(value), type: "json", namespace: "redirects" }]
                            }
                        })];
                case 2:
                    response = _o.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _o.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, { status: ((_k = (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]) === null || _k === void 0 ? void 0 : _k.key) !== "", data: (_m = (_l = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _l === void 0 ? void 0 : _l.metafieldsSet) === null || _m === void 0 ? void 0 : _m.metafields[0] }];
                case 4:
                    error_12 = _o.sent();
                    console.error(error_12);
                    return [2 /*return*/, { status: false, error: error_12.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateAutoRedirect = updateAutoRedirect;
function reOrderAutoRedirects(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var admin = _a.admin, appId = _a.appId, data = _a.data;
    return __awaiter(this, void 0, void 0, function () {
        var metafields, response, responseJson, error_13;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 4, , 5]);
                    metafields = data.map(function (_a) {
                        var key = _a.key, jsonValue = _a.jsonValue;
                        return {
                            namespace: "redirects",
                            key: key,
                            value: JSON.stringify(jsonValue),
                            ownerId: appId,
                            type: "json"
                        };
                    });
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        jsonValue\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: metafields
                            }
                        })];
                case 2:
                    response = _o.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _o.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, { status: ((_k = (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields) === null || _k === void 0 ? void 0 : _k.length) > 0, data: (_m = (_l = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _l === void 0 ? void 0 : _l.metafieldsSet) === null || _m === void 0 ? void 0 : _m.metafields }];
                case 4:
                    error_13 = _o.sent();
                    return [2 /*return*/, { status: false, error: error_13.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.reOrderAutoRedirects = reOrderAutoRedirects;
function deleteAutoRedirect(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var admin = _a.admin, appId = _a.appId, key = _a.key;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_14;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n                mutation MetafieldsDelete($metafields: [MetafieldIdentifierInput!]!) {\n                    metafieldsDelete(metafields: $metafields) {\n                        deletedMetafields {\n                            key\n                            namespace\n                            ownerId\n                        }\n                        userErrors {\n                            field\n                            message\n                        }\n                    }\n                }", {
                            variables: {
                                metafields: [
                                    {
                                        ownerId: appId,
                                        namespace: "redirects",
                                        key: key
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _o.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _o.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsDelete) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsDelete) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, { status: ((_k = (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsDelete) === null || _j === void 0 ? void 0 : _j.deletedMetafields[0]) === null || _k === void 0 ? void 0 : _k.key) !== "", data: (_m = (_l = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _l === void 0 ? void 0 : _l.metafieldsDelete) === null || _m === void 0 ? void 0 : _m.deletedMetafields[0] }];
                case 4:
                    error_14 = _o.sent();
                    console.error(error_14);
                    return [2 /*return*/, { status: false, error: error_14.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.deleteAutoRedirect = deleteAutoRedirect;
function getAutoRedirectsCustomCodeStatus(_a) {
    var _b, _c;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_15;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getMetafields($namespace: String!, $key: String!) {\n                appInstallation {\n                id\n                metafield(namespace: $namespace, key: $key) {\n                    id\n                    namespace\n                    key\n                    value\n                }\n                allSubscriptions(first: 10){\n                    edges{\n                    node{\n                        id\n                        createdAt\n                        name\n                        status\n                    }\n                    }\n                }\n                }\n            }\n            ", {
                            variables: {
                                namespace: "settings",
                                key: "custom_code_status"
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appInstallation) === null || _c === void 0 ? void 0 : _c.metafield];
                case 4:
                    error_15 = _d.sent();
                    console.error(error_15);
                    return [2 /*return*/, { status: false, error: error_15.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAutoRedirectsCustomCodeStatus = getAutoRedirectsCustomCodeStatus;
function getAutoRedirectsCustomCode(_a) {
    var _b, _c;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_16;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getMetafields($namespace: String!, $key: String!) {\n                appInstallation {\n                id\n                metafield(namespace: $namespace, key: $key) {\n                    id\n                    namespace\n                    key\n                    value\n                }\n                allSubscriptions(first: 10){\n                    edges{\n                    node{\n                        id\n                        createdAt\n                        name\n                        status\n                    }\n                    }\n                }\n                }\n            }\n            ", {
                            variables: {
                                namespace: "settings",
                                key: "custom_code"
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appInstallation) === null || _c === void 0 ? void 0 : _c.metafield];
                case 4:
                    error_16 = _d.sent();
                    console.error(error_16);
                    return [2 /*return*/, { status: false, error: error_16.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAutoRedirectsCustomCode = getAutoRedirectsCustomCode;
function updateAutoRedirectsCustomCodeStatus(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_17;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [
                                    {
                                        key: "custom_code_status",
                                        namespace: "settings",
                                        ownerId: appId,
                                        type: "boolean",
                                        value: value
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _k.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _k.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]];
                case 4:
                    error_17 = _k.sent();
                    console.error(error_17);
                    return [2 /*return*/, { status: false, error: error_17.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateAutoRedirectsCustomCodeStatus = updateAutoRedirectsCustomCodeStatus;
function updateAutoRedirectsCustomCode(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_18;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                    userErrors {\n                        field\n                        message\n                        code\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [
                                    {
                                        key: "custom_code",
                                        namespace: "settings",
                                        ownerId: appId,
                                        type: "multi_line_text_field",
                                        value: value
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _k.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _k.sent();
                    if (((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.userErrors) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                        throw Error((_g = (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.userErrors[0]) === null || _g === void 0 ? void 0 : _g.message);
                    }
                    return [2 /*return*/, (_j = (_h = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _h === void 0 ? void 0 : _h.metafieldsSet) === null || _j === void 0 ? void 0 : _j.metafields[0]];
                case 4:
                    error_18 = _k.sent();
                    console.error(error_18);
                    return [2 /*return*/, { status: false, error: error_18.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateAutoRedirectsCustomCode = updateAutoRedirectsCustomCode;
function runMarketsSync(_a) {
    var _b;
    var admin = _a.admin, data = _a.data;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_19;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n                mutation {\n                    bulkOperationRunQuery(\n                    groupObjects: false,\n                    query: \"\"\"\n                        {\n                            markets {\n                                edges {\n                                node {\n                                    __typename\n                                    id\n                                    handle\n                                    name\n                                    type\n                                    status\n                                    conditions {\n                                    __typename\n                                    conditionTypes\n                                    regionsCondition {\n                                        applicationLevel\n                                        regions {\n                                        edges {\n                                            node {\n                                            __typename\n                                            id\n                                            name\n                                            ... on MarketRegionCountry {\n                                                code\n                                                currency {\n                                                enabled\n                                                currencyName\n                                                currencyCode\n                                                }\n                                            }\n                                            }\n                                        }\n                                        }\n                                    }\n                                    }\n                                    webPresences {\n                                        edges {\n                                            node {\n                                                __typename\n                                                id\n                                                domain {\n                                                    id\n                                                    host\n                                                    url\n                                                    localization {\n                                                        alternateLocales\n                                                        country\n                                                        defaultLocale\n                                                    }\n                                                }\n                                                rootUrls {\n                                                    url\n                                                    locale\n                                                }\n                                                subfolderSuffix\n                                                defaultLocale {\n                                                    locale\n                                                    name\n                                                    primary\n                                                    published\n                                                    marketWebPresences {\n                                                        id\n                                                        domain {\n                                                            id\n                                                            host\n                                                            url\n                                                            localization {\n                                                                alternateLocales\n                                                                country\n                                                                defaultLocale\n                                                            }\n                                                        }\n                                                        rootUrls {\n                                                            url\n                                                            locale\n                                                        }\n                                                        subfolderSuffix\n                                                    }\n                                                }\n                                                alternateLocales {\n                                                    locale\n                                                    name\n                                                    primary\n                                                    published\n                                                    marketWebPresences {\n                                                    domain {\n                                                        id\n                                                        host\n                                                        url\n                                                        localization {\n                                                            alternateLocales\n                                                            country\n                                                            defaultLocale\n                                                        }\n                                                    }\n                                                    id\n                                                    rootUrls {\n                                                        url\n                                                        locale\n                                                    }\n                                                    subfolderSuffix\n                                                    }\n                                                }\n                                            }\n                                        }\n                                    }\n                                }\n                                }\n                            }\n                            } \n                        \"\"\"\n                    ) {\n                        bulkOperation {\n                            id\n                            status\n                            errorCode\n                        }\n                        userErrors {\n                            ...on BulkOperationUserError {\n                                code\n                                message\n                            }\n                        }\n                    }\n                }\n            ")];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.bulkOperationRunQuery];
                case 4:
                    error_19 = _c.sent();
                    console.error(error_19);
                    return [2 /*return*/, { status: false, error: error_19.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.runMarketsSync = runMarketsSync;
function getBackupRegion(_a) {
    var _b;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_20;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            query getBackupRegion{\n                backupRegion{\n                    __typename\n                    id\n                    name\n                }\n            }\n           ")];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.backupRegion];
                case 4:
                    error_20 = _c.sent();
                    console.error(error_20);
                    return [2 /*return*/, { status: false, error: error_20.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getBackupRegion = getBackupRegion;
function getBulkOperation(_a) {
    var _b;
    var admin = _a.admin, bulkId = _a.bulkId;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_21;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n           query getBulkResponse($id: ID!) {\n                node(id: $id) {\n                ... on BulkOperation {\n                    id\n                    status\n                    errorCode\n                    createdAt\n                    completedAt\n                    objectCount\n                    fileSize\n                    url\n                    partialDataUrl\n                }\n                }\n            }\n            ", {
                            variables: {
                                id: bulkId
                            }
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.node];
                case 4:
                    error_21 = _c.sent();
                    console.error("getBulkOperation: ", error_21);
                    return [2 /*return*/, { status: false, error: error_21.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getBulkOperation = getBulkOperation;
function getAllRegisteredWebhooks(_a) {
    var _b, _c;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_22;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n                query {\n                webhookSubscriptions(first: 10) {\n                    edges {\n                        node {\n                            id\n                            topic\n                            uri\n                        }\n                    }\n                }\n            }")];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.webhookSubscriptions) === null || _c === void 0 ? void 0 : _c.edges];
                case 4:
                    error_22 = _d.sent();
                    console.error(error_22);
                    return [2 /*return*/, { status: false, error: error_22.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllRegisteredWebhooks = getAllRegisteredWebhooks;
function removeWebhook(_a) {
    var _b;
    var admin = _a.admin, webhookId = _a.webhookId;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_23;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation webhookSubscriptionDelete($id: ID!) {\n              webhookSubscriptionDelete(id: $id) {\n                userErrors {\n                  field\n                  message\n                }\n                deletedWebhookSubscriptionId\n              }\n            }", {
                            variables: {
                                "id": webhookId
                            }
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.webhookSubscriptionDelete];
                case 4:
                    error_23 = _c.sent();
                    console.error(error_23);
                    return [2 /*return*/, { status: false, error: error_23.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.removeWebhook = removeWebhook;
function registerBulkWebhookIfNotExists(_a) {
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var webhooks, findBulkWebhook, mutation, variables, response, responseJson, error_24;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    return [4 /*yield*/, getAllRegisteredWebhooks({ admin: admin })];
                case 1:
                    webhooks = _b.sent();
                    findBulkWebhook = webhooks.find(function (webhook) { return webhook.node.topic === "BULK_OPERATIONS_FINISH"; });
                    if (!!findBulkWebhook) return [3 /*break*/, 6];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    mutation = "#graphql\n                mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {\n                  webhookSubscriptionCreate(\n                    topic: $topic,\n                    webhookSubscription: $webhookSubscription\n                  ) {\n                    userErrors {\n                      field\n                      message\n                    }\n                    webhookSubscription {\n                      id\n                      topic\n                      uri\n                    }\n                  }\n                }\n            ";
                    variables = {
                        topic: "BULK_OPERATIONS_FINISH",
                        webhookSubscription: {
                            callbackUrl: process.env.APP_URL + "/api/webhooks",
                            format: "JSON"
                        }
                    };
                    return [4 /*yield*/, admin.graphql(mutation, { variables: variables })];
                case 3:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    responseJson = _b.sent();
                    if (responseJson.data.webhookSubscriptionCreate.userErrors.length > 0) {
                        console.error("Failed to register BULK_OPERATIONS_FINISH webhook:", responseJson.data.webhookSubscriptionCreate.userErrors);
                    }
                    else {
                        console.log("Successfully registered BULK_OPERATIONS_FINISH webhook");
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_24 = _b.sent();
                    console.error("Error registering BULK_OPERATIONS_FINISH webhook:", error_24);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.registerBulkWebhookIfNotExists = registerBulkWebhookIfNotExists;
function setMarketsAutoRedirect(_a) {
    var _b, _c, _d, _e, _f;
    var admin = _a.admin, appId = _a.appId, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_25;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n                metafieldsSet(metafields: $metafields) {\n                    metafields {\n                        key\n                        namespace\n                        value\n                        createdAt\n                        updatedAt\n                    }\n                }\n            }\n            ", {
                            variables: {
                                metafields: [
                                    {
                                        key: "auto_redirect",
                                        namespace: "markets",
                                        ownerId: appId,
                                        type: "boolean",
                                        value: value
                                    }
                                ]
                            }
                        })];
                case 2:
                    response = _g.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _g.sent();
                    return [2 /*return*/, { status: ((_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.metafieldsSet) === null || _c === void 0 ? void 0 : _c.metafields[0]) === null || _d === void 0 ? void 0 : _d.key) !== "", data: (_f = (_e = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _e === void 0 ? void 0 : _e.metafieldsSet) === null || _f === void 0 ? void 0 : _f.metafields[0] }];
                case 4:
                    error_25 = _g.sent();
                    console.error(error_25);
                    return [2 /*return*/, { status: false, error: error_25.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.setMarketsAutoRedirect = setMarketsAutoRedirect;
function cancelSubscription(_a) {
    var _b;
    var admin = _a.admin, id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_26;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n                mutation AppSubscriptionCancel($id: ID!){\n                    appSubscriptionCancel(id: $id) {\n                        userErrors {\n                            field\n                            message\n                        }\n                        appSubscription {\n                            id\n                            status\n                            returnUrl\n                        }\n                    }\n                }\n            ", {
                            variables: {
                                id: id
                            }
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appSubscriptionCancel];
                case 4:
                    error_26 = _c.sent();
                    console.error(error_26);
                    return [2 /*return*/, { status: false, error: error_26.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.cancelSubscription = cancelSubscription;
function subscribeBasicPlan(_a) {
    var _b;
    var admin = _a.admin, shop = _a.shop;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_27;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean!){\n                appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {\n                    userErrors {\n                        field\n                        message\n                    }\n                    appSubscription {\n                        id\n                    }\n                    confirmationUrl\n                }\n            }\n            ", {
                            variables: {
                                name: "Basic plan",
                                lineItems: [{
                                        plan: {
                                            appRecurringPricingDetails: {
                                                interval: "EVERY_30_DAYS",
                                                price: {
                                                    amount: 4.99,
                                                    currencyCode: "USD"
                                                }
                                            }
                                        }
                                    }],
                                returnUrl: process.env.APP_URL + ("?shop=" + shop + "&host=" + Buffer.from(shop + "/admin").toString("base64")),
                                test: true // [TODO] remove this
                            }
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appSubscriptionCreate];
                case 4:
                    error_27 = _c.sent();
                    console.error(error_27);
                    return [2 /*return*/, { status: false, error: error_27.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.subscribeBasicPlan = subscribeBasicPlan;
function subscribeProPlan(_a) {
    var _b;
    var admin = _a.admin, shop = _a.shop;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_28;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        throw Error("admin not defined");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin.graphql("#graphql\n            mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean!){\n                appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {\n                    userErrors {\n                        field\n                        message\n                    }\n                    appSubscription {\n                        id\n                    }\n                    confirmationUrl\n                }\n            }\n            ", {
                            variables: {
                                name: "Pro plan",
                                lineItems: [{
                                        plan: {
                                            appRecurringPricingDetails: {
                                                interval: "EVERY_30_DAYS",
                                                price: {
                                                    amount: 8.99,
                                                    currencyCode: "USD"
                                                }
                                            }
                                        }
                                    }],
                                returnUrl: process.env.APP_URL + ("?shop=" + shop + "&host=" + Buffer.from(shop + "/admin").toString("base64")),
                                test: true // [TODO] remove this
                            }
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.appSubscriptionCreate];
                case 4:
                    error_28 = _c.sent();
                    console.error(error_28);
                    return [2 /*return*/, { status: false, error: error_28.toString() }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.subscribeProPlan = subscribeProPlan;
