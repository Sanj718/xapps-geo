"use strict";
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
function WidgetDisplayCustomRuleBanner() {
    return (React.createElement(polaris_1.Banner, { tone: "warning" },
        "Activating this feature will disable all settings under",
        " ",
        React.createElement("strong", null, "\"Popup display settings\""),
        " except the",
        " ",
        React.createElement("strong", null, "\"Display frequency\""),
        " option, as custom code will take over."));
}
exports["default"] = WidgetDisplayCustomRuleBanner;
