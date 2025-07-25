"use strict";
exports.__esModule = true;
var react_1 = require("react");
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
var _helpers_1 = require("../_helpers");
var react_2 = require("@remix-run/react");
function PromoBadge(_a) {
    var type = _a.type;
    var activePlan = react_2.useOutletContext().activePlan;
    var _b = _helpers_1.planParser(activePlan), isFreePlan = _b.isFreePlan, isBasicPlan = _b.isBasicPlan, isProPlan = _b.isProPlan;
    // [TODO] - remove this once we have a proper plan parser
    // if ((isProPlan || isBasicPlan) && type === "basic") return;
    // if (isProPlan && type === "pro") return;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(polaris_1.InlineStack, { blockAlign: "center", wrap: false },
            react_1["default"].createElement(polaris_1.Badge, { progress: type === "pro" ? "complete" : "partiallyComplete", tone: type === "pro" ? "success-strong" : "success" }, type === "pro" ? "Pro plan feature" : "Basic plan feature"),
            react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, type === "pro"
                    ? "Disabled fields are available exclusively with the Pro plan. Please contact us to request access to the Dev plan for testing purposes."
                    : "Disabled fields are available exclusively with the Basic plan.") },
                react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.InfoIcon, tone: "subdued" })))));
}
exports["default"] = PromoBadge;
