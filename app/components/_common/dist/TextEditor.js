"use strict";
exports.__esModule = true;
var react_quill_1 = require("react-quill");
require("react-quill/dist/quill.snow.css");
function TextEditor(_a) {
    var _b = _a.textValue, textValue = _b === void 0 ? "" : _b, textOnChange = _a.textOnChange, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
    var toolbarOptions = [
        // [{ header: [2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
    ];
    return React.createElement("div", { className: disabled ? "visually-disabled" : "" },
        React.createElement(react_quill_1["default"], { className: "text-editor", theme: "snow", style: { background: "#fff" }, value: textValue || "", onChange: textOnChange, modules: { toolbar: toolbarOptions } }));
}
exports["default"] = TextEditor;
