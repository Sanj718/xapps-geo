import stripJsonComments from "strip-json-comments";
import { authenticate } from "app/shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getThemeEmbed } from "app/admin-queries.server";


export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const themeCode = await getThemeEmbed({ admin });
    const themeEmbedData =
        themeCode && JSON.parse(stripJsonComments(themeCode) || "{}");

    return {
        themeCode,
        themeEmbedData,
    };
}
