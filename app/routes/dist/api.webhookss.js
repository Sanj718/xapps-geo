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
exports.action = void 0;
// import db from '../db.server';
var shopify_server_1 = require("../shopify.server");
var index_server_1 = require("app/components/markets-sync/index.server");
// import { MarketsProcess } from 'app/components/markets-sync/index.server';
exports.action = function (_a) {
    var request = _a.request;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, topic, shop, session, payload, admin, _c, initMarketsProcess;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, shopify_server_1.authenticate.webhook(request)];
                case 1:
                    _b = _d.sent(), topic = _b.topic, shop = _b.shop, session = _b.session, payload = _b.payload, admin = _b.admin;
                    console.log("[INFO] Webhook received", topic, shop);
                    _c = topic;
                    switch (_c) {
                        case 'CUSTOMERS_DATA_REQUEST': return [3 /*break*/, 2];
                        case 'CUSTOMERS_REDACT': return [3 /*break*/, 2];
                        case 'SHOP_REDACT': return [3 /*break*/, 2];
                        case 'APP_SUBSCRIPTIONS_UPDATE': return [3 /*break*/, 2];
                        case "BULK_OPERATIONS_FINISH": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 6];
                case 2:
                    console.log("[INFO] App subscriptions update webhook", session, payload);
                    return [3 /*break*/, 7];
                case 3:
                    if (!(session && shop)) return [3 /*break*/, 5];
                    console.log("[INFO] Bulk operation finished webhook", session, payload);
                    initMarketsProcess = new index_server_1.MarketsProcess();
                    return [4 /*yield*/, initMarketsProcess.initSync({ admin: admin, session: session, bulkId: payload === null || payload === void 0 ? void 0 : payload.admin_graphql_api_id })];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: throw new Response('Unhandled webhook topic', { status: 404 });
                case 7: throw new Response();
            }
        });
    });
};
