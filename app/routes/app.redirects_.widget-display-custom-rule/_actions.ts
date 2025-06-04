import { ActionFunctionArgs } from "@remix-run/node";
import { updateWidgetEditorCode, updateWidgetEditorStatus } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

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
