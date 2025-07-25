import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { getWidgetEditorCode, getWidgetEditorStatus } from "app/admin-queries.server";
import { getAllRedirects, getConfigs, getMarketConfigs, getMarketsData } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const marketsData = await getMarketsData({ shop: session.shop });
    const marketsConfigs = await getMarketConfigs({ shop: session.shop });

    return { marketsData, marketsConfigs };
}