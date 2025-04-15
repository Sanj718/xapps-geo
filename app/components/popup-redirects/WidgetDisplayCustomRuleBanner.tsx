import { Banner } from "@shopify/polaris";

export default function WidgetDisplayCustomRuleBanner() {
    return (
        <Banner tone="warning">
            Activating this feature will disable all settings under{" "}
            <strong>"Popup display settings"</strong> except the{" "}
            <strong>"Display frequency"</strong> option, as custom code will
            take over.
        </Banner>
    );
}