import { ActionFunctionArgs } from "@remix-run/node";
import { ACTIONS, getAssets } from "app/components/_actions";
import { createRedirect, deleteRedirect, updateRedirect, updateRedirectStatus, reorderRedirect } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.AssetsData) {
        const response = await getAssets({ admin, data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.AddRedirect) {
        const response = await createRedirect(data);
        return { _action, ...response };
    }

    if (_action === ACTIONS.DeleteRedirect) {
        const response = await deleteRedirect({ id: data.id, shop: session.shop });
        return { _action, ...response };
    }

    if (_action === ACTIONS.UpdateRedirect) {
        const response = await updateRedirect(data);
        return { _action, ...response };
    }

    if (_action === ACTIONS.ToggleRedirectStatus) {
        const response = await updateRedirectStatus(data);
        return { _action, ...response };
    }

    if (_action === ACTIONS.ReorderRedirect) {
        const response = await reorderRedirect(data);
        return { _action, ...response };
    }
    return {};

}
