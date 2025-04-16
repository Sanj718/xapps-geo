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
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
var react_1 = require("react");
var _helpers_1 = require("../_helpers");
var react_2 = require("@remix-run/react");
var RedirectsPopupPreview_1 = require("./RedirectsPopupPreview");
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
                    react_1["default"].createElement(polaris_1.Button, { variant: "primary", icon: polaris_icons_1.ThemeEditIcon, onClick: function () { return navigate("/app/redirects/customize"); } }, "Customize"))))));
}
exports["default"] = ContentStyle;
