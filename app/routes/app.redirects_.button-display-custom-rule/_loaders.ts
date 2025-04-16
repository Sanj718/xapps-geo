import { LoaderFunctionArgs } from "@remix-run/node";
import { getButtonEditorCode, getButtonEditorStatus } from "app/admin-queries.server";
import { authenticate } from "app/shopify.server";
import { AdminApiContextWithRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";

export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const buttonEditorStatus = getButtonEditorStatus({ admin: admin as AdminApiContextWithRest });
    const buttonEditorCode = getButtonEditorCode({ admin: admin as AdminApiContextWithRest });
    return { buttonEditorStatus, buttonEditorCode };
}