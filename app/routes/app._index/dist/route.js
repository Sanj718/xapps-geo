"use strict";
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
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
var card1_svg_1 = require("../../assets/card1.svg");
var card2_svg_1 = require("../../assets/card2.svg");
var rateCard_svg_1 = require("../../assets/rateCard.svg");
var _helpers_1 = require("../../components/_helpers");
var env_1 = require("../../components/env");
var _loaders_1 = require("./_loaders");
var _actions_1 = require("./_actions");
var _actions_2 = require("app/components/_actions");
var Tawk_API = (typeof window !== 'undefined' ? window.Tawk_API : undefined);
var _a = _helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, env_1.RD_EMBED_APP_HANDLE) || {}, EMBED_APP_ID = _a.EMBED_APP_ID, EMBED_APP_HANDLE = _a.EMBED_APP_HANDLE;
var MK_EMBED_HANDLE = (_helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, env_1.MK_EMBED_APP_HANDLE) || {}).EMBED_APP_HANDLE;
exports.loader = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _loaders_1.handleLoaders(params)];
}); }); };
exports.action = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _actions_1.handleActions(params)];
}); }); };
function Index() {
    var _a;
    var _b = react_2.useOutletContext(), shopInfo = _b.shopInfo, shopdb = _b.shopdb, activePlan = _b.activePlan, devPlan = _b.devPlan, veteranPlan = _b.veteranPlan, appId = _b.appId, appData = _b.appData;
    var themeEmbedData = react_2.useLoaderData().themeEmbedData;
    var actionData = react_2.useActionData();
    var navigation = react_2.useNavigation();
    var submit = react_2.useSubmit();
    var _c = _helpers_1.planParser(activePlan), isProPlan = _c.isProPlan, isBasicPlan = _c.isBasicPlan, isFreePlan = _c.isFreePlan;
    var _d = react_1.useState(false), marketsEmbedStatus = _d[0], setMarketsEmbedStatus = _d[1];
    var _e = react_1.useState(false), redirectsEmbedStatus = _e[0], setRedirectsEmbedStatus = _e[1];
    var _f = react_1.useState(0), totalCustomAuto = _f[0], setTotalCustomAuto = _f[1];
    var _g = react_1.useState(0), totalCustomPopup = _g[0], setTotalCustomPopup = _g[1];
    var _h = react_1.useState(""), periodCustomRedirects = _h[0], setPeriodCustomRedirects = _h[1];
    var _j = react_1.useState(""), periodCustomAutoRedirects = _j[0], setPeriodCustomAutoRedirects = _j[1];
    var _k = react_1.useState(""), periodCustomPopupRedirects = _k[0], setPeriodCustomPopupRedirects = _k[1];
    var _l = react_1.useState(0), totalMarketsAuto = _l[0], setTotalMarketsAuto = _l[1];
    var _m = react_1.useState(0), totalMarketsPopup = _m[0], setTotalMarketsPopup = _m[1];
    var _o = react_1.useState(""), periodMarketsRedirects = _o[0], setPeriodMarketsRedirects = _o[1];
    var _p = react_1.useState(""), periodMarketsAutoRedirects = _p[0], setPeriodMarketsAutoRedirects = _p[1];
    var _q = react_1.useState(""), periodMarketsPopupRedirects = _q[0], setPeriodMarketsPopupRedirects = _q[1];
    react_1.useMemo(function () {
        setEmbedData(themeEmbedData);
    }, [themeEmbedData]);
    // useMemo(() => {
    //   if (actionData?._action === "analyticsData" && actionData?.status) {
    //     setStoreAnalytics(actionData?.data);
    //   }
    // }, [actionData]);
    react_1.useEffect(function () {
        submit({
            _action: _actions_2.ACTIONS.AnalyticsData
        }, _helpers_1.requestHeaders);
    }, []);
    function setEmbedData(theme) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var checkRedirects_1, checkMarkets_1;
            return __generator(this, function (_b) {
                if ((_a = theme === null || theme === void 0 ? void 0 : theme.current) === null || _a === void 0 ? void 0 : _a.blocks) {
                    checkRedirects_1 = false;
                    checkMarkets_1 = false;
                    Object.entries(theme.current.blocks).forEach(function (_a) {
                        var item = _a[0], value = _a[1];
                        if (value.type.includes(EMBED_APP_ID) &&
                            value.type.includes(EMBED_APP_HANDLE) &&
                            !value.disabled) {
                            checkRedirects_1 = true;
                        }
                        if (value.type.includes(EMBED_APP_ID) &&
                            value.type.includes(MK_EMBED_HANDLE) &&
                            !value.disabled) {
                            checkMarkets_1 = true;
                        }
                    });
                    if (checkRedirects_1) {
                        setRedirectsEmbedStatus(checkRedirects_1);
                    }
                    if (checkMarkets_1) {
                        setMarketsEmbedStatus(checkMarkets_1);
                    }
                }
                return [2 /*return*/];
            });
        });
    }
    function setStoreAnalytics(analyticsData) {
        return __awaiter(this, void 0, void 0, function () {
            var customAutoData, customPopupData, marketsAutoData, marketsPopupData, marketsFirstDate, marketsLastDate, customFirstDate, customLastDate;
            return __generator(this, function (_a) {
                if (analyticsData === null || analyticsData === void 0 ? void 0 : analyticsData.id) {
                    customAutoData = _helpers_1.getTotals(analyticsData === null || analyticsData === void 0 ? void 0 : analyticsData.dataAuto);
                    customPopupData = _helpers_1.getTotals(analyticsData === null || analyticsData === void 0 ? void 0 : analyticsData.dataButton);
                    marketsAutoData = _helpers_1.getTotals(analyticsData === null || analyticsData === void 0 ? void 0 : analyticsData.dataMarketsAuto);
                    marketsPopupData = _helpers_1.getTotals(analyticsData === null || analyticsData === void 0 ? void 0 : analyticsData.dataMarketsButton);
                    setTotalCustomAuto((customAutoData === null || customAutoData === void 0 ? void 0 : customAutoData.length) || 0);
                    setTotalCustomPopup((customPopupData === null || customPopupData === void 0 ? void 0 : customPopupData.length) || 0);
                    setTotalMarketsAuto((marketsAutoData === null || marketsAutoData === void 0 ? void 0 : marketsAutoData.length) || 0);
                    setTotalMarketsPopup((marketsPopupData === null || marketsPopupData === void 0 ? void 0 : marketsPopupData.length) || 0);
                    setPeriodCustomAutoRedirects(_helpers_1.formatDate(customAutoData));
                    setPeriodCustomPopupRedirects(_helpers_1.formatDate(customPopupData));
                    setPeriodMarketsAutoRedirects(_helpers_1.formatDate(marketsAutoData));
                    setPeriodMarketsPopupRedirects(_helpers_1.formatDate(marketsPopupData));
                    if ((customAutoData === null || customAutoData === void 0 ? void 0 : customAutoData.length) && (customPopupData === null || customPopupData === void 0 ? void 0 : customPopupData.length) && (marketsAutoData === null || marketsAutoData === void 0 ? void 0 : marketsAutoData.length) && (marketsPopupData === null || marketsPopupData === void 0 ? void 0 : marketsPopupData.length)) {
                        marketsFirstDate = _helpers_1.getDate([marketsAutoData[0], marketsPopupData[0]], ">");
                        marketsLastDate = _helpers_1.getDate([
                            marketsAutoData[marketsAutoData.length - 1],
                            marketsPopupData[marketsPopupData.length - 1],
                        ], "<");
                        setPeriodMarketsRedirects(_helpers_1.formatDate([marketsFirstDate, marketsLastDate]));
                    }
                    if ((customAutoData === null || customAutoData === void 0 ? void 0 : customAutoData.length) && (customPopupData === null || customPopupData === void 0 ? void 0 : customPopupData.length)) {
                        customFirstDate = _helpers_1.getDate([customAutoData[0], customPopupData[0]], ">");
                        customLastDate = _helpers_1.getDate([
                            customAutoData[customAutoData.length - 1],
                            customPopupData[customPopupData.length - 1],
                        ], "<");
                        setPeriodCustomRedirects(_helpers_1.formatDate([customFirstDate, customLastDate]));
                    }
                }
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_2.ACTIONS.AnalyticsData]);
    return (React.createElement(polaris_1.Page, null,
        React.createElement("div", { id: "main-screen" },
            React.createElement(polaris_1.InlineStack, { align: "space-between", blockAlign: "center" },
                React.createElement(polaris_1.Text, { as: "h1", variant: "headingLg" },
                    "Welcome, ", (_a = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shop) === null || _a === void 0 ? void 0 :
                    _a.name,
                    "! \uD83D\uDC4B"),
                React.createElement(polaris_1.Text, { as: "p", variant: "bodyXs" },
                    React.createElement(polaris_1.InlineStack, { blockAlign: "center", gap: "150" },
                        "Your plan:",
                        " ",
                        React.createElement(polaris_1.Badge, { tone: isProPlan
                                ? "success-strong"
                                : isBasicPlan
                                    ? "success"
                                    : "attention", progress: isProPlan
                                ? "complete"
                                : isBasicPlan
                                    ? "partiallyComplete"
                                    : "incomplete" }, isProPlan ? "Pro" : isBasicPlan ? "Basic" : "Free"),
                        (veteranPlan || devPlan) && (React.createElement(React.Fragment, null,
                            " ",
                            "+",
                            React.createElement(polaris_1.Tooltip, { width: "wide", content: React.createElement("small", null, devPlan ? (React.createElement("span", null,
                                    "Your current plan is the ",
                                    React.createElement("strong", null, "Dev Plan"),
                                    ", which includes all the features of the",
                                    " ",
                                    React.createElement("strong", null, "Pro Plan"),
                                    ".")) : veteranPlan ? (React.createElement("span", null,
                                    React.createElement("strong", null, "Geolocation Redirects"),
                                    " is",
                                    " ",
                                    React.createElement("strong", null, "no"),
                                    " longer available for",
                                    " ",
                                    React.createElement("strong", null, "free"),
                                    ". However, as a privileged veteran user, you are eligible for our app's",
                                    " ",
                                    React.createElement("strong", null, "Basic plan"),
                                    ", free of charge.")) : ("")) },
                                React.createElement(polaris_1.Icon, { source: devPlan ? polaris_icons_1.SandboxIcon : polaris_icons_1.GiftCardFilledIcon, tone: "success" }))))))),
            React.createElement("br", null),
            React.createElement(polaris_1.Banner, { icon: polaris_icons_1.ConfettiIcon, title: "New Look, Better Experience!", action: {
                    content: "Have questions or issues? Contact us!",
                    onAction: function () { return Tawk_API === null || Tawk_API === void 0 ? void 0 : Tawk_API.toggle(); }
                } }, "We've updated the our app with a refreshed design and improved layout for a better experience! \uD83C\uDF89"),
            React.createElement("br", null),
            React.createElement(polaris_1.InlineGrid, { columns: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }, gap: "400" },
                React.createElement(StartCard, { title: "Custom redirects", status: redirectsEmbedStatus, image: card1_svg_1["default"], label: "Customize custom redirects", url: "/app/redirects" }),
                React.createElement(StartCard, { title: "Markets redirects", status: marketsEmbedStatus, image: card2_svg_1["default"], label: "Customize markets redirects", url: "/app/markets" })),
            React.createElement("br", null),
            React.createElement(polaris_1.Divider, null),
            React.createElement("br", null),
            React.createElement(polaris_1.InlineGrid, { columns: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }, gap: "400" },
                React.createElement(Stats, { loading: loading[_actions_2.ACTIONS.AnalyticsData + "Loading"], title: "Custom redirects performance", totalPeriod: periodCustomRedirects, totamlNum: totalCustomPopup + totalCustomAuto, popupNum: totalCustomPopup, popupPeriod: periodCustomPopupRedirects, autoNum: totalCustomAuto, autoPeriod: periodCustomAutoRedirects }),
                React.createElement(Stats, { loading: loading[_actions_2.ACTIONS.AnalyticsData + "Loading"], title: "Markets redirects performance", totalPeriod: periodMarketsRedirects, totamlNum: totalMarketsPopup + totalMarketsAuto, popupNum: totalMarketsPopup, popupPeriod: periodMarketsPopupRedirects, autoNum: totalMarketsAuto, autoPeriod: periodMarketsAutoRedirects })),
            React.createElement("br", null),
            React.createElement(polaris_1.Divider, null),
            React.createElement("br", null),
            React.createElement(polaris_1.CalloutCard, { illustration: rateCard_svg_1["default"], title: "Please share your thoughts", primaryAction: {
                    content: "Good",
                    target: "_blank",
                    url: "https://apps.shopify.com/native-geo-redirects-popup?#modal-show=WriteReviewModal",
                    icon: polaris_icons_1.ThumbsUpIcon
                }, secondaryAction: {
                    content: "Bad",
                    url: "#",
                    icon: polaris_icons_1.ThumbsDownIcon,
                    onAction: function () { return Tawk_API === null || Tawk_API === void 0 ? void 0 : Tawk_API.toggle(); }
                } },
                React.createElement("p", null, "How's your experience been with the Geolocation Redirects app?")))));
}
exports["default"] = Index;
function Stats(_a) {
    var _b = _a.loading, loading = _b === void 0 ? false : _b, title = _a.title, _c = _a.totalPeriod, totalPeriod = _c === void 0 ? "" : _c, totamlNum = _a.totamlNum, popupNum = _a.popupNum, _d = _a.popupPeriod, popupPeriod = _d === void 0 ? "" : _d, autoNum = _a.autoNum, _e = _a.autoPeriod, autoPeriod = _e === void 0 ? "" : _e;
    return (React.createElement(polaris_1.InlineGrid, { gap: "200" },
        React.createElement(polaris_1.Box, null,
            React.createElement(polaris_1.InlineStack, { blockAlign: "center", align: "space-between" },
                React.createElement(polaris_1.InlineStack, { blockAlign: "baseline", gap: "200" },
                    React.createElement(polaris_1.Text, { as: "h2", variant: "headingMd" }, title),
                    totalPeriod && totalPeriod !== "" && (React.createElement(polaris_1.Text, { as: "span", variant: "bodyXs", tone: "subdued" }, totalPeriod))))),
        React.createElement(polaris_1.Card, null,
            React.createElement(polaris_1.InlineGrid, { gap: "200" },
                React.createElement(polaris_1.InlineStack, { align: "space-between" },
                    React.createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Total"),
                    React.createElement(polaris_1.Tooltip, { hasUnderline: true, width: "wide", content: React.createElement("small", null, "Kindly note that analytics data may have slight inaccuracies and is best used for general insights and visibility.") }, loading ? (React.createElement(polaris_1.Spinner, { size: "small" })) : (React.createElement(polaris_1.Icon, { source: polaris_icons_1.InfoIcon, tone: "subdued" })))),
                React.createElement(polaris_1.Text, { as: "p", variant: "heading2xl" }, totamlNum))),
        React.createElement(polaris_1.InlineGrid, { columns: "2", gap: "200" },
            React.createElement(polaris_1.Card, null,
                React.createElement(polaris_1.InlineGrid, { gap: "200" },
                    React.createElement(polaris_1.InlineGrid, null,
                        React.createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Popup redirects"),
                        popupPeriod && popupPeriod !== "" && (React.createElement(polaris_1.Text, { variant: "bodyXs", as: "p", tone: "subdued" },
                            React.createElement("small", { style: { fontSize: "8px" } }, popupPeriod)))),
                    React.createElement(polaris_1.Text, { as: "p", variant: "heading2xl" }, popupNum))),
            React.createElement(polaris_1.Card, null,
                React.createElement(polaris_1.InlineGrid, { gap: "200" },
                    React.createElement(polaris_1.InlineGrid, null,
                        React.createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Auto redirects"),
                        autoPeriod && autoPeriod !== "" && (React.createElement(polaris_1.Text, { variant: "bodyXs", as: "p", tone: "subdued" },
                            React.createElement("small", { style: { fontSize: "8px" } }, autoPeriod)))),
                    React.createElement(polaris_1.Text, { as: "p", variant: "heading2xl" }, autoNum))))));
}
function StartCard(_a) {
    var title = _a.title, status = _a.status, image = _a.image, label = _a.label, url = _a.url;
    var navigate = react_2.useNavigate();
    return (React.createElement(polaris_1.Card, null,
        React.createElement(polaris_1.InlineGrid, { gap: "400" },
            React.createElement(polaris_1.InlineStack, { align: "space-between" },
                React.createElement(polaris_1.Text, { as: "h2", variant: "headingMd" }, title),
                React.createElement(polaris_1.Tooltip, { width: "wide", content: React.createElement("small", null, "App embeds are app-provided elements that float or appear as an overlay in your theme, or add code to your online store without being visible to your customers. You can activate, deactivate, preview, and customize app embeds through the theme editor.") },
                    React.createElement(polaris_1.Badge, { size: "small", tone: status ? "success" : "warning", progress: status ? "complete" : "incomplete" }, status ? "Enabled" : "Disabled"))),
            image && (React.createElement(polaris_1.InlineStack, { align: "center" },
                React.createElement(polaris_1.Image, { source: image, width: "250", height: "150", alt: "" }))),
            React.createElement(polaris_1.Button, { variant: "primary", onClick: function () {
                    navigate(url);
                } }, label))));
}
