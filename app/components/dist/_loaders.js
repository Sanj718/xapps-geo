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
exports.getThemeEmbed = exports.getShop = exports.getApp = void 0;
var _helpers_1 = require("./_helpers");
function getApp(_a) {
    var _b;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!admin)
                        return [2 /*return*/, _helpers_1.resp(false, null, "admin || id not defined")];
                    return [4 /*yield*/, admin.graphql("#graphql\n           {\n            app {\n              id\n              apiKey\n              title\n              installation{\n                id\n                activeSubscriptions{\n                  id\n                  name\n                  trialDays\n                  status\n                  createdAt\n                }\n              }\n            }\n          }\n      ", {})];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseJson = _c.sent();
                    return [2 /*return*/, (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.app];
            }
        });
    });
}
exports.getApp = getApp;
function getShop(_a) {
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!admin)
                        return [2 /*return*/, _helpers_1.resp(false, null, "admin || id not defined")];
                    return [4 /*yield*/, admin.graphql("#graphql\n          {\n            shop {\n              # id\n            #   contactEmail\n              email\n              # countriesInShippingZones {\n              #   countryCodes\n              #   includeRestOfWorld\n              # }\n              myshopifyDomain\n              # shipsToCountries\n              # url\n              name\n              plan {\n                displayName\n                partnerDevelopment\n                shopifyPlus\n              }\n              currencyCode\n              timezoneAbbreviation\n              ianaTimezone\n            }\n            shopLocales {\n              locale\n              primary\n              published\n            }\n          }\n      ", {})];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseJson = _b.sent();
                    return [2 /*return*/, responseJson === null || responseJson === void 0 ? void 0 : responseJson.data];
            }
        });
    });
}
exports.getShop = getShop;
function getThemeEmbed(_a) {
    var _b, _c, _d, _e, _f, _g;
    var admin = _a.admin;
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!admin)
                        return [2 /*return*/, _helpers_1.resp(false, null, "admin not defined")];
                    return [4 /*yield*/, admin.graphql("#graphql\n        query {\n            themes(first: 1, roles: [MAIN]) {\n                nodes {\n                    id\n                    files(\n                    filenames: [\"config/settings_data.json\"]\n                    first: 1\n                    ) {\n                    nodes {\n                        body {\n                        ... on OnlineStoreThemeFileBodyText {\n                            content\n                        } \n                        }\n                    }\n                    }\n                }\n            }\n        }")];
                case 1:
                    response = _h.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseJson = _h.sent();
                    return [2 /*return*/, (_g = (_f = (_e = (_d = (_c = (_b = responseJson === null || responseJson === void 0 ? void 0 : responseJson.data) === null || _b === void 0 ? void 0 : _b.themes) === null || _c === void 0 ? void 0 : _c.nodes[0]) === null || _d === void 0 ? void 0 : _d.files) === null || _e === void 0 ? void 0 : _e.nodes[0]) === null || _f === void 0 ? void 0 : _f.body) === null || _g === void 0 ? void 0 : _g.content];
            }
        });
    });
}
exports.getThemeEmbed = getThemeEmbed;
