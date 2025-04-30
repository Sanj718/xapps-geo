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
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var _helpers_1 = require("../_helpers");
var PromoBadge_1 = require("../_common/PromoBadge");
var CodeEditor_client_1 = require("../_common/CodeEditor.client");
var _actions_1 = require("../_actions");
var ButtonDisplayCustomRuleBanner_1 = require("./ButtonDisplayCustomRuleBanner");
var ButtonDisplayCustomRuleCodeBanner_1 = require("./ButtonDisplayCustomRuleCodeBanner");
function ButtonDisplayCustomRule(_a) {
    var status = _a.status, code = _a.code;
    var _b = react_2.useOutletContext(), shopInfo = _b.shopInfo, shopdb = _b.shopdb, activePlan = _b.activePlan, devPlan = _b.devPlan, veteranPlan = _b.veteranPlan, appId = _b.appId, appData = _b.appData;
    var _c = _helpers_1.planParser(activePlan), isProPlan = _c.isProPlan, isBasicPlan = _c.isBasicPlan, isFreePlan = _c.isFreePlan;
    var submit = react_2.useSubmit();
    var actionData = react_2.useActionData();
    var navigation = react_2.useNavigation();
    var navigate = react_2.useNavigate();
    var _d = react_1.useState(_helpers_1.defaultButtonCode), customCode = _d[0], setCustomCode = _d[1];
    function handleCustomCodeStatus(value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId)
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.update_ButtonDisplayCustomRuleStatus,
                    data: {
                        appId: appId,
                        data: value
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleCustomCodeSave() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId)
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.update_ButtonDisplayCustomRuleCode,
                    data: {
                        appId: appId,
                        data: customCode
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.update_ButtonDisplayCustomRuleStatus, _actions_1.ACTIONS.update_ButtonDisplayCustomRuleCode]);
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(PromoBadge_1["default"], { type: "pro" }),
                        react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Button display custom rule"),
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" },
                            "Easily implement your custom logic for buttons display. Make sure to ",
                            react_1["default"].createElement("strong", null, "activate it only if you're a developer"),
                            " ",
                            "and at your own risk. Reach out to us for personalized customization options.")))),
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                    react_1["default"].createElement(ButtonDisplayCustomRuleBanner_1["default"], null),
                    react_1["default"].createElement("div", { style: { position: "relative" } },
                        react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(polaris_1.Spinner, { size: "small" }) },
                            react_1["default"].createElement(react_2.Await, { resolve: status }, function (status) {
                                return react_1["default"].createElement(polaris_1.Select, { label: "Status: ", labelInline: true, options: [
                                        { label: "Active", value: "true" },
                                        { label: "Draft", value: "false" },
                                    ], disabled: loading[_actions_1.ACTIONS.update_ButtonDisplayCustomRuleStatus + "Loading"] || !isProPlan, onChange: isProPlan
                                        ? function (value) { return handleCustomCodeStatus(value); }
                                        : undefined, value: (status === null || status === void 0 ? void 0 : status.value) || "false" });
                            }),
                            loading[_actions_1.ACTIONS.update_ButtonDisplayCustomRuleStatus + "Loading"] && (react_1["default"].createElement("div", { style: { position: "absolute", top: "6px", right: "8px", zIndex: 10 } },
                                react_1["default"].createElement(polaris_1.Spinner, { size: "small" }))))),
                    react_1["default"].createElement(ButtonDisplayCustomRuleCodeBanner_1["default"], null),
                    react_1["default"].createElement("div", { id: "code-editor", className: "code-editor", style: {
                            opacity: isProPlan ? 1 : 0.3,
                            pointerEvents: isProPlan ? "initial" : "none"
                        } },
                        react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(polaris_1.Spinner, { size: "small" }) },
                            react_1["default"].createElement(react_2.Await, { resolve: code }, function (code) {
                                return react_1["default"].createElement(CodeEditor_client_1["default"], { code: (code === null || code === void 0 ? void 0 : code.value) || _helpers_1.defaultButtonCode, onChange: isProPlan ? setCustomCode : function () { }, language: "javascript" });
                            }))),
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between", gap: "200" },
                        react_1["default"].createElement(polaris_1.Button, { variant: "tertiary", icon: polaris_icons_1.MaximizeIcon, onClick: function () { return navigate("/app/redirects/button-display-custom-rule"); } }, "Open Full-Screen Editor"),
                        react_1["default"].createElement(polaris_1.Button, { variant: "primary", onClick: function () { return handleCustomCodeSave(); }, loading: loading[_actions_1.ACTIONS.update_ButtonDisplayCustomRuleCode + "Loading"] }, "Save"))))));
}
exports["default"] = ButtonDisplayCustomRule;
