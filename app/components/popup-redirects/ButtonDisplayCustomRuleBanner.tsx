import { Banner } from "@shopify/polaris";

export default function WidgetDisplayCustomRuleBanner() {
    return (
        <Banner tone="warning">
           Activating this feature will disable redirect item{" "}
              <strong>"Enable conditional show"</strong> checkbox, as custom
              code will take over.
        </Banner>
    );
}