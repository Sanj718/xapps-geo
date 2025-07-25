import { ActionFunctionArgs } from "@remix-run/node";
import { updateWidgetEditorStatus, updateWidgetEditorCode } from "app/admin-queries.server";
import { ACTIONS, getAssets } from "app/components/_actions";
import { createRedirect, deleteRedirect, updateRedirect, updateRedirectStatus, reorderRedirect, createUpdateConfigs, createUpdateAllowedPages } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.get_AssetsData) {
        const response = await getAssets({ admin, data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_RedirectsConfigs) {
        const response = await createUpdateConfigs({ shop: session.shop, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.create_AllowedPages) {
        const response = await createUpdateAllowedPages({ shop: session.shop, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_WidgetDisplayCustomRuleStatus) {
        const response = await updateWidgetEditorStatus({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_WidgetDisplayCustomRuleCode) {
        const response = await updateWidgetEditorCode({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    return {};

}
