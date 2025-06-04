"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Editor = react_1.lazy(function () { return Promise.resolve().then(function () { return require('@monaco-editor/react'); }); });
function CodeEditor(_a) {
    var code = _a.code, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, _c = _a.language, language = _c === void 0 ? "css" : _c, _d = _a.simple, simple = _d === void 0 ? false : _d;
    var options = simple ? {
        readOnly: false,
        minimap: { enabled: false },
        scrollbar: {
            vertical: "hidden"
        },
        overviewRulerBorder: false,
        renderLineHighlight: "none",
        glyphMargin: false,
        lineNumbers: "off",
        folding: false
    } : {
        readOnly: false,
        minimap: { enabled: false }
    };
    return (React.createElement("div", { className: "code-editor-container", style: { border: "1px solid #ccc", borderRadius: "4px" } },
        React.createElement(Editor, { height: "300px", width: "100%", language: language, defaultValue: code, value: code, onChange: function (value) { return value && onChange(value); }, options: options })));
}
exports["default"] = CodeEditor;
