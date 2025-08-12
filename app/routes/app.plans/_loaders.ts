import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { getAllAutoRedirects, getAutoRedirectsCustomCode, getAutoRedirectsCustomCodeStatus, getButtonEditorCode, getButtonEditorStatus, getWidgetEditorCode, getWidgetEditorStatus } from "app/admin-queries.server";
import { getAllRedirects, getConfigs, getMarketConfigs, getMarketsData, getMarketSyncStatus } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";
import { AdminApiContextWithRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";

export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const marketsData = await getMarketsData({ shop: session.shop });
    const marketsConfigs = await getMarketConfigs({ shop: session.shop });

    return { marketsData, marketsConfigs };
}