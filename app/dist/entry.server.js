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
exports.streamTimeout = void 0;
var stream_1 = require("stream");
var server_1 = require("react-dom/server");
var react_1 = require("@remix-run/react");
var node_1 = require("@remix-run/node");
var isbot_1 = require("isbot");
var shopify_server_1 = require("./shopify.server");
exports.streamTimeout = 5000;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return __awaiter(this, void 0, void 0, function () {
        var userAgent, callbackName;
        return __generator(this, function (_a) {
            shopify_server_1.addDocumentResponseHeaders(request, responseHeaders);
            userAgent = request.headers.get("user-agent");
            callbackName = isbot_1.isbot(userAgent !== null && userAgent !== void 0 ? userAgent : '')
                ? "onAllReady"
                : "onShellReady";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _a;
                    var _b = server_1.renderToPipeableStream(React.createElement(react_1.RemixServer, { context: remixContext, url: request.url }), (_a = {},
                        _a[callbackName] = function () {
                            var body = new stream_1.PassThrough();
                            var stream = node_1.createReadableStreamFromReadable(body);
                            responseHeaders.set("Content-Type", "text/html");
                            resolve(new Response(stream, {
                                headers: responseHeaders,
                                status: responseStatusCode
                            }));
                            pipe(body);
                        },
                        _a.onShellError = function (error) {
                            reject(error);
                        },
                        _a.onError = function (error) {
                            responseStatusCode = 500;
                            console.error(error);
                        },
                        _a)), pipe = _b.pipe, abort = _b.abort;
                    // Automatically timeout the React renderer after 6 seconds, which ensures
                    // React has enough time to flush down the rejected boundary contents
                    setTimeout(abort, exports.streamTimeout + 1000);
                })];
        });
    });
}
exports["default"] = handleRequest;
