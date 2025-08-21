import { resp } from "./_helpers";
import type { AdminApiContext } from "@shopify/shopify-app-remix/server";

export async function getApp({ admin }: { admin: AdminApiContext }) {
  if (!admin) return resp(false, null, "admin || id not defined");
  const response = await admin.graphql(
    `#graphql
           {
            app {
              id
              apiKey
              title
              installation{
                id
                activeSubscriptions{
                  id
                  name
                  trialDays
                  status
                  createdAt
                }
              }
            }
          }
      `,
    {},
  );

  const responseJson = await response.json();
  return responseJson?.data?.app;
}

export async function getShop({ admin }: { admin: AdminApiContext }) {
  if (!admin) return resp(false, null, "admin || id not defined");
  const response = await admin.graphql(
    `#graphql
          {
            shop {
              # id
            #   contactEmail
              email
              # countriesInShippingZones {
              #   countryCodes
              #   includeRestOfWorld
              # }
              myshopifyDomain
              # shipsToCountries
              # url
              name
              plan {
                displayName
                partnerDevelopment
                shopifyPlus
              }
              currencyCode
              timezoneAbbreviation
              ianaTimezone
            }
            shopLocales {
              locale
              primary
              published
            }
          }
      `,
    {},
  );

  const responseJson = await response.json();
  return responseJson?.data;
}

export async function getThemeEmbed({ admin }: { admin: AdminApiContext }) {
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
