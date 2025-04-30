"use strict";
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
/*
  Auto redirection custom code is for adding/editing your custom logic for existing auto-redirects. This will not work on its own, you have to add at least one redirection rule.
  @property {string} redirectUrl - Redirect url added in app admin.
  @property {string} currentUrl - Current client visited page url added.
  @property {object} geolocation - Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.
  @property {function} forceRedirect - Force redirect by ingoring any other redirection rules. Accepts one argument type {string}. Example: forceRedirect("https://your-url.com")
  @return {string} - Modified string of url to be redirected. If empty string user will be redirected based on app admin logic.
*/
function AutoRedirectDisplayCustomRuleCodeBanner() {
    return (React.createElement(polaris_1.Banner, { hideIcon: true },
        React.createElement(polaris_1.BlockStack, { gap: "200" },
            React.createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Auto redirection custom code is for adding/editing your custom logic for existing auto-redirects. This will not work on its own, you have to add at least one redirection rule."),
            React.createElement(polaris_1.List, { type: "bullet", gap: "loose" },
                React.createElement(polaris_1.List.Item, null,
                    React.createElement("code", null, "@property {string} ",
                        React.createElement("strong", null, "redirectUrl")),
                    " - ", "Redirect url added in app admin."),
                React.createElement(polaris_1.List.Item, null,
                    React.createElement("code", null, "@property {string} ",
                        React.createElement("strong", null, "currentUrl")),
                    " - ", "Current client visited page url added."),
                React.createElement(polaris_1.List.Item, null,
                    React.createElement("code", null, "@property {object} ",
                        React.createElement("strong", null, "geolocation")),
                    " - ", "Geolocation data of user, example: ",
                    React.createElement("code", null, "{\"country_name\":\"Canada\",\"country\":\"CA\",\"continent\":\"NA\"}")),
                React.createElement(polaris_1.List.Item, null,
                    React.createElement("code", null, "@property {function} ",
                        React.createElement("strong", null, "forceRedirect")),
                    " - ", "Force redirect by ingoring any other redirection rules. Accepts one argument type {string}. Example: forceRedirect(\"https://your-url.com\")"),
                React.createElement(polaris_1.List.Item, null,
                    React.createElement("code", null, "@return {string} ",
                        React.createElement("strong", null, "Modified string of url to be redirected.")),
                    " - ", "If empty string user will be redirected based on app admin logic.")))));
}
exports["default"] = AutoRedirectDisplayCustomRuleCodeBanner;
