"use strict";
exports.__esModule = true;
var react_1 = require("@remix-run/react");
function App() {
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
            React.createElement("link", { rel: "preconnect", href: "https://cdn.shopify.com/" }),
            React.createElement("link", { rel: "stylesheet", href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css" }),
            React.createElement(react_1.Meta, null),
            React.createElement(react_1.Links, null)),
        React.createElement("body", null,
            React.createElement(react_1.Outlet, null),
            React.createElement(react_1.ScrollRestoration, null),
            React.createElement(react_1.Scripts, null))));
}
exports["default"] = App;
