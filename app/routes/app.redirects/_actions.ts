import { ActionFunctionArgs } from "@remix-run/node";
import { createAutoRedirect, deleteAutoRedirect, reOrderAutoRedirects, saveButtonEditorCodeToMetafield, saveButtonEditorStatusToMetafield, saveWidgetEditorCodeToMetafield, saveWidgetEditorStatusToMetafield, updateAutoRedirect } from "app/admin-queries.server";
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

    if (_action === ACTIONS.CreateRedirect) {
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

    if (_action === ACTIONS.CreateAutoRedirect) {
        const response = await createAutoRedirect({ admin, appId: data.appId, value: data.data });
        console.log("response", response);
        return { _action, ...response };
    }

    if (_action === ACTIONS.UpdateAutoRedirect) {
        console.log("data", data);
        const response = await updateAutoRedirect({ admin, appId: data.appId, key: data.key, value: data.value });
        return { _action, ...response };
    }

    if (_action === ACTIONS.ReOrderAutoRedirects) {
        const response = await reOrderAutoRedirects({ admin, appId: data.appId, data: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.DeleteAutoRedirect) {
        const response = await deleteAutoRedirect({ admin, appId: data.appId, key: data.key });
        return { _action, ...response };
    }

    return {};

}
