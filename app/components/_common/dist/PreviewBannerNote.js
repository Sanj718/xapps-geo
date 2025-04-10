"use strict";
exports.__esModule = true;
var react_1 = require("react");
var polaris_1 = require("@shopify/polaris");
var _helpers_1 = require("../_helpers");
var env_1 = require("../env");
var react_2 = require("@remix-run/react");
function PreviewBannerNote(_a) {
    var _b;
    var _c = _a.type, type = _c === void 0 ? "custom" : _c;
    var shopInfo = react_2.useOutletContext().shopInfo;
    var _d = _helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, type === "markets" ? env_1.MK_EMBED_APP_HANDLE : env_1.RD_EMBED_APP_HANDLE) || {}, EMBED_APP_ID = _d.EMBED_APP_ID, EMBED_APP_HANDLE = _d.EMBED_APP_HANDLE;
    return (react_1["default"].createElement(polaris_1.Banner, { tone: "info" },
        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodySm" },
            "Please note that certain UI elements (such as the flag and [[country]]) and styles in the preview may differ from those on the live site, as the live site applies your site's global styles. To see an accurate representation of the widget, navigate to the Theme Customizer and enable ",
            react_1["default"].createElement(polaris_1.Link, { target: "_blank", url: "https://" + ((_b = shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.shop) === null || _b === void 0 ? void 0 : _b.myshopifyDomain) + "/admin/themes/current/editor?context=apps&activateAppId=" + EMBED_APP_ID + "/" + EMBED_APP_HANDLE }, "Preview Mode"),
            ".")));
}
exports["default"] = PreviewBannerNote;
