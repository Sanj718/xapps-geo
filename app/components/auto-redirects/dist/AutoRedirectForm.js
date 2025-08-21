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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var polaris_icons_1 = require("@shopify/polaris-icons");
var _helpers_1 = require("../_helpers");
var countries_json_1 = require("../../assets/countries.json");
var valid_url_1 = require("valid-url");
var react_2 = require("@remix-run/react");
var ListWithTags_1 = require("../_common/ListWithTags");
var _actions_1 = require("../_actions");
var defaultRedirectItem = {
    id: "",
    key: "",
    location: [],
    except_r: false,
    block: false,
    url: "",
    domain_redirection: false,
    status: true,
    order_r: 0
};
function AutoRedirectForm(_a) {
    var _b = _a.editItem, editItem = _b === void 0 ? null : _b, _c = _a.redirects, redirects = _c === void 0 ? [] : _c;
    var _d = react_2.useOutletContext(), activePlan = _d.activePlan, appId = _d.appId;
    var isFreePlan = _helpers_1.planParser(activePlan).isFreePlan;
    var navigation = react_2.useNavigation();
    var submit = react_2.useSubmit();
    var actionData = react_2.useActionData();
    var _e = react_1.useState(false), addButtonStatus = _e[0], setAddButtonStatus = _e[1];
    var _f = react_1.useState({
        url: false,
        location: false
    }), fieldValidation = _f[0], setFieldValidation = _f[1];
    var _g = react_1.useState(editItem
        ? __assign(__assign({}, editItem === null || editItem === void 0 ? void 0 : editItem.jsonValue), { id: editItem === null || editItem === void 0 ? void 0 : editItem.id }) : defaultRedirectItem), redirectItem = _g[0], setRedirectItem = _g[1];
    react_1.useMemo(function () {
        if (editItem) {
            setRedirectItem(__assign(__assign({}, editItem === null || editItem === void 0 ? void 0 : editItem.jsonValue), { id: editItem === null || editItem === void 0 ? void 0 : editItem.id, key: editItem === null || editItem === void 0 ? void 0 : editItem.key }));
        }
    }, [editItem]);
    react_1.useMemo(function () {
        var validator = 1;
        if (redirectItem.block) {
            if (redirectItem.location === null ||
                redirectItem.location === undefined ||
                redirectItem.location === "" ||
                !redirectItem.location.length) {
                validator *= 0;
            }
        }
        else {
            Object.entries(redirectItem).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (key === "url" || key === "location") {
                    if (value === null ||
                        value === undefined ||
                        value === "" ||
                        !(value === null || value === void 0 ? void 0 : value.length)) {
                        validator *= 0;
                    }
                    if (key === "url") {
                        if (!valid_url_1.isWebUri(value)) {
                            validator *= 0;
                        }
                    }
                }
            });
        }
        setAddButtonStatus(validator > 0 ? false : true);
    }, [redirectItem]);
    react_1.useMemo(function () {
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_1.ACTIONS.create_AutoRedirect && (actionData === null || actionData === void 0 ? void 0 : actionData.status)) {
            if (typeof shopify !== 'undefined' && shopify.modal) {
                shopify.modal.hide("add-auto-redirect");
            }
            setRedirectItem(defaultRedirectItem);
        }
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_1.ACTIONS.delete_AutoRedirect && (actionData === null || actionData === void 0 ? void 0 : actionData.status)) {
            if (typeof shopify !== 'undefined' && shopify.modal) {
                shopify.modal.hide("edit-auto-redirect");
            }
            setRedirectItem(defaultRedirectItem);
        }
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_1.ACTIONS.update_AutoRedirect && (actionData === null || actionData === void 0 ? void 0 : actionData.status)) {
            if (typeof shopify !== 'undefined' && shopify.modal) {
                shopify.modal.hide("edit-auto-redirect");
            }
            setRedirectItem(defaultRedirectItem);
        }
    }, [actionData]);
    function validateUrlField(value, field) {
        var _a;
        setFieldValidation(__assign(__assign({}, fieldValidation), (_a = {}, _a[field] = !valid_url_1.isWebUri(value), _a)));
    }
    function handleEdit() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId || !(editItem === null || editItem === void 0 ? void 0 : editItem.key))
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.update_AutoRedirect,
                    data: {
                        appId: appId,
                        key: editItem === null || editItem === void 0 ? void 0 : editItem.key,
                        value: redirectItem
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleDelete(key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!appId || !key)
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.delete_AutoRedirect,
                    data: {
                        appId: appId,
                        key: key
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleAdd() {
        return __awaiter(this, void 0, void 0, function () {
            var nextOrderNumber;
            return __generator(this, function (_a) {
                if (isFreePlan && (redirects === null || redirects === void 0 ? void 0 : redirects.length) >= 1) {
                    shopify.toast.show("You have reached the limit of auto redirects on Free plan", {
                        isError: true
                    });
                    return [2 /*return*/];
                }
                nextOrderNumber = (redirects === null || redirects === void 0 ? void 0 : redirects.length) ? Math.max.apply(Math, redirects.map(function (o) { return o.jsonValue.order_r; })) + 1
                    : 1;
                if (!appId)
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.create_AutoRedirect,
                    data: {
                        appId: appId,
                        data: __assign(__assign({}, redirectItem), { order_r: nextOrderNumber })
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var countries_conditionals = _helpers_1.parseCountryCodesWithFullNames(countries_json_1["default"]);
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.create_AutoRedirect, _actions_1.ACTIONS.update_AutoRedirect, _actions_1.ACTIONS.delete_AutoRedirect]);
    return (react_1["default"].createElement(polaris_1.InlineGrid, { gap: "400" },
        editItem && (react_1["default"].createElement(polaris_1.Select, { label: "Status:", labelInline: true, options: [
                { value: "active", label: "Active" },
                { value: "draft", label: "Draft" },
            ], value: redirectItem.status ? "active" : "draft", onChange: function (value) {
                return setRedirectItem(__assign(__assign({}, redirectItem), { status: value === "active" ? true : false }));
            } })),
        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "400" },
            react_1["default"].createElement(polaris_1.InlineGrid, { columns: "23% auto", gap: "200" },
                react_1["default"].createElement(polaris_1.Select, { label: "Location scope", options: [
                        {
                            label: "Outside",
                            value: "except"
                        },
                        {
                            label: "Inside",
                            value: "include"
                        },
                    ], onChange: function (value) {
                        return setRedirectItem(function (current) { return (__assign(__assign({}, current), { except_r: value === "except" ? true : false })); });
                    }, value: (redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.except_r) ? "except" : "include" }),
                react_1["default"].createElement(ListWithTags_1["default"], { list: __spreadArrays([
                        { value: "-c", label: "Continents", title: true }
                    ], _helpers_1.continents_auto, [
                        { value: "-ct", label: "Countries", title: true }
                    ], countries_conditionals), setConfigs: setRedirectItem, configs: redirectItem, id: "location", placeholder: "Click to select", label: "Select country or continent" })),
            react_1["default"].createElement(polaris_1.InlineGrid, { columns: "70% auto 20%", alignItems: "center", gap: "200" },
                react_1["default"].createElement(polaris_1.InlineGrid, null,
                    react_1["default"].createElement(polaris_1.TextField, { disabled: redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.block, type: "url", autoComplete: "off", placeholder: "https://", 
                        // prefix="https://"
                        inputMode: "url", label: "Redirect url", value: (redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.url) ? redirectItem.url : "https://", error: fieldValidation.url && "Please enter valid url", onBlur: function (e) { var _a; return validateUrlField(((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value) || "", "url"); }, onChange: function (value) {
                            return setRedirectItem(__assign(__assign({}, redirectItem), { url: value }));
                        } }),
                    react_1["default"].createElement(polaris_1.Checkbox, { disabled: redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.block, label: react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", blockAlign: "center" },
                            "Domain redirection",
                            react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null,
                                    "Keeps you on the same page when switching to a new domain. For example, if you're on",
                                    " ",
                                    react_1["default"].createElement("code", null, "site.com/about"),
                                    ", you'll be redirected to",
                                    " ",
                                    react_1["default"].createElement("code", null, "new-site.com/about"),
                                    " without losing your path.") },
                                react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))), checked: redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.domain_redirection, onChange: function (value) {
                            return setRedirectItem(__assign(__assign({}, redirectItem), { domain_redirection: value }));
                        } })),
                react_1["default"].createElement(polaris_1.InlineStack, { align: "center" },
                    react_1["default"].createElement(polaris_1.Badge, null, "OR")),
                react_1["default"].createElement("div", { style: {
                        border: "1px dashed #8e0b21",
                        background: "#fed1d7",
                        color: "#8e0b21",
                        padding: "0px 6px",
                        borderRadius: "8px"
                    } },
                    react_1["default"].createElement(polaris_1.Checkbox, { label: "Block", checked: redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.block, onChange: function (value) {
                            return setRedirectItem(function (current) { return (__assign(__assign({}, current), { block: value })); });
                        } }))),
            react_1["default"].createElement(polaris_1.Divider, null),
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", align: "space-between" },
                editItem ? (react_1["default"].createElement(polaris_1.Button, { size: "slim", tone: "critical", onClick: function () { return handleDelete(redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.key); }, loading: loading[_actions_1.ACTIONS.delete_AutoRedirect + "Loading"], icon: polaris_icons_1.DeleteIcon }, "Delete")) : (react_1["default"].createElement("div", null)),
                react_1["default"].createElement(polaris_1.InlineStack, { gap: "200" },
                    react_1["default"].createElement(polaris_1.Button, { onClick: function () {
                            if (typeof shopify !== 'undefined' && shopify.modal) {
                                shopify.modal.hide("add-auto-redirect");
                            }
                            if (typeof shopify !== 'undefined' && shopify.modal) {
                                shopify.modal.hide("edit-auto-redirect");
                            }
                        } }, "Cancel"),
                    react_1["default"].createElement(polaris_1.Button, { variant: "primary", onClick: editItem ? handleEdit : handleAdd, disabled: addButtonStatus, loading: loading[_actions_1.ACTIONS.create_AutoRedirect + "Loading"] || loading[_actions_1.ACTIONS.update_AutoRedirect + "Loading"] }, editItem ? "Save" : "Add"))))));
}
exports["default"] = AutoRedirectForm;
