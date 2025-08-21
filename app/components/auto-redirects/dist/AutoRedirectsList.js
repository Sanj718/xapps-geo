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
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
var polaris_icons_1 = require("@shopify/polaris-icons");
var react_1 = require("react");
var countries_json_1 = require("../../assets/countries.json");
var empty2_svg_1 = require("../../assets/empty2.svg");
var AutoRedirectForm_1 = require("./AutoRedirectForm");
var _helpers_1 = require("../_helpers");
var app_bridge_react_1 = require("@shopify/app-bridge-react");
var react_2 = require("@shopify/shopify-app-remix/react");
var _actions_1 = require("../_actions");
var react_3 = require("@remix-run/react");
var resourceName = {
    singular: "auto redirect",
    plural: "auto redirects"
};
function AutoRedirects(_a) {
    var redirects = _a.redirects;
    var appId = react_3.useOutletContext().appId;
    var submit = react_3.useSubmit();
    var actionData = react_3.useActionData();
    var navigation = react_3.useNavigation();
    var _b = react_1.useState(null), editRedirect = _b[0], setEditRedirect = _b[1];
    var _c = react_1.useState(null), dragId = _c[0], setDragId = _c[1];
    function handleDrop(ev) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var dragBox, dropBox, dragBoxOrder, dropBoxOrder, newBoxState, updatedOrder;
            return __generator(this, function (_c) {
                dragBox = redirects.find(function (box) { return box.id == dragId; });
                dropBox = redirects.find(function (box) { return box.id == ev.currentTarget.id; });
                dragBoxOrder = (_a = dragBox === null || dragBox === void 0 ? void 0 : dragBox.jsonValue) === null || _a === void 0 ? void 0 : _a.order_r;
                dropBoxOrder = (_b = dropBox === null || dropBox === void 0 ? void 0 : dropBox.jsonValue) === null || _b === void 0 ? void 0 : _b.order_r;
                newBoxState = redirects.map(function (box) {
                    var item = box.jsonValue;
                    if (box.id == dragId) {
                        var newOrderNumber = dragBoxOrder === dropBoxOrder
                            ? Math.max.apply(Math, redirects.map(function (o) { return o.jsonValue.order_r; })) + 1
                            : dropBoxOrder;
                        box.jsonValue = __assign(__assign({}, item), { order_r: newOrderNumber || 0 });
                    }
                    if (box.id == ev.currentTarget.id) {
                        box.jsonValue = __assign(__assign({}, item), { order_r: dragBoxOrder || 0 });
                    }
                    return box;
                });
                updatedOrder = newBoxState.sort(function (a, b) {
                    return a.jsonValue.order_r - b.jsonValue.order_r;
                });
                if (!appId || !updatedOrder)
                    return [2 /*return*/];
                submit({
                    _action: _actions_1.ACTIONS.reorder_AutoRedirects,
                    data: {
                        appId: appId,
                        data: updatedOrder
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function openEdit(item) {
        setEditRedirect(item);
        if (typeof shopify !== 'undefined' && shopify.modal) {
            shopify.modal.show("edit-auto-redirect");
        }
    }
    function toggleStatus(data) {
        var _a;
        var parsed = (data === null || data === void 0 ? void 0 : data.jsonValue) || {};
        parsed.status = parsed.status ? false : true;
        if (data === null || data === void 0 ? void 0 : data.id) {
            (_a = data) === null || _a === void 0 ? true : delete _a.id;
        }
        return parsed;
    }
    function handleRedirectStatus(item) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedItem;
            return __generator(this, function (_a) {
                if (!appId)
                    return [2 /*return*/];
                updatedItem = toggleStatus(item);
                submit({
                    _action: _actions_1.ACTIONS.update_AutoRedirect,
                    data: {
                        appId: appId,
                        key: item === null || item === void 0 ? void 0 : item.key,
                        value: updatedItem
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.create_AutoRedirect, _actions_1.ACTIONS.update_AutoRedirect, _actions_1.ACTIONS.delete_AutoRedirect, _actions_1.ACTIONS.reorder_AutoRedirects]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between" },
                            react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Auto redirects")),
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Create and edit custom redirect buttons to enhance user navigation and improve customer experience. Easily configure destinations for each button to meet your store\u2019s needs.")))),
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                    react_1["default"].createElement(polaris_1.ResourceList, { emptyState: react_1["default"].createElement("div", { style: {
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "20px"
                            } },
                            react_1["default"].createElement(polaris_1.Image, { source: empty2_svg_1["default"], width: "200", height: "150", alt: "empty" }),
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingSm" }, "Simplify the customer experience \u2014 set up your first auto redirect now!")), resourceName: resourceName, items: redirects, loading: loading[_actions_1.ACTIONS.create_AutoRedirect + "Loading"] || loading[_actions_1.ACTIONS.update_AutoRedirect + "Loading"] || loading[_actions_1.ACTIONS.delete_AutoRedirect + "Loading"] || loading[_actions_1.ACTIONS.reorder_AutoRedirects + "Loading"], renderItem: function (item, index) {
                            var id = item.id, jsonValue = item.jsonValue;
                            var url = jsonValue.url, location = jsonValue.location, except_r = jsonValue.except_r, status = jsonValue.status, block = jsonValue.block;
                            var locations = _helpers_1.parseLocations(location, countries_json_1["default"]);
                            return (react_1["default"].createElement("div", { className: "auto-redirect-item", id: id, draggable: true, onDragStart: function (ev) {
                                    setDragId(id);
                                }, onDrop: handleDrop, onDragOver: function (ev) { return ev.preventDefault(); } },
                                react_1["default"].createElement(polaris_1.ResourceItem, { id: id, onClick: function () { }, verticalAlignment: "center", accessibilityLabel: "View details" },
                                    react_1["default"].createElement(polaris_1.InlineStack, { blockAlign: "center", align: "space-between" },
                                        react_1["default"].createElement(polaris_1.InlineStack, { gap: "200" },
                                            react_1["default"].createElement("div", { style: { cursor: "move" } },
                                                react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.DragHandleIcon, tone: "subdued" })),
                                            react_1["default"].createElement("div", { className: "redirect-status", onClick: function () { return handleRedirectStatus(item); } },
                                                react_1["default"].createElement(polaris_1.Tooltip, { content: react_1["default"].createElement("small", null,
                                                        "Status: ",
                                                        status ? "active" : "inactive") },
                                                    react_1["default"].createElement(polaris_1.Icon, { source: status ? polaris_icons_1.ToggleOnIcon : polaris_icons_1.ToggleOffIcon, tone: status ? "success" : "subdued" }))),
                                            except_r ? (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, "Excluding selected countries/continents.") },
                                                react_1["default"].createElement("div", { style: {
                                                        opacity: (!status && 0.5) || 1
                                                    } },
                                                    react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.LocationNoneIcon, tone: "warning" })))) : (""),
                                            react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, locations) },
                                                react_1["default"].createElement("div", { style: {
                                                        opacity: (!status && 0.5) || 1
                                                    } },
                                                    react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs" }, _helpers_1.charLimit(locations, 25)))),
                                            react_1["default"].createElement("div", { style: {
                                                    opacity: (!status && 0.5) || 1
                                                } }, block ? (react_1["default"].createElement(polaris_1.Badge, { size: "small", tone: "critical" }, "Blocked")) : (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, url) },
                                                react_1["default"].createElement(polaris_1.Badge, { size: "small" }, _helpers_1.charLimit(url, 20)))))),
                                        react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", align: "end" },
                                            react_1["default"].createElement(polaris_1.Button, { icon: polaris_icons_1.EditIcon, onClick: function () { return openEdit(item); }, size: "slim" }, "Edit"))))));
                        } }),
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                        react_1["default"].createElement(polaris_1.Button, { variant: "primary", onClick: function () {
                                if (typeof shopify !== 'undefined' && shopify.modal) {
                                    shopify.modal.show("add-auto-redirect");
                                }
                            }, icon: polaris_icons_1.PlusCircleIcon }, "Add"))))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "add-auto-redirect", variant: "base" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Add auto redirect" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_2.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(AutoRedirectForm_1["default"], { redirects: redirects })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "edit-auto-redirect", variant: "base" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Edit auto redirect" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_2.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(AutoRedirectForm_1["default"], { editItem: editRedirect, redirects: redirects }))))));
}
exports["default"] = AutoRedirects;
