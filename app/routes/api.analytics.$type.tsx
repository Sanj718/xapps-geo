import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getAnalyticsData } from "../db-queries.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    
    if (!shop) {
      return json({ error: "Shop parameter is required" }, { status: 400 });
    }

    // Add timeout for analytics requests
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), 10000); // 10 second timeout
    });

    const analyticsPromise = getAnalyticsData({ shop });
    
    const result = await Promise.race([analyticsPromise, timeoutPromise]);
    
    if (!result.status) {
      return json({ error: result.error || "Failed to fetch analytics" }, { status: 500 });
    }

    // Limit response size
    const responseData = {
      status: "success",
      data: result.data,
      timestamp: new Date().toISOString()
    };

    return json(responseData, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 minute cache
        "Content-Type": "application/json"
      }
    });
    
  } catch (error) {
    console.error("Analytics API error:", error);
    
    if (error instanceof Error && error.message === "Request timeout") {
      return json({ error: "Request timeout - please try again" }, { status: 408 });
    }
    
    return json({ 
      error: "Internal server error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
