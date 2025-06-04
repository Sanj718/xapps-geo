"use strict";
exports.__esModule = true;
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var client_1 = require("react-dom/client");
react_2.startTransition(function () {
    client_1.hydrateRoot(document, React.createElement(react_2.StrictMode, null,
        React.createElement(react_1.RemixBrowser, null)));
});
