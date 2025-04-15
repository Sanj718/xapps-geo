"use strict";
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
var polaris_2 = require("@shopify/polaris");
// @property {object} geolocation - Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.
// @property {object} redirectButton - Data of redirect button, example: {"flag":"https://....", "label": "Canada", order_r: 1, url: "https://...."}
// @return {boolean} - return false to hide button.
function WidgetDisplayCustomRuleCodeBanner() {
    return (React.createElement(polaris_2.Banner, { hideIcon: true },
        React.createElement(polaris_1.List, { type: "bullet", gap: "loose" },
            React.createElement(polaris_1.List.Item, null,
                React.createElement("code", null, "@property {object} ",
                    React.createElement("strong", null, "geolocation")),
                " - ", "Geolocation data of user, example: ",
                React.createElement("code", null, "{\"country_name\":\"Canada\",\"country\":\"CA\",\"continent\":\"NA\"}")),
            React.createElement(polaris_1.List.Item, null,
                React.createElement("code", null, "@property {object} ",
                    React.createElement("strong", null, "redirectButton")),
                " - ", "Data of redirect button, example: ",
                React.createElement("code", null, "{\"flag\":\"https://....\", \"label\": \"Canada\", order_r: 1, url: \"https://....\"}")),
            React.createElement(polaris_1.List.Item, null,
                React.createElement("code", null, "@return {boolean} ",
                    React.createElement("strong", null, "return false to hide button"))))));
}
exports["default"] = WidgetDisplayCustomRuleCodeBanner;
