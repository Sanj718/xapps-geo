"use strict";
exports.__esModule = true;
exports.cronJobs = void 0;
var analytics_cleaner_cron_server_1 = require("./analytics-cleaner-cron.server");
exports.cronJobs = analytics_cleaner_cron_server_1.cronJobs;
/**
 * SERVER INITIALIZATION FILE
 *
 * This file runs immediately when imported by entry.server.tsx
 * It initializes server-side services like cron jobs, database connections,
 * and other startup tasks that should run as soon as the server starts.
 *
 * The import in entry.server.tsx ensures this runs before any requests are handled.
 */
// Server initialization - runs immediately when this module is imported
console.log("🚀 Server initialization starting...");
console.log("\uD83D\uDCC5 Server start time: " + new Date().toISOString());
console.log("\uD83D\uDD27 Environment: " + (process.env.NODE_ENV || 'development'));
console.log("\uD83C\uDD94 Process ID: " + process.pid);
try {
    // Initialize cron jobs immediately
    analytics_cleaner_cron_server_1.cronJobs();
    console.log("✅ Server initialization completed successfully");
}
catch (error) {
    console.error("❌ Server initialization failed:", error);
}
