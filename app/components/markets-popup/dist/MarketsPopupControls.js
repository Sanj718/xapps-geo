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
var polaris_1 = require("@shopify/polaris");
var react_1 = require("react");
var polaris_icons_1 = require("@shopify/polaris-icons");
var react_2 = require("@remix-run/react");
var _helpers_1 = require("../_helpers");
var _actions_1 = require("../_actions");
function MarketsPopupControls(_a) {
    var _b;
    var marketsData = _a.marketsData, marketsPopup = _a.marketsPopup, marketsSync = _a.marketsSync, marketsSyncLoading = _a.marketsSyncLoading;
    var _c = react_2.useOutletContext(), shopdb = _c.shopdb, activePlan = _c.activePlan;
    var submit = react_2.useSubmit();
    var navigation = react_2.useNavigation();
    function handleMarketsPopup() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("handleMarketsPopup");
                submit({
                    _action: _actions_1.ACTIONS.update_MarketsWidget,
                    data: {
                        widget: !marketsPopup
                    }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    ;
    var loading = _helpers_1.loadingStates(navigation, [_actions_1.ACTIONS.update_MarketsWidget]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Popup controls"),
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Manage and configure settings for synchronizing and enabling/disabling popup based on regional preferences.")))),
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(polaris_1.InlineGrid, { gap: "600" },
                    !(marketsData === null || marketsData === void 0 ? void 0 : marketsData.lastSyncTimestamp) && (react_1["default"].createElement(polaris_1.Banner, { tone: "warning" },
                        react_1["default"].createElement("small", null,
                            "Perform an ",
                            react_1["default"].createElement("strong", null, "initial sync"),
                            " to ensure your store's Market data is up-to-date. This step is required before proceeding."))),
                    react_1["default"].createElement(polaris_1.InlineGrid, { columns: "70% auto", gap: "200" },
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                            react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", blockAlign: "center" },
                                react_1["default"].createElement(polaris_1.Text, { as: "h2", variant: "headingSm" }, "Markets sync"),
                                react_1["default"].createElement(polaris_1.Tooltip, { content: "Last sync date/time in UTC." },
                                    react_1["default"].createElement(polaris_1.Badge, { tone: (marketsData === null || marketsData === void 0 ? void 0 : marketsData.lastSyncTimestamp) ? "info"
                                            : "attention", size: "small", icon: polaris_icons_1.CalendarTimeIcon }, (marketsData === null || marketsData === void 0 ? void 0 : marketsData.lastSyncTimestamp) ? (_b = marketsData === null || marketsData === void 0 ? void 0 : marketsData.lastSyncTimestamp) === null || _b === void 0 ? void 0 : _b.toISOString() : "N/A"))),
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs" },
                                "Sync your store's market data to keep it up-to-date. ",
                                react_1["default"].createElement("br", null),
                                "Re-sync after any changes to Shopify Markets.")),
                        react_1["default"].createElement(polaris_1.InlineStack, { align: "end", blockAlign: "center" },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(polaris_1.Button, { size: "slim", variant: "primary", loading: marketsSyncLoading, onClick: marketsSync }, "Sync")))),
                    react_1["default"].createElement(polaris_1.Divider, null),
                    react_1["default"].createElement(polaris_1.InlineGrid, { columns: "70% auto", gap: "200" },
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                            react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", blockAlign: "center" },
                                react_1["default"].createElement(polaris_1.Text, { as: "h2", variant: "headingSm" }, "Markets popup"),
                                react_1["default"].createElement(polaris_1.Badge, { tone: marketsPopup ? "success" : "enabled", size: "small" }, marketsPopup ? "Active" : "Draft")),
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyXs" }, "Enable or disable the markets popup functionality.")),
                        react_1["default"].createElement(polaris_1.InlineStack, { align: "end", blockAlign: "center" },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(polaris_1.Button, { disabled: !marketsData, tone: "success", size: "slim", onClick: handleMarketsPopup, loading: loading[_actions_1.ACTIONS.update_MarketsWidget + "Loading"], pressed: marketsPopup && !loading[_actions_1.ACTIONS.update_MarketsWidget + "Loading"] ? true : false }, marketsPopup ? "Disable" : "Enable")))))))));
}
exports["default"] = MarketsPopupControls;
