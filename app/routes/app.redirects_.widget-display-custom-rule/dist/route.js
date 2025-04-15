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
var _helpers_1 = require("../../components/_helpers");
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var _actions_1 = require("./_actions");
var _loaders_1 = require("./_loaders");
var _actions_2 = require("app/components/_actions");
var env_1 = require("../../components/env");
var CodeEditor_client_1 = require("app/components/_common/CodeEditor.client");
var WidgetDisplayCustomRuleBanner_1 = require("../../components/popup-redirects/WidgetDisplayCustomRuleBanner");
var WidgetDisplayCustomRuleCodeBanner_1 = require("app/components/popup-redirects/WidgetDisplayCustomRuleCodeBanner");
var _a = _helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, env_1.RD_EMBED_APP_HANDLE) || {}, EMBED_APP_ID = _a.EMBED_APP_ID, EMBED_APP_HANDLE = _a.EMBED_APP_HANDLE;
exports.loader = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _loaders_1.handleLoaders(params)];
}); }); };
exports.action = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _actions_1.handleActions(params)];
}); }); };
function WidgetDisplayCustomRulePage() {
    var _a;
    var _b = react_2.useOutletContext(), shopInfo = _b.shopInfo, shopdb = _b.shopdb, activePlan = _b.activePlan, devPlan = _b.devPlan, veteranPlan = _b.veteranPlan, appId = _b.appId, appData = _b.appData;
    var _c = _helpers_1.planParser(activePlan), isProPlan = _c.isProPlan, isBasicPlan = _c.isBasicPlan, isFreePlan = _c.isFreePlan;
    var _d = react_2.useLoaderData(), allRedirects = _d.allRedirects, configs = _d.configs, widgetEditorStatus = _d.widgetEditorStatus, widgetEditorCode = _d.widgetEditorCode;
    var actionData = react_2.useActionData();
    var submit = react_2.useSubmit();
    var navigation = react_2.useNavigation();
    var navigate = react_2.useNavigate();
    var _e = react_1.useState(false), hasChange = _e[0], setHasChange = _e[1];
    var _f = react_1.useState(_helpers_1.defaultWidgetCode), customCode = _f[0], setCustomCode = _f[1];
    var _g = (configs === null || configs === void 0 ? void 0 : configs.data[0]) || {}, basicConfigs = _g.basicConfigs, advancedConfigs = _g.advancedConfigs, hideOnAllowedPages = _g.hideOnAllowedPages, allowedPages = _g.allowedPages;
    var _h = react_1.useState(__assign(__assign({}, _helpers_1.default_basic_configs), basicConfigs)), localConfigs = _h[0], setLocalConfigs = _h[1];
    var _j = react_1.useState(__assign(__assign({}, _helpers_1.default_advanced_configs), advancedConfigs)), localAdvancedConfigs = _j[0], setLocalAdvancedConfigs = _j[1];
    var secondaryLocales = (_a = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shopLocales) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return !item.primary; });
    // async function saveConfigs() {
    //   submit(
    //     {
    //       _action: ACTIONS.CreateUpdateConfigs,
    //       data: {
    //         basicConfigs: localConfigs,
    //         advancedConfigs: localAdvancedConfigs,
    //       },
    //     },
    //     requestHeaders,
    //   );
    // }
    function handleCustomCodeSave() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId)
                    return [2 /*return*/];
                submit({
                    _action: _actions_2.ACTIONS.WidgetDisplayCustomRuleCodeSave,
                    data: {
                        appId: appId,
                        data: customCode
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleCustomCodeStatus(value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId)
                    return [2 /*return*/];
                submit({
                    _action: _actions_2.ACTIONS.WidgetDisplayCustomRuleStatus,
                    data: {
                        appId: appId,
                        data: value
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    console.log('widgetEditorStatus', widgetEditorStatus);
    var loading = _helpers_1.loadingStates(navigation, [_actions_2.ACTIONS.WidgetDisplayCustomRuleCodeSave, _actions_2.ACTIONS.WidgetDisplayCustomRuleStatus]);
    return (React.createElement(polaris_1.Page, { fullWidth: true, compactTitle: true, title: "Widget display custom rule", backAction: {
            content: "Back",
            onAction: function () { return navigate("/app/redirects#code-editor", {
                viewTransition: true,
                preventScrollReset: true
            }); }
        }, primaryAction: { content: "Save", onAction: handleCustomCodeSave, loading: loading[_actions_2.ACTIONS.WidgetDisplayCustomRuleCodeSave + "Loading"] } },
        React.createElement(polaris_1.BlockStack, { gap: "400" },
            React.createElement(WidgetDisplayCustomRuleBanner_1["default"], null),
            React.createElement("div", { style: { position: "relative" } },
                React.createElement(react_1.Suspense, { fallback: React.createElement(polaris_1.Spinner, { size: "small" }) },
                    React.createElement(react_2.Await, { resolve: widgetEditorStatus }, function (status) {
                        return React.createElement(polaris_1.Select, { label: "Status: ", labelInline: true, options: [
                                { label: "Active", value: "true" },
                                { label: "Draft", value: "false" },
                            ], disabled: loading[_actions_2.ACTIONS.WidgetDisplayCustomRuleStatus + "Loading"] || !isProPlan, onChange: isProPlan
                                ? function (value) { return handleCustomCodeStatus(value); }
                                : undefined, value: status === null || status === void 0 ? void 0 : status.value });
                    }),
                    loading[_actions_2.ACTIONS.WidgetDisplayCustomRuleStatus + "Loading"] && (React.createElement("div", { style: { position: "absolute", top: "6px", right: "8px", zIndex: 10 } },
                        React.createElement(polaris_1.Spinner, { size: "small" }))))),
            React.createElement(polaris_1.Card, null,
                React.createElement(WidgetDisplayCustomRuleCodeBanner_1["default"], null),
                React.createElement("br", null),
                React.createElement(react_1.Suspense, { fallback: React.createElement(polaris_1.Spinner, { size: "small" }) },
                    React.createElement(react_2.Await, { resolve: widgetEditorCode }, function (code) {
                        return React.createElement(CodeEditor_client_1["default"], { code: (code === null || code === void 0 ? void 0 : code.value) || _helpers_1.defaultWidgetCode, onChange: isProPlan ? setCustomCode : function () { }, language: "javascript" });
                    }))))));
}
exports["default"] = WidgetDisplayCustomRulePage;
