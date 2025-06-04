import type { ActionFunctionArgs } from "@remix-run/node";
import { verifyWebhookRequest } from "app/components/_helpers";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verify = await verifyWebhookRequest(request);
  if (!!verify) {
    return new Response("Success", {
      status: 200,
    });
  }
  return new Response("Unauthorized", {
    status: 401,
  });
};
