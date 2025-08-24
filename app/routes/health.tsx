import type { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Quick database connectivity check
    await prisma.$queryRaw`SELECT 1`;
    
    return new Response(JSON.stringify({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      uptime: process.uptime()
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      },
    });
  }
}
