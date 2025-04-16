import { ActionFunctionArgs } from "@remix-run/node";
import { saveButtonEditorCodeToMetafield, saveButtonEditorStatusToMetafield, saveWidgetEditorCodeToMetafield, saveWidgetEditorStatusToMetafield } from "app/admin-queries.server";
import { ACTIONS, getAssets } from "app/components/_actions";
import { createRedirect, deleteRedirect, updateRedirect, updateRedirectStatus, reorderRedirect, createUpdateConfigs, createUpdateAllowedPages } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};

    if (_action === ACTIONS.AssetsData) {
        const response = await getAssets({ admin, data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.ToggleRedirectStatus) {
        const response = await updateRedirectStatus({ admin, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.ReorderRedirect) {
        const response = await reorderRedirect({ admin, ...data, shop: session.shop });
        return { _action, ...response };
    }

    if (_action === ACTIONS.AddRedirect) {
        const response = await createRedirect({ admin, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.DeleteRedirect) {
        const response = await deleteRedirect({ admin, ...data, shop: session.shop });
        return { _action, ...response };
    }

    if (_action === ACTIONS.UpdateRedirect) {
        const response = await updateRedirect({ admin, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.CreateUpdateConfigs) {
        const response = await createUpdateConfigs({ shop: session.shop, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.CreateAllowedPages) {
        const response = await createUpdateAllowedPages({ shop: session.shop, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.WidgetDisplayCustomRuleStatus) {
        const response = await saveWidgetEditorStatusToMetafield({ admin, appId: data.appId, value: data.data });
        console.log("response", response);
        return { _action, ...response };
    }

    if (_action === ACTIONS.WidgetDisplayCustomRuleCodeSave) {
        const response = await saveWidgetEditorCodeToMetafield({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.ButtonDisplayCustomRuleStatus) {
        const response = await saveButtonEditorStatusToMetafield({ admin, appId: data.appId, value: data.data });
        console.log("response", response);
        return { _action, ...response };
    }

    if (_action === ACTIONS.ButtonDisplayCustomRuleCodeSave) {
        const response = await saveButtonEditorCodeToMetafield({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    return {};

}
