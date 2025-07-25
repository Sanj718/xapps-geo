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
exports.__esModule = true;
var react_1 = require("react");
var PopupContent_1 = require("../_common/PopupContent");
var polaris_icons_1 = require("@shopify/polaris-icons");
var polaris_1 = require("@shopify/polaris");
var PromoBadge_1 = require("../_common/PromoBadge");
var react_2 = require("@remix-run/react");
var _helpers_1 = require("../_helpers");
var ColorTextField_1 = require("../_common/ColorTextField");
var MarketsPopupPreview_1 = require("./MarketsPopupPreview");
require("../../assets/custom.scss");
var CodeEditor_client_1 = require("../_common/CodeEditor.client");
function CustomizeMarketsPopup(_a) {
    var _b;
    var marketsData = _a.marketsData, configs = _a.configs, setConfigs = _a.setConfigs, advancedConfigs = _a.advancedConfigs, setAdvancedConfigs = _a.setAdvancedConfigs;
    var _c = react_2.useOutletContext(), shopInfo = _c.shopInfo, shopdb = _c.shopdb, activePlan = _c.activePlan, devPlan = _c.devPlan, veteranPlan = _c.veteranPlan, appId = _c.appId, appData = _c.appData;
    var _d = _helpers_1.planParser(activePlan), isProPlan = _d.isProPlan, isBasicPlan = _d.isBasicPlan, isFreePlan = _d.isFreePlan;
    var secondaryLocales = (_b = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shopLocales) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return !item.primary; });
    return react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "1.5fr 3fr" }, gap: "400" },
        react_1["default"].createElement(polaris_1.Card, null,
            react_1["default"].createElement(polaris_1.BlockStack, { gap: "200" },
                react_1["default"].createElement(PromoBadge_1["default"], { type: "basic" }),
                react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Icon"),
                react_1["default"].createElement(polaris_1.InlineStack, { gap: "150" },
                    react_1["default"].createElement(polaris_1.Button, { onClick: !isFreePlan
                            ? function () { return shopify.modal.show("icon-upload-popup"); }
                            : undefined, icon: polaris_icons_1.ImageAddIcon, disabled: isFreePlan }, "Select"),
                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null,
                            "Edit icon ",
                            react_1["default"].createElement("strong", null, "width"),
                            " or add a custom",
                            " ",
                            react_1["default"].createElement("strong", null, "icon URL"),
                            ".") },
                        react_1["default"].createElement(polaris_1.Button, { disabled: isFreePlan, icon: polaris_icons_1.SettingsIcon, onClick: function () { return shopify.modal.show("icon-settings-popup"); } }))),
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "400" },
                    react_1["default"].createElement(PopupContent_1["default"], { titleValue: configs === null || configs === void 0 ? void 0 : configs.title, titleOnChange: function (value) {
                            return setConfigs(function (current) { return (__assign(__assign({}, current), { title: value })); });
                        }, textValue: configs === null || configs === void 0 ? void 0 : configs.text, textOnChange: function (value) {
                            !isFreePlan
                                ? setConfigs(function (current) { return (__assign(__assign({}, current), { text: value })); })
                                : function () { };
                        }, textDisabled: isFreePlan, textHelpText: "Use [[country]] in the Short text field to display the user's GEO location. Example: \"Looks like you're in [[country]]! Check out our local site.\"", translation: secondaryLocales === null || secondaryLocales === void 0 ? void 0 : secondaryLocales.length }),
                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, "Displays the visitor's current country flag based on geolocation data.") },
                        react_1["default"].createElement(polaris_1.Checkbox, { disabled: (configs === null || configs === void 0 ? void 0 : configs.type) === "topbar", label: "Show country flag", checked: configs === null || configs === void 0 ? void 0 : configs.showFlag, onChange: function (value) {
                                return setConfigs(function (current) { return (__assign(__assign({}, current), { showFlag: value })); });
                            } })),
                    react_1["default"].createElement(polaris_1.Divider, null),
                    react_1["default"].createElement(polaris_1.Select, { disabled: isFreePlan, label: "Popup Fields: ", labelInline: true, options: [
                            { label: "Country", value: "country" },
                            {
                                label: "Language",
                                value: "language"
                            },
                            {
                                label: "Country & language",
                                value: "both"
                            },
                        ], onChange: !isFreePlan
                            ? function (value) {
                                var isCountry = false;
                                var isLng = false;
                                if (value === "both") {
                                    isCountry = true;
                                    isLng = true;
                                }
                                else if (value === "country") {
                                    isCountry = true;
                                }
                                else if (value === "language") {
                                    isLng = true;
                                }
                                setConfigs(function (current) { return (__assign(__assign({}, current), { showCountrySelector: isCountry, showLngSelector: isLng })); });
                            }
                            : undefined, value: (configs === null || configs === void 0 ? void 0 : configs.showCountrySelector) && (configs === null || configs === void 0 ? void 0 : configs.showLngSelector)
                            ? "both"
                            : (configs === null || configs === void 0 ? void 0 : configs.showLngSelector) ? "language"
                                : "country" }),
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                        react_1["default"].createElement(polaris_1.Select, { disabled: isFreePlan, label: "Widget type: ", labelInline: true, options: [
                                { label: "Popup", value: "popup" },
                                { label: "Top bar", value: "topbar" },
                                { label: "Left sticky", value: "sticky" },
                            ], onChange: !isFreePlan
                                ? function (value) {
                                    return setConfigs(function (current) { return (__assign(__assign({}, current), { type: value })); });
                                }
                                : undefined, value: configs === null || configs === void 0 ? void 0 : configs.type }),
                        (configs === null || configs === void 0 ? void 0 : configs.type) === "topbar" && (react_1["default"].createElement(polaris_1.Checkbox, { disabled: isFreePlan, label: "Sticky to top", checked: configs === null || configs === void 0 ? void 0 : configs.topbarSticky, onChange: function (value) {
                                return setConfigs(function (current) { return (__assign(__assign({}, current), { topbarSticky: value })); });
                            } })),
                        (configs === null || configs === void 0 ? void 0 : configs.type) === "sticky" && (react_1["default"].createElement(polaris_1.InlineGrid, { gap: "300" },
                            react_1["default"].createElement(polaris_1.RangeSlider, { disabled: isFreePlan, label: "Vertical position", value: configs === null || configs === void 0 ? void 0 : configs.stickyVerticalPosition, onChange: function (value) {
                                    return setConfigs(function (current) { return (__assign(__assign({}, current), { stickyVerticalPosition: value })); });
                                }, output: true }),
                            react_1["default"].createElement(polaris_1.InlineGrid, { columns: "2", gap: "200" },
                                react_1["default"].createElement(polaris_1.Select, { disabled: isFreePlan, label: "Sticky opener icon", options: [
                                        { label: "Custom", value: "custom" },
                                        {
                                            label: "User's country flag (GEO)",
                                            value: "geo"
                                        },
                                    ], onChange: !isFreePlan
                                        ? function (value) {
                                            return setConfigs(function (current) { return (__assign(__assign({}, current), { stickyOpener: value })); });
                                        }
                                        : undefined, value: configs === null || configs === void 0 ? void 0 : configs.stickyOpener }),
                                ((configs === null || configs === void 0 ? void 0 : configs.stickyOpener) === undefined ||
                                    (configs === null || configs === void 0 ? void 0 : configs.stickyOpener) === "custom") && (react_1["default"].createElement(polaris_1.TextField, { disabled: isFreePlan, label: "Sticky Toggle Icon (link)", value: (configs === null || configs === void 0 ? void 0 : configs.stickyToggleIcon) === _helpers_1.OLD_STICKY_ICON
                                        ? "default"
                                        : configs === null || configs === void 0 ? void 0 : configs.stickyToggleIcon, autoComplete: "false", onChange: function (value) {
                                        return setConfigs(function (current) { return (__assign(__assign({}, current), { stickyToggleIcon: value })); });
                                    } })))))),
                    react_1["default"].createElement(polaris_1.Divider, null),
                    react_1["default"].createElement(PromoBadge_1["default"], { type: "basic" }),
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "300" },
                        react_1["default"].createElement(polaris_1.Select, { disabled: isFreePlan, label: "Font family", options: [
                                {
                                    label: "Inherit site fonts",
                                    value: "inherit"
                                },
                                { label: "Arial", value: "Arial" },
                                { label: "Arial Black", value: "Arial Black" },
                                { label: "Courier New", value: "Courier New" },
                                { label: "Georgia", value: "Georgia" },
                                {
                                    label: "Times New Roman",
                                    value: "Times New Roman"
                                },
                                { label: "Trebuchet MS", value: "Trebuchet MS" },
                                { label: "Tahoma", value: "Tahoma" },
                                { label: "Verdana", value: "Verdana" },
                                { label: "Impact", value: "Impact" },
                            ], onChange: function (value) {
                                return setConfigs(function (current) { return (__assign(__assign({}, current), { font: value })); });
                            }, value: configs === null || configs === void 0 ? void 0 : configs.font }),
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200", columns: "2" },
                            react_1["default"].createElement(ColorTextField_1["default"], { disabled: isFreePlan, label: "Background", placeholder: "#fff", id: "modalBgColor", configs: configs, setConfigs: !isFreePlan ? setConfigs : false }),
                            react_1["default"].createElement(ColorTextField_1["default"], { disabled: isFreePlan, label: "Text", placeholder: "#000", id: "modalTextColor", configs: configs, setConfigs: !isFreePlan ? setConfigs : false }),
                            react_1["default"].createElement(ColorTextField_1["default"], { disabled: isFreePlan, label: "Border", placeholder: "#fff", id: "modalBorderColor", configs: configs, setConfigs: !isFreePlan ? setConfigs : false })),
                        react_1["default"].createElement(polaris_1.Divider, null),
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingSm" }, "Button styles"),
                            react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200", columns: "2" },
                                react_1["default"].createElement(ColorTextField_1["default"], { disabled: isFreePlan, label: "Background", placeholder: "#fff", id: "buttonsBgColor", configs: configs, setConfigs: !isFreePlan ? setConfigs : false }),
                                react_1["default"].createElement(ColorTextField_1["default"], { disabled: isFreePlan, label: "Text", placeholder: "#000", id: "buttonsColor", configs: configs, setConfigs: !isFreePlan ? setConfigs : false })))),
                    react_1["default"].createElement(polaris_1.Divider, null),
                    react_1["default"].createElement(PromoBadge_1["default"], { type: "pro" }),
                    react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingMd" }, "CSS code editor"),
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "150" },
                        react_1["default"].createElement(polaris_1.TextField, { prefix: "#", label: "Element custom ID", onChange: isProPlan
                                ? function (value) { return setAdvancedConfigs(function (current) { return (__assign(__assign({}, current), { html_id: value })); }); }
                                : undefined, disabled: !isProPlan, value: isProPlan ? advancedConfigs === null || advancedConfigs === void 0 ? void 0 : advancedConfigs.html_id : "", autoComplete: "off" }),
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "CSS Code"),
                            react_1["default"].createElement("div", { className: isProPlan ? "" : "visually-disabled" },
                                react_1["default"].createElement("div", { className: "code-editor" },
                                    react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement("div", null, "Loading editor...") },
                                        react_1["default"].createElement(CodeEditor_client_1["default"], { code: advancedConfigs === null || advancedConfigs === void 0 ? void 0 : advancedConfigs.css, onChange: isProPlan
                                                ? function (value) {
                                                    return setAdvancedConfigs(function (current) { return (__assign(__assign({}, current), { css: value })); });
                                                }
                                                : function () { } }))))),
                        react_1["default"].createElement(polaris_1.Tooltip, { content: "Disable styles added in Styles section (popup and button styles)." },
                            react_1["default"].createElement(polaris_1.Checkbox, { label: "Disable default styles", disabled: !isProPlan, checked: isProPlan
                                    ? advancedConfigs === null || advancedConfigs === void 0 ? void 0 : advancedConfigs.disable_basic_css : false, onChange: function (value) {
                                    return isProPlan
                                        ? setAdvancedConfigs(function (current) { return (__assign(__assign({}, current), { disable_basic_css: value })); })
                                        : undefined;
                                } })))))),
        react_1["default"].createElement("div", { className: "ngr-inner-preview" },
            react_1["default"].createElement(MarketsPopupPreview_1.MarketsPopupPreview, { marketsData: marketsData, basicConfigs: !isFreePlan
                    ? __assign(__assign({}, _helpers_1.default_markets_basic_configs), configs) : __assign(__assign({}, _helpers_1.default_markets_basic_configs), { title: configs === null || configs === void 0 ? void 0 : configs.title, icon: configs === null || configs === void 0 ? void 0 : configs.icon, buttonText: configs === null || configs === void 0 ? void 0 : configs.buttonText }), advancedConfigs: isProPlan ? advancedConfigs : {} })));
}
exports["default"] = CustomizeMarketsPopup;
