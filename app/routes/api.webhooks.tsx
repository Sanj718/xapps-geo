import { ActionFunctionArgs } from '@remix-run/node';
// import db from '../db.server';
import { authenticate } from '../shopify.server';
import { MarketsProcess } from 'app/components/markets-sync/index.server';
import { getBackupRegion } from 'app/admin-queries.server';
// import { MarketsProcess } from 'app/components/markets-sync/index.server';

export const action = async ({ request }: ActionFunctionArgs) => {
    const { topic, shop, session, payload, admin } = await authenticate.webhook(request);
    console.log("[INFO] Webhook received", topic, shop);
    switch (topic) {
        // [TODO] add all webhooks here
        case 'APP_UNINSTALLED':
            // Webhook requests can trigger after an app is uninstalled
            // If the app is already uninstalled, the session may be undefined.
            if (session) {
                // await db.session.deleteMany({where: {shop}});
            }
            break;
        case 'CUSTOMERS_DATA_REQUEST':
        case 'CUSTOMERS_REDACT':
        case 'SHOP_REDACT':
        case "BULK_OPERATIONS_FINISH":
            if (session && shop) {
                console.log("[INFO] Bulk operation finished webhook", session, payload);
                const initMarketsProcess = new MarketsProcess();
                await initMarketsProcess.initSync({ admin, session, bulkId: payload?.admin_graphql_api_id });
            }
            break;
        default:
            throw new Response('Unhandled webhook topic', { status: 404 });
    }

    throw new Response();
};