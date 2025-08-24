import type { LoaderFunctionArgs } from "@remix-run/node";
import { getPublicMarketsData } from "../db-queries.server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (!shop || shop === "") {
    return new Response(
      JSON.stringify({ status: false, error: "SHOP_NOT_FOUND", data: null }),
      {
        status: 405,
        headers: CORS_HEADERS,
      }
    );
  }

  let status = 200;
  let error: string | null = null;
  let data = null;
  
  try {
    // Add timeout protection to prevent H27 errors
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), 10000); // 10 second timeout for markets data
    });

    const dataPromise = getPublicMarketsData({ shop });
    
    const response = await Promise.race([dataPromise, timeoutPromise]);
    
    if (!response?.status) {
      throw new Error("Query Error");
    }
    data = response.data;
  } catch (err: any) {
    status = 500;
    error = err.message || String(err);
    
    // Handle timeout specifically
    if (err.message === "Request timeout") {
      status = 408; // Request Timeout
      error = "Request timeout - please try again";
    }
  }

  return new Response(
    JSON.stringify({ status: status === 200, error, data }),
    {
      status,
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=900", // 15 minute cache for markets data
        "X-Response-Time": new Date().toISOString(),
      },
    }
  );
};