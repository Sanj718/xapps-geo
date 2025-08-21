"use strict";

var _client = require("@prisma/client");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var prisma = new _client.PrismaClient();

function checkAppstoreData() {
  var _ret;

  return regeneratorRuntime.async(function checkAppstoreData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(function _callee() {
            var record, DAYS, currentTime, cutoffTime, types, _i, _types, type, dataArray, sampleDates, filteredData, removedCount, updatedData, oldData, oldestRemoved, newestRemoved;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log("🔍 Checking current data for appstorefortests.myshopify.com\n"); // Get the specific record

                    _context.next = 3;
                    return regeneratorRuntime.awrap(prisma.analytics.findUnique({
                      where: {
                        shop: 'appstorefortests.myshopify.com'
                      }
                    }));

                  case 3:
                    record = _context.sent;

                    if (record) {
                      _context.next = 7;
                      break;
                    }

                    console.log("❌ No record found for appstorefortests.myshopify.com");
                    return _context.abrupt("return", {
                      v: void 0
                    });

                  case 7:
                    console.log("📊 Current Data:");
                    console.log("Shop: ".concat(record.shop));
                    console.log("Button events: ".concat(record.dataButton || '(empty)'));
                    console.log("Auto events: ".concat(record.dataAuto || '(empty)'));
                    console.log("Markets button events: ".concat(record.dataMarketsButton || '(empty)'));
                    console.log("Markets auto events: ".concat(record.dataMarketsAuto || '(empty)'));
                    console.log("\n" + "=".repeat(80)); // Constants from the cron job

                    DAYS = 20;
                    currentTime = Date.now();
                    cutoffTime = currentTime - DAYS * 24 * 60 * 60 * 1000;
                    console.log("\uD83D\uDCC5 Current time: ".concat(new Date(currentTime).toISOString()));
                    console.log("\uD83D\uDCC5 Cutoff time (".concat(DAYS, " days ago): ").concat(new Date(cutoffTime).toISOString()));
                    console.log("\u23F0 Cutoff timestamp: ".concat(cutoffTime));
                    console.log("\n" + "=".repeat(80)); // Process each analytics type

                    types = [{
                      name: 'Button',
                      data: record.dataButton,
                      field: 'dataButton'
                    }, {
                      name: 'Auto',
                      data: record.dataAuto,
                      field: 'dataAuto'
                    }, {
                      name: 'Markets Button',
                      data: record.dataMarketsButton,
                      field: 'dataMarketsButton'
                    }, {
                      name: 'Markets Auto',
                      data: record.dataMarketsAuto,
                      field: 'dataMarketsAuto'
                    }];
                    _i = 0, _types = types;

                  case 23:
                    if (!(_i < _types.length)) {
                      _context.next = 43;
                      break;
                    }

                    type = _types[_i];
                    console.log("\n\uD83D\uDCC8 ".concat(type.name, " Analytics Processing:"));

                    if (!(!type.data || type.data === '')) {
                      _context.next = 31;
                      break;
                    }

                    console.log("   Current: (empty)");
                    console.log("   After cron job: (empty)");
                    console.log("   Action: No change needed");
                    return _context.abrupt("continue", 40);

                  case 31:
                    // Parse the data
                    dataArray = type.data.split(',').map(Number);
                    console.log("   Current: ".concat(dataArray.length, " events")); // Show sample timestamps with dates

                    sampleDates = dataArray.slice(0, 3).map(function (timestamp) {
                      return "".concat(timestamp, " (").concat(new Date(timestamp).toISOString(), ")");
                    });
                    console.log("   Sample: ".concat(sampleDates.join(', ')).concat(dataArray.length > 3 ? '...' : '')); // Filter by date

                    filteredData = dataArray.filter(function (timestamp) {
                      return timestamp >= cutoffTime;
                    });
                    removedCount = dataArray.length - filteredData.length;
                    console.log("   After filtering: ".concat(filteredData.length, " events (").concat(removedCount, " removed)"));

                    if (filteredData.length === 0) {
                      console.log("   Action: SET ".concat(type.field, " = '' (all events are old)"));
                    } else {
                      updatedData = filteredData.map(function (timestamp) {
                        return timestamp.toString();
                      }).join(',');
                      console.log("   Action: SET ".concat(type.field, " = '").concat(updatedData, "'"));
                    } // Show what would be removed


                    if (removedCount > 0) {
                      oldData = dataArray.filter(function (timestamp) {
                        return timestamp < cutoffTime;
                      });
                      oldestRemoved = Math.min.apply(Math, _toConsumableArray(oldData));
                      newestRemoved = Math.max.apply(Math, _toConsumableArray(oldData));
                      console.log("   \uD83D\uDDD1\uFE0F  Removing events from: ".concat(new Date(oldestRemoved).toISOString(), " to ").concat(new Date(newestRemoved).toISOString()));
                    }

                  case 40:
                    _i++;
                    _context.next = 23;
                    break;

                  case 43:
                    console.log("\n" + "=".repeat(80));
                    console.log("💡 Summary: All current data for appstorefortests is older than 20 days");
                    console.log("   The cron job will clear all analytics fields for this store");
                    console.log("   This is the expected behavior for old, inactive data");

                  case 47:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }());

        case 3:
          _ret = _context2.sent;

          if (!(_typeof(_ret) === "object")) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", _ret.v);

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("❌ Error checking appstore data:", _context2.t0);

        case 11:
          _context2.prev = 11;
          _context2.next = 14;
          return regeneratorRuntime.awrap(prisma.$disconnect());

        case 14:
          return _context2.finish(11);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8, 11, 15]]);
} // Run the check


checkAppstoreData();