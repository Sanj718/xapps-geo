import { ActionFunctionArgs } from "@remix-run/node";
import { ACTIONS, getAssets } from "app/components/_actions";
import { createRedirect, deleteRedirect, updateRedirect, updateRedirectStatus, reorderRedirect, createUpdateConfigs } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.AssetsData) {
        const response = await getAssets({ admin, data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.CreateUpdateConfigs) {
        console.log("action", data)
        const response = await createUpdateConfigs({ shop: session.shop, ...data });
        return { _action, ...response };
    }
    return {};

}
