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
exports.action = exports.loader = void 0;
var polaris_1 = require("@shopify/polaris");
var react_1 = require("react");
var _helpers_1 = require("../../components/_helpers");
// import { getEmbedConst, isJson, defaultState } from "app/components/_helpers";
// import { MarketsSettings } from "../../components/MarketsSettings";
// import MarketsPopupControls from "../components/markets-popup/MarketsPopupControls";
// import MarketsAutoControls from "../components/markets-auto-redirects/MarketsAutoControls";
// import MarketsAutoSettings from "../components/markets-auto-redirects/MarketsAutoSettings";
// import MarketsContentStyle from "../components/markets-popup/MarketsContentStyle";
// import MarketsPopupDisplaySettings from "../components/markets-popup/MarketsPopupDisplaySettings";
// import MarketsOtherSettings from "../components/markets-popup/MarketsOtherSettings";
var _actions_1 = require("./_actions");
var _loaders_1 = require("./_loaders");
var env_1 = require("../../components/env");
var PageTitle_1 = require("app/components/_common/PageTitle");
var polaris_icons_1 = require("@shopify/polaris-icons");
var MarketsOtherSettings_1 = require("app/components/markets-popup/MarketsOtherSettings");
var MarketsAutoSettings_1 = require("app/components/markets-auto-redirects/MarketsAutoSettings");
var MarketsPopupControls_1 = require("app/components/markets-popup/MarketsPopupControls");
var react_2 = require("@remix-run/react");
var _actions_2 = require("app/components/_actions");
var locales_json_1 = require("../../components/locales.json");
var MarketsPopupDisplaySettings_1 = require("app/components/markets-popup/MarketsPopupDisplaySettings");
var MarketsAutoControls_1 = require("app/components/markets-auto-redirects/MarketsAutoControls");
var MarketsContentStyle_1 = require("app/components/markets-popup/MarketsContentStyle");
var _a = _helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, env_1.MK_EMBED_APP_HANDLE) || {}, EMBED_APP_ID = _a.EMBED_APP_ID, EMBED_APP_HANDLE = _a.EMBED_APP_HANDLE;
exports.loader = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _loaders_1.handleLoaders(params)];
}); }); };
exports.action = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _actions_1.handleActions(params)];
}); }); };
var mainTabs = [
    {
        id: "markets-popup",
        content: "Markets popup"
    },
    {
        id: "markets-auto",
        content: "Markets auto redirect"
    },
];
var timesRun = 0;
var interval;
function MarketsRedirects() {
    var _a, _b, _c, _d;
    var _e = react_2.useOutletContext(), shopInfo = _e.shopInfo, shopdb = _e.shopdb, activePlan = _e.activePlan, devPlan = _e.devPlan, veteranPlan = _e.veteranPlan, appId = _e.appId, appData = _e.appData;
    var _f = _helpers_1.planParser(activePlan), isProPlan = _f.isProPlan, isBasicPlan = _f.isBasicPlan, isFreePlan = _f.isFreePlan;
    var _g = react_2.useLoaderData(), themeEmbedData = _g.themeEmbedData, marketsConfigs = _g.marketsConfigs, marketsData = _g.marketsData;
    var _h = react_2.useSearchParams(), searchParams = _h[0], setSearchParams = _h[1];
    var smUp = polaris_1.useBreakpoints().smUp;
    var submit = react_2.useSubmit();
    var actionData = react_2.useActionData();
    var _j = react_1.useState(false), marketsSyncLoading = _j[0], setMarketsSyncLoading = _j[1];
    var _k = react_1.useState(0), selectedTab = _k[0], setSelectedTab = _k[1];
    var _l = react_1.useState(null), active = _l[0], setActive = _l[1];
    var _m = react_1.useState(__assign(__assign({}, _helpers_1.default_markets_basic_configs), (_a = marketsConfigs === null || marketsConfigs === void 0 ? void 0 : marketsConfigs.data) === null || _a === void 0 ? void 0 : _a.basicConfigs)), localConfigs = _m[0], setLocalConfigs = _m[1];
    var _o = react_1.useState(__assign(__assign({}, _helpers_1.default_advanced_configs), (_b = marketsConfigs === null || marketsConfigs === void 0 ? void 0 : marketsConfigs.data) === null || _b === void 0 ? void 0 : _b.advancedConfigs)), localAdvancedConfigs = _o[0], setLocalAdvancedConfigs = _o[1];
    react_1.useMemo(function () {
        var _a;
        if ((_a = themeEmbedData === null || themeEmbedData === void 0 ? void 0 : themeEmbedData.current) === null || _a === void 0 ? void 0 : _a.blocks) {
            var checkMarkets_1 = false;
            Object.entries(themeEmbedData.current.blocks).forEach(function (_a) {
                var item = _a[0], value = _a[1];
                if (value.type.includes(EMBED_APP_ID) &&
                    value.type.includes(EMBED_APP_HANDLE) &&
                    !value.disabled) {
                    checkMarkets_1 = true;
                }
            });
            if (checkMarkets_1) {
                setActive(checkMarkets_1);
            }
        }
    }, [themeEmbedData]);
    react_1.useMemo(function () {
        var _a, _b, _c;
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_2.ACTIONS.get_MarketsSyncStatus && (actionData === null || actionData === void 0 ? void 0 : actionData.status)) {
            if (((_a = actionData === null || actionData === void 0 ? void 0 : actionData.data) === null || _a === void 0 ? void 0 : _a.syncStatus) !== "") {
                setMarketsSyncLoading(false);
                clearInterval(interval);
            }
            if (((_b = actionData === null || actionData === void 0 ? void 0 : actionData.data) === null || _b === void 0 ? void 0 : _b.syncStatus) === "SUCCESS") {
                shopify.toast.show(locales_json_1["default"].responses.success_markets);
            }
            if (((_c = actionData === null || actionData === void 0 ? void 0 : actionData.data) === null || _c === void 0 ? void 0 : _c.syncStatus) === "ERROR") {
                shopify.toast.show(locales_json_1["default"].responses.error_markets);
            }
        }
    }, [actionData]);
    function handleMarketsSync() {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!(shopdb === null || shopdb === void 0 ? void 0 : shopdb.id))
                    return [2 /*return*/];
                setMarketsSyncLoading(true);
                submit({
                    _action: _actions_2.ACTIONS.run_MarketsSync,
                    data: {
                        shopId: shopdb === null || shopdb === void 0 ? void 0 : shopdb.id
                    }
                }, _helpers_1.requestHeaders);
                setTimeout(function () {
                    saveConfigs();
                }, 1000);
                interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, checkMarketsStatus(interval)];
                }); }); }, 5000 // [TODO] Make this dynamic
                );
                return [2 /*return*/];
            });
        });
    }
    function saveConfigs() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_2.ACTIONS.update_MarketsConfigs,
                    data: {
                        basicConfigs: localConfigs,
                        advancedConfigs: localAdvancedConfigs
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function checkMarketsStatus(interval) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                timesRun++;
                if (timesRun > 30) {
                    timesRun = 0;
                    clearInterval(interval);
                    setMarketsSyncLoading(false);
                    shopify.toast.show(locales_json_1["default"].responses.error_markets);
                    return [2 /*return*/];
                }
                submit({
                    _action: _actions_2.ACTIONS.get_MarketsSyncStatus,
                    data: {
                        shopId: shopdb === null || shopdb === void 0 ? void 0 : shopdb.id
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    react_1.useMemo(function () {
        var tab = searchParams.get("tab");
        if (tab) {
            setSelectedTab(parseInt(tab));
        }
    }, [searchParams]);
    // console.log("marketsConfigs: ", marketsConfigs, localConfigs, localAdvancedConfigs);
    return (react_1["default"].createElement(polaris_1.Page, null,
        react_1["default"].createElement("div", { id: "main-screen" },
            react_1["default"].createElement(PageTitle_1.PageTitle, { icon: polaris_icons_1.MarketsIcon, title: "Markets redirects", status: active, loading: false, url: "shopify://admin/themes/current/editor?context=apps&activateAppId=" + EMBED_APP_ID + "/" + EMBED_APP_HANDLE }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(polaris_1.Tabs, { tabs: mainTabs, selected: selectedTab, onSelect: function (value) {
                    setSelectedTab(value);
                    var params = new URLSearchParams();
                    params.set("tab", value.toString());
                    setSearchParams(params, {
                        preventScrollReset: true
                    });
                }, fitted: true },
                react_1["default"].createElement("br", null),
                selectedTab === 0 ? (react_1["default"].createElement(polaris_1.BlockStack, { gap: { xs: "800", sm: "400" } },
                    react_1["default"].createElement(MarketsPopupControls_1["default"], { marketsData: marketsData === null || marketsData === void 0 ? void 0 : marketsData.data, marketsSync: handleMarketsSync, marketsSyncLoading: marketsSyncLoading, marketsPopup: (_c = marketsConfigs === null || marketsConfigs === void 0 ? void 0 : marketsConfigs.data) === null || _c === void 0 ? void 0 : _c.widget }),
                    smUp ? react_1["default"].createElement(polaris_1.Divider, null) : null,
                    react_1["default"].createElement(MarketsContentStyle_1["default"], { marketsData: marketsData, configs: localConfigs, advancedConfigs: localAdvancedConfigs }),
                    smUp ? react_1["default"].createElement(polaris_1.Divider, null) : null,
                    react_1["default"].createElement(MarketsPopupDisplaySettings_1["default"], { configs: localConfigs, setConfigs: setLocalConfigs, advancedConfigs: localAdvancedConfigs }),
                    smUp ? react_1["default"].createElement(polaris_1.Divider, null) : null,
                    react_1["default"].createElement(MarketsOtherSettings_1["default"], null))) : (""),
                selectedTab === 1 ? (react_1["default"].createElement(polaris_1.BlockStack, { gap: { xs: "800", sm: "400" } },
                    react_1["default"].createElement(MarketsAutoControls_1["default"], { marketsData: marketsData === null || marketsData === void 0 ? void 0 : marketsData.data, marketsSync: handleMarketsSync, marketsSyncLoading: marketsSyncLoading, marketRedirect: (_d = marketsConfigs === null || marketsConfigs === void 0 ? void 0 : marketsConfigs.data) === null || _d === void 0 ? void 0 : _d.autoRedirect }),
                    smUp ? react_1["default"].createElement(polaris_1.Divider, null) : null,
                    react_1["default"].createElement(MarketsAutoSettings_1["default"], null))) : ("")),
            react_1["default"].createElement("br", null))));
}
exports["default"] = MarketsRedirects;
// useMemo(() => {
//   const sLocales = shopData?.locales?.filter((item) => !item.primary) || null;
//   setSecondaryLocales(sLocales);
// }, [shopData]);
// async function loadMarkets() {
//   let error = true;
//   let msg = tr.responses.error;
//   // await getLocalShopData();
//   try {
//     const response = await fetch(GET_SYNCED_MARKETS);
//     const responseJson = await response.json();
//     if (responseJson?.status) {
//       setMarketsData(responseJson?.data);
//       error = false;
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   if (error) {
//     setToastData({
//       error,
//       msg,
//     });
//   }
// }
// async function loadSettings() {
//   let error = true;
//   let msg = tr.responses.error_settings_load;
//   try {
//     const response = await fetch(GET_MARKET_CONFIGS);
//     const responseJson = await response.json();
//     if (responseJson?.data && responseJson?.data[0]) {
//       const storeSavedConfigs = JSON.parse(
//         responseJson.data[0].basic_configs
//       );
//       const storeSavedAdvancedConfigs = JSON.parse(
//         responseJson.data[0].advanced_configs
//       );
//       const widgetStatus = responseJson?.data[0]?.widget;
//       const autoRedirectStatus = responseJson?.data[0]?.auto_redirect;
//       setMarketsPopup(widgetStatus);
//       setMarketRedirect(autoRedirectStatus);
//       setConfigs({ ...configs, ...storeSavedConfigs });
//       setAdvancedConfigs({
//         ...advancedConfigs,
//         ...storeSavedAdvancedConfigs,
//       });
//       setLocalConfigs({ ...configs, ...storeSavedConfigs });
//       setLocalAdvancedConfigs({
//         ...advancedConfigs,
//         ...storeSavedAdvancedConfigs,
//       });
//       error = false;
//     } else {
//       setNoConfigs(true);
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   if (error) {
//     setToastData({
//       error,
//       msg,
//     });
//   }
// }
// async function loadEmbedData() {
//   try {
//     const response = await fetch(CHECK_EMBED);
//     const responseJson = await response.json();
//     if (responseJson?.data) {
//       const parsedValue =
//         isJson(responseJson.data) && JSON.parse(responseJson.data);
//       if (parsedValue?.current?.blocks) {
//         const check = Object.entries(parsedValue.current.blocks).find(
//           ([item, value]) => {
//             return (
//               value.type.includes(EMBED_APP_ID) &&
//               value.type.includes(EMBED_APP_HANDLE) &&
//               !value.disabled
//             );
//           }
//         );
//         setActive(check);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
// useMemo(async () => {
//   Promise.all([loadMarkets(), loadSettings(), loadEmbedData()])
//     .then((results) => {
//       setInitialLoading(false);
//     })
//     .catch((error) => {
//       console.error("Error occurred while executing methods: ", error);
//     });
// }, [refetchSettings]);
