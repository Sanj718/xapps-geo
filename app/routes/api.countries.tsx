import type { LoaderFunctionArgs } from "@remix-run/node";
import { readFileSync } from "fs";
import { resolve } from "path";

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

  try {
    // Add timeout protection to prevent H27 errors
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), 3000); // 3 second timeout for file read
    });

    const fileReadPromise = (async (): Promise<string> => {
      // Read the countries.json file
      const filePath = `${resolve()}/public_assets/countries.json`;
      const countriesData = readFileSync(filePath, "utf8");
      
      // Parse the JSON to validate it's valid (optional validation)
      // JSON.parse(countriesData);
      
      return countriesData;
    })();
    
    const countriesData = await Promise.race([fileReadPromise, timeoutPromise]) as string;
    
    // Return the countries data as a JSON response
    return new Response(countriesData, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=3600", // 1 hour cache for countries data
        "X-Response-Time": new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error reading countries.json:", error);
    
    let status = 500;
    let errorMessage = "Failed to load countries data";
    
    // Handle timeout specifically
    if (error instanceof Error && error.message === "Request timeout") {
      status = 408; // Request Timeout
      errorMessage = "Request timeout - please try again";
    }
    
    return new Response(
      JSON.stringify({ 
        status: false, 
        error: errorMessage,
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status,
        headers: CORS_HEADERS,
      }
    );
  }
};