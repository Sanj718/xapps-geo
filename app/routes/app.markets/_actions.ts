import { ActionFunctionArgs } from "@remix-run/node";
import { runMarketsSync, setMarketsAutoRedirect } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { MarketsProcess } from "app/components/markets-sync/index.server";
import { createUpdateMarketConfigs, getMarketSyncStatus, updateMarketsRedirect, updateMarketsWidget } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.run_MarketsSync) {
        const response = await runMarketsSync({ admin, data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_MarketsConfigs) {
        const response = await createUpdateMarketConfigs({ shop: session.shop, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.get_MarketsSyncStatus) {
        const response = await getMarketSyncStatus({ shop: session.shop });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_MarketsWidget) {
        const response = await updateMarketsWidget({ shop: session.shop, widget: data.widget });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_MarketsRedirect) {
        const response = await updateMarketsRedirect({ shop: session.shop, autoRedirect: data.autoRedirect });
        const response2 = await setMarketsAutoRedirect({ admin, appId: data.appId, value: data.autoRedirect });
        return { _action, ...response, ...response2 };
    }


    return {};

}
