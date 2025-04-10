
import { ActionFunctionArgs } from "@remix-run/node";
import { ACTIONS, getAssets } from "app/components/_actions";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { getAnalyticsData } = await import("../../db-queries.server");
    const { admin, session } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.AnalyticsData) {
        const response = await getAnalyticsData({ shop: session.shop });
        return { _action, ...response };
    }

    return {};

}