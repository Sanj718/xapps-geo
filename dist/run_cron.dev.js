"use strict";

var _analyticsCleanerCronServer = require("./app/analytics-cleaner-cron.server.js");

/**
 * Script to run the analytics cleaner cron jobs
 * 
 * This script runs the cron jobs manually for testing purposes
 */
// Import the cron jobs function
console.log("🚀 Starting analytics cleaner cron jobs...");
console.log("=".repeat(60));

try {
  // Run the cron jobs
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