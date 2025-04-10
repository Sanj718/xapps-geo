"use strict";
exports.__esModule = true;
var react_1 = require("react");
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
require("../../assets/custom.scss");
var TextEditor_client_1 = require("./TextEditor.client");
var react_2 = require("@remix-run/react");
var _helpers_1 = require("../_helpers");
function PopupContent(_a) {
    var _b = _a.titleLabel, titleLabel = _b === void 0 ? "Title" : _b, _c = _a.titleValue, titleValue = _c === void 0 ? "" : _c, _d = _a.titleOnChange, titleOnChange = _d === void 0 ? function () { } : _d, _e = _a.textLabel, textLabel = _e === void 0 ? "Short text" : _e, _f = _a.textValue, textValue = _f === void 0 ? "" : _f, _g = _a.textOnChange, textOnChange = _g === void 0 ? undefined : _g, _h = _a.textHelpText, textHelpText = _h === void 0 ? "" : _h, _j = _a.translation, translation = _j === void 0 ? 0 : _j, _k = _a.titleDisabled, titleDisabled = _k === void 0 ? false : _k, _l = _a.textDisabled, textDisabled = _l === void 0 ? false : _l;
    var activePlan = react_2.useOutletContext().activePlan;
    var isFreePlan = _helpers_1.planParser(activePlan).isFreePlan;
    var toolTipContent = (react_1["default"].createElement("small", null, "Translate your content into multiple languages supported by your store."));
    return (react_1["default"].createElement(polaris_1.InlineGrid, { gap: "400" },
        react_1["default"].createElement(polaris_1.BlockStack, { gap: "0" },
            react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between", gap: "200", blockAlign: "center" },
                react_1["default"].createElement(polaris_1.Text, { as: "p" }, titleLabel),
                translation ? (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: toolTipContent },
                    react_1["default"].createElement(polaris_1.Button, { icon: polaris_icons_1.LanguageIcon, size: "micro", onClick: function () { return shopify.modal.show("popup-content-translation-popup"); } }))) : null),
            react_1["default"].createElement(polaris_1.TextField, { size: "slim", label: titleLabel, value: titleValue, labelHidden: true, onChange: titleOnChange, autoComplete: "off", disabled: titleDisabled })),
        textOnChange && (react_1["default"].createElement("div", { className: textDisabled ? "visually-disabled" : "" },
            react_1["default"].createElement(polaris_1.BlockStack, { gap: "150" },
                react_1["default"].createElement(polaris_1.BlockStack, { gap: "0" },
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between", gap: "200", blockAlign: "center" },
                        react_1["default"].createElement(polaris_1.Text, { as: "p" }, textLabel),
                        translation ? (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: toolTipContent },
                            react_1["default"].createElement(polaris_1.Button, { icon: polaris_icons_1.LanguageIcon, size: "micro", onClick: function () { return shopify.modal.show("popup-content-translation-popup"); } }))) : null),
                    react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement("div", null, "Loading editor...") },
                        react_1["default"].createElement(TextEditor_client_1["default"], { textValue: textValue, textOnChange: isFreePlan ? function () { } : textOnChange, disabled: isFreePlan }))),
                textHelpText !== "" ? (react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs", tone: "subdued" },
                    react_1["default"].createElement("small", null, textHelpText))) : (""))))));
}
exports["default"] = PopupContent;
