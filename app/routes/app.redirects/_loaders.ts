import { LoaderFunctionArgs } from "@remix-run/node";
import { getAllRedirects, getConfigs } from "app/db-queries.server";
import { authenticate } from "app/shopify.server";

export async function handleLoaders({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const allRedirects = await getAllRedirects({ shop: session.shop });
    const configs = await getConfigs({ shop: session.shop });
    return { allRedirects, configs };

}