import { ActionFunctionArgs } from "@remix-run/node";
import { updateAutoRedirectsCustomCode, updateAutoRedirectsCustomCodeStatus } from "app/admin-queries.server";
import { ACTIONS } from "app/components/_actions";
import { authenticate } from "app/shopify.server";

export async function handleActions({ request }: ActionFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { _action, data } = (await request?.json()) || {};


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
