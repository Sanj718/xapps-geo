"use strict";

var _client = require("@prisma/client");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var prisma = new _client.PrismaClient(); // Constants from the cron job

var DAYS = 20;
var currentTime = Date.now();
var cutoffTime = currentTime - DAYS * 24 * 60 * 60 * 1000;
console.log("\uD83E\uDDEA Testing Analytics Logic with REAL Database Data");
console.log("\uD83D\uDCC5 Current time: ".concat(new Date(currentTime).toISOString()));
console.log("\uD83D\uDCC5 Cutoff time (".concat(DAYS, " days ago): ").concat(new Date(cutoffTime).toISOString()));
console.log("\u23F0 Cutoff timestamp: ".concat(cutoffTime));
console.log("=".repeat(80));

function testAnalyticsLogic() {
  var analytics, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, record, types, _i, _types, type, dataArray, filteredData, removedCount, updatedData, oldData, oldestRemoved, newestRemoved, totalOriginalEvents, totalFilteredEvents, totalRemovedEvents, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _record, _types2, _i2, _types3, _type, _dataArray, _filteredData;

  return regeneratorRuntime.async(function testAnalyticsLogic$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(prisma.analytics.findMany({
            orderBy: {
              shop: 'asc'
            }
          }));

        case 3:
          analytics = _context.sent;
          console.log("\uD83D\uDCCA Testing ".concat(analytics.length, " analytics records from database\n"));
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;
          _iterator = analytics[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 40;
            break;
          }

          record = _step.value;
          console.log("\uD83C\uDFEA Store: ".concat(record.shop));
          console.log("-".repeat(60)); // Test each analytics type

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

        case 16:
          if (!(_i < _types.length)) {
            _context.next = 36;
            break;
          }

          type = _types[_i];
          console.log("\n\uD83D\uDCC8 ".concat(type.name, " Analytics:"));

          if (!(!type.data || type.data === '')) {
            _context.next = 24;
            break;
          }

          console.log("   Original: (empty)");
          console.log("   Processed: (empty)");
          console.log("   SQL: No update needed");
          return _context.abrupt("continue", 33);

        case 24:
          // Parse the data (same logic as cron job)
          dataArray = type.data.split(',').map(Number);
          console.log("   Original: ".concat(dataArray.length, " events"));
          console.log("   Sample timestamps: ".concat(dataArray.slice(0, 3).join(', ')).concat(dataArray.length > 3 ? '...' : '')); // Filter by date (same logic as cron job)

          filteredData = dataArray.filter(function (timestamp) {
            return timestamp >= cutoffTime;
          });
          removedCount = dataArray.length - filteredData.length;
          console.log("   Processed: ".concat(filteredData.length, " events (removed ").concat(removedCount, " old events)"));

          if (filteredData.length > 0) {
            console.log("   Sample filtered: ".concat(filteredData.slice(0, 3).join(', ')).concat(filteredData.length > 3 ? '...' : ''));
          } // Generate SQL (same logic as cron job)


          if (filteredData.length === 0) {
            console.log("   SQL: UPDATE analytics SET ".concat(type.field, " = '' WHERE shop = '").concat(record.shop, "'"));
          } else {
            updatedData = filteredData.map(function (timestamp) {
              return timestamp.toString();
            }).join(',');
            console.log("   SQL: UPDATE analytics SET ".concat(type.field, " = '").concat(updatedData, "' WHERE shop = '").concat(record.shop, "'"));
          } // Show what would be removed


          if (removedCount > 0) {
            oldData = dataArray.filter(function (timestamp) {
              return timestamp < cutoffTime;
            });
            oldestRemoved = Math.min.apply(Math, _toConsumableArray(oldData));
            newestRemoved = Math.max.apply(Math, _toConsumableArray(oldData));
            console.log("   \uD83D\uDDD1\uFE0F  Removed events from: ".concat(new Date(oldestRemoved).toISOString(), " to ").concat(new Date(newestRemoved).toISOString()));
          }

        case 33:
          _i++;
          _context.next = 16;
          break;

        case 36:
          console.log("\n" + "=".repeat(80));

        case 37:
          _iteratorNormalCompletion = true;
          _context.next = 10;
          break;

        case 40:
          _context.next = 46;
          break;

        case 42:
          _context.prev = 42;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 46:
          _context.prev = 46;
          _context.prev = 47;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 49:
          _context.prev = 49;

          if (!_didIteratorError) {
            _context.next = 52;
            break;
          }

          throw _iteratorError;

        case 52:
          return _context.finish(49);

        case 53:
          return _context.finish(46);

        case 54:
          // Summary statistics
          console.log("\n📊 SUMMARY STATISTICS:");
          console.log("=".repeat(40));
          totalOriginalEvents = 0;
          totalFilteredEvents = 0;
          totalRemovedEvents = 0;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 62;

          for (_iterator2 = analytics[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _record = _step2.value;
            _types2 = [{
              data: _record.dataButton
            }, {
              data: _record.dataAuto
            }, {
              data: _record.dataMarketsButton
            }, {
              data: _record.dataMarketsAuto
            }];

            for (_i2 = 0, _types3 = _types2; _i2 < _types3.length; _i2++) {
              _type = _types3[_i2];

              if (_type.data && _type.data !== '') {
                _dataArray = _type.data.split(',').map(Number);
                _filteredData = _dataArray.filter(function (timestamp) {
                  return timestamp >= cutoffTime;
                });
                totalOriginalEvents += _dataArray.length;
                totalFilteredEvents += _filteredData.length;
                totalRemovedEvents += _dataArray.length - _filteredData.length;
              }
            }
          }

          _context.next = 70;
          break;

        case 66:
          _context.prev = 66;
          _context.t1 = _context["catch"](62);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t1;

        case 70:
          _context.prev = 70;
          _context.prev = 71;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 73:
          _context.prev = 73;

          if (!_didIteratorError2) {
            _context.next = 76;
            break;
          }

          throw _iteratorError2;

        case 76:
          return _context.finish(73);

        case 77:
          return _context.finish(70);

        case 78:
          console.log("Total original events: ".concat(totalOriginalEvents));
          console.log("Total events after filtering: ".concat(totalFilteredEvents));
          console.log("Total events to be removed: ".concat(totalRemovedEvents));
          console.log("Retention rate: ".concat((totalFilteredEvents / totalOriginalEvents * 100).toFixed(1), "%"));
          _context.next = 87;
          break;

        case 84:
          _context.prev = 84;
          _context.t2 = _context["catch"](0);
          console.error("❌ Error testing analytics logic:", _context.t2);

        case 87:
          _context.prev = 87;
          _context.next = 90;
          return regeneratorRuntime.awrap(prisma.$disconnect());

        case 90:
          return _context.finish(87);

        case 91:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 84, 87, 91], [8, 42, 46, 54], [47,, 49, 53], [62, 66, 70, 78], [71,, 73, 77]]);
} // Run the test


testAnalyticsLogic();