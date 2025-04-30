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
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
var react_1 = require("react");
var countries_json_1 = require("../../assets/countries.json");
var react_2 = require("@remix-run/react");
var _helpers_1 = require("../_helpers");
var ListWithTags_1 = require("../_common/ListWithTags");
var PromoBadge_1 = require("../_common/PromoBadge");
var CustomComboBox_1 = require("../_common/CustomComboBox");
var _actions_1 = require("../_actions");
var continents = [
    { value: "AF", label: "Africa" },
    { value: "AN", label: "Antarctica" },
    { value: "AS", label: "Asia" },
    { value: "EU", label: "Europe" },
    { value: "NA", label: "North america" },
    { value: "OC", label: "Oceania" },
    { value: "SA", label: "South america" },
];
var pageTemplates = [
    "all",
    "index",
    "product",
    "collection",
    "page",
    "blog",
    "article",
    "cart",
    "password",
    "404",
    "search",
    "account pages",
];
function PopupDisplaySettings(_a) {
    var configs = _a.configs;
    var _b = react_2.useOutletContext(), shopInfo = _b.shopInfo, shopdb = _b.shopdb, activePlan = _b.activePlan, devPlan = _b.devPlan, veteranPlan = _b.veteranPlan, appId = _b.appId, appData = _b.appData;
    var _c = _helpers_1.planParser(activePlan), isProPlan = _c.isProPlan, isBasicPlan = _c.isBasicPlan, isFreePlan = _c.isFreePlan;
    var _d = (configs === null || configs === void 0 ? void 0 : configs.data[0]) || {}, basicConfigs = _d.basicConfigs, advancedConfigs = _d.advancedConfigs, hideOnAllowedPages = _d.hideOnAllowedPages, allowedPages = _d.allowedPages;
    var submit = react_2.useSubmit();
    var navigation = react_2.useNavigation();
    var _e = react_1.useState(__assign(__assign({}, _helpers_1.default_basic_configs), basicConfigs)), localConfigs = _e[0], setLocalConfigs = _e[1];
    var _f = react_1.useState(hideOnAllowedPages || false), localHidePages = _f[0], setLocalHidePages = _f[1];
    var _g = react_1.useState(allowedPages || ["all"]), localAllowedPages = _g[0], setLocalAllowedPages = _g[1];
    var countries = _helpers_1.parseCountryCodesWithFullNames(countries_json_1["default"]);
    function handleShowRulesChange(value) {
        var newGeo = false;
        var newAuto = false;
        if (value === "autoGeo") {
            newGeo = true;
            newAuto = true;
        }
        else if (value === "auto") {
            newGeo = false;
            newAuto = true;
        }
        setLocalConfigs(function (current) { return (__assign(__assign({}, current), { automaticShow: newAuto, geo: newGeo })); });
    }
    function savePageVisibility() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_1.ACTIONS.create_AllowedPages,
                    data: {
                        allowedPages: localAllowedPages,
                        hideOnAllowedPages: localHidePages
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function saveConfigs() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_1.ACTIONS.create_UpdateConfigs,
                    data: {
                        basicConfigs: localConfigs,
                        advancedConfigs: advancedConfigs
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.create_UpdateConfigs, _actions_1.ACTIONS.create_AllowedPages]);
    return (react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
        react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
            react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                    react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Popup display settings"),
                    react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Control how often and where the popup appears, including frequency, rules, and targeting by country or continent.")))),
        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                    react_1["default"].createElement(PromoBadge_1["default"], { type: "basic" }),
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200", columns: "2" },
                            react_1["default"].createElement(polaris_1.Select, { label: react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", blockAlign: "center" },
                                    "Display frequency",
                                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null,
                                            react_1["default"].createElement("p", null,
                                                react_1["default"].createElement("strong", null, "Every browser session:"),
                                                " ",
                                                "Shown once per session; lasts until browser/tab closes."),
                                            react_1["default"].createElement("p", null,
                                                react_1["default"].createElement("strong", null, "Every 7 days (cookies):"),
                                                " ",
                                                "Shown once, then hidden for 7 days (after close)."),
                                            react_1["default"].createElement("p", null,
                                                react_1["default"].createElement("strong", null, "Every page load:"),
                                                " Shown on every page load.")) },
                                        react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))), options: [
                                    {
                                        label: "Every browser session",
                                        value: "session"
                                    },
                                    {
                                        label: "Every page load",
                                        value: "everyload"
                                    },
                                    {
                                        label: "Every 7 days (cookies)",
                                        value: "cookie"
                                    },
                                ], onChange: !isFreePlan
                                    ? function (value) {
                                        return setLocalConfigs(function (current) { return (__assign(__assign({}, current), { show: value })); });
                                    }
                                    : undefined, value: localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.show, disabled: isFreePlan }),
                            react_1["default"].createElement(polaris_1.Select, { label: react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", blockAlign: "center" },
                                    "Display rules",
                                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null,
                                            react_1["default"].createElement("p", null,
                                                react_1["default"].createElement("strong", null, "Automatic GEO Location:"),
                                                " ",
                                                "Automatically based on visitors geolocation."),
                                            react_1["default"].createElement("p", null,
                                                react_1["default"].createElement("strong", null, "Automatic (Non-GEO Location):"),
                                                " ",
                                                "Triggers actions automatically ignoring visitor's geolocation."),
                                            react_1["default"].createElement("p", null,
                                                react_1["default"].createElement("strong", null, "Manual (on custom element click):"),
                                                " ",
                                                "Requires a click to trigger.")) },
                                        react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))), labelAction: !(localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.automaticShow) && !(localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.geo) ? { content: "How to add custom link?", target: "_blank", url: "https://geolocationredirects-xapps.tawk.help/article/how-to-add-custom-buttonlink-to-open-popup" } : {}, options: [
                                    {
                                        label: "Automatic GEO Location",
                                        value: "autoGeo"
                                    },
                                    {
                                        label: "Automatic (non GEO Location)",
                                        value: "auto"
                                    },
                                    {
                                        label: "Manual (on custom element click)",
                                        value: "manual"
                                    },
                                ], onChange: !isFreePlan ? handleShowRulesChange : undefined, value: (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.automaticShow) && (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.geo)
                                    ? "autoGeo"
                                    : (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.automaticShow) ? "auto"
                                        : "manual", disabled: isFreePlan })),
                        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "20% 20% 1fr" }, gap: "200" },
                            react_1["default"].createElement(polaris_1.Select, { label: "Display popup logic", labelHidden: true, disabled: !(localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.geo), options: [
                                    {
                                        label: "Outside",
                                        value: "except"
                                    },
                                    {
                                        label: "Inside",
                                        value: "include"
                                    },
                                ], onChange: function (value) {
                                    return setLocalConfigs(function (current) { return (__assign(__assign({}, current), { reverseGeo: value === "include" ? true : false })); });
                                }, value: (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.reverseGeo) ? "include" : "except" }),
                            react_1["default"].createElement(polaris_1.Select, { label: "Location type", labelHidden: true, disabled: !(localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.geo), options: [
                                    { label: "Continents", value: "continent" },
                                    { label: "Countries", value: "country" },
                                ], onChange: function (value) {
                                    return setLocalConfigs(function (current) { return (__assign(__assign({}, current), { location: value })); });
                                }, value: localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.location }),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("div", { style: {
                                        display: (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.location) === "continent"
                                            ? "block"
                                            : "none"
                                    } },
                                    react_1["default"].createElement(ListWithTags_1["default"]
                                    // @ts-ignore
                                    , { 
                                        // @ts-ignore
                                        list: continents, setConfigs: setLocalConfigs, configs: localConfigs, id: "continents", helpText: "", placeholder: "Select continents" })),
                                react_1["default"].createElement("div", { style: {
                                        display: (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.location) === "country"
                                            ? "block"
                                            : "none"
                                    } },
                                    react_1["default"].createElement(ListWithTags_1["default"], { list: countries, setConfigs: setLocalConfigs, configs: localConfigs, id: "countries", helpText: "", placeholder: "Select countries" }))))),
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                        react_1["default"].createElement(polaris_1.Button, { variant: "primary", onClick: saveConfigs, loading: loading[_actions_1.ACTIONS.create_UpdateConfigs + "Loading"] }, "Save")))),
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(PromoBadge_1["default"], { type: "pro" })),
                        react_1["default"].createElement(polaris_1.Grid, { columns: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 } },
                            react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                                react_1["default"].createElement(polaris_1.InlineStack, { gap: "150", blockAlign: "center" },
                                    "Page visibility",
                                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, "Manage where the popup appears by selecting specific page templates or custom URLs, giving you full control over its visibility on your site.") },
                                        react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))),
                                react_1["default"].createElement("div", { className: isProPlan ? "" : "vvisually-disabled" },
                                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200", columns: { xs: "1fr", md: "1fr 5fr" } },
                                        react_1["default"].createElement(polaris_1.Select, { disabled: !isProPlan, label: "hide/show on selected pages/templates", labelHidden: true, options: [
                                                {
                                                    label: "Show on",
                                                    value: "show"
                                                },
                                                {
                                                    label: "Hide on",
                                                    value: "hide"
                                                },
                                            ], onChange: function (value) {
                                                return setLocalHidePages(value === "hide" ? true : false);
                                            }, value: localHidePages
                                                ? "hide"
                                                : "show" }),
                                        react_1["default"].createElement(CustomComboBox_1.CustomComboBox, { disabled: !isProPlan, optionsList: pageTemplates, defaultSelected: ["all"], selectedItems: localAllowedPages, setSelectedItems: function (value) {
                                                return setLocalAllowedPages(value);
                                            } })))))),
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                        react_1["default"].createElement(polaris_1.Button, { disabled: !isProPlan, variant: "primary", loading: loading[_actions_1.ACTIONS.create_AllowedPages + "Loading"], onClick: isProPlan ? savePageVisibility : undefined }, "Save")))))));
}
exports["default"] = PopupDisplaySettings;
