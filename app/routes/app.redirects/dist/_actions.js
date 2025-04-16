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
exports.handleActions = void 0;
var admin_queries_server_1 = require("app/admin-queries.server");
var _actions_1 = require("app/components/_actions");
var db_queries_server_1 = require("app/db-queries.server");
var shopify_server_1 = require("app/shopify.server");
function handleActions(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var _b, admin, session, _c, _action, data, response, response, response, response, response, response, response, response, response, response, response, response;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, shopify_server_1.authenticate.admin(request)];
                case 1:
                    _b = _d.sent(), admin = _b.admin, session = _b.session;
                    return [4 /*yield*/, (request === null || request === void 0 ? void 0 : request.json())];
                case 2:
                    _c = (_d.sent()) || {}, _action = _c._action, data = _c.data;
                    if (!(_action === _actions_1.ACTIONS.AssetsData)) return [3 /*break*/, 4];
                    return [4 /*yield*/, _actions_1.getAssets({ admin: admin, data: data })];
                case 3:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 4:
                    if (!(_action === _actions_1.ACTIONS.ToggleRedirectStatus)) return [3 /*break*/, 6];
                    return [4 /*yield*/, db_queries_server_1.updateRedirectStatus(__assign({ admin: admin }, data))];
                case 5:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 6:
                    if (!(_action === _actions_1.ACTIONS.ReorderRedirect)) return [3 /*break*/, 8];
                    return [4 /*yield*/, db_queries_server_1.reorderRedirect(__assign(__assign({ admin: admin }, data), { shop: session.shop }))];
                case 7:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 8:
                    if (!(_action === _actions_1.ACTIONS.AddRedirect)) return [3 /*break*/, 10];
                    return [4 /*yield*/, db_queries_server_1.createRedirect(__assign({ admin: admin }, data))];
                case 9:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 10:
                    if (!(_action === _actions_1.ACTIONS.DeleteRedirect)) return [3 /*break*/, 12];
                    return [4 /*yield*/, db_queries_server_1.deleteRedirect(__assign(__assign({ admin: admin }, data), { shop: session.shop }))];
                case 11:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 12:
                    if (!(_action === _actions_1.ACTIONS.UpdateRedirect)) return [3 /*break*/, 14];
                    return [4 /*yield*/, db_queries_server_1.updateRedirect(__assign({ admin: admin }, data))];
                case 13:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 14:
                    if (!(_action === _actions_1.ACTIONS.CreateUpdateConfigs)) return [3 /*break*/, 16];
                    return [4 /*yield*/, db_queries_server_1.createUpdateConfigs(__assign({ shop: session.shop }, data))];
                case 15:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 16:
                    if (!(_action === _actions_1.ACTIONS.CreateAllowedPages)) return [3 /*break*/, 18];
                    return [4 /*yield*/, db_queries_server_1.createUpdateAllowedPages(__assign({ shop: session.shop }, data))];
                case 17:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 18:
                    if (!(_action === _actions_1.ACTIONS.WidgetDisplayCustomRuleStatus)) return [3 /*break*/, 20];
                    return [4 /*yield*/, admin_queries_server_1.saveWidgetEditorStatusToMetafield({ admin: admin, appId: data.appId, value: data.data })];
                case 19:
                    response = _d.sent();
                    console.log("response", response);
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 20:
                    if (!(_action === _actions_1.ACTIONS.WidgetDisplayCustomRuleCodeSave)) return [3 /*break*/, 22];
                    return [4 /*yield*/, admin_queries_server_1.saveWidgetEditorCodeToMetafield({ admin: admin, appId: data.appId, value: data.data })];
                case 21:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 22:
                    if (!(_action === _actions_1.ACTIONS.ButtonDisplayCustomRuleStatus)) return [3 /*break*/, 24];
                    return [4 /*yield*/, admin_queries_server_1.saveButtonEditorStatusToMetafield({ admin: admin, appId: data.appId, value: data.data })];
                case 23:
                    response = _d.sent();
                    console.log("response", response);
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 24:
                    if (!(_action === _actions_1.ACTIONS.ButtonDisplayCustomRuleCodeSave)) return [3 /*break*/, 26];
                    return [4 /*yield*/, admin_queries_server_1.saveButtonEditorCodeToMetafield({ admin: admin, appId: data.appId, value: data.data })];
                case 25:
                    response = _d.sent();
                    return [2 /*return*/, __assign({ _action: _action }, response)];
                case 26: return [2 /*return*/, {}];
            }
        });
    });
}
exports.handleActions = handleActions;
