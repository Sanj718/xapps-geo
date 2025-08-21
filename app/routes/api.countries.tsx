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
    // Read the countries.json file
    const filePath = `${resolve()}/public_assets/countries.json`;
    const countriesData = readFileSync(filePath, "utf8");
    
    // Parse the JSON to validate it's valid (optional validation)
    // JSON.parse(countriesData);
    
    // Return the countries data as a JSON response
    return new Response(countriesData, {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error reading countries.json:", error);
    
    return new Response(
      JSON.stringify({ 
        status: false, 
        error: "Failed to load countries data",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
};