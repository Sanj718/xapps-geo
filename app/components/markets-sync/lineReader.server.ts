import stream from "stream";
import { StringDecoder } from "string_decoder";
import path from "path";
import backwardsStream from "fs-backwards-stream";
import events from "events";

function isJson(item: any): boolean {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

// let's make sure we have a setImmediate function (node.js <0.10)
if (typeof global.setImmediate === "undefined") {
  (global as any).setImmediate = process.nextTick;
}

class LineByLineReader extends events.EventEmitter {
  private _encoding: string;
  private _readStream: stream.Readable | null;
  private _filepath: string | null;
  private _streamOptions: any;
  private _skipEmptyLines: boolean;
  private _lines: string[];
  private _lineFragment: string;
  private _paused: boolean;
  private _end: boolean;
  private _ended: boolean;
  private decoder: StringDecoder;
  private saved_partial_first: string;
  private saved_partial_last: string;

  constructor(filepath: string | stream.Readable, options: any = {}) {
    super();
    const self = this;

    this._encoding = options.encoding || "utf8";
    if (filepath instanceof stream.Readable) {
      this._readStream = filepath;
      this._filepath = null;
    } else {
      this._readStream = null;
      this._filepath = path.normalize(filepath);
      this._streamOptions = { encoding: this._encoding, block: 1024 * 64 };

      if (options.start) {
        this._streamOptions.start = options.start;
      }

      if (options.end) {
        this._streamOptions.end = options.end;
      }
    }
    this._skipEmptyLines = options.skipEmptyLines || false;

    this._lines = [];
    this._lineFragment = "";
    this._paused = false;
    this._end = false;
    this._ended = false;
    this.decoder = new StringDecoder(this._encoding);
    this.saved_partial_first = "";
    this.saved_partial_last = "";

    setImmediate(function () {
      self._initStream();
    });
  }

  private _initStream(): void {
    const self = this;
    const readStream = this._readStream
      ? this._readStream
      : backwardsStream(this._filepath!, this._streamOptions);

    readStream.on("error", function (err: Error) {
      self.emit("error", err);
    });

    readStream.on("open", function () {
      self.emit("open");
    });

    readStream.on("data", function (data: Buffer | string) {
      self._readStream!.pause();
      let dataAsString = data;
      if (data instanceof Buffer) {
        dataAsString = self.decoder.write(data);
      }

      if (
        dataAsString &&
        dataAsString.substr(dataAsString.length - 1) !== "\n" &&
        self.saved_partial_last
      ) {
        dataAsString = dataAsString + self.saved_partial_last;
        self.saved_partial_last = "";
      }

      if (
        dataAsString &&
        !/^{"__typename":/.test(dataAsString) &&
        self.saved_partial_first
      ) {
        dataAsString = self.saved_partial_first + dataAsString;
        self.saved_partial_first = "";
      }

      self._lines = self._lines
        .concat(dataAsString.split(/(?:\n|\r\n|\r)/g))
        .filter((item) => item);

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
  }

  private _nextLine(): void {
    const self = this;
    let line;

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
      } else {
        this._readStream!.resume();
      }
      return;
    }

    line = this._lines.pop();

    if (!this._skipEmptyLines || line!.length > 0) {
      this.emit("line", line);
    }

    setImmediate(function (this: LineByLineReader) {
      if (!this._paused) {
        self._nextLine();
      }
    }.bind(this));
  }

  pause(): void {
    this._paused = true;
  }

  resume(): void {
    const self = this;

    this._paused = false;

    setImmediate(function () {
      self._nextLine();
    });
  }

  end(): void {
    if (!this._ended) {
      this._ended = true;
      this.emit("end");
    }
  }

  close(): void {
    const self = this;

    this._readStream!.destroy();
    this._end = true;
    this._lines = [];
    setImmediate(function () {
      self._nextLine();
    });
  }
}

export default LineByLineReader; 