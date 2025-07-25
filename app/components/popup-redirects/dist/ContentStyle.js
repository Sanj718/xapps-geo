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
    var redirects = _a.redirects, configs = _a.configs;
    var _b = react_2.useOutletContext(), shopInfo = _b.shopInfo, shopdb = _b.shopdb, activePlan = _b.activePlan, devPlan = _b.devPlan, veteranPlan = _b.veteranPlan, appId = _b.appId, appData = _b.appData;
    var _c = (configs === null || configs === void 0 ? void 0 : configs.data[0]) || {}, basicConfigs = _c.basicConfigs, advancedConfigs = _c.advancedConfigs, hideOnAllowedPages = _c.hideOnAllowedPages, allowedPages = _c.allowedPages;
    // const submit = useSubmit()
    // const navigation = useNavigation();
    var navigate = react_2.useNavigate();
    var _d = _helpers_1.planParser(activePlan), isProPlan = _d.isProPlan, isBasicPlan = _d.isBasicPlan, isFreePlan = _d.isFreePlan;
    // const [customizePopupVisibilityChange, setCustomizePopupVisibilityChange] = useState(false);
    // const [localConfigs, setLocalConfigs] = useState({ ...default_basic_configs, ...basicConfigs });
    // const [localAdvancedConfigs, setLocalAdvancedConfigs] = useState({ ...default_advanced_configs, ...advancedConfigs });
    // const secondaryLocales = shopInfo?.shopLocales?.filter(
    //   (item) => !item.primary,
    // );
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
