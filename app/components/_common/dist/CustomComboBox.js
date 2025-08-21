"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CustomComboBox = void 0;
var polaris_1 = require("@shopify/polaris");
var react_1 = require("react");
var react_2 = require("react");
function CustomComboBox(_a) {
    var optionsList = _a.optionsList, defaultSelected = _a.defaultSelected, selectedItems = _a.selectedItems, setSelectedItems = _a.setSelectedItems, _b = _a.disabled, disabled = _b === void 0 ? false : _b;
    var checkSelectedItems = selectedItems && Object.keys(selectedItems).length !== 0 && selectedItems;
    var _c = react_2.useState(checkSelectedItems || defaultSelected || []), selectedTags = _c[0], setSelectedTags = _c[1];
    var _d = react_2.useState(""), value = _d[0], setValue = _d[1];
    var _e = react_2.useState(""), suggestion = _e[0], setSuggestion = _e[1];
    var handleActiveOptionChange = react_2.useCallback(function (activeOption) {
        var activeOptionIsAction = activeOption === value;
        if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
            setSuggestion(activeOption);
        }
        else {
            setSuggestion("");
        }
    }, [value, selectedTags]);
    var updateSelection = react_2.useCallback(function (selected) {
        var nextSelectedTags = new Set(__spreadArrays(selectedTags));
        if (nextSelectedTags.has(selected)) {
            nextSelectedTags["delete"](selected);
        }
        else {
            nextSelectedTags.add(selected);
        }
        setSelectedTags(__spreadArrays(nextSelectedTags));
        setSelectedItems(__spreadArrays(nextSelectedTags));
        setValue("");
        setSuggestion("");
    }, [selectedTags]);
    var removeTag = react_2.useCallback(function (tag) { return function () {
        updateSelection(tag);
    }; }, [updateSelection]);
    var getAllTags = react_2.useCallback(function () {
        var savedTags = optionsList;
        return __spreadArrays(new Set(__spreadArrays(savedTags, selectedTags).sort()));
    }, [selectedTags, optionsList]);
    var formatOptionText = react_2.useCallback(function (option) {
        var trimValue = value.trim().toLocaleLowerCase();
        var matchIndex = option.indexOf(trimValue);
        if (!value || matchIndex === -1)
            return option;
        var start = option.slice(0, matchIndex);
        var highlight = option.slice(matchIndex, matchIndex + trimValue.length);
        var end = option.slice(matchIndex + trimValue.length, option.length);
        return (react_1["default"].createElement(polaris_1.InlineStack, null,
            start,
            react_1["default"].createElement(polaris_1.Text, { as: "span" }, highlight),
            end));
    }, [value]);
    var options = react_2.useMemo(function () {
        var list;
        var allTags = getAllTags();
        var filterRegex = new RegExp(value, "i");
        if (value) {
            list = allTags.filter(function (tag) { return tag.match(filterRegex); });
        }
        else {
            list = allTags;
        }
        return __spreadArrays(list);
    }, [value, getAllTags]);
    var verticalContentMarkup = selectedTags.length > 0 ? (react_1["default"].createElement(polaris_1.InlineStack, { gap: "100" }, selectedTags.map(function (tag) { return (react_1["default"].createElement(polaris_1.Tag, { key: "option-" + tag, onRemove: removeTag(tag), disabled: disabled }, tag)); }))) : null;
    var optionMarkup = options.length > 0
        ? options.map(function (option) {
            return (react_1["default"].createElement(polaris_1.Listbox.Option, { key: option, value: option, selected: selectedTags.includes(option), accessibilityLabel: option },
                react_1["default"].createElement(polaris_1.Listbox.TextOption, { selected: selectedTags.includes(option) }, formatOptionText(option))));
        })
        : null;
    var noResults = value && !getAllTags().includes(value);
    var actionMarkup = noResults ? (react_1["default"].createElement(polaris_1.Listbox.Action, { disabled: disabled, value: value }, "Add \"" + value + "\"")) : null;
    var emptyStateMarkup = optionMarkup ? null : (react_1["default"].createElement(polaris_1.EmptySearchResult, { title: "", description: "No tags found matching \"" + value + "\"" }));
    var listboxMarkup = optionMarkup || actionMarkup || emptyStateMarkup ? (react_1["default"].createElement(polaris_1.Listbox, { autoSelection: polaris_1.AutoSelection.First, onSelect: updateSelection, onActiveOptionChange: handleActiveOptionChange },
        actionMarkup,
        optionMarkup)) : null;
    react_2.useMemo(function () {
        if (checkSelectedItems) {
            setSelectedTags(checkSelectedItems);
        }
    }, [checkSelectedItems]);
    return (react_1["default"].createElement("div", { className: "combobox" },
        react_1["default"].createElement(polaris_1.Combobox, { allowMultiple: true, activator: react_1["default"].createElement(polaris_1.Combobox.TextField, { disabled: disabled, autoComplete: "off", label: "Search tags", labelHidden: true, value: value, 
                // suggestion={suggestion}
                placeholder: "Select page template or add custom URL", verticalContent: verticalContentMarkup, onChange: setValue }) }, listboxMarkup)));
}
exports.CustomComboBox = CustomComboBox;
