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
exports.getButtonEditorCode = exports.getButtonEditorStatus = exports.saveButtonEditorCodeToMetafield = exports.saveButtonEditorStatusToMetafield = exports.getWidgetEditorCode = exports.getWidgetEditorStatus = exports.saveWidgetEditorCodeToMetafield = exports.saveWidgetEditorStatusToMetafield = exports.getThemeEmbed = void 0;
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
function saveWidgetEditorStatusToMetafield(_a) {
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
exports.saveWidgetEditorStatusToMetafield = saveWidgetEditorStatusToMetafield;
function saveWidgetEditorCodeToMetafield(_a) {
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
exports.saveWidgetEditorCodeToMetafield = saveWidgetEditorCodeToMetafield;
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
function saveButtonEditorStatusToMetafield(_a) {
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
exports.saveButtonEditorStatusToMetafield = saveButtonEditorStatusToMetafield;
function saveButtonEditorCodeToMetafield(_a) {
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
exports.saveButtonEditorCodeToMetafield = saveButtonEditorCodeToMetafield;
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
