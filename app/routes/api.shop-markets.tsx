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
    const response = await getPublicMarketsData({ shop });
    if (!response?.status) {
      throw new Error("Query Error");
    }
    data = response.data;
  } catch (err: any) {
    status = 500;
    error = err.message || String(err);
  }

  return new Response(
    JSON.stringify({ status: status === 200, error, data }),
    {
      status,
      headers: CORS_HEADERS,
    }
  );
};