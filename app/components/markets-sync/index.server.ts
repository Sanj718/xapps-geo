import fs from "fs";
import got from "got";
import stream from "node:stream";
import { promisify } from "util";
import { resolve } from "path";
import { addMarketsData, updateMarketSyncStatus } from "app/db-queries.server";
import { isJson } from "../_helpers.js";
import { getBulkOperation } from "app/admin-queries.server.js";
import { AdminApiContext } from "@shopify/shopify-app-remix/server";
import LineByLineReader from "./lineReader.server";

export class MarketsProcess {
  private tempFolder: string;
  private lineReader: any;
  private result: Record<string, any>;

  constructor() {
    this.tempFolder = "marketsSync";
    this.lineReader = null;
    this.result = {};
  }

  async #removeOldFile(fileName: string) {
    try {
      if (fs.existsSync(fileName)) {
        console.log("Removing old csv: ", fileName);
        fs.unlinkSync(fileName);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async #processLine(lineData: string) {
    const result = this.result;
    const lineParsed = isJson(lineData) && JSON.parse(lineData);

    if (!lineParsed) {
      this.lineReader.pause();
      this.lineReader.resume();
    }

    const { __typename } = lineParsed;

    result[__typename] = result[__typename]
      ? [...result[__typename], lineParsed]
      : [lineParsed];
  }

  async initSync({ admin, session, bulkId }: { admin: AdminApiContext, session: any, bulkId: string }) {
    try {
      const bulkResponse = await getBulkOperation({ admin, bulkId });
      const { url, status, errorCode } = bulkResponse;
      // X-Shopify-API-Request-Failure-Reauthorize
      if (errorCode === "ACCESS_DENIED") {
        updateMarketSyncStatus({ shop: session.shop, syncStatus: "REAUTH" });
        return {
          status: false,
          restart: false,
          reAuth: true
        };
      }

      if (!url) {
        console.error("No URL provided in bulk response");
        updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
        return {
          status: false,
          restart: true,
        };
      }

      if (status === "RUNNING") {
        updateMarketSyncStatus({ shop: session.shop, syncStatus: "RUNNING" });
        return {
          status: false,
          restart: false,
        };
      }

      if (status !== "COMPLETED") {
        updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
        return {
          status: false,
          restart: true,
        };
      }

      if (!fs.existsSync("./" + this.tempFolder)) {
        fs.mkdirSync("./" + this.tempFolder);
      }

      updateMarketSyncStatus({ shop: session.shop, syncStatus: "RUNNING" });

      const fileName = `/${this.tempFolder}/${session.shop}.jsonl`;
      const pipeline = promisify(stream.pipeline);

      try {
        console.log('lineR0');
        await pipeline(
          got.stream(url),
          fs.createWriteStream(resolve() + fileName)
        );
        console.log('lineR1');
      } catch (error) {
        console.error("Error downloading file:", error);
        updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
        return {
          status: false,
          restart: true,
        };
      }

      await this.#removeOldFile(fileName);

      const lineR = new LineByLineReader(resolve() + fileName, {
        skipEmptyLines: true,
      });
      console.log('lineR');
      this.lineReader = lineR;
      const _self = this;

      lineR.on("line", (lineData: string) => {
        if (lineData) {
          _self.#processLine(lineData);
        }
      });

      lineR.on("error", (err: any) => {
        console.log("err", err);
        updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
      });

      lineR.on("end", async () => {
        // console.log("FINAL: ", _self.result);
        try {
          if (!_self.result)
            throw new Error(
              "[MARKETS SYNC] _self.result is empty or undefined"
            );
          console.log("[MARKETS SYNC] Markets Saved")
          addMarketsData({ shop: session.shop, markets: _self.result });
        } catch (error) {
          console.log(error);
          updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
        }
      });
    } catch (error) {
      console.log(error);
      updateMarketSyncStatus({ shop: session.shop, syncStatus: "ERROR" });
    }
  }
}
