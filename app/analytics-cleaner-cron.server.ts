import cron from "node-cron";
import pkg from "pg";
import Cursor from "pg-cursor";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
import { sendExportToEmail } from "./components/_helpers.server";
dotenv.config({ path: "../.env" });

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const pool = new Pool({ connectionString });
pool.on("error", function (err) {
  console.error("Database pool error:", err.message);
  console.error("Error stack:", err.stack);
});

export async function runCleaner() {
  const DAYS = 20;
  const currentTime = Date.now();
  const cutoffTime = currentTime - (DAYS * 24 * 60 * 60 * 1000);
  
  console.log(`🧹 Starting analytics cleanup with ${DAYS}-day retention`);
  console.log(`📅 Current time: ${new Date(currentTime).toISOString()}`);
  console.log(`📅 Cutoff time: ${new Date(cutoffTime).toISOString()}`);
  console.log(`⏰ Cutoff timestamp: ${cutoffTime}`);
  
  try {
    const pool_client = await pool.connect();
    
    try {
      const sql = `SELECT * FROM analytics;`;
      const cursor = pool_client.query(new Cursor(sql));
      
      cursor.read(100, (err, rows) => {
        if (err) {
          console.error("Cursor read error:", err);
          return;
        }
        
        rows?.forEach(async (row) => {
          try {
            const {
              shop,
              data_button,
              data_auto,
              data_markets_button,
              data_markets_auto,
            } = row;
            console.log("SHOP: ", shop);
            let updatedDataButton = data_button ? data_button.split(",") : [];
            let updatedDataAuto = data_auto ? data_auto.split(",") : [];
            let updatedDataMarketsButton = data_markets_button ? data_markets_button.split(",") : [];
            let updatedDataMarketsAuto = data_markets_auto ? data_markets_auto.split(",") : [];

            // Process data_button - keep only events within 20 days from today
            if (shop && data_button) {
              let parsedDataButton = data_button.split(",").map(Number).sort((a: number, b: number) => a - b);
              if (parsedDataButton.length) {
                updatedDataButton = [];
                for (let index = 0; index < parsedDataButton.length; index++) {
                  const current = parsedDataButton[index];
                  // Check if this timestamp is within 20 days from today
                  if (current >= cutoffTime) {
                    updatedDataButton.push(current.toString());
                  }
                }
              }
            }

            // Process data_auto - keep only events within 20 days from today
            if (shop && data_auto) {
              let parsedDataAuto = data_auto.split(",").map(Number).sort((a: number, b: number) => a - b);
              if (parsedDataAuto.length) {
                updatedDataAuto = [];
                for (let index = 0; index < parsedDataAuto.length; index++) {
                  const current = parsedDataAuto[index];
                  // Check if this timestamp is within 20 days from today
                  if (current >= cutoffTime) {
                    updatedDataAuto.push(current.toString());
                  }
                }
              }
            }

            // Process data_markets_button - keep only events within 20 days from today
            if (shop && data_markets_button) {
              let parsedDataButton = data_markets_button
                .split(",")
                .map(Number)
                .sort((a: number, b: number) => a - b);
              if (parsedDataButton.length) {
                updatedDataMarketsButton = [];
                for (let index = 0; index < parsedDataButton.length; index++) {
                  const current = parsedDataButton[index];
                  // Check if this timestamp is within 20 days from today
                  if (current >= cutoffTime) {
                    updatedDataMarketsButton.push(current.toString());
                  }
                }
              }
            }

            // Process data_markets_auto - keep only events within 20 days from today
            if (shop && data_markets_auto) {
              let parsedDataAuto = data_markets_auto
                .split(",")
                .map(Number)
                .sort((a: number, b: number) => a - b);
              if (parsedDataAuto.length) {
                updatedDataMarketsAuto = [];
                for (let index = 0; index < parsedDataAuto.length; index++) {
                  const current = parsedDataAuto[index];
                  // Check if this timestamp is within 20 days from today
                  if (current >= cutoffTime) {
                    updatedDataMarketsAuto.push(current.toString());
                  }
                }
              }
            }

            const updateSql = `UPDATE analytics SET  data_button='${updatedDataButton.join(
              ","
            )}', data_auto='${updatedDataAuto.join(
              ","
            )}', data_markets_auto='${updatedDataMarketsAuto.join(
              ","
            )}', data_markets_button='${updatedDataMarketsButton.join(
              ","
            )}' WHERE shop='${shop}'`;
            const { rows, rowCount } = await pool.query(updateSql);
            // console.log(rowCount);
          } catch (rowError) {
            console.error("Error processing row:", rowError, { shop: row.shop });
          }
        });

        cursor.close(() => {
          pool_client.release();
        });
      });
    } catch (cursorError) {
      pool_client.release();
      throw cursorError;
    }
  } catch (error) {
    console.error("Error in runCleaner:", error);
    throw error;
  }
  
  return;
}
async function saveAnalyticsToDatabase() {
  try {
    // Use process.cwd() to get the current working directory (project root)
    const rootPath = process.cwd();
    const analyticsFolderPath = path.join(rootPath, "analytics");

    // Check if analytics folder exists
    if (!fs.existsSync(analyticsFolderPath)) {
      fs.mkdirSync(analyticsFolderPath);
    }

    // Get all subfolders in analytics folder
    const subfolders = fs
      .readdirSync(analyticsFolderPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    
    let errors = [];
    let success = [];
    
    for (const storeName of subfolders) {
      try {
        const storeFolderPath = path.join(analyticsFolderPath, storeName);
        const buttonFilePath = path.join(storeFolderPath, "button.json");
        const autoFilePath = path.join(storeFolderPath, "auto.json");
        const marketsButtonFilePath = path.join(
          storeFolderPath,
          "markets_button.json"
        );
        const marketsAutoFilePath = path.join(storeFolderPath, "markets_auto.json");

        if (fs.existsSync(buttonFilePath)) {
          try {
            const buttonFileClonePath = path.join(
              storeFolderPath,
              `button-cloned.json`
            );
            fs.renameSync(buttonFilePath, buttonFileClonePath);
            const data = JSON.parse(fs.readFileSync(buttonFileClonePath, 'utf8'));
            const response = await analyticsTracker(storeName, "button", data);
            if (response && response?.length && response[0]?.shop === storeName) {
              fs.unlinkSync(buttonFileClonePath);
              success.push({ type: "button", store: storeName });
            } else {
              console.error("Error removing Button analytics file");
              errors.push({ type: "button", store: storeName });
            }
          } catch (error) {
            console.error("Analytics button error:", error);
            errors.push({ type: "button", store: storeName, error: (error as Error).message });
          }
        }

        if (fs.existsSync(autoFilePath)) {
          try {
            const autoFileClonePath = path.join(
              storeFolderPath,
              `auto-cloned.json`
            );
            fs.renameSync(autoFilePath, autoFileClonePath);
            const data = JSON.parse(fs.readFileSync(autoFileClonePath, 'utf8'));
            const response = await analyticsTracker(storeName, "auto", data);
            if (response && response?.length && response[0]?.shop === storeName) {
              fs.unlinkSync(autoFileClonePath);
              success.push({ type: "auto", store: storeName });
            } else {
              console.error("Error removing Button analytics file");
              errors.push({ type: "auto", store: storeName });
            }
          } catch (error) {
            console.error("Analytics auto error:", error);
            errors.push({ type: "auto", store: storeName, error: (error as Error).message });
          }
        }

        if (fs.existsSync(marketsButtonFilePath)) {
          try {
            const marketsFileClonePath = path.join(
              storeFolderPath,
              `markets_button-cloned.json`
            );
            fs.renameSync(marketsButtonFilePath, marketsFileClonePath);
            const data = JSON.parse(fs.readFileSync(marketsFileClonePath, 'utf8'));
            const response = await analyticsTracker(
              storeName,
              "markets_button",
              data
            );

            if (response && response?.length && response[0]?.shop === storeName) {
              fs.unlinkSync(marketsFileClonePath);
              success.push({ type: "markets_button", store: storeName });
            } else {
              console.error("Error removing Markets button analytics file");
              errors.push({ type: "markets_button", store: storeName });
            }
          } catch (error) {
            console.error("Analytics markets error:", error);
            errors.push({ type: "markets_button", store: storeName, error: (error as Error).message });
          }
        }

        if (fs.existsSync(marketsAutoFilePath)) {
          try {
            const marketsFileClonePath = path.join(
              storeFolderPath,
              `markets_auto-cloned.json`
            );
            fs.renameSync(marketsAutoFilePath, marketsFileClonePath);
            const data = JSON.parse(fs.readFileSync(marketsFileClonePath, 'utf8'));
            const response = await analyticsTracker(
              storeName,
              "markets_auto",
              data
            );

            if (response && response?.length && response[0]?.shop === storeName) {
              fs.unlinkSync(marketsFileClonePath);
              success.push({ type: "markets_auto", store: storeName });
            } else {
              console.error("Error removing Markets auto analytics file");
              errors.push({ type: "markets_auto", store: storeName });
            }
          } catch (error) {
            console.error("Analytics markets error:", error);
            errors.push({ type: "markets_auto", store: storeName, error: (error as Error).message });
          }
        }
      } catch (storeError) {
        console.error(`Error processing store ${storeName}:`, storeError);
        errors.push({ type: "store", store: storeName, error: (storeError as Error).message });
      }
    }
    
    if (errors?.length) {
      console.log("Analytics processing completed with errors:", { success, errors });
      try {
        await sendExportToEmail("Analytics error", { success, errors });
      } catch (emailError) {
        console.error("Failed to send error notification email:", emailError);
      }
    } else {
      console.log("Analytics processing completed successfully:", { success });
    }
    
  } catch (error) {
    console.error("Error in saveAnalyticsToDatabase:", error);
    throw error;
  }
}

// HELPERS
const analyticsTracker = async (shop: string, type: string, dateNow: string) => {
  let dataType = "";
  if (type === "button") {
    dataType =
      "data_auto = analytics.data_auto, data_markets_button = analytics.data_markets_button, data_markets_auto = analytics.data_markets_auto, data_button = analytics.data_button";
  } else if (type === "auto") {
    dataType =
      "data_markets_button = analytics.data_markets_button, data_markets_auto = analytics.data_markets_auto, data_button = analytics.data_button, data_auto = analytics.data_auto";
  } else if (type === "markets_button") {
    dataType =
      "data_button = analytics.data_button, data_auto = analytics.data_auto, data_markets_auto = analytics.data_markets_auto, data_markets_button = analytics.data_markets_button";
  } else if (type === "markets_auto") {
    dataType =
      "data_button = analytics.data_button, data_auto = analytics.data_auto, data_markets_button = analytics.data_markets_button, data_markets_auto = analytics.data_markets_auto";
  }

  try {
    const sql = `INSERT INTO analytics(shop, data_button, data_markets_auto, data_markets_button, data_auto)
    VALUES ('${shop}', '${dateNow}', '${dateNow}', '${dateNow}', '${dateNow}') 
    ON CONFLICT (shop) 
    DO 
      UPDATE SET ${dataType} || ',' || '${dateNow}' RETURNING shop;`;

    const { rows, rowCount } = await pool.query(sql);
    // console.log(rows);
    return rowCount ? rows : null;
  } catch (error) {
    console.error("Analytics tracker error:", error, { shop, type, dateNow });
    return false;
  }
};

// saveAnalyticsToDatabase();
// Singleton pattern to prevent multiple cron job instances
let cronJobsInitialized = false;
let cronJobInstances: any[] = [];

// Enhanced cron job scheduler with error handling and singleton pattern
export function cronJobs() {
  // Prevent multiple initializations
  if (cronJobsInitialized) {
    console.log(`⚠️ Cron jobs already initialized (PID: ${process.pid}), skipping...`);
    return;
  }

  console.log(`🚀 Initializing cron jobs (PID: ${process.pid})...`);
  console.log(`📊 Process uptime: ${process.uptime()}s`);
  console.log(`🔧 Node version: ${process.version}`);
  
  // Weekly analytics cleaner - Sundays at midnight
  const weeklyCleaner = cron.schedule("0 0 * * 0", async () => {
    try {
      console.log(`🕛 Running weekly analytics cleaner (PID: ${process.pid})...`);
      await runCleaner();
      console.log(`✅ Weekly analytics cleaner completed (PID: ${process.pid})`);
    } catch (error) {
      console.error(`❌ Weekly analytics cleaner failed (PID: ${process.pid}):`, error);
    }
  });

  // Analytics processor - every 30 minutes
  const analyticsProcessor = cron.schedule("*/3 * * * *", async () => {
    try {
      console.log(`🕐 Running analytics processor (PID: ${process.pid})...`);
      await saveAnalyticsToDatabase();
      console.log(`✅ Analytics processor completed (PID: ${process.pid})`);
    } catch (error) {
      console.error(`❌ Analytics processor failed (PID: ${process.pid}):`, error);
    }
  });

  // Store references to stop them if needed
  cronJobInstances.push(weeklyCleaner, analyticsProcessor);
  
  // Mark as initialized
  cronJobsInitialized = true;
  
  console.log(`✅ Cron jobs initialized successfully (PID: ${process.pid})`);
  console.log(`   - Weekly cleaner: Sundays at midnight`);
  console.log(`   - Analytics processor: Every 30 minutes`);
  console.log(`   - Total cron jobs: ${cronJobInstances.length}`);
}

// Function to stop all cron jobs (useful for testing or cleanup)
export function stopCronJobs() {
  if (!cronJobsInitialized) {
    console.log(`⚠️ No cron jobs to stop (PID: ${process.pid})`);
    return;
  }

  console.log(`🛑 Stopping all cron jobs (PID: ${process.pid})...`);
  cronJobInstances.forEach((job, index) => {
    try {
      job.stop();
      console.log(`   - Stopped cron job ${index + 1}`);
    } catch (error) {
      console.error(`   - Error stopping cron job ${index + 1}:`, error);
    }
  });
  cronJobInstances = [];
  cronJobsInitialized = false;
  console.log(`✅ All cron jobs stopped (PID: ${process.pid})`);
}

// Cleanup on process exit
process.on('SIGINT', () => {
  console.log(`🔄 Received SIGINT (PID: ${process.pid}), cleaning up cron jobs...`);
  stopCronJobs();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`🔄 Received SIGTERM (PID: ${process.pid}), cleaning up cron jobs...`);
  stopCronJobs();
  process.exit(0);
});

// Debug: Log when this module is loaded
console.log(`📦 Analytics cleaner cron module loaded (PID: ${process.pid})`);
