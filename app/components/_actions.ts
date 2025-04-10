import { resp } from "./_helpers";
import type { AdminApiContext } from "@shopify/shopify-app-remix/server";

interface GetAssetsParams {
  admin: AdminApiContext;
  data: {
    cursor?: string;
    isPrev?: boolean;
  };
}


export const ACTIONS = {
  AnalyticsData: "analyticsData",
  AssetsData: "assetsData",
  AddRedirect: "addRedirect",
  DeleteRedirect: "deleteRedirect",
  UpdateRedirect: "updateRedirect",
  ToggleRedirectStatus: "toggleRedirectStatus",
  ReorderRedirect: "reorderRedirect",
  CreateUpdateConfigs: "createUpdateConfigs",
  CreateAllowedPages: "createAllowedPages",
  WidgetDisplayCustomRuleStatus: "widgetDisplayCustomRuleStatus",
  WidgetDisplayCustomRuleCodeSave: "widgetDisplayCustomRuleCodeSave",
}

export const getAssets = async ({ admin, data }: GetAssetsParams) => {
  if (!admin) return resp(false, null, "admin not defined");
  try {
    const { cursor, isPrev } = data || {};
    const constructQuery = (isPrev?: boolean) => `#graphql
    query GetAssets($cursor: String) {
        files(${isPrev ? "last" : "first"}: 10, ${isPrev ? "before" : "after"}: $cursor, reverse: true, query: "media_type:image") {
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
            edges {
                node {
                    createdAt
                    alt
                    ... on MediaImage {
                        id
                        image {
                            id
                            originalSrc: url
                            width
                            height
                        }
                    }
                }
            }
        }
    }`;

    // Select the appropriate query
    const query = constructQuery(isPrev);

    const response = await admin.graphql(query, {
      variables: {
        cursor,
      },
    });

    const responseJson = await response.json();

    return resp(true, responseJson?.data?.files, null);
  } catch (e) {
    return resp(false, null, e as string);
  }
};
