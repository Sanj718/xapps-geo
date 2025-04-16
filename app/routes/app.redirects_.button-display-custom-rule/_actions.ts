import { ActionFunctionArgs } from "@remix-run/node";
import { saveButtonEditorCodeToMetafield, saveButtonEditorStatusToMetafield } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.ButtonDisplayCustomRuleStatus) {
        const response = await saveButtonEditorStatusToMetafield({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.ButtonDisplayCustomRuleCodeSave) {
        const response = await saveButtonEditorCodeToMetafield({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    return {};

}
