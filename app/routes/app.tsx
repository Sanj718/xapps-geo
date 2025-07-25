import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate, useRouteError, useViewTransitionState } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
// import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { authenticate } from "../shopify.server";
import { useMemo, useState } from "react";
import { getApp, getShop } from "../components/_loaders";
import { getAllRegisteredWebhooks, registerBulkWebhookIfNotExists, removeWebhook } from "app/admin-queries.server";
import "@shopify/polaris/build/esm/styles.css";
import "../assets/custom.scss";
import { handleSideNavClick } from "app/components/_helpers";

// export const links = () => [{ rel: "stylesheet", href: polarisStyles }];
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getShopdb } = await import("../db-queries.server");
  const { admin, session } = await authenticate.admin(request);
  const appData = await getApp(admin);
  const shopInfo = await getShop(admin);
  const shopdb = await getShopdb({ shop: session.shop });
  registerBulkWebhookIfNotExists({ admin });

  // removeWebhook({ admin, webhookId: "gid://shopify/WebhookSubscription/1366407479484" });
  const webhooks = await getAllRegisteredWebhooks({ admin });
  console.log("webhooks: ", JSON.stringify(webhooks, null, 2));

  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    appData,
    shopInfo,
    shopdb: shopdb?.status ? { ...shopdb.data } : {},
  };
};

interface Plan {
  name: string;
}

interface SubscriptionPlan extends Plan {
  status?: string;
  id?: string;
}

interface ShopDB {
  id: number;
  shop: string;
  plan: number;
  dev: boolean;
  shopifyPlanId: string | null;
  veteran: boolean;
}

export default function App() {
  const { apiKey, appData, shopInfo, shopdb } = useLoaderData<typeof loader>();
  const [appId, setAppId] = useState();
  const [activePlan, setActivePlan] = useState<Plan>();
  const [devPlan, setDevPlan] = useState(false);
  const [veteranPlan, setVeteranPlan] = useState(false);

  useMemo(() => {
    const activePlan = appData?.installation?.activeSubscriptions?.find(
      (item: { status: string }) => item.status === "ACTIVE",
    );
    const appid = appData?.installation?.id;
    setAppId(appid);
    if (shopdb) {
      setPlan(activePlan, shopdb);
    }
  }, [shopdb, appData]);

  async function setPlan(activePlan: SubscriptionPlan, shopdb: ShopDB) {
    const { veteran, dev, plan, shopifyPlanId } = shopdb || {};

    if (activePlan) {
      const selectedPlan = dev ? { name: "Pro plan" } : activePlan;
      setActivePlan(selectedPlan);

      const isMatchingPlan = (planName: string, planValue: number) =>
        activePlan?.status === "ACTIVE" &&
        activePlan?.name === planName &&
        plan === planValue;

      const isProPlan = isMatchingPlan("Pro plan", 2);
      const isBasicPlan = isMatchingPlan("Basic plan", 1);

      if (!dev) {
        const needsAdjustment =
          shopifyPlanId !== activePlan?.id ||
          (activePlan?.status === "ACTIVE" && !(isProPlan || isBasicPlan));

        if (needsAdjustment) {
          // adjustClientPlan(activePlan, veteran);
        }
      }
    } else {
      if (!dev && !veteran && plan !== 3) {
        // console.log("**", veteran);
        // adjustClientPlan(false, veteran);
      }
    }

    if (dev) {
      setActivePlan({ name: "Pro plan" });
    } else if (veteran) {
      setActivePlan({ name: "Basic plan" });
    }

    setVeteranPlan(veteran ? true : false);
    setDevPlan(dev ? true : false);
  }


  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link rel="home" to="/app" viewTransition onClick={() => handleSideNavClick()}>Home</Link>
        <Link to="/app/redirects" viewTransition onClick={() => handleSideNavClick()}>Custom redirects</Link>
        <Link to="/app/markets" viewTransition onClick={() => handleSideNavClick()}>Markets redirects</Link>
        <Link to="/app/plans" viewTransition onClick={() => handleSideNavClick()}>Plans</Link>
      </NavMenu>
      <Outlet
        context={{
          shopInfo,
          shopdb,
          activePlan,
          devPlan,
          veteranPlan,
          appId,
          appData,
        }}
      />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
