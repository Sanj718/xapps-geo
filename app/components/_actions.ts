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
  get_AnalyticsData: "getAnalyticsData",
  get_AssetsData: "getAssetsData",
  create_Redirect: "create_Redirect",
  update_Redirect: "updateRedirect",
  delete_Redirect: "deleteRedirect",
  toggle_RedirectStatus: "toggleRedirectStatus",
  reorder_Redirect: "reorderRedirect",
  create_UpdateConfigs: "createUpdateConfigs",
  create_AllowedPages: "createAllowedPages",
  update_WidgetDisplayCustomRuleStatus: "updateWidgetDisplayCustomRuleStatus",
  update_WidgetDisplayCustomRuleCode: "updateWidgetDisplayCustomRuleCode",
  update_ButtonDisplayCustomRuleStatus: "updateButtonDisplayCustomRuleStatus",
  update_ButtonDisplayCustomRuleCode: "updateButtonDisplayCustomRuleCode",
  get_AutoRedirects: "getAutoRedirects",
  create_AutoRedirect: "createAutoRedirect",
  update_AutoRedirect: "updateAutoRedirect",
  delete_AutoRedirect: "deleteAutoRedirect",
  reorder_AutoRedirects: "reOrderAutoRedirects",
  update_AutoRedirectsCustomCode: "updateAutoRedirectsCustomCode",
  update_AutoRedirectsCustomCodeStatus: "updateAutoRedirectsCustomCodeStatus",
  run_MarketsSync: "runMarketsSync",
  get_MarketsSyncStatus: "getMarketsSyncStatus",
  update_MarketsConfigs: "updateMarketsConfigs",
  update_MarketsWidget: "updateMarketsWidget",
  update_MarketsRedirect: "updateMarketsRedirect",
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
