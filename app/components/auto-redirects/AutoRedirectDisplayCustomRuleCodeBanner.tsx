import { List, Text, Banner, BlockStack, Collapsible, Scrollable } from "@shopify/polaris";

/*
  Auto redirection custom code is for adding/editing your custom logic for existing auto-redirects. This will not work on its own, you have to add at least one redirection rule.
  @property {string} redirectUrl - Redirect url added in app admin.
  @property {string} currentUrl - Current client visited page url added.
  @property {object} geolocation - Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.
  @property {function} forceRedirect - Force redirect by ingoring any other redirection rules. Accepts one argument type {string}. Example: forceRedirect("https://your-url.com")
  @return {string} - Modified string of url to be redirected. If empty string user will be redirected based on app admin logic.
*/
export default function AutoRedirectDisplayCustomRuleCodeBanner() {
    return (
        <Banner hideIcon >
            <BlockStack gap="200">
                <Text as="p" variant="bodyMd">
                    Auto redirection custom code is for adding/editing your custom logic for auto-redirects. This will not work on its own, you have to add at least one redirection rule (without block).
                </Text>
                <List type="bullet" gap="loose">
                    <List.Item><code>{`@property {string} `}<strong>redirectUrl</strong></code> - {`Redirect url added in app admin.`}</List.Item>
                    <List.Item><code>{`@property {string} `}<strong>currentUrl</strong></code> - {`Current client visited page url added.`}</List.Item>
                    <List.Item><code>{`@property {object} `}<strong>geolocation</strong></code> - {`Geolocation data of user, example: `}<code>{`{"country_name":"Canada","country":"CA","continent":"NA"}`}</code></List.Item>
                    <List.Item><code>{`@property {function} `}<strong>forceRedirect</strong></code> - {`Force redirect by ingoring any other redirection rules. Accepts one argument type {string}. Example: forceRedirect("https://your-url.com")`}</List.Item>
                    <List.Item><code>{`@return {string} `}<strong>Modified string of url to be redirected.</strong></code> - {`If empty string user will be redirected based on app admin logic.`}</List.Item>
                </List>
            </BlockStack>
        </Banner>
    )
}