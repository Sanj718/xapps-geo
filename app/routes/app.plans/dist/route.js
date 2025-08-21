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
var polaris_1 = require("@shopify/polaris");
var react_1 = require("react");
var app_bridge_react_1 = require("@shopify/app-bridge-react");
var polaris_icons_1 = require("@shopify/polaris-icons");
var react_2 = require("@remix-run/react");
var _helpers_1 = require("app/components/_helpers");
var _loaders_1 = require("./_loaders");
var _actions_1 = require("./_actions");
var PageTitle_1 = require("app/components/_common/PageTitle");
var _actions_2 = require("app/components/_actions");
exports.loader = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _loaders_1.handleLoaders(params)];
}); }); };
exports.action = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _actions_1.handleActions(params)];
}); }); };
function PlansPage() {
    var _a = react_2.useOutletContext(), shopInfo = _a.shopInfo, shopdb = _a.shopdb, activePlan = _a.activePlan, devPlan = _a.devPlan, veteranPlan = _a.veteranPlan, appId = _a.appId, appData = _a.appData;
    var submit = react_2.useSubmit();
    var navigate = react_2.useNavigate();
    var navigation = react_2.useNavigation();
    var _b = _helpers_1.planParser(activePlan), isProPlan = _b.isProPlan, isBasicPlan = _b.isBasicPlan, isFreePlan = _b.isFreePlan;
    // const { marketsConfigs, marketsData } = useLoaderData<typeof loader>();
    var actionData = react_2.useActionData();
    var _c = react_1.useState(""), basicPlanUrl = _c[0], setBasicPlanUrl = _c[1];
    var _d = react_1.useState(""), proPlanUrl = _d[0], setProPlanUrl = _d[1];
    var _e = react_1.useState(""), cancelPlanUrl = _e[0], setCancelPlanUrl = _e[1];
    react_1.useMemo(function () {
        var _a, _b, _c;
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_2.ACTIONS.subscribe_BasicPlan && (actionData === null || actionData === void 0 ? void 0 : actionData.confirmationUrl)) {
            setBasicPlanUrl(actionData === null || actionData === void 0 ? void 0 : actionData.confirmationUrl);
        }
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_2.ACTIONS.subscribe_ProPlan && (actionData === null || actionData === void 0 ? void 0 : actionData.confirmationUrl)) {
            setProPlanUrl(actionData === null || actionData === void 0 ? void 0 : actionData.confirmationUrl);
        }
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_2.ACTIONS.cancel_Subscription && ((_a = actionData === null || actionData === void 0 ? void 0 : actionData.appSubscription) === null || _a === void 0 ? void 0 : _a.status) === "CANCELLED" && ((_b = actionData === null || actionData === void 0 ? void 0 : actionData.appSubscription) === null || _b === void 0 ? void 0 : _b.returnUrl)) {
            setCancelPlanUrl((_c = actionData === null || actionData === void 0 ? void 0 : actionData.appSubscription) === null || _c === void 0 ? void 0 : _c.returnUrl);
            shopify.modal.hide("free-plan-help");
            shopify.modal.show("cancel-thank-you");
        }
    }, [actionData]);
    function handleBasicSubscription() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                shopify.modal.show("basic-plan-request");
                submit({
                    _action: _actions_2.ACTIONS.subscribe_BasicPlan
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleProSubscription() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                shopify.modal.show("pro-plan-request");
                submit({
                    _action: _actions_2.ACTIONS.subscribe_ProPlan
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleSubscriptionCancel() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_2.ACTIONS.cancel_Subscription,
                    data: {
                        id: activePlan.id
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_2.ACTIONS.subscribe_BasicPlan, _actions_2.ACTIONS.subscribe_ProPlan, _actions_2.ACTIONS.cancel_Subscription]);
    return (react_1["default"].createElement(polaris_1.Page, null,
        react_1["default"].createElement("div", { id: "main-screen" },
            react_1["default"].createElement(PageTitle_1.PageTitle, { title: "Plans", hideStatus: true, icon: polaris_icons_1.PlanIcon }),
            (devPlan || veteranPlan) && (react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(polaris_1.Banner, { icon: devPlan ? polaris_icons_1.SandboxIcon : polaris_icons_1.GiftCardFilledIcon, tone: "info" }, devPlan ? (react_1["default"].createElement("p", null,
                    "Your current plan is the ",
                    react_1["default"].createElement("strong", null, "Dev Plan"),
                    ", which includes all the features of the ",
                    react_1["default"].createElement("strong", null, "Pro Plan"),
                    ".")) : (react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Geolocation Redirects"),
                    " is ",
                    react_1["default"].createElement("strong", null, "no"),
                    " ",
                    "longer available for ",
                    react_1["default"].createElement("strong", null, "free"),
                    ". However, as a privileged veteran user, you are eligible for our app's",
                    " ",
                    react_1["default"].createElement("strong", null, "Basic plan"),
                    ", free of charge."))))),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                    react_1["default"].createElement(polaris_1.Grid, { columns: { xs: 1, sm: 1, md: 3, lg: 3, xl: 3 } },
                        react_1["default"].createElement(PlanCard, { current: isFreePlan, title: "Free", price: "$0/month", list: [
                                "Free forever",
                                "Custom popup title",
                                "Up to 1 redirect button",
                                "Shopify's native GEO location based popup",
                                "Up to 1 auto-redirect",
                                "Disable auto-redirect for search crawlers/bots",
                                "Markets integration & popup",
                            ], action: function () { return shopify.modal.show("free-plan-help"); } }),
                        react_1["default"].createElement(PlanCard, { current: isBasicPlan, title: "Basic", price: "$4.99/month", list: [
                                "Choose different popup types",
                                "Customisable basic styles",
                                "Custom popup title, icon & text",
                                "Up to 4 redirect buttons",
                                "Shopify's native GEO location based popup show up rules",
                                "Popup visibility logic full control(session/everyload/cookies)",
                                "Unlimited auto-redirects",
                                "Markets integration & popup customization",
                            ], action: isProPlan
                                ? function () { return shopify.modal.show("pro-plan-help"); }
                                : handleBasicSubscription }),
                        react_1["default"].createElement(PlanCard, { highlight: true, current: isProPlan, title: "Pro", price: "$8.99/month", list: [
                                "All Basic plan features",
                                "Unlimited redirect buttons",
                                "Translations",
                                "Conditional redirect button show based on user geo location",
                                "Add your custom CSS code",
                                "Select pages where you want to allow/disallow the popup",
                                "Markets auto-redirects",
                            ], dev: !devPlan && !isProPlan, action: handleProSubscription }))))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "pro-plan-request", variant: "small" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Subscribe to Pro Plan" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(polaris_1.AppProvider, { i18n: {} },
                    react_1["default"].createElement(RequestPlanModal, { loading: loading[_actions_2.ACTIONS.subscribe_ProPlan + "Loading"], planName: "Pro", url: proPlanUrl })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "basic-plan-request", variant: "small" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Subscribe to Basic Plan" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(polaris_1.AppProvider, { i18n: {} },
                    react_1["default"].createElement(RequestPlanModal, { loading: loading[_actions_2.ACTIONS.subscribe_BasicPlan + "Loading"], planName: "Basic", url: basicPlanUrl })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "pro-plan-help", variant: "small" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "How can we help instead?" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(polaris_1.AppProvider, { i18n: {} },
                    react_1["default"].createElement(ModalContent, { cancelAction: function () {
                            shopify.modal.hide("pro-plan-help");
                            handleBasicSubscription();
                        }, loading: loading[_actions_2.ACTIONS.subscribe_BasicPlan + "Loading"] })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "free-plan-help", variant: "small" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "How can we help instead?" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(polaris_1.AppProvider, { i18n: {} },
                    react_1["default"].createElement(ModalContent, { cancelAction: function () {
                            handleSubscriptionCancel();
                        }, loading: loading[_actions_2.ACTIONS.cancel_Subscription + "Loading"] })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "cancel-thank-you", variant: "small" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Subscription cancelled" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(polaris_1.AppProvider, { i18n: {} },
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Your subscription has been cancelled. You can still use the app for free. Please refresh the page to see the changes."),
                        react_1["default"].createElement(polaris_1.Divider, null),
                        react_1["default"].createElement(polaris_1.Button, { url: cancelPlanUrl, target: "_top" }, "Close")))))));
}
exports["default"] = PlansPage;
function PlanCard(_a) {
    var title = _a.title, price = _a.price, _b = _a.current, current = _b === void 0 ? false : _b, list = _a.list, _c = _a.dev, dev = _c === void 0 ? false : _c, action = _a.action, loading = _a.loading, _d = _a.highlight, highlight = _d === void 0 ? false : _d;
    return (react_1["default"].createElement(polaris_1.Card, { background: current ? "bg-fill-tertiary" : "bg-fill" },
        react_1["default"].createElement(polaris_1.BlockStack, { gap: "200", align: "space-around" },
            react_1["default"].createElement(polaris_1.InlineGrid, { gap: "300" },
                react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between", gap: "200" },
                    react_1["default"].createElement(polaris_1.Text, { as: "h2", variant: "headingLg" },
                        title,
                        " - ",
                        react_1["default"].createElement("span", { style: highlight ? { color: "#fff", background: "#00936f", padding: "0px 4px", borderRadius: "3px" } : {} }, price))),
                react_1["default"].createElement(polaris_1.Button, { variant: "primary", disabled: current, onClick: action, loading: loading, icon: current ? polaris_icons_1.CheckboxIcon : polaris_icons_1.TargetIcon }, current ? "Your plan" : "Select"),
                react_1["default"].createElement(polaris_1.Divider, null),
                react_1["default"].createElement(polaris_1.Scrollable, null,
                    react_1["default"].createElement(polaris_1.List, null, list &&
                        list.map(function (item, index) {
                            return react_1["default"].createElement(polaris_1.List.Item, { key: index }, item);
                        }))),
                dev && (react_1["default"].createElement(polaris_1.Banner, { hideIcon: true },
                    react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs" },
                            "You can request a ",
                            react_1["default"].createElement("strong", null, "Free Dev Plan"),
                            " for testing and development purposes."),
                        react_1["default"].createElement(polaris_1.Button, { size: "micro", icon: polaris_icons_1.SandboxIcon, onClick: function () { return void Tawk_API.toggle(); } }, "Request"))))))));
}
function RequestPlanModal(_a) {
    var loading = _a.loading, planName = _a.planName, url = _a.url;
    return react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, loading ? "Requesting subscription link to " + planName + "..." : "Click the button below to subscribe to the " + planName + " Plan. You\u2019ll be redirected to the Shopify billing page to complete your subscription."),
        react_1["default"].createElement(polaris_1.Divider, null),
        react_1["default"].createElement(polaris_1.Button, { tone: "success", target: "_top", loading: loading, variant: "primary", url: url }, "Subscribe"));
}
function ModalContent(_a) {
    var cancelAction = _a.cancelAction, _b = _a.loading, loading = _b === void 0 ? false : _b;
    return (react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Downgrading will result in the loss of important features, and refunds are not available."),
        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd", fontWeight: "bold" },
            " ",
            react_1["default"].createElement(polaris_1.Badge, { icon: polaris_icons_1.HeartIcon, tone: "magic" }, "We can always help you:"),
            " ",
            react_1["default"].createElement(polaris_1.Link, { monochrome: true, url: "mailto:contact@xapps.shop" }, "contact@xapps.shop")),
        react_1["default"].createElement(polaris_1.Divider, null),
        react_1["default"].createElement(polaris_1.InlineStack, { align: "end", gap: "200" },
            react_1["default"].createElement(polaris_1.Button, { tone: "critical", icon: polaris_icons_1.SmileySadIcon, onClick: cancelAction, loading: loading }, "Downgrade"),
            react_1["default"].createElement(polaris_1.Button, { tone: "success", variant: "primary", icon: polaris_icons_1.FlowerIcon }, "Need Help!"))));
}
