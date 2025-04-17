import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { getAllAutoRedirects, getButtonEditorCode, getButtonEditorStatus, getWidgetEditorCode, getWidgetEditorStatus } from "app/admin-queries.server";
import { getAllRedirects, getConfigs } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";
import { AdminApiContextWithRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";

export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const widgetEditorStatus = getWidgetEditorStatus({ admin: admin as AdminApiContextWithRest });
    const widgetEditorCode = getWidgetEditorCode({ admin: admin as AdminApiContextWithRest });
    const buttonEditorStatus = getButtonEditorStatus({ admin: admin as AdminApiContextWithRest });
    const buttonEditorCode = getButtonEditorCode({ admin: admin as AdminApiContextWithRest });
    const allAutoRedirects = await getAllAutoRedirects({ admin: admin as AdminApiContextWithRest });
    const allRedirects = await getAllRedirects({ shop: session.shop });
    const configs = await getConfigs({ shop: session.shop });
    return { allRedirects, configs, widgetEditorStatus, widgetEditorCode, buttonEditorStatus, buttonEditorCode, allAutoRedirects };
}