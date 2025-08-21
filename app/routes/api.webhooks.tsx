import { ActionFunctionArgs } from '@remix-run/node';
import { authenticate } from '../shopify.server';
import { MarketsProcess } from 'app/components/markets-sync/index.server';
import { cancelPlan, changePlan, removeShop } from 'app/db-queries.server';
import db from "../db.server";
import { sendExportToEmail } from 'app/components/_helpers.server';

export const action = async ({ request }: ActionFunctionArgs) => {
    const { topic, shop, session, payload, admin } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    switch (topic) {
        case 'APP_UNINSTALLED':
            if (session) {
                await db.session.deleteMany({ where: { shop } });
                removeShop({ shop });
            }
            break;
        case 'CUSTOMERS_DATA_REQUEST':
        case 'CUSTOMERS_REDACT':
        case 'SHOP_REDACT':
        case 'APP_SUBSCRIPTIONS_UPDATE':
            console.log("[INFO] App subscriptions update webhook", session, payload);
            const {
                status, admin_graphql_api_id, created_at, name
            } = payload?.app_subscription;

            sendExportToEmail("Subscription info: ", { name, shop, status });

            if (status === "ACTIVE") {
                const plan = name === "Basic plan" ? 1 : name === "Pro plan" ? 2 : 3;
                await changePlan({
                    shop,
                    plan,
                    shopifyPlanId: admin_graphql_api_id,
                });
            } else if (status === "EXPIRED") {
                console.log("Subscription expired: ", shop, payload);
            } else {
                await cancelPlan({
                    shop,
                    cancelShopifyPlanId: admin_graphql_api_id,
                });
            }
            break;
        case "BULK_OPERATIONS_FINISH":
            if (session && shop) {
                const initMarketsProcess = new MarketsProcess();
                await initMarketsProcess.initSync({ admin: admin as any, session, bulkId: payload?.admin_graphql_api_id });
            }
            break;
        case "APP_SCOPES_UPDATE":
            const current = payload.current as string[];
            if (session) {
                await db.session.update({
                    where: {
                        id: session.id
                    },
                    data: {
                        scope: current.toString(),
                    },
                });
            }
            break;
        default:
            throw new Response('Unhandled webhook topic', { status: 404 });
    }

    throw new Response();
};