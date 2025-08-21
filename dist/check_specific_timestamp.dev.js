"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Check specific timestamp 1754006400000
 */
_dotenv["default"].config();

var prisma = new _client.PrismaClient();

function checkSpecificTimestamp() {
  var specificTimestamp, currentTime, DAYS, cutoffTime, diffTime, diffDays, analytics, record, foundIn;
  return regeneratorRuntime.async(function checkSpecificTimestamp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("🔍 Analyzing specific timestamp: 1754006400000\n");
          specificTimestamp = 1754006400000;
          currentTime = Date.now();
          DAYS = 20;
          cutoffTime = currentTime - DAYS * 24 * 60 * 60 * 1000;
          console.log("\uD83D\uDCC5 Current time: ".concat(new Date(currentTime).toISOString()));
          console.log("\uD83D\uDCC5 Cutoff time (".concat(DAYS, " days ago): ").concat(new Date(cutoffTime).toISOString()));
          console.log("\u23F0 Cutoff timestamp: ".concat(cutoffTime));
          console.log("");
          console.log("\uD83C\uDFAF Analyzing timestamp: ".concat(specificTimestamp));
          console.log("\uD83D\uDCC5 Timestamp date: ".concat(new Date(specificTimestamp).toISOString()));
          console.log("\u23F0 Is within cutoff? ".concat(specificTimestamp >= cutoffTime ? 'YES ✅' : 'NO ❌')); // Calculate days difference

          diffTime = currentTime - specificTimestamp;
          diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log("\uD83D\uDCCA Days difference from today: ".concat(diffDays, " days")); // Determine if it will be kept or deleted

          if (specificTimestamp >= cutoffTime) {
            console.log("\u2705 RESULT: This timestamp will be KEPT (within 20-day retention)");
          } else {
            console.log("\u274C RESULT: This timestamp will be DELETED (beyond 20-day retention)");
          }

          console.log(""); // Check if this timestamp exists in current data

          _context.next = 20;
          return regeneratorRuntime.awrap(prisma.analytics.findMany({
            where: {
              shop: 'appstorefortests.myshopify.com'
            }
          }));

        case 20:
          analytics = _context.sent;

          if (analytics.length > 0) {
            record = analytics[0];
            foundIn = [];

            if (record.dataButton && record.dataButton.includes(specificTimestamp.toString())) {
              foundIn.push('Button');
            }

            if (record.dataAuto && record.dataAuto.includes(specificTimestamp.toString())) {
              foundIn.push('Auto');
            }

            if (record.dataMarketsButton && record.dataMarketsButton.includes(specificTimestamp.toString())) {
              foundIn.push('Markets Button');
            }

            if (record.dataMarketsAuto && record.dataMarketsAuto.includes(specificTimestamp.toString())) {
              foundIn.push('Markets Auto');
            }

            if (foundIn.length > 0) {
              console.log("\uD83D\uDD0D Found in current data: ".concat(foundIn.join(', ')));
            } else {
              console.log("\uD83D\uDD0D Not found in current data");
            }
          }

          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.error("❌ Error:", _context.t0);

        case 27:
          _context.prev = 27;
          _context.next = 30;
          return regeneratorRuntime.awrap(prisma.$disconnect());

        case 30:
          return _context.finish(27);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24, 27, 31]]);
}

checkSpecificTimestamp();