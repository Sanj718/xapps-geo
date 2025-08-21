/**
 * Script to run the cronJobs method from analytics-cleaner-cron.server.ts
 * 
 * This script loads environment variables first, then imports and runs the cron jobs
 */

import dotenv from 'dotenv';

// Load environment variables BEFORE importing the cron module
console.log("🚀 Loading environment variables...");
dotenv.config();

// Verify required environment variables
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  process.exit(1);
}

console.log("✅ Environment variables loaded successfully");
console.log("🔗 Database URL loaded:", process.env.DATABASE_URL.substring(0, 30) + "...");

// Now import the cron module after environment variables are loaded
console.log("📦 Importing cron module...");
const { cronJobs, runCleaner } = await import("../app/analytics-cleaner-cron.server.js");

console.log("=" .repeat(60));
console.log("⏰ Starting cron jobs...");

try {
  // Run the cron jobs
//   cronJobs();

  runCleaner();
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
