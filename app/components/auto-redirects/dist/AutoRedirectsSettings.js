"use strict";
exports.__esModule = true;
var polaris_1 = require("@shopify/polaris");
var react_1 = require("react");
var app_bridge_react_1 = require("@shopify/app-bridge-react");
// import { Redirect } from "@shopify/app-bridge/actions";
// import {
//   DEV_EMBED_APP_ID,
//   PROD_EMBED_APP_ID,
//   RD_EMBED_APP_HANDLE,
// } from "../../../env";
var ExternalSettingsItem_1 = require("../_common/ExternalSettingsItem");
// import { getEmbedConst } from "../../helpers";
var env_1 = require("../env");
var _helpers_1 = require("../_helpers");
var _a = _helpers_1.getEmbedConst(env_1.PROD_EMBED_APP_ID, env_1.DEV_EMBED_APP_ID, env_1.RD_EMBED_APP_HANDLE) || {}, EMBED_APP_ID = _a.EMBED_APP_ID, EMBED_APP_HANDLE = _a.EMBED_APP_HANDLE;
function AutoRedirectsSettings() {
    var app = app_bridge_react_1.useAppBridge();
    // const redirect = Redirect.create(app);
    // async function handleActivateEmbedRedirect() {
    //   redirect?.dispatch(Redirect.Action.ADMIN_PATH, {
    //     path: `/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`,
    //     newContext: true,
    //   });
    // }
    var embedPath = "shopify://admin/themes/current/editor?context=apps&activateAppId=" + EMBED_APP_ID + "/" + EMBED_APP_HANDLE;
    var settingsItems = [
        {
            label: "Emergency disable all auto redirects",
            text: "Instantly turn off all auto redirects, disabling any redirection code on your site.",
            url: embedPath
        },
        {
            label: "Auto redirect once",
            text: "Store visitors will be automatically redirected only once per visit (session/cookies based)",
            url: embedPath
        },
        {
            label: "Disable auto redirects for Web crawlers",
            text: "Control redirects for search engine bots, allowing you to enable or disable redirection for web crawlers.",
            url: embedPath
        },
        {
            label: "Disable URL param",
            text: "To prevent endless redirect loops from incorrect redirects, we've added a special URL parameter \"?ngr-redirected=1\". Disabling this feature is at your own risk.",
            url: embedPath
        },
        {
            label: "Disable preload overlay",
            text: "A white overlay is added to your site while detecting the visitor's geolocation. You can enable or disable this feature here.",
            url: embedPath
        },
    ];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(polaris_1.InlineGrid, { columns: { xs: "1fr", md: "auto  70%" }, gap: "400" },
            react_1["default"].createElement(polaris_1.Box, { as: "section", paddingInlineStart: { xs: "400", sm: "0" }, paddingInlineEnd: { xs: "400", sm: "0" } },
                react_1["default"].createElement("div", { style: { paddingLeft: "1rem" } },
                    react_1["default"].createElement(polaris_1.BlockStack, { gap: "400" },
                        react_1["default"].createElement(polaris_1.InlineStack, { align: "space-between" },
                            react_1["default"].createElement(polaris_1.Text, { as: "h3", variant: "headingMd" }, "Settings")),
                        react_1["default"].createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, "Manage auto redirects by disabling them entirely, limiting to one per session, or excluding web crawlers for optimized visitor and search engine navigation.")))),
            react_1["default"].createElement(polaris_1.Card, { roundedAbove: "sm" },
                react_1["default"].createElement(polaris_1.BlockStack, { gap: "600" }, settingsItems.map(function (_a, index) {
                    var label = _a.label, text = _a.text, url = _a.url;
                    return (react_1["default"].createElement(ExternalSettingsItem_1["default"], { key: index, label: label, text: text, url: url }));
                }))))));
}
exports["default"] = AutoRedirectsSettings;
