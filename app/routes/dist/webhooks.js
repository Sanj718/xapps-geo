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
// import { MarketsProcess } from 'app/components/markets-sync/index.server';
exports.action = function (_a) {
    var request = _a.request;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, topic, shop, session, payload, admin;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, shopify_server_1.authenticate.webhook(request)];
                case 1:
                    _b = _c.sent(), topic = _b.topic, shop = _b.shop, session = _b.session, payload = _b.payload, admin = _b.admin;
                    console.log("[INFO] Webhook received", topic, shop);
                    switch (topic) {
                        case 'APP_UNINSTALLED':
                            // Webhook requests can trigger after an app is uninstalled
                            // If the app is already uninstalled, the session may be undefined.
                            if (session) {
                                // await db.session.deleteMany({where: {shop}});
                            }
                            break;
                        case 'CUSTOMERS_DATA_REQUEST':
                        case 'CUSTOMERS_REDACT':
                        case 'SHOP_REDACT':
                        case "BULK_OPERATIONS_FINISH":
                            if (session && shop) {
                                console.log("[INFO] Bulk operation finished webhook", session, payload);
                                // bulkOperationProcess({ shop, session, payload });
                                // const initMarketsProcess = new MarketsProcess();
                                // await initMarketsProcess.initSync({admin, session});
                            }
                            break;
                        default:
                            throw new Response('Unhandled webhook topic', { status: 404 });
                    }
                    throw new Response();
            }
        });
    });
};
// async function bulkOperationProcess({ shop, session, payload }) {
//     const response = await getShopConfigsAndSession({ shop });
//     const {
//       dyid,
//       accessToken,
//       custom_parser,
//       sync_bulk_id,
//       parser_enabled,
//       aws_access_key,
//       aws_secret_key,
//     } = response;
//     if (sync_bulk_id !== payload?.admin_graphql_api_id) {
//       console.log("[INFO] Bulk ID not matched");
//       return;
//     }
//     if (
//       accessToken &&
//       dyid &&
//       aws_access_key &&
//       aws_secret_key &&
//       payload?.status === "completed"
//     ) {
//       setDYSyncLoading({ shop, status: true });
//       const product_sync = new ProductsSync({
//         shop: session.shop,
//         accessToken: session.accessToken,
//         accessKey: aws_access_key,
//         secretKey: aws_secret_key,
//         dyId: dyid,
//         customParser: custom_parser || "",
//         customParserEnabled: parser_enabled,
//       });
//       console.log("[INFO] Bulk webhook started")
//       product_sync.syncToS3Init(payload?.admin_graphql_api_id);
//     } else {
//       setSyncError({
//         shop,
//         error_msg:
//           payload?.status !== "completed"
//             ? "[Bulk Operation Error]:" + payload?.error_code
//             : "[Required params not found]: accessToken || dyid || aws_access_key || aws_secret_key",
//       });
//     }
//   }
