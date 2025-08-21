"use strict";

var _client = require("@prisma/client");

/**
 * Script to insert sample analytics data into the database
 * 
 * This script inserts realistic sample data for testing the analytics cron job
 * with different traffic levels and scenarios.
 */
var prisma = new _client.PrismaClient(); // Sample analytics data from analytics_sample_data.md

var sampleData = [// High-Traffic Store
{
  shop: "high-traffic-store.myshopify.com",
  dataButton: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490,1755551935491,1755551935492,1755551935493,1755551935494,1755551935495",
  dataAuto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490",
  dataMarketsButton: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488",
  dataMarketsAuto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486"
}, // Medium-Traffic Store
{
  shop: "medium-traffic-store.myshopify.com",
  dataButton: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488",
  dataAuto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485",
  dataMarketsButton: "1755551935481,1755551935482,1755551935483,1755551935484",
  dataMarketsAuto: "1755551935481,1755551935482,1755551935483"
}, // Low-Traffic Store
{
  shop: "low-traffic-store.myshopify.com",
  dataButton: "1755551935481,1755551935482,1755551935483",
  dataAuto: "1755551935481,1755551935482",
  dataMarketsButton: "1755551935481",
  dataMarketsAuto: ""
}, // New Store
{
  shop: "new-store.myshopify.com",
  dataButton: "1755551935481",
  dataAuto: "",
  dataMarketsButton: "",
  dataMarketsAuto: ""
}, // Inactive Store
{
  shop: "inactive-store.myshopify.com",
  dataButton: "",
  dataAuto: "",
  dataMarketsButton: "",
  dataMarketsAuto: ""
}, // Mixed Activity Store
{
  shop: "mixed-activity-store.myshopify.com",
  dataButton: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490",
  dataAuto: "1755551935481,1755551935482,1755551935483",
  dataMarketsButton: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485",
  dataMarketsAuto: "1755551935481"
}, // Button-Heavy Store
{
  shop: "button-heavy-store.myshopify.com",
  dataButton: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490,1755551935491,1755551935492,1755551935493,1755551935494,1755551935495,1755551935496,1755551935497,1755551935488,1755551935499,1755551935500",
  dataAuto: "1755551935481,1755551935482",
  dataMarketsButton: "1755551935481",
  dataMarketsAuto: ""
}, // Auto-Redirect Focused Store
{
  shop: "auto-redirect-store.myshopify.com",
  dataButton: "1755551935481,1755551935482",
  dataAuto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490,1755551935491,1755551935492,1755551935493,1755551935494,1755551935495",
  dataMarketsButton: "1755551935481,1755551935482,1755551935483",
  dataMarketsAuto: "1755551935481,1755551935482"
}, // Markets-Focused Store
{
  shop: "markets-focused-store.myshopify.com",
  dataButton: "1755551935481,1755551935482,1755551935483",
  dataAuto: "1755551935481,1755551935482",
  dataMarketsButton: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488,1755551935489,1755551935490",
  dataMarketsAuto: "1755551935481,1755551935482,1755551935483,1755551935484,1755551935485,1755551935486,1755551935487,1755551935488"
}, // Mixed Recent and Historical Data
{
  shop: "mixed-history-store.myshopify.com",
  dataButton: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481,1755551935482,1755551935483,1755551935484,1755551935485",
  dataAuto: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481,1755551935482,1755551935483",
  dataMarketsButton: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481,1755551935482",
  dataMarketsAuto: "1750000000000,1751000000000,1752000000000,1753000000000,1754000000000,1755000000000,1755551935481"
}];

function insertSampleData() {
  var _i, _sampleData, data, result, totalRecords;

  return regeneratorRuntime.async(function insertSampleData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("🚀 Starting to insert sample analytics data...");
          _i = 0, _sampleData = sampleData;

        case 3:
          if (!(_i < _sampleData.length)) {
            _context.next = 23;
            break;
          }

          data = _sampleData[_i];
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(prisma.analytics.upsert({
            where: {
              shop: data.shop
            },
            update: {
              dataButton: data.dataButton,
              dataAuto: data.dataAuto,
              dataMarketsButton: data.dataMarketsButton,
              dataMarketsAuto: data.dataMarketsAuto
            },
            create: {
              shop: data.shop,
              dataButton: data.dataButton,
              dataAuto: data.dataAuto,
              dataMarketsButton: data.dataMarketsButton,
              dataMarketsAuto: data.dataMarketsAuto
            }
          }));

        case 8:
          result = _context.sent;
          console.log("\u2705 Inserted/Updated: ".concat(data.shop));
          console.log("   Button events: ".concat(data.dataButton ? data.dataButton.split(',').length : 0));
          console.log("   Auto events: ".concat(data.dataAuto ? data.dataAuto.split(',').length : 0));
          console.log("   Markets button events: ".concat(data.dataMarketsButton ? data.dataMarketsButton.split(',').length : 0));
          console.log("   Markets auto events: ".concat(data.dataMarketsAuto ? data.dataMarketsAuto.split(',').length : 0));
          console.log("");
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](5);
          console.error("\u274C Error inserting ".concat(data.shop, ":"), _context.t0.message);

        case 20:
          _i++;
          _context.next = 3;
          break;

        case 23:
          console.log("🎉 Sample data insertion completed!"); // Show summary

          _context.next = 26;
          return regeneratorRuntime.awrap(prisma.analytics.count());

        case 26:
          totalRecords = _context.sent;
          console.log("\uD83D\uDCCA Total analytics records in database: ".concat(totalRecords));
          _context.next = 33;
          break;

        case 30:
          _context.prev = 30;
          _context.t1 = _context["catch"](0);
          console.error("❌ Fatal error:", _context.t1);

        case 33:
          _context.prev = 33;
          _context.next = 36;
          return regeneratorRuntime.awrap(prisma.$disconnect());

        case 36:
          return _context.finish(33);

        case 37:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 30, 33, 37], [5, 17]]);
} // Run the insertion


insertSampleData();