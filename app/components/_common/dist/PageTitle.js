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
exports.PageTitle = void 0;
var react_1 = require("react");
var polaris_icons_1 = require("@shopify/polaris-icons");
var polaris_1 = require("@shopify/polaris");
var status_green_svg_1 = require("../../assets/status-green.svg");
var status_red_svg_1 = require("../../assets/status-red.svg");
var status_gray_svg_1 = require("../../assets/status-gray.svg");
function PageTitle(_a) {
    var _this = this;
    var icon = _a.icon, title = _a.title, status = _a.status, loading = _a.loading, _b = _a.url, url = _b === void 0 ? "" : _b, _c = _a.hideStatus, hideStatus = _c === void 0 ? false : _c;
    return (react_1["default"].createElement(polaris_1.Box, { padding: "400" },
        react_1["default"].createElement(polaris_1.Banner, { tone: "info" }, "We recently made some platform updates to improve performance and reliability. If you notice any issues, please don't hesitate to contact (contact@xapps.shop) our support team - we're here to help!"),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", align: "space-between" },
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", blockAlign: "center" },
                icon && react_1["default"].createElement(polaris_1.Icon, { source: icon }),
                react_1["default"].createElement(polaris_1.Text, { as: "h1", variant: "headingXl" }, title)),
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "300", blockAlign: "center" },
                !hideStatus && (react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement(polaris_1.Box, { padding: "200" },
                        react_1["default"].createElement(polaris_1.InlineGrid, { gap: "100" },
                            react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "headingXs" },
                                "Status: ",
                                status ? "Enabled" : "Disabled"),
                            react_1["default"].createElement("small", null,
                                "App embeds enable features like geolocation redirection by injecting necessary code into your theme (Shopify recommended method). This ensures your store can support popup or automatically redirect visitors based on your configurations.",
                                " ",
                                react_1["default"].createElement("strong", null, "Make sure this is enabled to activate redirection features."),
                                " ",
                                "Manage app embeds in your theme editor."))) },
                    react_1["default"].createElement(polaris_1.InlineStack, { gap: "200" },
                        react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Status:"),
                        react_1["default"].createElement(polaris_1.Image, { alt: "", source: loading ? status_gray_svg_1["default"] : status ? status_green_svg_1["default"] : status_red_svg_1["default"] }),
                        react_1["default"].createElement(polaris_1.Button, { url: url, size: "micro", icon: polaris_icons_1.AdjustIcon })))),
                react_1["default"].createElement(polaris_1.Button, { size: "micro", icon: polaris_icons_1.QuestionCircleIcon, url: "https://geolocationredirects-xapps.tawk.help/", target: "_blank" }, "Help center"),
                react_1["default"].createElement(polaris_1.Button, { size: "micro", icon: polaris_icons_1.StarIcon, onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                        var result, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, shopify.reviews.request()];
                                case 1:
                                    result = _a.sent();
                                    if (!result.success) {
                                        console.log("Review modal not displayed. Reason: " + result.code + ": " + result.message);
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    console.error('Error requesting review:', error_1);
                                    window.open("https://apps.shopify.com/native-geo-redirects-popup?#modal-show=WriteReviewModal", "_blank");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); } }, "Rate us!")))));
}
exports.PageTitle = PageTitle;
