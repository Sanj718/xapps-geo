"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
var react_1 = require("react");
function ListWithTags(_a) {
    var setConfigs = _a.setConfigs, configs = _a.configs, _b = _a.list, list = _b === void 0 ? [] : _b, id = _a.id, _c = _a.label, label = _c === void 0 ? "" : _c, _d = _a.placeholder, placeholder = _d === void 0 ? "" : _d, helpText = _a.helpText;
    var allOptions = react_1.useMemo(function () { return list; }, []);
    var _e = react_1.useState([]), selectedOptions = _e[0], setSelectedOptions = _e[1];
    var _f = react_1.useState(""), inputValue = _f[0], setInputValue = _f[1];
    var _g = react_1.useState(allOptions), options = _g[0], setOptions = _g[1];
    react_1.useEffect(function () {
        setSelectedOptions(configs[id]);
    }, [configs]);
    function updateText(value) {
        setInputValue(value);
        if (value === "") {
            setOptions(allOptions);
            return;
        }
        var filterRegex = new RegExp(value, "i");
        var resultOptions = allOptions.filter(function (option) {
            return option.label.match(filterRegex);
        });
        setOptions(resultOptions);
    }
    function updateSelection(selected) {
        var _a, _b;
        if (selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.includes(selected)) {
            var filtered = selectedOptions.filter(function (option) { return option !== selected; });
            setSelectedOptions(filtered);
            setConfigs(__assign(__assign({}, configs), (_a = {}, _a[id] = filtered, _a)));
        }
        else {
            var data = [];
            if (selectedOptions) {
                data = __spreadArrays(selectedOptions, [selected]);
            }
            else {
                data = [selected];
            }
            setSelectedOptions(data);
            setConfigs(__assign(__assign({}, configs), (_b = {}, _b[id] = data, _b)));
        }
        var matchedOption = options.find(function (option) {
            return option.value.match(selected);
        });
        setInputValue((matchedOption && matchedOption.label) || "");
    }
    function removeTag(tag) {
        var _a;
        var options = __spreadArrays(selectedOptions);
        options.splice(options.indexOf(tag), 1);
        setSelectedOptions(options);
        setConfigs(__assign(__assign({}, configs), (_a = {}, _a[id] = options, _a)));
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(polaris_1.Combobox, { allowMultiple: true, onClose: function () {
                setInputValue("");
            }, activator: react_1["default"].createElement(polaris_1.Combobox.TextField, { autoComplete: "off", onChange: updateText, value: inputValue, placeholder: placeholder, helpText: helpText, label: label }) }, (options === null || options === void 0 ? void 0 : options.length) ? (react_1["default"].createElement(polaris_1.Listbox, { onSelect: updateSelection }, options === null || options === void 0 ? void 0 : options.map(function (option) {
            var label = option.label, value = option.value, title = option.title;
            if (label === "-")
                return;
            if (title) {
                return react_1["default"].createElement(polaris_1.Listbox.Header, { key: value }, label);
            }
            return (react_1["default"].createElement(polaris_1.Listbox.Option, { key: value, value: value, selected: selectedOptions && selectedOptions.includes(value), accessibilityLabel: label }, label));
        }))) : null),
        react_1["default"].createElement("div", { style: { marginTop: "10px", maxHeight: "70px", overflow: "auto" } },
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "100" }, selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.map(function (option) {
                return (react_1["default"].createElement(polaris_1.Tag, { key: "option" + option, onRemove: function () { return removeTag(option); } }, option));
            })))));
}
exports["default"] = ListWithTags;
