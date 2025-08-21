import { ActionFunctionArgs } from "@remix-run/node";
import { updateWidgetEditorCode, updateWidgetEditorStatus } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { authenticate } from "app/shopify.server";
import { AdminApiContextWithRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.update_WidgetDisplayCustomRuleStatus) {
        const response = await updateWidgetEditorStatus({ admin: admin as AdminApiContextWithRest, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_WidgetDisplayCustomRuleCode) {
        const response = await updateWidgetEditorCode({ admin: admin as AdminApiContextWithRest, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    return {};

}
