import { ActionFunctionArgs } from "@remix-run/node";
import { cancelSubscription, subscribeBasicPlan, subscribeProPlan } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { MarketsProcess } from "app/components/markets-sync/index.server";
import { createUpdateMarketConfigs, getMarketSyncStatus, updateMarketsRedirect, updateMarketsWidget } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin, session, redirect, billing } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};
    const { hasActivePayment } = await billing.check();

    if (_action === ACTIONS.cancel_Subscription) {
        const response = await cancelSubscription({ admin, shop: session.shop, id: data?.id });
        return { _action, ...response };
    }

    if (_action === ACTIONS.subscribe_BasicPlan) {
        const response = await subscribeBasicPlan({ admin, shop: session.shop });
        return { _action, ...response };
    }

    if (_action === ACTIONS.subscribe_ProPlan) {
        const response = await subscribeProPlan({ admin, shop: session.shop });
        return { _action, ...response };
    }

    return {};

}
