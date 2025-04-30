"use strict";
exports.__esModule = true;
var react_1 = require("react");
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
function ExternalSettingsItem(_a) {
    var label = _a.label, text = _a.text, _b = _a.url, url = _b === void 0 ? "" : _b, _c = _a.link, link = _c === void 0 ? "" : _c;
    return (react_1["default"].createElement("div", { className: "settings-item" },
        react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between", blockAlign: "center", wrap: false },
            react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingXs" }, label),
                react_1["default"].createElement("div", { style: { maxWidth: "90%" } },
                    react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs" },
                        text,
                        " ",
                        link !== "" && react_1["default"].createElement(polaris_1.Link, { target: "_blank", url: link }, "Read more")))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(polaris_1.Button, { variant: "tertiary", icon: polaris_icons_1.ExternalIcon, url: url, target: "_blank" }, "Edit")))));
}
exports["default"] = ExternalSettingsItem;
