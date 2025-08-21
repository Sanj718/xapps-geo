import stripJsonComments from "strip-json-comments";
import { authenticate } from "app/shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getThemeEmbed } from "app/admin-queries.server";
import { AdminApiContextWithRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import { jsonSafeParse } from "app/components/_helpers";


export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const themeCode = await getThemeEmbed({ admin: admin as AdminApiContextWithRest });
    const themeEmbedData =
        themeCode && jsonSafeParse(stripJsonComments(themeCode) || "{}");

    return {
        themeCode,
        themeEmbedData,
    };
}
