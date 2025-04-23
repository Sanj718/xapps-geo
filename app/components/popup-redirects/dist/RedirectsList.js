"use strict";
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
var react_1 = require("react");
var polaris_1 = require("@shopify/polaris");
var app_bridge_react_1 = require("@shopify/app-bridge-react");
var polaris_icons_1 = require("@shopify/polaris-icons");
var _helpers_1 = require("../_helpers");
var empty_svg_1 = require("../../assets/empty.svg");
var PopupRedirectForm_1 = require("./PopupRedirectForm");
var react_2 = require("@shopify/shopify-app-remix/react");
var react_3 = require("@remix-run/react");
var _actions_1 = require("../_actions");
var resourceName = {
    singular: "redirect",
    plural: "redirects"
};
function RedirectsList(_a) {
    var redirects = _a.redirects;
    var submit = react_3.useSubmit();
    var navigation = react_3.useNavigation();
    var _b = react_1.useState(undefined), editRedirect = _b[0], setEditRedirect = _b[1];
    var _c = react_1.useState(""), dragId = _c[0], setDragId = _c[1];
    function openEdit(item) {
        setEditRedirect(item);
        shopify.modal.show("edit-redirect");
    }
    function handleDrop(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTargetId, currentDragId, dragBox, dropBox, dragBoxOrder, dropBoxOrder, newBoxState, updated_order, updated_order_ids;
            return __generator(this, function (_a) {
                currentTargetId = Number(ev.currentTarget.id);
                currentDragId = Number(dragId);
                dragBox = redirects.find(function (box) { return box.id == currentDragId; });
                dropBox = redirects.find(function (box) { return box.id == currentTargetId; });
                if (!dragBox || !dropBox)
                    return [2 /*return*/];
                dragBoxOrder = dragBox.order;
                dropBoxOrder = dropBox.order;
                newBoxState = redirects.map(function (box) {
                    if (box.id == currentDragId) {
                        box.order = dropBoxOrder;
                    }
                    if (box.id == currentTargetId) {
                        box.order = dragBoxOrder;
                    }
                    return box;
                });
                updated_order = newBoxState.sort(function (a, b) { return a.order - b.order; });
                updated_order_ids = updated_order.map(function (item) { return item.id; });
                submit({
                    _action: _actions_1.ACTIONS.ReorderRedirect,
                    data: {
                        ids: updated_order_ids
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    function handleRedirectStatus(item) {
        return __awaiter(this, void 0, void 0, function () {
            var newStatus;
            return __generator(this, function (_a) {
                if (!item.id)
                    return [2 /*return*/];
                newStatus = !item.status;
                submit({
                    _action: _actions_1.ACTIONS.ToggleRedirectStatus,
                    data: {
                        id: item.id,
                        status: newStatus
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.ToggleRedirectStatus, _actions_1.ACTIONS.ReorderRedirect, _actions_1.ACTIONS.CreateRedirect, _actions_1.ACTIONS.UpdateRedirect, _actions_1.ACTIONS.DeleteRedirect]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between" },
                            react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Redirect buttons")),
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
                            react_1["default"].createElement(polaris_1.Image, { source: empty_svg_1["default"], width: "200", height: "150", alt: "empty" }),
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingSm" }, "Guide customers effortlessly \u2014 add your first redirect!")), resourceName: resourceName, items: redirects, loading: loading[_actions_1.ACTIONS.ToggleRedirectStatus + "Loading"] || loading[_actions_1.ACTIONS.ReorderRedirect + "Loading"] || loading[_actions_1.ACTIONS.CreateRedirect + "Loading"] || loading[_actions_1.ACTIONS.UpdateRedirect + "Loading"] || loading[_actions_1.ACTIONS.DeleteRedirect + "Loading"], renderItem: function (item, rId, index) {
                            var id = item.id, url = item.url, label = item.label, flag = item.flag, status = item.status;
                            if (!id)
                                return null;
                            return (react_1["default"].createElement("div", { className: "redirect-item", id: String(id) || "", draggable: true, onDragStart: function (ev) {
                                    setDragId(id);
                                }, onDrop: handleDrop, onDragOver: function (ev) { return ev.preventDefault(); } },
                                react_1["default"].createElement(polaris_1.ResourceItem, { id: String(id), onClick: function () { }, verticalAlignment: "center", accessibilityLabel: "View details for " + label },
                                    react_1["default"].createElement(polaris_1.InlineStack, { blockAlign: "center", align: "space-between" },
                                        react_1["default"].createElement(polaris_1.InlineStack, { gap: "200" },
                                            react_1["default"].createElement("div", { style: { cursor: "move" } },
                                                react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.DragHandleIcon, tone: "subdued" })),
                                            react_1["default"].createElement("div", { onClick: function () { return handleRedirectStatus(item); } },
                                                react_1["default"].createElement(polaris_1.Tooltip, { content: react_1["default"].createElement("small", null,
                                                        "Status: ",
                                                        status ? "active" : "inactive") },
                                                    react_1["default"].createElement(polaris_1.Icon, { source: status ? polaris_icons_1.ToggleOnIcon : polaris_icons_1.ToggleOffIcon, tone: status ? "success" : "subdued" }))),
                                            react_1["default"].createElement("img", { src: flag, width: "30", height: "30", style: {
                                                    opacity: (!status && 0.5) || 1,
                                                    objectFit: "contain"
                                                } }),
                                            react_1["default"].createElement("div", { style: {
                                                    opacity: (!status && 0.5) || 1
                                                } },
                                                react_1["default"].createElement(polaris_1.InlineStack, { gap: "150" },
                                                    react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingXs" }, _helpers_1.charLimit(label, 30)),
                                                    react_1["default"].createElement(polaris_1.Badge, { size: "small" }, _helpers_1.charLimit(url, 27))))),
                                        react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", align: "end" },
                                            react_1["default"].createElement(polaris_1.Button, { icon: polaris_icons_1.EditIcon, onClick: function () { return openEdit(item); }, size: "slim" }, "Edit")))),
                                redirects.length - 1 !== index && react_1["default"].createElement(polaris_1.Divider, null)));
                        } }),
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                        react_1["default"].createElement(polaris_1.Button, { variant: "primary", onClick: function () { return shopify.modal.show("add-redirect"); }, icon: polaris_icons_1.PlusCircleIcon }, "Add"))))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "add-redirect", variant: "base" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Add redirect" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_2.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(PopupRedirectForm_1["default"], { redirects: redirects })))),
        react_1["default"].createElement(app_bridge_react_1.Modal, { id: "edit-redirect", variant: "base" },
            react_1["default"].createElement(app_bridge_react_1.TitleBar, { title: "Edit redirect" }),
            react_1["default"].createElement(polaris_1.Box, { padding: "400" },
                react_1["default"].createElement(react_2.AppProvider, { i18n: {}, apiKey: "" },
                    react_1["default"].createElement(PopupRedirectForm_1["default"], { redirects: redirects, editItem: editRedirect }))))));
}
exports["default"] = RedirectsList;
