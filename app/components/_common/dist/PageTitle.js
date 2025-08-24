"use strict";
exports.__esModule = true;
exports.PageTitle = void 0;
var react_1 = require("react");
var polaris_icons_1 = require("@shopify/polaris-icons");
var polaris_1 = require("@shopify/polaris");
var status_green_svg_1 = require("../../assets/status-green.svg");
var status_red_svg_1 = require("../../assets/status-red.svg");
var status_gray_svg_1 = require("../../assets/status-gray.svg");
function PageTitle(_a) {
    var icon = _a.icon, title = _a.title, status = _a.status, loading = _a.loading, _b = _a.url, url = _b === void 0 ? "" : _b, _c = _a.hideStatus, hideStatus = _c === void 0 ? false : _c;
    return (react_1["default"].createElement(polaris_1.Box, { padding: "400" },
        react_1["default"].createElement(polaris_1.Banner, { tone: "info" }, "We recently made some platform updates to improve performance and reliability. If you notice any issues, please don't hesitate to contact (contact@xapps.shop) our support team - we're here to help!"),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", align: "space-between" },
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", blockAlign: "center" },
                icon && react_1["default"].createElement(polaris_1.Icon, { source: icon }),
                react_1["default"].createElement(polaris_1.Text, { as: "h1", variant: "headingXl" }, title)),
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "300", blockAlign: "center" },
                !hideStatus && (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement(polaris_1.Box, { padding: "200" },
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingXs" },
                                "Status: ",
                                status ? "Enabled" : "Disabled"),
                            react_1["default"].createElement("small", null,
                                "App embeds enable features like geolocation redirection by injecting necessary code into your theme (Shopify recommended method). This ensures your store can support popup or automatically redirect visitors based on your configurations.",
                                " ",
                                react_1["default"].createElement("strong", null, "Make sure this is enabled to activate redirection features."),
                                " ",
                                "Manage app embeds in your theme editor."))) },
                    react_1["default"].createElement(polaris_1.InlineStack, { gap: "200" },
                        react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Status:"),
                        react_1["default"].createElement(polaris_1.Image, { alt: "", source: loading ? status_gray_svg_1["default"] : status ? status_green_svg_1["default"] : status_red_svg_1["default"] }),
                        react_1["default"].createElement(polaris_1.Button, { url: url, size: "micro", icon: polaris_icons_1.AdjustIcon })))),
                react_1["default"].createElement(polaris_1.Button, { size: "micro", icon: polaris_icons_1.QuestionCircleIcon, url: "https://geolocationredirects-xapps.tawk.help/", target: "_blank" }, "Help center")))));
}
exports.PageTitle = PageTitle;
