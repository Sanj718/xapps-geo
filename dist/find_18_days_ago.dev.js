"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Find timestamps that are around 18 days old
 */
_dotenv["default"].config();

var prisma = new _client.PrismaClient();

function find18DaysAgo() {
  var currentTime, DAYS, cutoffTime, minTime, maxTime, analytics, record, allTimestamps, buttonTimestamps, autoTimestamps, marketsButtonTimestamps, marketsAutoTimestamps, suspiciousTimestamps;
  return regeneratorRuntime.async(function find18DaysAgo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("🔍 Searching for timestamps around 18 days ago...\n");
          currentTime = Date.now();
          DAYS = 20;
          cutoffTime = currentTime - DAYS * 24 * 60 * 60 * 1000; // Look for timestamps in the 15-25 day range

          minTime = currentTime - 25 * 24 * 60 * 60 * 1000;
          maxTime = currentTime - 15 * 24 * 60 * 60 * 1000;
          console.log("\uD83D\uDCC5 Current time: ".concat(new Date(currentTime).toISOString()));
          console.log("\uD83D\uDCC5 Cutoff time (20 days ago): ".concat(new Date(cutoffTime).toISOString()));
          console.log("\uD83D\uDD0D Searching range: ".concat(new Date(minTime).toISOString(), " to ").concat(new Date(maxTime).toISOString()));
          console.log("");
          _context.next = 13;
          return regeneratorRuntime.awrap(prisma.analytics.findMany({
            where: {
              shop: 'appstorefortests.myshopify.com'
            }
          }));

        case 13:
          analytics = _context.sent;

          if (analytics.length > 0) {
            record = analytics[0]; // Check all analytics types for timestamps in the suspicious range

            allTimestamps = [];

            if (record.dataButton) {
              buttonTimestamps = record.dataButton.split(',').map(Number);
              buttonTimestamps.forEach(function (ts) {
                allTimestamps.push({
                  type: 'Button',
                  timestamp: ts,
                  date: new Date(ts).toISOString()
                });
              });
            }

            if (record.dataAuto) {
              autoTimestamps = record.dataAuto.split(',').map(Number);
              autoTimestamps.forEach(function (ts) {
                allTimestamps.push({
                  type: 'Auto',
                  timestamp: ts,
                  date: new Date(ts).toISOString()
                });
              });
            }

            if (record.dataMarketsButton) {
              marketsButtonTimestamps = record.dataMarketsButton.split(',').map(Number);
              marketsButtonTimestamps.forEach(function (ts) {
                allTimestamps.push({
                  type: 'Markets Button',
                  timestamp: ts,
                  date: new Date(ts).toISOString()
                });
              });
            }

            if (record.dataMarketsAuto) {
              marketsAutoTimestamps = record.dataMarketsAuto.split(',').map(Number);
              marketsAutoTimestamps.forEach(function (ts) {
                allTimestamps.push({
                  type: 'Markets Auto',
                  timestamp: ts,
                  date: new Date(ts).toISOString()
                });
              });
            } // Find timestamps in the suspicious range


            suspiciousTimestamps = allTimestamps.filter(function (ts) {
              return ts.timestamp >= minTime && ts.timestamp <= maxTime;
            });
            console.log("\uD83D\uDD0D Found ".concat(suspiciousTimestamps.length, " timestamps in 15-25 day range:"));
            suspiciousTimestamps.forEach(function (ts, i) {
              var daysFromNow = Math.ceil((currentTime - ts.timestamp) / (1000 * 60 * 60 * 24));
              var status = ts.timestamp >= cutoffTime ? '✅ KEPT' : '❌ DELETED';
              console.log("   ".concat(i + 1, ". ").concat(ts.type, ": ").concat(ts.date, " (").concat(ts.timestamp, ") - ").concat(daysFromNow, " days ago - ").concat(status));
            });

            if (suspiciousTimestamps.length === 0) {
              console.log("✅ No timestamps found in the 15-25 day range");
            }
          }

          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.error("❌ Error:", _context.t0);

        case 20:
          _context.prev = 20;
          _context.next = 23;
          return regeneratorRuntime.awrap(prisma.$disconnect());

        case 23:
          return _context.finish(20);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17, 20, 24]]);
}

find18DaysAgo();