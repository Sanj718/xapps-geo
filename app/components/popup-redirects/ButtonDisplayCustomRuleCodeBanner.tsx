import { List } from "@shopify/polaris";
import { Banner } from "@shopify/polaris";

// @property {object} geolocation - Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.
// @property {object} redirectButton - Data of redirect button, example: {"flag":"https://....", "label": "Canada", order_r: 1, url: "https://...."}
// @return {boolean} - return false to hide button.

export default function WidgetDisplayCustomRuleCodeBanner() {
    return (
        <Banner hideIcon>
            <List type="bullet" gap="loose">
                <List.Item><code>{`@property {object} `}<strong>geolocation</strong></code> - {`Geolocation data of user, example: `}<code>{`{"country_name":"Canada","country":"CA","continent":"NA"}`}</code></List.Item>
                <List.Item><code>{`@property {object} `}<strong>redirectButton</strong></code> - {`Data of redirect button, example: `}<code>{`{"flag":"https://....", "label": "Canada", order_r: 1, url: "https://...."}`}</code></List.Item>
                <List.Item><code>{`@return {boolean} `}<strong>return false to hide button</strong></code></List.Item>
            </List>
        </Banner>
    )
}