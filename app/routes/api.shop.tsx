import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getShopdb } from "../db-queries.server";
import type { DBResponse } from "../components/_types";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    
    if (!shop) {
      return json({ error: "Shop parameter is required" }, { status: 400 });
    }

    // Add timeout for shop requests
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), 8000); // 8 second timeout
    });

    const shopPromise = getShopdb({ shop });
    
    const result = await Promise.race([shopPromise, timeoutPromise]) as DBResponse;
    
    if (!result.status) {
      return json({ error: result.error || "Failed to fetch shop data" }, { status: 500 });
    }

    return json({
      status: "success",
      data: result.data,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        "Cache-Control": "public, max-age=600", // 10 minute cache
        "Content-Type": "application/json"
      }
    });
    
  } catch (error) {
    console.error("Shop API error:", error);
    
    if (error instanceof Error && error.message === "Request timeout") {
      return json({ error: "Request timeout - please try again" }, { status: 408 });
    }
    
    return json({ 
      error: "Internal server error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}