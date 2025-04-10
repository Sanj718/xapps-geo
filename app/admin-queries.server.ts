import { AdminApiContext } from "@shopify/shopify-app-remix/server";


export async function getThemeEmbed({ admin }: { admin: AdminApiContext }) {
    if (!admin) return new Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
            query {
                themes(first: 1, roles: [MAIN]) {
                    nodes {
                        id
                        files(
                        filenames: ["config/settings_data.json"]
                        first: 1
                        ) {
                        nodes {
                            body {
                            ... on OnlineStoreThemeFileBodyText {
                                content
                            } 
                            }
                        }
                        }
                    }
                }
            }`,
        );

        const responseJson = await response.json();
        return responseJson?.data?.themes?.nodes[0]?.files?.nodes[0]?.body?.content;
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function saveWidgetEditorStatusToMetafield({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: boolean }) {
    if (!admin) throw Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    metafields {
                        key
                        namespace
                        value
                        createdAt
                        updatedAt
                    }
                    userErrors {
                        field
                        message
                        code
                    }
                }
            }
            `,
            {
                variables: {
                    metafields: [
                        {
                            key: "widget_code_status",
                            namespace: "widget_settings",
                            ownerId: appId,
                            type: "boolean",
                            value,
                        }
                    ]
                }
            }
        );
        const responseJson = await response.json();
        if (responseJson?.data?.metafieldsSet?.userErrors?.length > 0) {
            throw Error(responseJson?.data?.metafieldsSet?.userErrors[0]?.message);
        }
        return responseJson?.data?.metafieldsSet?.metafields[0];
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function saveWidgetEditorCodeToMetafield({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: string }) {
    if (!admin) throw Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    metafields {
                        key
                        namespace
                        value
                        createdAt
                        updatedAt
                    }
                    userErrors {
                        field
                        message
                        code
                    }
                }
            }
            `,
            {
                variables: {
                    metafields: [
                        {
                            key: "widget_show_code",
                            namespace: "widget_settings",
                            ownerId: appId,
                            type: "multi_line_text_field",
                            value,
                        }
                    ]
                }
            }
        );
        const responseJson = await response.json();
        if (responseJson?.data?.metafieldsSet?.userErrors?.length > 0) {
            throw Error(responseJson?.data?.metafieldsSet?.userErrors[0]?.message);
        }
        return responseJson?.data?.metafieldsSet?.metafields[0];
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function getWidgetEditorStatus({ admin }: { admin: AdminApiContext }) {
    if (!admin) throw Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
            query getMetafields($namespace: String!, $key: String!) {
                appInstallation {
                id
                metafield(namespace: $namespace, key: $key) {
                    id
                    namespace
                    key
                    value
                }
                allSubscriptions(first: 10){
                    edges{
                    node{
                        id
                        createdAt
                        name
                        status
                    }
                    }
                }
                }
            }
            `,
            {
                variables: {
                    namespace: "widget_settings",
                    key: "widget_code_status",
                }
            }
        );
        const responseJson = await response.json();
        return responseJson?.data?.appInstallation?.metafield;
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function getWidgetEditorCode({ admin }: { admin: AdminApiContext }) {
    if (!admin) throw Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
            query getMetafields($namespace: String!, $key: String!) {
                appInstallation {
                id
                metafield(namespace: $namespace, key: $key) {
                    id
                    namespace
                    key
                    value
                }
                allSubscriptions(first: 10){
                    edges{
                    node{
                        id
                        createdAt
                        name
                        status
                    }
                    }
                }
                }
            }
            `,
            {
                variables: {
                    namespace: "widget_settings",
                    key: "widget_show_code",
                }
            }
        );
        const responseJson = await response.json();
        return responseJson?.data?.appInstallation?.metafield;
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}