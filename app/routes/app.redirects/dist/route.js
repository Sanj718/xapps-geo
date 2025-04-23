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
var PageTitle_1 = require("../../components/_common/PageTitle");
var _helpers_1 = require("../../components/_helpers");
var env_1 = require("../../components/env");
var react_1 = require("react");
var RedirectsList_1 = require("../../components/popup-redirects/RedirectsList");
var react_2 = require("@remix-run/react");
var ContentStyle_1 = require("app/components/popup-redirects/ContentStyle");
var _actions_1 = require("./_actions");
var _loaders_1 = require("./_loaders");
var PopupDisplaySettings_1 = require("app/components/popup-redirects/PopupDisplaySettings");
var OtherSettings_1 = require("app/components/popup-redirects/OtherSettings");
var WidgetDisplayCustomRule_1 = require("app/components/popup-redirects/WidgetDisplayCustomRule");
var ButtonDisplayCustomRule_1 = require("app/components/popup-redirects/ButtonDisplayCustomRule");
var AutoRedirectsList_1 = require("app/components/auto-redirects/AutoRedirectsList");
var polaris_icons_1 = require("@shopify/polaris-icons");
var _a = _helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, env_1.RD_EMBED_APP_HANDLE) || {}, EMBED_APP_ID = _a.EMBED_APP_ID, EMBED_APP_HANDLE = _a.EMBED_APP_HANDLE;
var mainTabs = [
    {
        id: "popup",
        content: "Popup redirects"
    },
    {
        id: "auto",
        content: "Auto redirects"
    },
];
// [TODO] find correct way to add ts check here.
exports.loader = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _loaders_1.handleLoaders(params)];
}); }); };
exports.action = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _actions_1.handleActions(params)];
}); }); };
function CustomRedirects() {
    var _a = react_2.useOutletContext(), shopInfo = _a.shopInfo, shopdb = _a.shopdb, activePlan = _a.activePlan, devPlan = _a.devPlan, veteranPlan = _a.veteranPlan, appId = _a.appId, appData = _a.appData;
    var _b = react_2.useLoaderData(), allRedirects = _b.allRedirects, configs = _b.configs, widgetEditorStatus = _b.widgetEditorStatus, widgetEditorCode = _b.widgetEditorCode, buttonEditorStatus = _b.buttonEditorStatus, buttonEditorCode = _b.buttonEditorCode, allAutoRedirects = _b.allAutoRedirects;
    var actionData = react_2.useActionData();
    var _c = react_1.useState({ msg: "", error: false }), toastData = _c[0], setToastData = _c[1];
    var _d = react_1.useState(null), active = _d[0], setActive = _d[1];
    var _e = react_1.useState([]), redirects = _e[0], setRedirects = _e[1];
    var _f = react_1.useState([]), autoRedirects = _f[0], setAutoRedirects = _f[1];
    var _g = react_1.useState(0), selectedTab = _g[0], setSelectedTab = _g[1];
    var smUp = polaris_1.useBreakpoints().smUp;
    react_1.useMemo(function () {
        var _a;
        var orderedRedirects = (_a = allRedirects === null || allRedirects === void 0 ? void 0 : allRedirects.data) === null || _a === void 0 ? void 0 : _a.sort(function (a, b) { return a.order - b.order; });
        setRedirects(orderedRedirects || []);
    }, [allRedirects]);
    react_1.useMemo(function () {
        var _a;
        var orderedAutoRedirects = (_a = allAutoRedirects === null || allAutoRedirects === void 0 ? void 0 : allAutoRedirects.data) === null || _a === void 0 ? void 0 : _a.sort(function (a, b) { return JSON.parse(a.node.value).order_r - JSON.parse(b.node.value).order_r; });
        setAutoRedirects(orderedAutoRedirects || []);
    }, [allAutoRedirects]);
    // useMemo(() => {
    //   if (actionData?.status) {
    //     setToastData({ error: false, msg: tr.responses.success });
    //   }
    // }, [actionData]);
    // async function loadAutoRedirects() {
    //   let error = true;
    //   let msg = tr.responses.error;
    //   // await getLocalShopData();
    //   try {
    //     const response = await fetch(GET_AUTO_REDIRECTS);
    //     const responseJson = await response.json();
    //     if (responseJson?.status) {
    //       const responseAppId =
    //         responseJson?.data?.body?.data?.appInstallation?.id;
    //       const responseRedirects =
    //         responseJson?.data?.body?.data?.appInstallation?.metafields?.edges;
    //       setAppId(responseAppId);
    //       const updated_order = responseRedirects.sort(
    //         (a, b) =>
    //           JSON.parse(a.node.value).order_r - JSON.parse(b.node.value).order_r
    //       );
    //       setAutoRedirects(updated_order);
    //       error = false;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   if (error) {
    //     setToastData({
    //       error,
    //       msg,
    //     });
    //   }
    // }
    react_1.useMemo(function () {
        // if (actionData && !actionData?.data?.status) {
        //   shopify.toast.show("Error, try again.", { isError: true });
        //   if (actionData?.data?.errors?.length) {
        //     setErrors(actionData.data.errors);
        //   }
        // } else {
        //   setErrors([]);
        // }
        // if (
        //   (actionData?._action === "new" || actionData?._action === "edit") &&
        //   actionData?._status
        // ) {
        //   const { discountId, discountClass } =
        //     actionData?.data?.discountCreate?.codeAppDiscount ||
        //     actionData?.data?.discountCreate?.automaticAppDiscount ||
        //     {};
        //   const url = getDiscountUrl(discountId, discountClass, true);
        //   if (url) navigate(url);
        // }
        // if (actionData?._action === "discountDelete" && actionData?._status) {
        //   navigate("/app");
        // }
    }, [actionData]);
    return (React.createElement(polaris_1.Page, null,
        React.createElement(PageTitle_1.PageTitle, { icon: polaris_icons_1.DomainRedirectIcon, title: "Custom redirects", status: active, loading: false, embedPath: EMBED_APP_ID + "/" + EMBED_APP_HANDLE }),
        React.createElement("br", null),
        React.createElement(polaris_1.Tabs, { tabs: mainTabs, selected: selectedTab, onSelect: setSelectedTab, fitted: true },
            React.createElement("br", null),
            selectedTab === 0 ? (React.createElement(polaris_1.BlockStack, { gap: { xs: "800", sm: "400" } },
                React.createElement(RedirectsList_1["default"], { redirects: redirects }),
                smUp ? React.createElement(polaris_1.Divider, null) : null,
                React.createElement(ContentStyle_1["default"], { redirects: redirects, configs: configs }),
                smUp ? React.createElement(polaris_1.Divider, null) : null,
                React.createElement(PopupDisplaySettings_1["default"], { configs: configs }),
                smUp ? React.createElement(polaris_1.Divider, null) : null,
                React.createElement(OtherSettings_1["default"], { configs: configs }),
                smUp ? React.createElement(polaris_1.Divider, null) : null,
                React.createElement(WidgetDisplayCustomRule_1["default"], { status: widgetEditorStatus, code: widgetEditorCode }),
                smUp ? React.createElement(polaris_1.Divider, null) : null,
                React.createElement(ButtonDisplayCustomRule_1["default"], { status: buttonEditorStatus, code: buttonEditorCode }))) : (""),
            selectedTab === 1 ? (React.createElement(polaris_1.BlockStack, { gap: { xs: "800", sm: "400" } },
                React.createElement(AutoRedirectsList_1["default"], { redirects: autoRedirects }),
                smUp ? React.createElement(polaris_1.Divider, null) : null)) : ("")),
        (toastData === null || toastData === void 0 ? void 0 : toastData.msg) !== "" &&
            shopify.toast.show(toastData.msg, { isError: toastData.error }),
        React.createElement("br", null)));
}
exports["default"] = CustomRedirects;
