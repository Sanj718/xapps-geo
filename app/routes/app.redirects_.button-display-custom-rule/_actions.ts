import { ActionFunctionArgs } from "@remix-run/node";
import { updateButtonEditorCode, updateButtonEditorStatus } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.update_ButtonDisplayCustomRuleStatus) {
        const response = await updateButtonEditorStatus({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_ButtonDisplayCustomRuleCode) {
        const response = await updateButtonEditorCode({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    return {};

}
