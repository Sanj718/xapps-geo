"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _analyticsCleanerCronServer = require("./app/analytics-cleaner-cron.server.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Script to run the analytics cleaner cron jobs with environment variables
 */
console.log("🚀 Starting analytics cleaner cron jobs...");
console.log("=".repeat(60)); // Load environment variables from .env file

try {
  _dotenv["default"].config();

  console.log("✅ Environment variables loaded successfully");
} catch (error) {
  console.error("❌ Error loading .env file:", error.message);
  process.exit(1);
} // Verify required environment variables


if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  process.exit(1);
}

console.log("🔗 Database URL loaded:", process.env.DATABASE_URL.substring(0, 30) + "...");

try {
  // Run the cron jobs
  console.log("⏰ Starting cron jobs...");
  (0, _analyticsCleanerCronServer.cronJobs)();
  console.log("✅ Cron jobs started successfully!");
  console.log("💡 The cron jobs will run according to their schedule:");
  console.log("   - Analytics cleaner: Every day at 2:00 AM");
  console.log("   - Analytics tracker: Every 5 minutes");
  console.log("");
  console.log("🔍 Check your database to see the cleaned analytics data");
  console.log("📧 Check your email for any export reports");
} catch (error) {
  console.error("❌ Error starting cron jobs:", error);
  process.exit(1);
}