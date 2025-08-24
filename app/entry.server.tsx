import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import {
  createReadableStreamFromReadable,
  type EntryContext,
} from "@remix-run/node";
import { isbot } from "isbot";
import { addDocumentResponseHeaders } from "./shopify.server";

// Reduced timeout for faster response
export const streamTimeout = 3000;

// Maximum response size to prevent H27 errors
const MAX_RESPONSE_SIZE = 1024 * 1024; // 1MB

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  addDocumentResponseHeaders(request, responseHeaders);
  
  // Add response size and timeout headers
  responseHeaders.set("X-Response-Timeout", `${streamTimeout}ms`);
  responseHeaders.set("X-Max-Response-Size", `${MAX_RESPONSE_SIZE} bytes`);
  
  const userAgent = request.headers.get("user-agent");
  const callbackName = isbot(userAgent ?? '')
    ? "onAllReady"
    : "onShellReady";

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
      />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");
          
          // Add compression headers
          responseHeaders.set("Content-Encoding", "gzip");
          
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );
          pipe(body);
        },
        onShellError(error) {
          console.error("Shell error:", error);
          reject(error);
        },
        onError(error) {
          console.error("Render error:", error);
          responseStatusCode = 500;
        },
      }
    );

    // Reduced timeout for faster startup
    setTimeout(abort, streamTimeout);
  });
}
