import { LoaderFunctionArgs } from "@remix-run/node";
import { getAutoRedirectsCustomCode, getAutoRedirectsCustomCodeStatus } from "app/admin-queries.server";
import { authenticate } from "app/shopify.server";
import { AdminApiContextWithRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";

export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const autoRedirectsCustomCodeStatus = getAutoRedirectsCustomCodeStatus({ admin: admin as AdminApiContextWithRest });
    const autoRedirectsCustomCode = getAutoRedirectsCustomCode({ admin: admin as AdminApiContextWithRest });
    return { autoRedirectsCustomCodeStatus, autoRedirectsCustomCode };
}