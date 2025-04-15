import { List } from "@shopify/polaris";
import { Banner } from "@shopify/polaris";


export default function WidgetDisplayCustomRuleCodeBanner() {
    return (
        <Banner hideIcon>
            <List type="bullet" gap="loose">
                <List.Item><code>{`@property {object} `}<strong>geolocation</strong></code> - {`Geolocation data of user, example: `}<code>{`{"country_name":"Canada","country":"CA","continent":"NA"}`}</code></List.Item>
                <List.Item><code>{`@property {function} `}<strong>openModal</strong></code> - {`Function to open modal.`}</List.Item>
                <List.Item><code>{`@property {boolean} `}<strong>hasBeenClosed</strong></code> - {`Modal closed state, saved in cookies/session (configured in Settings & style tab). Returns "1" (type string) if closed.`}</List.Item>
            </List>
        </Banner>
    )
}