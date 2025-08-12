import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { getThemeEmbed } from "app/admin-queries.server";
import { getAllRedirects, getConfigs, getMarketConfigs, getMarketsData, getMarketSyncStatus } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";
import { AdminApiContextWithRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import stripJsonComments from "strip-json-comments";

export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const themeCode = await getThemeEmbed({ admin });
    const themeEmbedData =
        themeCode && JSON.parse(stripJsonComments(themeCode) || "{}");
    const marketsData = await getMarketsData({ shop: session.shop });
    const marketsConfigs = await getMarketConfigs({ shop: session.shop });

    return { marketsData, marketsConfigs, themeEmbedData };
}