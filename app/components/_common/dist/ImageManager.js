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
var polaris_icons_1 = require("@shopify/polaris-icons");
var react_1 = require("react");
var _helpers_1 = require("../_helpers");
var react_2 = require("@remix-run/react");
var _actions_1 = require("../_actions");
function ImageManager(_a) {
    var _this = this;
    var _b = _a.selectedData, selectedData = _b === void 0 ? [] : _b, callBack = _a.callBack;
    var fetcher = react_2.useFetcher();
    var _c = react_1.useState(null), paginationInfo = _c[0], setPaginationInfo = _c[1];
    var _d = react_1.useState(undefined), files = _d[0], setFiles = _d[1];
    function loadAssets(cursor, isPrev) {
        if (isPrev === void 0) { isPrev = false; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                fetcher.submit({
                    _action: _actions_1.ACTIONS.get_AssetsData,
                    data: { cursor: cursor || null, isPrev: isPrev }
                }, _helpers_1.requestHeaders);
                return [2 /*return*/];
            });
        });
    }
    react_1.useEffect(function () {
        loadAssets();
    }, []);
    react_1.useMemo(function () {
        var _a, _b;
        var fetcherData = fetcher.data;
        if ((fetcherData === null || fetcherData === void 0 ? void 0 : fetcherData._action) === _actions_1.ACTIONS.get_AssetsData && (fetcherData === null || fetcherData === void 0 ? void 0 : fetcherData.status)) {
            setFiles((_a = fetcherData === null || fetcherData === void 0 ? void 0 : fetcherData.data) === null || _a === void 0 ? void 0 : _a.edges);
            setPaginationInfo((_b = fetcherData === null || fetcherData === void 0 ? void 0 : fetcherData.data) === null || _b === void 0 ? void 0 : _b.pageInfo);
        }
    }, [fetcher === null || fetcher === void 0 ? void 0 : fetcher.data]);
    var handlePaginationNext = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            loadAssets(paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.endCursor);
            return [2 /*return*/];
        });
    }); };
    var handlePaginationPrev = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            loadAssets(paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.startCursor, true);
            return [2 /*return*/];
        });
    }); };
    var handleRefresh = function () {
        loadAssets();
    };
    var handleAdd = function (item) {
        callBack(item);
    };
    var resourceName = {
        singular: "asset",
        plural: "assets"
    };
    var loading = _helpers_1.loadingStates(fetcher, [_actions_1.ACTIONS.get_AssetsData]);
    return (React.createElement(polaris_1.InlineGrid, { gap: "200", alignItems: "center" },
        React.createElement(polaris_1.InlineStack, { align: "space-between", gap: "100" },
            React.createElement(polaris_1.Button, { icon: polaris_icons_1.RefreshIcon, onClick: handleRefresh }, "Refresh list"),
            ((paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.hasPreviousPage) || (paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.hasNextPage)) && (React.createElement(polaris_1.InlineStack, { align: "center" },
                React.createElement(polaris_1.Pagination, { hasPrevious: paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.hasPreviousPage, onPrevious: handlePaginationPrev, hasNext: paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.hasNextPage, onNext: handlePaginationNext }))),
            React.createElement(polaris_1.Button, { url: "shopify://admin/content/files" }, "Upload more")),
        React.createElement("div", { style: {
                border: "1px solid #e5e5e5",
                borderRadius: "5px",
                maxHeight: "200px",
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
            } },
            React.createElement(polaris_1.ResourceList, { loading: loading[_actions_1.ACTIONS.get_AssetsData + "Loading"], resourceName: resourceName, items: files || [], renderItem: renderItem }))));
    function renderItem(item) {
        var _a = item.node, id = _a.id, alt = _a.alt, image = _a.image, originalSource = _a.originalSource;
        var pureId = _helpers_1.getPureId(id);
        var media = (React.createElement(polaris_1.Thumbnail, { size: "extraSmall", alt: alt, source: image === null || image === void 0 ? void 0 : image.originalSrc }));
        var imageExist = selectedData === null || selectedData === void 0 ? void 0 : selectedData.find(function (item) { return item.id === id; });
        return (React.createElement(polaris_1.ResourceItem, { id: pureId || "", media: media, accessibilityLabel: "View details", verticalAlignment: "center", onClick: function () { } },
            React.createElement(polaris_1.InlineStack, { align: "end" },
                React.createElement(polaris_1.Button, { icon: imageExist ? polaris_icons_1.MinusCircleIcon : polaris_icons_1.PlusCircleIcon, disabled: imageExist, size: "micro", onClick: function () {
                        handleAdd({
                            id: id,
                            url: image === null || image === void 0 ? void 0 : image.originalSrc
                        });
                    } }, imageExist ? "Selected" : "Select"))));
    }
}
exports["default"] = ImageManager;
