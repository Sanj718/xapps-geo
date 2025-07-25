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
var react_1 = require("react");
var polaris_icons_1 = require("@shopify/polaris-icons");
var ExternalSettingsItem_1 = require("../_common/ExternalSettingsItem");
var PromoBadge_1 = require("../_common/PromoBadge");
var _helpers_1 = require("../_helpers");
var react_2 = require("@remix-run/react");
var env_1 = require("../env");
var _actions_1 = require("../_actions");
var _a = _helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, env_1.RD_EMBED_APP_HANDLE) || {}, EMBED_APP_ID = _a.EMBED_APP_ID, EMBED_APP_HANDLE = _a.EMBED_APP_HANDLE;
function OtherSettings(_a) {
    var configs = _a.configs;
    var _b = react_2.useOutletContext(), shopInfo = _b.shopInfo, shopdb = _b.shopdb, activePlan = _b.activePlan, devPlan = _b.devPlan, veteranPlan = _b.veteranPlan, appId = _b.appId, appData = _b.appData;
    var isFreePlan = _helpers_1.planParser(activePlan).isFreePlan;
    var _c = (configs === null || configs === void 0 ? void 0 : configs.data[0]) || {}, basicConfigs = _c.basicConfigs, advancedConfigs = _c.advancedConfigs, hideOnAllowedPages = _c.hideOnAllowedPages, allowedPages = _c.allowedPages;
    var _d = react_1.useState(__assign(__assign({}, _helpers_1.default_basic_configs), basicConfigs)), localConfigs = _d[0], setLocalConfigs = _d[1];
    var submit = react_2.useSubmit();
    var navigation = react_2.useNavigation();
    var settingsItems = [
        {
            label: "Preview mode",
            text: "You can activate the Preview mode to view your current popup in the Theme Customizer. This mode bypasses all GEO location rules, allowing you to see the popup as it appears.",
            url: "shopify://admin/themes/current/editor?context=apps&activateAppId=" + EMBED_APP_ID + "/" + EMBED_APP_HANDLE
        },
        {
            label: "Emergency disable Popup",
            text: "Instantly deactivate the popup across your site in case of an urgent need, ensuring uninterrupted user experience.",
            url: "shopify://admin/themes/current/editor?context=apps&activateAppId=" + EMBED_APP_ID + "/" + EMBED_APP_HANDLE
        },
        {
            label: "Custom Link/Button Icon",
            text: "Prepend custom icons to your links when the display rules are configured to \"Manual,\" adding a personalized touch to your design.",
            url: "shopify://admin/themes/current/editor?context=apps&activateAppId=" + EMBED_APP_ID + "/" + EMBED_APP_HANDLE,
            link: "https://geolocationredirects-xapps.tawk.help/article/how-to-add-custom-buttonlink-to-open-popup"
        },
    ];
    function saveOtherConfigs() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_1.ACTIONS.update_RedirectsConfigs,
                    data: {
                        basicConfigs: localConfigs,
                        advancedConfigs: advancedConfigs
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.update_RedirectsConfigs]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Other settings"),
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Select or add the pages where you would like the popup to be displayed or hidden.")))),
            react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                        react_1["default"].createElement(PromoBadge_1["default"], { type: "basic" }),
                        react_1["default"].createElement(polaris_1.TextField, { label: "SEO Link rel attribute", helpText: react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs" },
                                "For certain links on your site, you might want to tell Google your relationship with the linked page.",
                                " ",
                                react_1["default"].createElement(polaris_1.Link, { target: "_blank", url: "https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links" }, "Read more")), autoComplete: "false", value: localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.custom_rell_attr, disabled: isFreePlan, onChange: !isFreePlan
                                ? function (value) {
                                    return setLocalConfigs(function (current) { return (__assign(__assign({}, current), { custom_rell_attr: value })); });
                                }
                                : undefined }),
                        react_1["default"].createElement(polaris_1.Divider, null),
                        react_1["default"].createElement(polaris_1.InlineStack, { gap: "1200" },
                            react_1["default"].createElement(polaris_1.Checkbox, { disabled: isFreePlan, label: react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", blockAlign: "center" },
                                    "Forward URL Query params",
                                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, "Retains current URL parameters when redirecting to another page.") },
                                        react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))), checked: localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.forward_url_params, onChange: !isFreePlan
                                    ? function (value) {
                                        return setLocalConfigs(function (current) { return (__assign(__assign({}, current), { forward_url_params: value })); });
                                    }
                                    : undefined }),
                            react_1["default"].createElement(polaris_1.Checkbox, { disabled: isFreePlan, label: react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", blockAlign: "center" },
                                    "Global domain redirection",
                                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null,
                                            "Keeps you on the same page when switching to a new domain. For example, if you're on",
                                            " ",
                                            react_1["default"].createElement("code", null, "site.com/about"),
                                            ", you'll be redirected to",
                                            " ",
                                            react_1["default"].createElement("code", null, "new-site.com/about"),
                                            " without losing your path.",
                                            " ",
                                            react_1["default"].createElement("strong", null, "Applied to all redirect buttons.")) },
                                        react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))), checked: localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.domain_redirection, onChange: !isFreePlan
                                    ? function (value) {
                                        return setLocalConfigs(function (current) { return (__assign(__assign({}, current), { domain_redirection: value })); });
                                    }
                                    : undefined }))),
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                        react_1["default"].createElement(polaris_1.Button, { variant: "primary", onClick: !isFreePlan ? saveOtherConfigs : undefined, loading: loading[_actions_1.ACTIONS.update_RedirectsConfigs + "Loading"], disabled: isFreePlan }, "Save"))),
                react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "600" }, settingsItems.map(function (_a, index) {
                        var label = _a.label, text = _a.text, link = _a.link, url = _a.url;
                        return (react_1["default"].createElement(ExternalSettingsItem_1["default"], { key: index, label: label, text: text, url: url, link: link }));
                    })))))));
}
exports["default"] = OtherSettings;
