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
var app_bridge_react_1 = require("@shopify/app-bridge-react");
var _helpers_1 = require("../_helpers");
var PopupContent_1 = require("../_common/PopupContent");
var react_2 = require("@remix-run/react");
var PromoBadge_1 = require("../_common/PromoBadge");
var RedirectsPopupPreview_1 = require("./RedirectsPopupPreview");
var react_3 = require("@shopify/shopify-app-remix/react");
var CustomizePopup_1 = require("./CustomizePopup");
var ImageManager_1 = require("../_common/ImageManager");
var IconSettings_1 = require("./IconSettings");
var _actions_1 = require("../_actions");
function ContentStyle(_a) {
    var _b;
    var redirects = _a.redirects, configs = _a.configs;
    var _c = react_2.useOutletContext(), shopInfo = _c.shopInfo, shopdb = _c.shopdb, activePlan = _c.activePlan, devPlan = _c.devPlan, veteranPlan = _c.veteranPlan, appId = _c.appId, appData = _c.appData;
    var _d = (configs === null || configs === void 0 ? void 0 : configs.data[0]) || {}, basicConfigs = _d.basicConfigs, advancedConfigs = _d.advancedConfigs, hideOnAllowedPages = _d.hideOnAllowedPages, allowedPages = _d.allowedPages;
    var submit = react_2.useSubmit();
    var navigation = react_2.useNavigation();
    var navigate = react_2.useNavigate();
    var _e = _helpers_1.planParser(activePlan), isProPlan = _e.isProPlan, isBasicPlan = _e.isBasicPlan, isFreePlan = _e.isFreePlan;
    var _f = react_1.useState(false), customizePopupVisibilityChange = _f[0], setCustomizePopupVisibilityChange = _f[1];
    var _g = react_1.useState(__assign(__assign({}, _helpers_1.default_basic_configs), basicConfigs)), localConfigs = _g[0], setLocalConfigs = _g[1];
    var _h = react_1.useState(__assign(__assign({}, _helpers_1.default_advanced_configs), advancedConfigs)), localAdvancedConfigs = _h[0], setLocalAdvancedConfigs = _h[1];
    var secondaryLocales = (_b = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shopLocales) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return !item.primary; });
    function saveConfigs() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_1.ACTIONS.CreateUpdateConfigs,
                    data: {
                        basicConfigs: localConfigs,
                        advancedConfigs: localAdvancedConfigs
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleCustomIconUpload(assets) {
        if (!assets)
            return;
        setLocalConfigs(function (current) { return (__assign(__assign({}, current), { icon: assets.url })); });
        shopify.modal.hide("icon-upload-popup");
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.CreateUpdateConfigs]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Content & Style"),
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Personalize the visual look of your popup by adjusting its layout, colors, fonts, and overall style. This section allows you to create a design that aligns with your brand and enhances user experience.")))),
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(RedirectsPopupPreview_1["default"], { redirects: isProPlan
                        ? redirects
                        : isBasicPlan
                            ? redirects.slice(0, 4)
                            : redirects.slice(0, 1), basicConfigs: !isFreePlan
                        ? __assign(__assign({}, _helpers_1.default_basic_configs), basicConfigs) : __assign(__assign({}, _helpers_1.default_basic_configs), { title: basicConfigs === null || basicConfigs === void 0 ? void 0 : basicConfigs.title, icon: basicConfigs === null || basicConfigs === void 0 ? void 0 : basicConfigs.icon, buttonText: basicConfigs === null || basicConfigs === void 0 ? void 0 : basicConfigs.buttonText, showFlag: basicConfigs === null || basicConfigs === void 0 ? void 0 : basicConfigs.showFlag }), advancedConfigs: isProPlan ? __assign(__assign({}, _helpers_1.default_advanced_configs), advancedConfigs) : {}, customCSSClass: "in-page" }),
                react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                    react_1["default"].createElement(polaris_1.Button, { variant: "primary", icon: polaris_icons_1.ThemeEditIcon, onClick: function () { return navigate("/app/redirects/customize"); } }, "Customize")))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "customize-popup", variant: "max", onShow: function () { return setCustomizePopupVisibilityChange(true); }, onHide: function () { return setCustomizePopupVisibilityChange(false); } },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Customize your popup" },
                react_1["default"].createElement("button", { variant: "primary", onClick: function () { return saveConfigs(); }, loading: loading[_actions_1.ACTIONS.CreateUpdateConfigs + "Loading"] ? "loading" : false }, "Save"),
                react_1["default"].createElement("button", { onClick: function () { return shopify.modal.hide('customize-popup'); } }, "Close")),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_3.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(CustomizePopup_1["default"], { redirects: redirects, configs: localConfigs, setConfigs: setLocalConfigs, advancedConfigs: localAdvancedConfigs, setAdvancedConfigs: setLocalAdvancedConfigs })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "popup-content-translation-popup" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Popup content translation" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_3.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "300" },
                        react_1["default"].createElement(polaris_1.Box, null,
                            react_1["default"].createElement(PromoBadge_1["default"], { type: "pro" })),
                        react_1["default"].createElement(polaris_1.InlineGrid, { columns: "2", gap: "200" }, ((secondaryLocales === null || secondaryLocales === void 0 ? void 0 : secondaryLocales.length) > 0 &&
                            secondaryLocales.map(function (locale) {
                                return (react_1["default"].createElement(PopupContent_1["default"], { titleDisabled: !isProPlan, key: locale.locale, titleLabel: "Title (" + locale.locale + ")", titleValue: isProPlan
                                        ? (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.title_locales) &&
                                            localConfigs.title_locales[locale.locale]
                                            ? localConfigs.title_locales[locale.locale]
                                            : ""
                                        : "", titleOnChange: isProPlan ? function (value) {
                                        return setLocalConfigs(function (current) {
                                            var _a;
                                            return (__assign(__assign({}, current), { title_locales: __assign(__assign({}, current === null || current === void 0 ? void 0 : current.title_locales), (_a = {}, _a[locale.locale] = value, _a)) }));
                                        });
                                    } : undefined, textLabel: "Short text (" + locale.locale + ")", textValue: isProPlan
                                        ? (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.text_locales) &&
                                            localConfigs.text_locales[locale.locale]
                                            ? localConfigs.text_locales[locale.locale]
                                            : ""
                                        : "", textOnChange: isProPlan ? function (value) {
                                        setLocalConfigs(function (current) {
                                            var _a;
                                            return (__assign(__assign({}, current), { text_locales: __assign(__assign({}, current.text_locales), (_a = {}, _a[locale.locale] = value, _a)) }));
                                        });
                                    } : undefined }));
                            })) ||
                            ""))))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "icon-upload-popup" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Select custom icon" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_3.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(ImageManager_1["default"], { callBack: handleCustomIconUpload })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "icon-settings-popup" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Icon settings" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_3.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(IconSettings_1["default"], { configs: localConfigs, setConfigs: setLocalConfigs, isFreePlan: isFreePlan })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "dropdown-label-translation-popup" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Dropdown label translation" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_3.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "300" },
                        react_1["default"].createElement(polaris_1.Box, null,
                            react_1["default"].createElement(PromoBadge_1["default"], { type: "pro" })),
                        react_1["default"].createElement("div", { className: !isProPlan ? "visually-disabled" : "" },
                            react_1["default"].createElement(polaris_1.InlineGrid, { columns: "2", gap: "200" }, secondaryLocales === null || secondaryLocales === void 0 ? void 0 : secondaryLocales.map(function (locale) {
                                var titleValue = (localConfigs === null || localConfigs === void 0 ? void 0 : localConfigs.dropdownPlaceholder_locales) &&
                                    localConfigs.dropdownPlaceholder_locales[locale.locale]
                                    ? localConfigs.dropdownPlaceholder_locales[locale.locale]
                                    : "";
                                var titleOnChange = function (value) {
                                    return setLocalConfigs(function (current) {
                                        var _a;
                                        return (__assign(__assign({}, current), { dropdownPlaceholder_locales: __assign(__assign({}, current.dropdownPlaceholder_locales), (_a = {}, _a[locale.locale] = value, _a)) }));
                                    });
                                };
                                return (react_1["default"].createElement(PopupContent_1["default"], { key: locale.locale, titleLabel: "Dropdown label (" + locale.locale + ")", titleValue: titleValue, 
                                    // @ts-ignore
                                    titleOnChange: titleOnChange, titleDisabled: !isProPlan }));
                            })))))))));
}
exports["default"] = ContentStyle;
