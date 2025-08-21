import type { LoaderFunctionArgs } from "@remix-run/node";
import { createFolderAndSaveDate } from "app/components/analytics-tracker";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

// Allowed analytics types
const ALLOWED_ANALYTICS_TYPES = [
  "markets-auto",
  "markets-button", 
  "buttons",
  "auto"
] as const;

type AnalyticsType = typeof ALLOWED_ANALYTICS_TYPES[number];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // Handle CORS preflight request
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  // Check for Postman token (security measure)
  const postmanToken = request.headers.get("postman-token");
  if (postmanToken) {
    return new Response("NOT ALLOWED", {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const type = params.type; // This will be "markets-button", "markets-auto", "buttons", or "auto"
  
  if (!shop || shop === "") {
    console.log("SHOP NOT FOUND", shop);
    return new Response(
      JSON.stringify({ 
        status: false, 
        error: "SHOP_NOT_FOUND", 
        data: null 
      }),
      {
        status: 405,
        headers: CORS_HEADERS,
      }
    );
  }

  if (!type) {
    return new Response(
      JSON.stringify({ 
        status: false, 
        error: "TYPE_NOT_FOUND", 
        data: null 
      }),
      {
        status: 400,
        headers: CORS_HEADERS,
      }
    );
  }

  // Validate that the type is allowed
  if (!ALLOWED_ANALYTICS_TYPES.includes(type as AnalyticsType)) {
    return new Response(
      JSON.stringify({ 
        status: false, 
        error: "INVALID_TYPE", 
        message: `Analytics type '${type}' is not allowed. Allowed types: ${ALLOWED_ANALYTICS_TYPES.join(", ")}`,
        data: null 
      }),
      {
        status: 400,
        headers: CORS_HEADERS,
      }
    );
  }

  let status = 200;
  let error: string | null = null;
  let data = null;

  try {
    // Convert URL-friendly names to analytics types
    const analyticsType = type.replace(/-/g, '_');
    createFolderAndSaveDate(shop, analyticsType);
  } catch (err: any) {
    console.error(`ANALYTICS_${type.toUpperCase()}: `, err.message);
    status = 500;
    error = err.message || String(err);
  }

  return new Response(
    JSON.stringify({ 
      status: status === 200, 
      error, 
      data 
    }),
    {
      status,
      headers: CORS_HEADERS,
    }
  );
};
