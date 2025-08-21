"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Verify the cleaned analytics data
 */
_dotenv["default"].config();

var prisma = new _client.PrismaClient();

function verifyCleanedData() {
  var analytics, appstoreRecord, buttonTimestamps, buttonDates, autoTimestamps, autoDates;
  return regeneratorRuntime.async(function verifyCleanedData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("🔍 Verifying cleaned analytics data...\n");
          _context.next = 4;
          return regeneratorRuntime.awrap(prisma.analytics.findMany({
            orderBy: {
              shop: 'asc'
            }
          }));

        case 4:
          analytics = _context.sent;
          console.log("\uD83D\uDCCA Found ".concat(analytics.length, " analytics records:\n"));
          analytics.forEach(function (record, index) {
            console.log("".concat(index + 1, ". ").concat(record.shop));
            console.log("   Button events: ".concat(record.dataButton ? record.dataButton.split(',').length : 0, " (").concat(record.dataButton || 'none', ")"));
            console.log("   Auto events: ".concat(record.dataAuto ? record.dataAuto.split(',').length : 0, " (").concat(record.dataAuto || 'none', ")"));
            console.log("   Markets button events: ".concat(record.dataMarketsButton ? record.dataMarketsButton.split(',').length : 0, " (").concat(record.dataMarketsButton || 'none', ")"));
            console.log("   Markets auto events: ".concat(record.dataMarketsAuto ? record.dataMarketsAuto.split(',').length : 0, " (").concat(record.dataMarketsAuto || 'none', ")"));
            console.log("");
          }); // Check appstorefortests specifically

          appstoreRecord = analytics.find(function (r) {
            return r.shop === 'appstorefortests.myshopify.com';
          });

          if (appstoreRecord) {
            console.log("🎯 appstorefortests.myshopify.com - Detailed Analysis:");
            console.log("=".repeat(60));

            if (appstoreRecord.dataButton) {
              buttonTimestamps = appstoreRecord.dataButton.split(',').map(Number);
              buttonDates = buttonTimestamps.map(function (ts) {
                return new Date(ts).toISOString();
              });
              console.log("Button events (".concat(buttonTimestamps.length, "):"));
              buttonDates.forEach(function (date, i) {
                console.log("   ".concat(i + 1, ". ").concat(date, " (").concat(buttonTimestamps[i], ")"));
              });
            }

            if (appstoreRecord.dataAuto) {
              autoTimestamps = appstoreRecord.dataAuto.split(',').map(Number);
              autoDates = autoTimestamps.map(function (ts) {
                return new Date(ts).toISOString();
              });
              console.log("Auto events (".concat(autoTimestamps.length, "):"));
              autoDates.forEach(function (date, i) {
                console.log("   ".concat(i + 1, ". ").concat(date, " (").concat(autoTimestamps[i], ")"));
              });
            }
          }

          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error("❌ Error:", _context.t0);

        case 14:
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap(prisma.$disconnect());

        case 17:
          return _context.finish(14);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11, 14, 18]]);
}

verifyCleanedData();