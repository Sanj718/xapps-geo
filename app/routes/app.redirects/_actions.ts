import { ActionFunctionArgs } from "@remix-run/node";
import { createAutoRedirect, deleteAutoRedirect, reOrderAutoRedirects, updateButtonEditorCode, updateButtonEditorStatus, updateWidgetEditorCode, updateWidgetEditorStatus, updateAutoRedirect, updateAutoRedirectsCustomCodeStatus, updateAutoRedirectsCustomCode } from "app/admin-queries.server";
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

    if (_action === ACTIONS.toggle_RedirectStatus) {
        const response = await updateRedirectStatus({ admin, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.reorder_Redirect) {
        const response = await reorderRedirect({ admin, ...data, shop: session.shop });
        return { _action, ...response };
    }

    if (_action === ACTIONS.create_Redirect) {
        const response = await createRedirect({ admin, ...data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.delete_Redirect) {
        const response = await deleteRedirect({ admin, ...data, shop: session.shop });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_Redirect) {
        const response = await updateRedirect({ admin, ...data });
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

    if (_action === ACTIONS.update_ButtonDisplayCustomRuleStatus) {
        const response = await updateButtonEditorStatus({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_ButtonDisplayCustomRuleCode) {
        const response = await updateButtonEditorCode({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.create_AutoRedirect) {
        const response = await createAutoRedirect({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_AutoRedirect) {
        const response = await updateAutoRedirect({ admin, appId: data.appId, key: data.key, value: data.value });
        return { _action, ...response };
    }

    if (_action === ACTIONS.reorder_AutoRedirects) {
        const response = await reOrderAutoRedirects({ admin, appId: data.appId, data: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.delete_AutoRedirect) {
        const response = await deleteAutoRedirect({ admin, appId: data.appId, key: data.key });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_AutoRedirectsCustomCodeStatus) {
        const response = await updateAutoRedirectsCustomCodeStatus({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }

    if (_action === ACTIONS.update_AutoRedirectsCustomCode) {
        const response = await updateAutoRedirectsCustomCode({ admin, appId: data.appId, value: data.data });
        return { _action, ...response };
    }


    return {};

}
