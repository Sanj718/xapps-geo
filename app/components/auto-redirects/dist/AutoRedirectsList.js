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
// import { charLimit, continents_auto } from "../../helpers";
var empty2_svg_1 = require("../../assets/empty2.svg");
// import { useAuthenticatedFetch } from "../../hooks";
// import {
//   REORDER_AUTO_REDIRECT,
//   UPDATE_AUTO_REDIRECT,
// } from "../../../helpers/endpoints";
var AutoRedirectForm_1 = require("./AutoRedirectForm");
var _helpers_1 = require("../_helpers");
var app_bridge_react_1 = require("@shopify/app-bridge-react");
var react_2 = require("@shopify/shopify-app-remix/react");
var resourceName = {
    singular: "auto redirect",
    plural: "auto redirects"
};
function parseLocations(data) {
    if (!data)
        return;
    var parsedJson = data;
    var locations = "";
    var _loop_1 = function (index) {
        var item = parsedJson[index];
        if (item.includes("C:")) {
            var getContinentLabel = _helpers_1.continents_auto.find(function (cnt) { return cnt.value === item; });
            if (getContinentLabel) {
                locations += getContinentLabel.label + ", ";
            }
        }
        else {
            var getCountryLabel = countries_json_1["default"] === null || countries_json_1["default"] === void 0 ? void 0 : countries_json_1["default"].find(function (cnt) { return cnt.code === item; });
            if (getCountryLabel) {
                locations += getCountryLabel.name + ", ";
            }
        }
    };
    for (var index = 0; index < parsedJson.length; index++) {
        _loop_1(index);
    }
    return locations.replace(/,\s*$/, "");
}
function AutoRedirects(_a) {
    var redirects = _a.redirects;
    // const fetch = useAuthenticatedFetch();
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(false), addModalStatus = _c[0], setAddModalStatus = _c[1];
    var _d = react_1.useState(false), editModalStatus = _d[0], setEditModalStatus = _d[1];
    var _e = react_1.useState(null), editRedirect = _e[0], setEditRedirect = _e[1];
    var _f = react_1.useState(), dragId = _f[0], setDragId = _f[1];
    function handleDrop(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var dragBox, dropBox, dragBoxOrder, dropBoxOrder, newBoxState, updated_order;
            return __generator(this, function (_a) {
                setLoading(true);
                dragBox = redirects.find(function (box) { return box.node.id == dragId; });
                dropBox = redirects.find(function (box) { return box.node.id == ev.currentTarget.id; });
                dragBoxOrder = JSON.parse(dragBox.node.value).order_r;
                dropBoxOrder = JSON.parse(dropBox.node.value).order_r;
                newBoxState = redirects.map(function (box) {
                    var item = JSON.parse(box.node.value);
                    if (box.node.id == dragId) {
                        var new_order = dragBoxOrder === dropBoxOrder
                            ? Math.max.apply(Math, redirects.map(function (o) { return JSON.parse(o.node.value).order_r; })) + 1
                            : dropBoxOrder;
                        box.node.value = JSON.stringify(__assign(__assign({}, item), { order_r: new_order }));
                    }
                    if (box.node.id == ev.currentTarget.id) {
                        box.node.value = JSON.stringify(__assign(__assign({}, item), { order_r: dragBoxOrder }));
                    }
                    return box;
                });
                updated_order = newBoxState.sort(function (a, b) {
                    return JSON.parse(a.node.value).order_r - JSON.parse(b.node.value).order_r;
                });
                // const response = await fetch(REORDER_AUTO_REDIRECT, {
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                //   method: "post",
                //   body: JSON.stringify({ data: updated_order, appId }),
                // }).then((data) => data.json());
                // if (response?.status) {
                //   setRedirects(updated_order);
                //   setToastData({
                //     error: false,
                //     msg: tr.responses.rd_reorder_success,
                //   });
                // } else {
                //   setToastData({
                //     error: true,
                //     msg: tr.responses.error,
                //   });
                // }
                setLoading(false);
                return [2 /*return*/];
            });
        });
    }
    // function openEdit(item) {
    //   setEditRedirect(item);
    //   setEditModalStatus(true);
    // }
    function toggleStatus(data) {
        var _a;
        var parsed = JSON.parse((_a = data === null || data === void 0 ? void 0 : data.node) === null || _a === void 0 ? void 0 : _a.value);
        parsed.status = parsed.status === 1 ? 0 : 1;
        delete data.node.id;
        return __assign(__assign({}, data.node), { type: "json", value: parsed });
    }
    function handleRedirectStatus(item) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                setLoading(true);
                data = toggleStatus(item);
                // const response = await fetch(UPDATE_AUTO_REDIRECT, {
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                //   method: "post",
                //   body: JSON.stringify({
                //     appId,
                //     data,
                //   }),
                // }).then((data) => data.json());
                // if (response?.status) {
                //   setToastData({
                //     error: false,
                //     msg: tr.responses.rd_status_success,
                //   });
                //   await loadRedirects();
                // } else {
                //   setToastData({
                //     error: true,
                //     msg: tr.responses.error,
                //   });
                // }
                setLoading(false);
                return [2 /*return*/];
            });
        });
    }
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
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingSm" }, "Simplify the customer experience \u2014 set up your first auto redirect now!")), resourceName: resourceName, items: redirects, loading: loading, renderItem: function (item, index) {
                            var _a = item === null || item === void 0 ? void 0 : item.node, id = _a.id, value = _a.value;
                            var _b = JSON.parse(value), url = _b.url, location = _b.location, except_r = _b.except_r, status = _b.status, block = _b.block;
                            var locations = parseLocations(location);
                            return (react_1["default"].createElement("div", { className: "auto-redirect-item", id: id, draggable: true, onDragStart: function (ev) {
                                    var _a;
                                    setDragId((_a = ev === null || ev === void 0 ? void 0 : ev.currentTarget) === null || _a === void 0 ? void 0 : _a.id);
                                }, onDrop: handleDrop, onDragOver: function (ev) { return ev.preventDefault(); } },
                                react_1["default"].createElement(polaris_1.ResourceItem, { id: id, onClick: function () { }, verticalAlignment: "center", accessibilityLabel: "View details" },
                                    react_1["default"].createElement(polaris_1.InlineStack, { blockAlign: "center", align: "space-between" },
                                        react_1["default"].createElement(polaris_1.InlineStack, { gap: "200" },
                                            react_1["default"].createElement("div", { style: { cursor: "move" } },
                                                react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.DragHandleIcon, tone: "subdued" })),
                                            react_1["default"].createElement("div", { className: "switch", onClick: function () { return handleRedirectStatus(item); } },
                                                react_1["default"].createElement("input", { type: "checkbox", checked: status }),
                                                react_1["default"].createElement("span", { className: "slider round" })),
                                            except_r ? (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, "Excluding selected countries/continents.") },
                                                react_1["default"].createElement(polaris_1.Icon, { source: polaris_icons_1.LocationNoneIcon, tone: "warning" }))) : (""),
                                            react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, locations) },
                                                react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs" }, _helpers_1.charLimit(locations, 25))),
                                            react_1["default"].createElement("div", null, block ? (react_1["default"].createElement(polaris_1.Badge, { size: "small", tone: "critical" }, "Blocked")) : (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement("small", null, url) },
                                                react_1["default"].createElement(polaris_1.Badge, { size: "small" }, _helpers_1.charLimit(url, 20)))))),
                                        react_1["default"].createElement(polaris_1.InlineStack, { gap: "100", align: "end" },
                                            react_1["default"].createElement(polaris_1.Button, { icon: polaris_icons_1.EditIcon, 
                                                // onClick={() => openEdit(item)}
                                                size: "slim" }, "Edit"))))));
                        } }),
                    react_1["default"].createElement(polaris_1.InlineStack, { align: "end" },
                        react_1["default"].createElement(polaris_1.Button, { variant: "primary", onClick: function () { return shopify.modal.show("add-auto-redirect"); }, icon: polaris_icons_1.PlusCircleIcon }, "Add"))))),
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
