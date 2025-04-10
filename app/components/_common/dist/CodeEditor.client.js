"use strict";
exports.__esModule = true;
// import CodeMirror, { EditorView } from '@uiw/react-codemirror';
var react_1 = require("@monaco-editor/react");
function CodeEditor(_a) {
    // const [render, setRender] = useState(false);
    var code = _a.code, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, _c = _a.language, language = _c === void 0 ? "css" : _c, _d = _a.simple, simple = _d === void 0 ? false : _d;
    // useEffect(() => {
    //     setTimeout(() => {
    //         setRender(true);
    //     }, 5000);
    // }, []);
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
    return React.createElement(react_1["default"], { height: "300px", width: "100%", language: language, defaultValue: code, value: code, onChange: onChange, options: options });
}
exports["default"] = CodeEditor;
