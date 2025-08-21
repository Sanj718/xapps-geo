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
var countries_json_1 = require("../../assets/countries.json");
var _helpers_1 = require("../_helpers");
var valid_url_1 = require("valid-url");
var ListWithTags_1 = require("../_common/ListWithTags");
var ImageManager_1 = require("../_common/ImageManager");
var PromoBadge_1 = require("../_common/PromoBadge");
var react_2 = require("@remix-run/react");
var _actions_1 = require("../_actions");
var defaultRedirectItem = {
    shopId: 0,
    flag: "",
    label: "",
    url: "",
    order: 0,
    conditional: false,
    conditionalLocation: null,
    domainRedirection: false,
    locales: null
};
function PopupRedirectForm(_a) {
    var _b, _c;
    var _d = _a.editItem, editItem = _d === void 0 ? undefined : _d, _e = _a.redirects, redirects = _e === void 0 ? [] : _e;
    var _f = react_2.useOutletContext(), shopInfo = _f.shopInfo, shopdb = _f.shopdb, activePlan = _f.activePlan, devPlan = _f.devPlan, veteranPlan = _f.veteranPlan, appId = _f.appId, appData = _f.appData;
    var actionData = react_2.useActionData();
    var navigation = react_2.useNavigation();
    var _g = _helpers_1.planParser(activePlan), isProPlan = _g.isProPlan, isBasicPlan = _g.isBasicPlan, isFreePlan = _g.isFreePlan;
    var countries = _helpers_1.parseCountries(countries_json_1["default"]);
    var countries_conditionals = _helpers_1.parseCountryCodesWithFullNames(countries_json_1["default"]);
    var primaryLocale = (_b = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shopLocales) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.primary; });
    var secondaryLocales = (_c = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shopLocales) === null || _c === void 0 ? void 0 : _c.filter(function (item) { return !item.primary; });
    var submit = react_2.useSubmit();
    var _h = react_1.useState(""), selectedCountry = _h[0], setSelectedCountry = _h[1];
    var _j = react_1.useState(false), addButtonStatus = _j[0], setAddButtonStatus = _j[1];
    var _k = react_1.useState(false), labelTranslation = _k[0], setLabelTranslation = _k[1];
    var _l = react_1.useState(false), assetsModalStatus = _l[0], setAssetsModalStatus = _l[1];
    var _m = react_1.useState(defaultRedirectItem), redirectItem = _m[0], setRedirectItem = _m[1];
    var _o = react_1.useState({
        url: false,
        flag: false
    }), fieldValidation = _o[0], setFieldValidation = _o[1];
    react_1.useMemo(function () {
        if (editItem === null || editItem === void 0 ? void 0 : editItem.id) {
            setSelectedCountry(editItem.flag);
            setRedirectItem(editItem);
        }
    }, [editItem]);
    react_1.useMemo(function () {
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_1.ACTIONS.create_Redirect && (actionData === null || actionData === void 0 ? void 0 : actionData.status)) {
            if (typeof shopify !== 'undefined' && shopify.modal) {
                shopify.modal.hide("add-redirect");
            }
            setRedirectItem(defaultRedirectItem);
            setSelectedCountry("--");
        }
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_1.ACTIONS.delete_Redirect && (actionData === null || actionData === void 0 ? void 0 : actionData.status)) {
            if (typeof shopify !== 'undefined' && shopify.modal) {
                shopify.modal.hide("edit-redirect");
            }
            setRedirectItem(defaultRedirectItem);
            setSelectedCountry("--");
        }
        if ((actionData === null || actionData === void 0 ? void 0 : actionData._action) === _actions_1.ACTIONS.update_Redirect && (actionData === null || actionData === void 0 ? void 0 : actionData.status)) {
            if (typeof shopify !== 'undefined' && shopify.modal) {
                shopify.modal.hide("edit-redirect");
            }
            setRedirectItem(defaultRedirectItem);
            setSelectedCountry("--");
        }
        if ((actionData === null || actionData === void 0 ? void 0 : actionData.status) === false && (actionData === null || actionData === void 0 ? void 0 : actionData.error) !== "") {
            if (typeof shopify !== 'undefined' && shopify.toast) {
                shopify.toast.show((actionData === null || actionData === void 0 ? void 0 : actionData.error) || "Something wrong", { isError: true });
            }
        }
    }, [actionData]);
    function handleCountrySelect(value) {
        setSelectedCountry(value);
        var selectedCountry = countries_json_1["default"].find(function (country) { return country.image === value; });
        setRedirectItem(__assign(__assign({}, redirectItem), { flag: value, label: (selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.name) || "" }));
        setFieldValidation(__assign(__assign({}, fieldValidation), { flag: false }));
    }
    function handleCustomIconUpload(assets) {
        if (!assets)
            return;
        setRedirectItem(__assign(__assign({}, redirectItem), { flag: assets.url }));
        setSelectedCountry("--");
        setAssetsModalStatus(false);
    }
    react_1.useMemo(function () {
        var validator = 1;
        Object.entries(redirectItem).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (key === "url" || key === "label") {
                if (value === null || value === undefined || value === "") {
                    validator *= 0;
                }
                if (key === "url") {
                    if (!valid_url_1.isWebUri(value)) {
                        validator *= 0;
                    }
                }
            }
        });
        setAddButtonStatus(validator > 0 ? false : true);
    }, [redirectItem, fieldValidation]);
    function validateUrlField(value, field) {
        var _a;
        setFieldValidation(__assign(__assign({}, fieldValidation), (_a = {}, _a[field] = !valid_url_1.isWebUri(value), _a)));
    }
    function handleUpdate() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!redirectItem.id)
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.update_Redirect,
                    data: __assign(__assign({}, redirectItem), { id: redirectItem.id })
                }, _helpers_1.requestHeaders);
                setLabelTranslation(false);
                return [2 /*return*/];
            });
        });
    }
    function handleDelete(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!id)
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.delete_Redirect,
                    data: {
                        id: id
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleAdd() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                submit({
                    _action: _actions_1.ACTIONS.create_Redirect,
                    data: __assign(__assign({}, redirectItem), { shopId: shopdb === null || shopdb === void 0 ? void 0 : shopdb.id, order_r: (redirects === null || redirects === void 0 ? void 0 : redirects.length) ? Math.max.apply(Math, redirects.map(function (o) { return o.order_r; })) + 1
                            : 1 })
                }, _helpers_1.requestHeaders);
                setLabelTranslation(false);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.create_Redirect, _actions_1.ACTIONS.delete_Redirect, _actions_1.ACTIONS.update_Redirect]);
    return (react_1["default"].createElement(polaris_1.InlineGrid, { gap: "400" },
        react_1["default"].createElement(polaris_1.FormLayout, null,
            editItem && (react_1["default"].createElement(polaris_1.Select, { label: "Status:", labelInline: true, options: [
                    { value: "active", label: "Active" },
                    { value: "draft", label: "Draft" },
                ], value: redirectItem.status ? "active" : "draft", onChange: function (value) {
                    return setRedirectItem(__assign(__assign({}, redirectItem), { status: value === "active" ? true : false }));
                } })),
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "300", blockAlign: "end", align: "space-between" },
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                    react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Icon"),
                    react_1["default"].createElement("div", { style: { border: "1px solid #ccc", borderRadius: "6px" } },
                        react_1["default"].createElement(polaris_1.Thumbnail, { size: "small", source: (redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.flag) ? redirectItem.flag : polaris_icons_1.ImageIcon, alt: "" }))),
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                    react_1["default"].createElement(PromoBadge_1["default"], { type: "basic" }),
                    react_1["default"].createElement(polaris_1.InlineStack, { gap: "300", blockAlign: "baseline" },
                        react_1["default"].createElement(polaris_1.Select, { label: "Select icon", options: countries, onChange: handleCountrySelect, value: selectedCountry }),
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                            react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Custom icon"),
                            react_1["default"].createElement(polaris_1.Button, { size: "large", onClick: function () {
                                    setAssetsModalStatus(function (val) { return !val; });
                                }, icon: assetsModalStatus ? polaris_icons_1.XCircleIcon : polaris_icons_1.ImageAddIcon, disabled: isFreePlan }, assetsModalStatus ? "Close" : "Select"))))),
            assetsModalStatus && (react_1["default"].createElement(polaris_1.Collapsible, { id: "assets-manager", open: assetsModalStatus },
                react_1["default"].createElement(polaris_1.Card, { padding: "200" },
                    react_1["default"].createElement(ImageManager_1["default"], { callBack: handleCustomIconUpload })))),
            react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200", columns: "1" },
                react_1["default"].createElement(polaris_1.BlockStack, { gap: "0" },
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between", gap: "200", blockAlign: "center" },
                        react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Label " + (primaryLocale ? "(" + primaryLocale.locale + ")" : "")),
                        secondaryLocales && secondaryLocales.length && (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, "Translate your content into multiple languages supported by your store.") },
                            react_1["default"].createElement(polaris_1.Button, { icon: polaris_icons_1.LanguageIcon, size: "micro", onClick: function () { return setLabelTranslation(function (val) { return !val; }); } })))),
                    react_1["default"].createElement(polaris_1.TextField, { type: "text", autoComplete: "off", label: "Label " + (primaryLocale ? "(" + primaryLocale.locale + ")" : ""), labelHidden: true, value: redirectItem.label ? redirectItem.label : "", onChange: function (value) {
                            return setRedirectItem(__assign(__assign({}, redirectItem), { label: value }));
                        } }),
                    labelTranslation && (react_1["default"].createElement(polaris_1.Collapsible, { id: "assets-manager", open: labelTranslation },
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement(polaris_1.Card, { padding: "200" },
                            react_1["default"].createElement(polaris_1.InlineGrid, { gap: "200" },
                                react_1["default"].createElement(polaris_1.Box, null,
                                    react_1["default"].createElement(PromoBadge_1["default"], { type: "pro" })),
                                react_1["default"].createElement("div", { style: {
                                        maxHeight: "70px",
                                        overflowY: "auto",
                                        overflowX: "hidden"
                                    } }, secondaryLocales && secondaryLocales.length && (react_1["default"].createElement(polaris_1.InlineGrid, { gap: "400", columns: "2" }, secondaryLocales.map(function (locale) {
                                    var parsedLocales = redirectItem.locales || {};
                                    return (react_1["default"].createElement(polaris_1.TextField, { disabled: !isProPlan, key: locale.locale, type: "text", autoComplete: "off", label: "Label (" + (locale.locale || "") + ")", value: parsedLocales &&
                                            parsedLocales[locale.locale]
                                            ? parsedLocales[locale.locale]
                                            : "", onChange: function (value) {
                                            var _a;
                                            return setRedirectItem(__assign(__assign({}, redirectItem), { locales: __assign(__assign({}, parsedLocales), (_a = {}, _a[locale.locale] = value, _a)) }));
                                        } }));
                                })))),
                                react_1["default"].createElement(polaris_1.Divider, null),
                                react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                                    react_1["default"].createElement(polaris_1.Button, { size: "micro", onClick: function () { return setLabelTranslation(false); } }, "Close"))))))),
                react_1["default"].createElement(polaris_1.TextField, { type: "url", autoComplete: "off", placeholder: "https://", inputMode: "url", label: "Url", value: redirectItem.url || "https://", error: fieldValidation.url && "Please enter valid url", onBlur: function (e) { return validateUrlField(e.target.value, "url"); }, onChange: function (value) {
                        setRedirectItem(__assign(__assign({}, redirectItem), { url: value }));
                        // validateUrlField(value, "url")
                    } })),
            react_1["default"].createElement(polaris_1.Divider, null),
            react_1["default"].createElement(PromoBadge_1["default"], { type: "pro" }),
            react_1["default"].createElement(polaris_1.InlineGrid, { columns: "2", gap: "200", alignItems: "start" },
                react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", blockAlign: "center" },
                    react_1["default"].createElement(polaris_1.Checkbox, { disabled: !isProPlan, label: "Domain redirection", checked: redirectItem.domainRedirection, onChange: isProPlan
                            ? function (value) {
                                return setRedirectItem(__assign(__assign({}, redirectItem), { domainRedirection: value }));
                            }
                            : undefined }),
                    react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null,
                            "Keeps you on the same page when switching to a new domain. For example, if you're on ",
                            react_1["default"].createElement("code", null, "site.com/about"),
                            ", you'll be redirected to ",
                            react_1["default"].createElement("code", null, "new-site.com/about"),
                            " without losing your path.") },
                        react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))),
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                    react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", blockAlign: "center" },
                        react_1["default"].createElement(polaris_1.Checkbox, { disabled: !isProPlan, label: "Enable conditional show", checked: isProPlan ? redirectItem.conditional : false, onChange: isProPlan
                                ? function (value) {
                                    return setRedirectItem(__assign(__assign({}, redirectItem), { conditional: value }));
                                }
                                : undefined }),
                        react_1["default"].createElement(polaris_1.Tooltip, { content: react_1["default"].createElement("small", null, "You can conditionally show redirect buttons based on user geo location country/continent.") },
                            react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.QuestionCircleIcon, tone: "subdued" }))),
                    isProPlan && (redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.conditional) && (react_1["default"].createElement(ListWithTags_1["default"], { list: __spreadArrays([
                            { value: "-c", label: "Continents", title: true }
                        ], _helpers_1.continents_auto, [
                            { value: "-ct", label: "Countries", title: true }
                        ], countries_conditionals), setConfigs: isProPlan ? setRedirectItem : function () { }, configs: isProPlan ? redirectItem : [], id: "conditionalLocation", helpText: "", placeholder: "Select countries/continents" }))))),
        react_1["default"].createElement(polaris_1.Divider, null),
        react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", align: "space-between" },
            editItem ? (react_1["default"].createElement(polaris_1.Button, { size: "slim", tone: "critical", onClick: function () { if (redirectItem === null || redirectItem === void 0 ? void 0 : redirectItem.id) {
                    handleDelete(redirectItem.id);
                } }, loading: loading[_actions_1.ACTIONS.delete_Redirect + "Loading"], icon: polaris_icons_1.DeleteIcon }, "Delete")) : (react_1["default"].createElement("div", null)),
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "200" },
                react_1["default"].createElement(polaris_1.Button, { size: "slim", onClick: function () {
                        shopify.modal.hide("add-redirect");
                        shopify.modal.hide("edit-redirect");
                        setLabelTranslation(false);
                    } }, "Cancel"),
                react_1["default"].createElement(polaris_1.Button, { size: "slim", variant: "primary", onClick: editItem ? handleUpdate : handleAdd, disabled: addButtonStatus, loading: loading[_actions_1.ACTIONS.create_Redirect + "Loading"] || loading[_actions_1.ACTIONS.update_Redirect + "Loading"] }, editItem ? "Save" : "Add")))));
}
exports["default"] = PopupRedirectForm;
