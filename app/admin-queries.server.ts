import { AdminApiContext } from "@shopify/shopify-app-remix/server";
import uniqid from "uniqid";
import { jsonSafeParse } from "./components/_helpers";

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

export async function updateWidgetEditorStatus({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: boolean }) {
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

export async function updateWidgetEditorCode({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: string }) {
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

export async function updateButtonEditorStatus({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: boolean }) {
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
                            key: "buttons_code_status",
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

export async function updateButtonEditorCode({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: string }) {
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
                            key: "buttons_show_code",
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

export async function getButtonEditorStatus({ admin }: { admin: AdminApiContext }) {
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
                    key: "buttons_code_status",
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

export async function getButtonEditorCode({ admin }: { admin: AdminApiContext }) {
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
                    key: "buttons_show_code",
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

export async function createAutoRedirect({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: any }) {
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
                    metafields: [{
                        key: uniqid.time(),
                        namespace: "redirects",
                        ownerId: appId,
                        type: "json",
                        value: JSON.stringify(value),
                    }]
                }
            }
        );
        const responseJson = await response.json();
        if (responseJson?.data?.metafieldsSet?.userErrors?.length > 0) {
            throw Error(responseJson?.data?.metafieldsSet?.userErrors[0]?.message);
        }
        return { status: responseJson?.data?.metafieldsSet?.metafields[0]?.key !== "", data: responseJson?.data?.metafieldsSet?.metafields[0] };
    } catch (error) {
        console.error(error?.body?.errors?.graphQLErrors);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function getAllAutoRedirects({ admin }: { admin: AdminApiContext }) {
    if (!admin) throw Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
            query getMetafields($namespace: String!) {
                appInstallation {
                    id
                    metafields(namespace: $namespace, first: 100) {
                        edges {
                            node {
                                id
                                namespace
                                key
                                value
                            }
                        }
                    }
                }
            }
            `,
            {
                variables: {
                    namespace: "redirects"
                }
            }
        );
        const responseJson = await response.json();
        return { status: responseJson?.data?.appInstallation?.metafields?.edges?.length > 0, data: responseJson?.data?.appInstallation?.metafields?.edges };
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function updateAutoRedirect({ admin, appId, key, value }: { admin: AdminApiContext, appId: string, key: string, value: any }) {
    if (!admin) throw Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    metafields {
                        id
                        key
                        namespace
                        value       
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
                    metafields: [{ key, ownerId: appId, value: JSON.stringify(value), type: "json", namespace: "redirects" }]
                }
            }
        );
        const responseJson = await response.json();
        if (responseJson?.data?.metafieldsSet?.userErrors?.length > 0) {
            throw Error(responseJson?.data?.metafieldsSet?.userErrors[0]?.message);
        }
        return { status: responseJson?.data?.metafieldsSet?.metafields[0]?.key !== "", data: responseJson?.data?.metafieldsSet?.metafields[0] };
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function reOrderAutoRedirects({ admin, appId, data }: { admin: AdminApiContext, appId: string, data: any }) {
    if (!admin) throw Error("admin not defined");
    try {
        const metafields = data.map(({ node }: { node: any }) => {
            const { key, value } = node;
            return {
                namespace: "redirects",
                key,
                value,
                ownerId: appId,
                type: "json",
            };
        });
        const response = await admin.graphql(
            `#graphql
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    metafields {
                        key
                        namespace
                        value       
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
                    metafields
                }
            }
        );
        const responseJson = await response.json();
        if (responseJson?.data?.metafieldsSet?.userErrors?.length > 0) {
            throw Error(responseJson?.data?.metafieldsSet?.userErrors[0]?.message);
        }
        return { status: responseJson?.data?.metafieldsSet?.metafields?.length > 0, data: responseJson?.data?.metafieldsSet?.metafields };
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function deleteAutoRedirect({ admin, appId, key }: { admin: AdminApiContext, appId: string, key: string }) {
    if (!admin) throw Error("admin not defined");
    try {
        const response = await admin.graphql(
            `#graphql
                mutation MetafieldsDelete($metafields: [MetafieldIdentifierInput!]!) {
                    metafieldsDelete(metafields: $metafields) {
                        deletedMetafields {
                            key
                            namespace
                            ownerId
                        }
                        userErrors {
                            field
                            message
                        }
                    }
                }`,
            {
                variables: {
                    metafields: [
                        {
                            ownerId: appId,
                            namespace: "redirects",
                            key
                        }
                    ]
                }
            }
        );
        const responseJson = await response.json();
        if (responseJson?.data?.metafieldsDelete?.userErrors?.length > 0) {
            throw Error(responseJson?.data?.metafieldsDelete?.userErrors[0]?.message);
        }
        return { status: responseJson?.data?.metafieldsDelete?.deletedMetafields[0]?.key !== "", data: responseJson?.data?.metafieldsDelete?.deletedMetafields[0] };
    } catch (error) {
        console.error(error);
        return { status: false, error: (error as Error).toString() };
    }
}

export async function getAutoRedirectsCustomCodeStatus({ admin }: { admin: AdminApiContext }) {
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
                    namespace: "settings",
                    key: "custom_code_status",
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

export async function getAutoRedirectsCustomCode({ admin }: { admin: AdminApiContext }) {
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
                    namespace: "settings",
                    key: "custom_code",
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
export async function updateAutoRedirectsCustomCodeStatus({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: boolean }) {
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
                            key: "custom_code_status",
                            namespace: "settings",
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

export async function updateAutoRedirectsCustomCode({ admin, appId, value }: { admin: AdminApiContext, appId: string, value: string }) {
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
                            key: "custom_code",
                            namespace: "settings",
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