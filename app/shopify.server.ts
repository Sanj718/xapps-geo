import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
  RELEASE_CANDIDATE_API_VERSION,
  DeliveryMethod
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { addActiveShop, createInitialConfigs } from "./db-queries.server";
import { default_basic_configs } from "./components/_helpers";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: RELEASE_CANDIDATE_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  webhooks: {
    //[TODO] Add all webhooks here
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks",
    },
    BULK_OPERATIONS_FINISH: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      console.log("[INFO] After auth", session);
      shopify.registerWebhooks({ session });
    
      addActiveShop({ shop: session.shop });
      await createInitialConfigs({
        shop: session.shop,
        basicConfigs: JSON.stringify(default_basic_configs),
      });
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.January25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
