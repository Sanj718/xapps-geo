"use strict";
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
function WidgetDisplayCustomRuleBanner() {
    return (React.createElement(polaris_1.Banner, { tone: "warning" },
        "Activating this feature will disable redirect item",
        " ",
        React.createElement("strong", null, "\"Enable conditional show\""),
        " checkbox, as custom code will take over."));
}
exports["default"] = WidgetDisplayCustomRuleBanner;
