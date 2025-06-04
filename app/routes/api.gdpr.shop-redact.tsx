import type { ActionFunctionArgs } from "@remix-run/node";
import { verifyWebhookRequest } from "app/components/_helpers";
import { removeShop } from "app/db-queries.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verify = await verifyWebhookRequest(request);
  if (!!verify) {
    const shop = request.headers.get("x-shopify-shop-domain");
    if (shop) {
      removeShop({ shop });
    }
    return new Response("Success", {
      status: 200,
    });
  }
  return new Response("Unauthorized", {
    status: 401,
  });
};
