import { Banner } from "@shopify/polaris";

export default function AutoRedirectDisplayCustomRuleBanner() {
    return (
        <Banner tone="warning">
            Please ensure to <strong>add at least one auto redirect</strong>{" "}
            item before implementing any custom auto-redirect code.
        </Banner>
    );
}