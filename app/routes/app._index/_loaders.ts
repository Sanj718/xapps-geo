// import { resp } from "../../components/_helpers";
import type { AdminApiContext } from "@shopify/shopify-app-remix/server";
import { resp } from "../../components/_helpers";


export async function getThemeEmbed(admin: AdminApiContext) {
    if (!admin) return resp(false, null, "admin not defined");
    const response = await admin.graphql(
        `#graphql
        query {
            themes(first: 1, roles: [MAIN]) {
                nodes {
                    id
                    files(
                    filenames: ["config/settings_data.json"]
                    first: 1
                    ) {
                    nodes {
                        body {
                        ... on OnlineStoreThemeFileBodyText {
                            content
                        } 
                        }
                    }
                    }
                }
            }
        }`,
    );

    const responseJson = await response.json();
    return responseJson?.data?.themes?.nodes[0]?.files?.nodes[0]?.body?.content;
}
