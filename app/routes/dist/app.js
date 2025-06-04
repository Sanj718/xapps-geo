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
exports.headers = exports.ErrorBoundary = exports.loader = exports.links = void 0;
var react_1 = require("@remix-run/react");
var server_1 = require("@shopify/shopify-app-remix/server");
var react_2 = require("@shopify/shopify-app-remix/react");
var app_bridge_react_1 = require("@shopify/app-bridge-react");
var styles_css_url_1 = require("@shopify/polaris/build/esm/styles.css?url");
var shopify_server_1 = require("../shopify.server");
var react_3 = require("react");
var _loaders_1 = require("../components/_loaders");
var admin_queries_server_1 = require("app/admin-queries.server");
require("../assets/custom.scss");
exports.links = function () { return [{ rel: "stylesheet", href: styles_css_url_1["default"] }]; };
exports.loader = function (_a) {
    var request = _a.request;
    return __awaiter(void 0, void 0, void 0, function () {
        var getShopdb, _b, admin, session, appData, shopInfo, shopdb, webhooks;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("../db-queries.server"); })];
                case 1:
                    getShopdb = (_c.sent()).getShopdb;
                    return [4 /*yield*/, shopify_server_1.authenticate.admin(request)];
                case 2:
                    _b = _c.sent(), admin = _b.admin, session = _b.session;
                    return [4 /*yield*/, _loaders_1.getApp(admin)];
                case 3:
                    appData = _c.sent();
                    return [4 /*yield*/, _loaders_1.getShop(admin)];
                case 4:
                    shopInfo = _c.sent();
                    return [4 /*yield*/, getShopdb({ shop: session.shop })];
                case 5:
                    shopdb = _c.sent();
                    admin_queries_server_1.registerBulkWebhookIfNotExists({ admin: admin });
                    return [4 /*yield*/, admin_queries_server_1.getAllRegisteredWebhooks({ admin: admin })];
                case 6:
                    webhooks = _c.sent();
                    console.log("webhooks: ", JSON.stringify(webhooks, null, 2));
                    return [2 /*return*/, {
                            apiKey: process.env.SHOPIFY_API_KEY || "",
                            appData: appData,
                            shopInfo: shopInfo,
                            shopdb: (shopdb === null || shopdb === void 0 ? void 0 : shopdb.status) ? __assign({}, shopdb.data) : {}
                        }];
            }
        });
    });
};
function App() {
    var _a = react_1.useLoaderData(), apiKey = _a.apiKey, appData = _a.appData, shopInfo = _a.shopInfo, shopdb = _a.shopdb;
    var _b = react_3.useState(), appId = _b[0], setAppId = _b[1];
    var _c = react_3.useState(), activePlan = _c[0], setActivePlan = _c[1];
    var _d = react_3.useState(false), devPlan = _d[0], setDevPlan = _d[1];
    var _e = react_3.useState(false), veteranPlan = _e[0], setVeteranPlan = _e[1];
    react_3.useMemo(function () {
        var _a, _b, _c;
        var activePlan = (_b = (_a = appData === null || appData === void 0 ? void 0 : appData.installation) === null || _a === void 0 ? void 0 : _a.activeSubscriptions) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.status === "ACTIVE"; });
        var appid = (_c = appData === null || appData === void 0 ? void 0 : appData.installation) === null || _c === void 0 ? void 0 : _c.id;
        setAppId(appid);
        if (shopdb) {
            setPlan(activePlan, shopdb);
        }
    }, [shopdb, appData]);
    function setPlan(activePlan, shopdb) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, veteran, dev, plan, shopifyPlanId, selectedPlan, isMatchingPlan, isProPlan, isBasicPlan, needsAdjustment;
            return __generator(this, function (_b) {
                _a = shopdb || {}, veteran = _a.veteran, dev = _a.dev, plan = _a.plan, shopifyPlanId = _a.shopifyPlanId;
                if (activePlan) {
                    selectedPlan = dev ? { name: "Pro plan" } : activePlan;
                    setActivePlan(selectedPlan);
                    isMatchingPlan = function (planName, planValue) {
                        return (activePlan === null || activePlan === void 0 ? void 0 : activePlan.status) === "ACTIVE" &&
                            (activePlan === null || activePlan === void 0 ? void 0 : activePlan.name) === planName &&
                            plan === planValue;
                    };
                    isProPlan = isMatchingPlan("Pro plan", 2);
                    isBasicPlan = isMatchingPlan("Basic plan", 1);
                    if (!dev) {
                        needsAdjustment = shopifyPlanId !== (activePlan === null || activePlan === void 0 ? void 0 : activePlan.id) ||
                            ((activePlan === null || activePlan === void 0 ? void 0 : activePlan.status) === "ACTIVE" && !(isProPlan || isBasicPlan));
                        if (needsAdjustment) {
                            // adjustClientPlan(activePlan, veteran);
                        }
                    }
                }
                else {
                    if (!dev && !veteran && plan !== 3) {
                        // console.log("**", veteran);
                        // adjustClientPlan(false, veteran);
                    }
                }
                if (dev) {
                    setActivePlan({ name: "Pro plan" });
                }
                else if (veteran) {
                    setActivePlan({ name: "Basic plan" });
                }
                setVeteranPlan(veteran ? true : false);
                setDevPlan(dev ? true : false);
                return [2 /*return*/];
            });
        });
    }
    function handleSideNavClick() {
        var mainScreen = document.getElementById('main-screen');
        if (mainScreen)
            mainScreen.innerHTML = "<div class=\"spinner\"></div>";
    }
    return (React.createElement(react_2.AppProvider, { isEmbeddedApp: true, apiKey: apiKey },
        React.createElement(app_bridge_react_1.NavMenu, null,
            React.createElement(react_1.Link, { to: "/app", viewTransition: true, onClick: function () { return handleSideNavClick(); } }, "Dashboard"),
            React.createElement(react_1.Link, { to: "/app/redirects", viewTransition: true, onClick: function () { return handleSideNavClick(); } }, "Custom redirects"),
            React.createElement(react_1.Link, { to: "/app/markets", viewTransition: true, onClick: function () { return handleSideNavClick(); } }, "Markets redirects"),
            React.createElement(react_1.Link, { to: "/app/billing", viewTransition: true, onClick: function () { return handleSideNavClick(); } }, "Billing")),
        React.createElement(react_1.Outlet, { context: {
                shopInfo: shopInfo,
                shopdb: shopdb,
                activePlan: activePlan,
                devPlan: devPlan,
                veteranPlan: veteranPlan,
                appId: appId,
                appData: appData
            } })));
}
exports["default"] = App;
// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
function ErrorBoundary() {
    return server_1.boundary.error(react_1.useRouteError());
}
exports.ErrorBoundary = ErrorBoundary;
exports.headers = function (headersArgs) {
    return server_1.boundary.headers(headersArgs);
};
