import cron from "node-cron";
import pkg from "pg";
import Cursor from "pg-cursor";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";
import { sendExportToEmail } from "./components/_helpers.server";
dotenv.config({ path: "../.env" });

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
pool.on("error", function (err) {
  console.log(err);
  // logger.info("idle client error", err.message, err.stack);
});

async function runCleaner() {
  const DAYS = 30;
  const pool_client = await pool.connect();
  const sql = `SELECT * FROM analytics;`;
  const cursor = pool_client.query(new Cursor(sql));
  cursor.read(100, (err, rows) => {
    rows?.forEach(async (row) => {
      const {
        shop,
        data_button,
        data_auto,
        data_markets_button,
        data_markets_auto,
      } = row;
      console.log("SHOP: ", shop);
      let updatedDataButton = data_button.split(",");
      let updatedDataAuto = data_auto.split(",");
      let updatedDataMarketsButton = data_markets_button.split(",");
      let updatedDataMarketsAuto = data_markets_auto.split(",");

      if (shop && data_button) {
        let parsedDataButton = data_button.split(",").sort((a, b) => a - b);
        const lastDate = parsedDataButton[parsedDataButton.length - 1];
        if (parsedDataButton.length) {
          updatedDataButton = [];
          for (let index = 0; index < parsedDataButton.length; index++) {
            const current = parsedDataButton[index];
            const diffTime = Math.abs(lastDate - current);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= DAYS) {
              updatedDataButton.push(current);
            }
          }
        }
      }

      if (shop && data_auto) {
        let parsedDataAuto = data_auto.split(",").sort((a, b) => a - b);
        const lastDate = parsedDataAuto[parsedDataAuto.length - 1];
        if (parsedDataAuto.length) {
          updatedDataAuto = [];
          for (let index = 0; index < parsedDataAuto.length; index++) {
            const current = parsedDataAuto[index];
            const diffTime = Math.abs(lastDate - current);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= DAYS) {
              updatedDataAuto.push(current);
            }
          }
        }
      }

      if (shop && data_markets_button) {
        let parsedDataButton = data_markets_button
          .split(",")
          .sort((a, b) => a - b);
        const lastDate = parsedDataButton[parsedDataButton.length - 1];
        if (parsedDataButton.length) {
          updatedDataMarketsButton = [];
          for (let index = 0; index < parsedDataButton.length; index++) {
            const current = parsedDataButton[index];
            const diffTime = Math.abs(lastDate - current);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= DAYS) {
              updatedDataMarketsButton.push(current);
            }
          }
        }
      }

      if (shop && data_markets_auto) {
        let parsedDataButton = data_markets_auto
          .split(",")
          .sort((a, b) => a - b);
        const lastDate = parsedDataButton[parsedDataButton.length - 1];
        if (parsedDataButton.length) {
          updatedDataMarketsAuto = [];
          for (let index = 0; index < parsedDataButton.length; index++) {
            const current = parsedDataButton[index];
            const diffTime = Math.abs(lastDate - current);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= DAYS) {
              updatedDataMarketsAuto.push(current);
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
    });

    cursor.close(() => {
      pool_client.release();
    });
  });
  return;
}
async function saveAnalyticsToDatabase() {
  const analyticsFolderPath = __dirname + "/analytics";

  // Check if analytics folder exists
  if (!fs.existsSync(analyticsFolderPath))
    throw new Error(`Folder not found: ${analyticsFolderPath}`);

  // Get all subfolders in analytics folder
  const subfolders = fs
    .readdirSync(analyticsFolderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  let errors = [];
  let success = [];
  for (const storeName of subfolders) {
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
        console.error("Analytics button error");
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
        console.error("Analytics auto error");
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
        console.error("Analytics markets error");
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
        console.error("Analytics markets error");
      }
    }
  }
  if (errors?.length) {
    sendExportToEmail("Analytics error", { success, errors });
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
    console.error(error);
    return false;
  }
};

// saveAnalyticsToDatabase();
export function cronJobs() {
  cron.schedule("0 0 * * 0", () => {
    runCleaner();
  });

  // "0 * * * *"
  // */30 * * * *
  // */5 * * * *
  // * * * * *
  cron.schedule("*/30 * * * *", () => {
    saveAnalyticsToDatabase();
  });
}
