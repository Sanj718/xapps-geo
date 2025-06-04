"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var stream_1 = require("stream");
var string_decoder_1 = require("string_decoder");
var path_1 = require("path");
var fs_backwards_stream_1 = require("fs-backwards-stream");
var events_1 = require("events");
function isJson(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
        item = JSON.parse(item);
    }
    catch (e) {
        return false;
    }
    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}
// let's make sure we have a setImmediate function (node.js <0.10)
if (typeof global.setImmediate === "undefined") {
    global.setImmediate = process.nextTick;
}
var LineByLineReader = /** @class */ (function (_super) {
    __extends(LineByLineReader, _super);
    function LineByLineReader(filepath, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        var self = _this;
        _this._encoding = options.encoding || "utf8";
        if (filepath instanceof stream_1["default"].Readable) {
            _this._readStream = filepath;
            _this._filepath = null;
        }
        else {
            _this._readStream = null;
            _this._filepath = path_1["default"].normalize(filepath);
            _this._streamOptions = { encoding: _this._encoding, block: 1024 * 64 };
            if (options.start) {
                _this._streamOptions.start = options.start;
            }
            if (options.end) {
                _this._streamOptions.end = options.end;
            }
        }
        _this._skipEmptyLines = options.skipEmptyLines || false;
        _this._lines = [];
        _this._lineFragment = "";
        _this._paused = false;
        _this._end = false;
        _this._ended = false;
        _this.decoder = new string_decoder_1.StringDecoder(_this._encoding);
        _this.saved_partial_first = "";
        _this.saved_partial_last = "";
        setImmediate(function () {
            self._initStream();
        });
        return _this;
    }
    LineByLineReader.prototype._initStream = function () {
        var self = this;
        var readStream = this._readStream
            ? this._readStream
            : fs_backwards_stream_1["default"](this._filepath, this._streamOptions);
        readStream.on("error", function (err) {
            self.emit("error", err);
        });
        readStream.on("open", function () {
            self.emit("open");
        });
        readStream.on("data", function (data) {
            self._readStream.pause();
            var dataAsString = data;
            if (data instanceof Buffer) {
                dataAsString = self.decoder.write(data);
            }
            if (dataAsString &&
                dataAsString.substr(dataAsString.length - 1) !== "\n" &&
                self.saved_partial_last) {
                dataAsString = dataAsString + self.saved_partial_last;
                self.saved_partial_last = "";
            }
            if (dataAsString &&
                !/^{"__typename":/.test(dataAsString) &&
                self.saved_partial_first) {
                dataAsString = self.saved_partial_first + dataAsString;
                self.saved_partial_first = "";
            }
            self._lines = self._lines
                .concat(dataAsString.split(/(?:\n|\r\n|\r)/g))
                .filter(function (item) { return item; });
            if (!/^{"__typename":/.test(self._lines[0])) {
                self.saved_partial_last = self._lines[0] + "\n";
                self._lines.shift();
            }
            if (!isJson(self._lines[self._lines.length - 1])) {
                self.saved_partial_first = self._lines[self._lines.length - 1];
                self._lines.pop();
            }
            setImmediate(function () {
                self._nextLine();
            });
        });
        readStream.on("end", function () {
            self._end = true;
            setImmediate(function () {
                self._nextLine();
            });
        });
        this._readStream = readStream;
    };
    LineByLineReader.prototype._nextLine = function () {
        var self = this;
        var line;
        if (this._paused) {
            return;
        }
        if (this._lines.length === 0) {
            if (this._end) {
                if (this._lineFragment) {
                    this.emit("line", this._lineFragment);
                    this._lineFragment = "";
                }
                if (!this._paused) {
                    this.end();
                }
            }
            else {
                this._readStream.resume();
            }
            return;
        }
        line = this._lines.pop();
        if (!this._skipEmptyLines || line.length > 0) {
            this.emit("line", line);
        }
        setImmediate(function () {
            if (!this._paused) {
                self._nextLine();
            }
        }.bind(this));
    };
    LineByLineReader.prototype.pause = function () {
        this._paused = true;
    };
    LineByLineReader.prototype.resume = function () {
        var self = this;
        this._paused = false;
        setImmediate(function () {
            self._nextLine();
        });
    };
    LineByLineReader.prototype.end = function () {
        if (!this._ended) {
            this._ended = true;
            this.emit("end");
        }
    };
    LineByLineReader.prototype.close = function () {
        var self = this;
        this._readStream.destroy();
        this._end = true;
        this._lines = [];
        setImmediate(function () {
            self._nextLine();
        });
    };
    return LineByLineReader;
}(events_1["default"].EventEmitter));
exports["default"] = LineByLineReader;
