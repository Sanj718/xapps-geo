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
exports.getAssets = exports.ACTIONS = void 0;
var _helpers_1 = require("./_helpers");
exports.ACTIONS = {
    AnalyticsData: "analyticsData",
    AssetsData: "assetsData",
    AddRedirect: "addRedirect",
    DeleteRedirect: "deleteRedirect",
    UpdateRedirect: "updateRedirect",
    ToggleRedirectStatus: "toggleRedirectStatus",
    ReorderRedirect: "reorderRedirect",
    CreateUpdateConfigs: "createUpdateConfigs",
    CreateAllowedPages: "createAllowedPages",
    WidgetDisplayCustomRuleStatus: "widgetDisplayCustomRuleStatus",
    WidgetDisplayCustomRuleCodeSave: "widgetDisplayCustomRuleCodeSave",
    ButtonDisplayCustomRuleStatus: "buttonDisplayCustomRuleStatus",
    ButtonDisplayCustomRuleCodeSave: "buttonDisplayCustomRuleCodeSave"
};
exports.getAssets = function (_a) {
    var admin = _a.admin, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, cursor, isPrev, constructQuery, query, response, responseJson, e_1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!admin)
                        return [2 /*return*/, _helpers_1.resp(false, null, "admin not defined")];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    _b = data || {}, cursor = _b.cursor, isPrev = _b.isPrev;
                    constructQuery = function (isPrev) { return "#graphql\n    query GetAssets($cursor: String) {\n        files(" + (isPrev ? "last" : "first") + ": 10, " + (isPrev ? "before" : "after") + ": $cursor, reverse: true, query: \"media_type:image\") {\n            pageInfo {\n                hasPreviousPage\n                hasNextPage\n                startCursor\n                endCursor\n            }\n            edges {\n                node {\n                    createdAt\n                    alt\n                    ... on MediaImage {\n                        id\n                        image {\n                            id\n                            originalSrc: url\n                            width\n                            height\n                        }\n                    }\n                }\n            }\n        }\n    }"; };
                    query = constructQuery(isPrev);
                    return [4 /*yield*/, admin.graphql(query, {
                            variables: {
                                cursor: cursor
                            }
                        })];
                case 2:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _d.sent();
                    return [2 /*return*/, _helpers_1.resp(true, (_c = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _c === void 0 ? void 0 : _c.files, null)];
                case 4:
                    e_1 = _d.sent();
                    return [2 /*return*/, _helpers_1.resp(false, null, e_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
};
