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
var _helpers_1 = require("../../components/_helpers");
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var _actions_1 = require("./_actions");
var _loaders_1 = require("./_loaders");
var _actions_2 = require("app/components/_actions");
var CodeEditor_client_1 = require("app/components/_common/CodeEditor.client");
var ButtonDisplayCustomRuleBanner_1 = require("app/components/popup-redirects/ButtonDisplayCustomRuleBanner");
var ButtonDisplayCustomRuleCodeBanner_1 = require("app/components/popup-redirects/ButtonDisplayCustomRuleCodeBanner");
exports.loader = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _loaders_1.handleLoaders(params)];
}); }); };
exports.action = function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, _actions_1.handleActions(params)];
}); }); };
function WidgetDisplayCustomRulePage() {
    var _a = react_2.useOutletContext(), activePlan = _a.activePlan, appId = _a.appId;
    var isProPlan = _helpers_1.planParser(activePlan).isProPlan;
    var _b = react_2.useLoaderData(), buttonEditorStatus = _b.buttonEditorStatus, buttonEditorCode = _b.buttonEditorCode;
    var submit = react_2.useSubmit();
    var navigation = react_2.useNavigation();
    var navigate = react_2.useNavigate();
    var _c = react_1.useState(_helpers_1.defaultButtonCode), customCode = _c[0], setCustomCode = _c[1];
    function handleCustomCodeSave() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId)
                    return [2 /*return*/];
                submit({
                    _action: _actions_2.ACTIONS.ButtonDisplayCustomRuleCodeSave,
                    data: {
                        appId: appId,
                        data: customCode
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleCustomCodeStatus(value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId)
                    return [2 /*return*/];
                submit({
                    _action: _actions_2.ACTIONS.ButtonDisplayCustomRuleStatus,
                    data: {
                        appId: appId,
                        data: value
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_2.ACTIONS.ButtonDisplayCustomRuleCodeSave, _actions_2.ACTIONS.ButtonDisplayCustomRuleStatus]);
    return (React.createElement(polaris_1.Page, { fullWidth: true, compactTitle: true, title: "Button display custom rule", backAction: {
            content: "Back",
            onAction: function () { return navigate("/app/redirects#code-editor", {
                viewTransition: true,
                preventScrollReset: true
            }); }
        }, primaryAction: { content: "Save", onAction: handleCustomCodeSave, loading: loading[_actions_2.ACTIONS.ButtonDisplayCustomRuleCodeSave + "Loading"] } },
        React.createElement(polaris_1.BlockStack, { gap: "200" },
            React.createElement(ButtonDisplayCustomRuleBanner_1["default"], null),
            React.createElement("div", { style: { position: "relative" } },
                React.createElement(react_1.Suspense, { fallback: React.createElement(polaris_1.Spinner, { size: "small" }) },
                    React.createElement(react_2.Await, { resolve: buttonEditorStatus }, function (status) {
                        return React.createElement(polaris_1.Select, { label: "Status: ", labelInline: true, options: [
                                { label: "Active", value: "true" },
                                { label: "Draft", value: "false" },
                            ], disabled: loading[_actions_2.ACTIONS.ButtonDisplayCustomRuleStatus + "Loading"] || !isProPlan, onChange: isProPlan
                                ? function (value) { return handleCustomCodeStatus(value); }
                                : undefined, value: (status === null || status === void 0 ? void 0 : status.value) || "false" });
                    }),
                    loading[_actions_2.ACTIONS.ButtonDisplayCustomRuleStatus + "Loading"] && (React.createElement("div", { style: { position: "absolute", top: "6px", right: "8px", zIndex: 10 } },
                        React.createElement(polaris_1.Spinner, { size: "small" }))))),
            React.createElement(polaris_1.Card, null,
                React.createElement(ButtonDisplayCustomRuleCodeBanner_1["default"], null),
                React.createElement("br", null),
                React.createElement(react_1.Suspense, { fallback: React.createElement(polaris_1.Spinner, { size: "small" }) },
                    React.createElement(react_2.Await, { resolve: buttonEditorCode }, function (code) {
                        return React.createElement(CodeEditor_client_1["default"], { code: (code === null || code === void 0 ? void 0 : code.value) || _helpers_1.defaultButtonCode, onChange: isProPlan ? setCustomCode : function () { }, language: "javascript" });
                    }))))));
}
exports["default"] = WidgetDisplayCustomRulePage;
