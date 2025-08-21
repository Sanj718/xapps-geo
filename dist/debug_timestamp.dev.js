"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Debug script to analyze the timestamp deletion issue
 */
_dotenv["default"].config();

var prisma = new _client.PrismaClient();

function debugTimestamp() {
  var problematicTimestamp, currentTime, DAYS, cutoffTime, diffTime, diffDays, analytics, record, buttonTimestamps;
  return regeneratorRuntime.async(function debugTimestamp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("🔍 Debugging timestamp deletion issue...\n"); // Check the specific timestamp that was deleted

          problematicTimestamp = 1754063569;
          currentTime = Date.now();
          DAYS = 20;
          cutoffTime = currentTime - DAYS * 24 * 60 * 60 * 1000;
          console.log("\uD83D\uDCC5 Current time: ".concat(new Date(currentTime).toISOString()));
          console.log("\uD83D\uDCC5 Cutoff time (".concat(DAYS, " days ago): ").concat(new Date(cutoffTime).toISOString()));
          console.log("\u23F0 Cutoff timestamp: ".concat(cutoffTime));
          console.log("");
          console.log("\uD83C\uDFAF Analyzing timestamp: ".concat(problematicTimestamp));
          console.log("\uD83D\uDCC5 Timestamp date: ".concat(new Date(problematicTimestamp).toISOString()));
          console.log("\u23F0 Is within cutoff? ".concat(problematicTimestamp >= cutoffTime ? 'YES ✅' : 'NO ❌')); // Calculate days difference

          diffTime = currentTime - problematicTimestamp;
          diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log("\uD83D\uDCCA Days difference from today: ".concat(diffDays, " days"));
          console.log(""); // Check current data in database

          _context.next = 19;
          return regeneratorRuntime.awrap(prisma.analytics.findMany({
            where: {
              shop: 'appstorefortests.myshopify.com'
            }
          }));

        case 19:
          analytics = _context.sent;

          if (analytics.length > 0) {
            record = analytics[0];
            console.log("📊 Current data in database:");
            console.log("Button events: ".concat(record.dataButton ? record.dataButton.split(',').length : 0));

            if (record.dataButton) {
              buttonTimestamps = record.dataButton.split(',').map(Number);
              console.log("\n🔍 All button timestamps:");
              buttonTimestamps.forEach(function (ts, i) {
                var date = new Date(ts).toISOString();
                var daysFromNow = Math.ceil((currentTime - ts) / (1000 * 60 * 60 * 24));
                var status = ts >= cutoffTime ? '✅ KEPT' : '❌ DELETED';
                console.log("   ".concat(i + 1, ". ").concat(date, " (").concat(ts, ") - ").concat(daysFromNow, " days ago - ").concat(status));
              });
            }
          }

          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.error("❌ Error:", _context.t0);

        case 26:
          _context.prev = 26;
          _context.next = 29;
          return regeneratorRuntime.awrap(prisma.$disconnect());

        case 29:
          return _context.finish(26);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23, 26, 30]]);
}

debugTimestamp();