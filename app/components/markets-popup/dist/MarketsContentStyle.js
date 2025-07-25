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
var MarketsPopupPreview_1 = require("./MarketsPopupPreview");
var react_2 = require("@remix-run/react");
var _helpers_1 = require("../_helpers");
function MarketsContentStyle(_a) {
    var marketsData = _a.marketsData, configs = _a.configs, advancedConfigs = _a.advancedConfigs;
    var _b = react_2.useOutletContext(), shopdb = _b.shopdb, activePlan = _b.activePlan;
    var _c = _helpers_1.planParser(activePlan), isProPlan = _c.isProPlan, isBasicPlan = _c.isBasicPlan, isFreePlan = _c.isFreePlan;
    var navigate = react_2.useNavigate();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Content & Style"),
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Personalize the visual look of your popup by adjusting its layout, colors, fonts, and overall style. This section allows you to create a design that aligns with your brand and enhances user experience.")))),
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(MarketsPopupPreview_1.MarketsPopupPreview, { marketsData: marketsData, basicConfigs: !isFreePlan
                        ? __assign(__assign({}, _helpers_1.default_markets_basic_configs), configs) : __assign(__assign({}, _helpers_1.default_markets_basic_configs), { title: configs === null || configs === void 0 ? void 0 : configs.title, icon: configs === null || configs === void 0 ? void 0 : configs.icon, buttonText: configs === null || configs === void 0 ? void 0 : configs.buttonText }), advancedConfigs: isProPlan ? advancedConfigs : {}, customCSSClass: "in-page" }),
                react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                    react_1["default"].createElement(polaris_1.Button, { variant: "primary", icon: polaris_icons_1.ThemeEditIcon, onClick: function () {
                            _helpers_1.handleSideNavClick();
                            navigate("/app/markets/customize");
                        } }, "Customize"))))));
}
exports["default"] = MarketsContentStyle;
