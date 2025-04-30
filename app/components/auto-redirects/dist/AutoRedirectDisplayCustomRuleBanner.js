"use strict";
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
function AutoRedirectDisplayCustomRuleBanner() {
    return (React.createElement(polaris_1.Banner, { tone: "warning" },
        "Please ensure to ",
        React.createElement("strong", null, "add at least one auto redirect"),
        " ",
        "item before implementing any custom auto-redirect code."));
}
exports["default"] = AutoRedirectDisplayCustomRuleBanner;
