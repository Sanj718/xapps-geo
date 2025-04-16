import { ActionFunctionArgs } from "@remix-run/node";
import { saveWidgetEditorCodeToMetafield, saveWidgetEditorStatusToMetafield } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.WidgetDisplayCustomRuleStatus) {
        const response = await saveWidgetEditorStatusToMetafield({ admin, appId: data.appId, value: data.data });
        console.log("response", response);
        return { _action, ...response };
    }

    if (_action === ACTIONS.WidgetDisplayCustomRuleCodeSave) {
        const response = await saveWidgetEditorCodeToMetafield({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    return {};

}
