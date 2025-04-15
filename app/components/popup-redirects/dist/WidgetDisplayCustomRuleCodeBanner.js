"use strict";
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
var polaris_2 = require("@shopify/polaris");
function WidgetDisplayCustomRuleCodeBanner() {
    return (React.createElement(polaris_2.Banner, { hideIcon: true },
        React.createElement(polaris_1.List, { type: "bullet", gap: "loose" },
            React.createElement(polaris_1.List.Item, null,
                React.createElement("code", null, "@property {object} ",
                    React.createElement("strong", null, "geolocation")),
                " - ", "Geolocation data of user, example: ",
                React.createElement("code", null, "{\"country_name\":\"Canada\",\"country\":\"CA\",\"continent\":\"NA\"}")),
            React.createElement(polaris_1.List.Item, null,
                React.createElement("code", null, "@property {function} ",
                    React.createElement("strong", null, "openModal")),
                " - ", "Function to open modal."),
            React.createElement(polaris_1.List.Item, null,
                React.createElement("code", null, "@property {boolean} ",
                    React.createElement("strong", null, "hasBeenClosed")),
                " - ", "Modal closed state, saved in cookies/session (configured in Settings & style tab). Returns \"1\" (type string) if closed."))));
}
exports["default"] = WidgetDisplayCustomRuleCodeBanner;
