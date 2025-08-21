import { ActionFunctionArgs } from "@remix-run/node";
import { ACTIONS, getAssets } from "app/components/_actions";
import { createUpdateMarketConfigs } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.get_AssetsData) {
        const response = await getAssets({ admin: admin as any, data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_MarketsConfigs) {
        const response = await createUpdateMarketConfigs({ shop: session.shop, ...data });
        return { _action, ...response };
    }

    return {};

}
