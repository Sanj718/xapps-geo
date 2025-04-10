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
exports.action = exports.loader = void 0;
var polaris_1 = require("@shopify/polaris");
// import { PageTitle } from "../../components/_common/PageTitle";
var _helpers_1 = require("../../components/_helpers");
var env_1 = require("../../components/env");
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var _actions_1 = require("./_actions");
var _loaders_1 = require("./_loaders");
var app_bridge_react_1 = require("@shopify/app-bridge-react");
var CustomizePopup_1 = require("app/components/popup-redirects/CustomizePopup");
var _actions_2 = require("app/components/_actions");
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
// Add deep comparison function
function areObjectsEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null)
        return false;
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length)
        return false;
    return keys1.every(function (key) {
        if (!(key in obj2))
            return false;
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            return areObjectsEqual(obj1[key], obj2[key]);
        }
        return obj1[key] === obj2[key];
    });
}
function CustomRedirectsCode() {
    var _a;
    var _b = react_2.useOutletContext(), shopInfo = _b.shopInfo, shopdb = _b.shopdb, activePlan = _b.activePlan, devPlan = _b.devPlan, veteranPlan = _b.veteranPlan, appId = _b.appId, appData = _b.appData;
    var _c = react_2.useLoaderData(), allRedirects = _c.allRedirects, configs = _c.configs, widgetEditorStatus = _c.widgetEditorStatus, widgetEditorCode = _c.widgetEditorCode;
    var actionData = react_2.useActionData();
    var submit = react_2.useSubmit();
    var navigation = react_2.useNavigation();
    var navigate = react_2.useNavigate();
    var _d = react_1.useState(false), hasChange = _d[0], setHasChange = _d[1];
    var _e = react_1.useState({ msg: "", error: false }), toastData = _e[0], setToastData = _e[1];
    var _f = react_1.useState([]), redirects = _f[0], setRedirects = _f[1];
    var _g = (configs === null || configs === void 0 ? void 0 : configs.data[0]) || {}, basicConfigs = _g.basicConfigs, advancedConfigs = _g.advancedConfigs, hideOnAllowedPages = _g.hideOnAllowedPages, allowedPages = _g.allowedPages;
    var _h = react_1.useState(__assign(__assign({}, _helpers_1.default_basic_configs), basicConfigs)), localConfigs = _h[0], setLocalConfigs = _h[1];
    var _j = react_1.useState(__assign(__assign({}, _helpers_1.default_advanced_configs), advancedConfigs)), localAdvancedConfigs = _j[0], setLocalAdvancedConfigs = _j[1];
    var secondaryLocales = (_a = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shopLocales) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return !item.primary; });
    function saveConfigs() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_2.ACTIONS.CreateUpdateConfigs,
                    data: {
                        basicConfigs: localConfigs,
                        advancedConfigs: localAdvancedConfigs
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    react_1.useMemo(function () {
        if (allRedirects === null || allRedirects === void 0 ? void 0 : allRedirects.status) {
            var orderedRedirects = allRedirects.data.sort(function (a, b) { return a.order - b.order; });
            setRedirects(orderedRedirects);
        }
    }, [allRedirects]);
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
    react_1.useEffect(function () {
        var definedConfigs = __assign(__assign({}, _helpers_1.default_basic_configs), basicConfigs);
        var definedAdvancedConfigs = __assign(__assign({}, _helpers_1.default_advanced_configs), advancedConfigs);
        if (!areObjectsEqual(localConfigs, definedConfigs) || !areObjectsEqual(localAdvancedConfigs, definedAdvancedConfigs)) {
            shopify.saveBar.show('configs-save-bar');
            setHasChange(true);
        }
        else {
            shopify.saveBar.hide('configs-save-bar');
            setHasChange(false);
        }
    }, [localConfigs, localAdvancedConfigs, configs]);
    var loading = _helpers_1.loadingStates(navigation, [_actions_2.ACTIONS.CreateUpdateConfigs]);
    return (React.createElement(polaris_1.Page, { fullWidth: true, compactTitle: true, title: "Customize your popup", backAction: { content: "Back", onAction: function () { return navigate("/app/redirects"); } }, primaryAction: { content: "Save", disabled: !hasChange, onAction: saveConfigs, loading: loading[_actions_2.ACTIONS.CreateUpdateConfigs + "Loading"] } },
        React.createElement(CustomizePopup_1["default"], { redirects: redirects, configs: localConfigs, setConfigs: setLocalConfigs, advancedConfigs: localAdvancedConfigs, setAdvancedConfigs: setLocalAdvancedConfigs, saveConfigs: saveConfigs }),
        React.createElement(app_bridge_react_1.SaveBar, { id: "configs-save-bar", discardConfirmation: true },
            React.createElement("button", { variant: "primary", onClick: saveConfigs, loading: loading[_actions_2.ACTIONS.CreateUpdateConfigs + "Loading"] ? "true" : undefined }),
            React.createElement("button", { onClick: function () {
                    shopify.saveBar.hide('configs-save-bar');
                    navigate("/app/redirects");
                } })),
        (toastData === null || toastData === void 0 ? void 0 : toastData.msg) !== "" &&
            shopify.toast.show(toastData.msg, { isError: toastData.error }),
        React.createElement("br", null)));
}
exports["default"] = CustomRedirectsCode;
