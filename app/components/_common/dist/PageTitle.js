"use strict";
exports.__esModule = true;
exports.PageTitle = void 0;
var react_1 = require("react");
var polaris_icons_1 = require("@shopify/polaris-icons");
var polaris_1 = require("@shopify/polaris");
var status_green_svg_1 = require("../../assets/status-green.svg");
var status_green_svg_2 = require("../../assets/status-green.svg");
var status_green_svg_3 = require("../../assets/status-green.svg");
function PageTitle(_a) {
    // const redirect = Redirect.create(useAppBridge());
    var icon = _a.icon, title = _a.title, status = _a.status, loading = _a.loading, _b = _a.embedPath, embedPath = _b === void 0 ? "" : _b;
    // async function handleActivateEmbedRedirect() {
    //   redirect?.dispatch(Redirect.Action.ADMIN_PATH, {
    //     path: `/themes/current/editor?context=apps&activateAppId=${embedPath}`,
    //     newContext: true,
    //   });
    // }
    return (react_1["default"].createElement(polaris_1.Box, { padding: "400" },
        react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", align: "space-between" },
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "200", blockAlign: "center" },
                icon && react_1["default"].createElement(polaris_1.Icon, { source: icon }),
                react_1["default"].createElement(polaris_1.Text, { as: "h1", variant: "headingLg" }, title)),
            react_1["default"].createElement(polaris_1.InlineStack, { gap: "300", blockAlign: "center" },
                react_1["default"].createElement(polaris_1.Tooltip, { width: "wide", content: react_1["default"].createElement(polaris_1.Box, { padding: "200" },
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
                        react_1["default"].createElement(polaris_1.Image, { alt: "", source: loading ? status_green_svg_3["default"] : status ? status_green_svg_1["default"] : status_green_svg_2["default"] }),
                        react_1["default"].createElement(polaris_1.Button
                        // onClick={handleActivateEmbedRedirect}
                        , { 
                            // onClick={handleActivateEmbedRedirect}
                            size: "micro", icon: polaris_icons_1.AdjustIcon }))),
                react_1["default"].createElement(polaris_1.Button, { size: "micro", icon: polaris_icons_1.QuestionCircleIcon, url: "https://geolocationredirects-xapps.tawk.help/", target: "_blank" }, "Help center")))));
}
exports.PageTitle = PageTitle;
