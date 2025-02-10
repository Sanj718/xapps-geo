import React from "react";
import { Button, InlineGrid, InlineStack, Link, Text } from "@shopify/polaris";
import { ExternalIcon } from "@shopify/polaris-icons";

export default function ExternalSettingsItem({
  label,
  text,
  action,
  link = "",
}) {
  return (
    <div className="settings-item">
      <InlineStack align="space-between" blockAlign="center" wrap={false}>
        <InlineGrid gap="100">
          <Text as="h3" variant="headingXs">
            {label}
          </Text>
          <div style={{ maxWidth: "90%" }}>
            <Text as="p" variant="bodyXs">
              {text} {link !== "" && <Link target="_blank" url={link}>Read more</Link>}
            </Text>
          </div>
        </InlineGrid>

        <div>
          <Button variant="tertiary" icon={ExternalIcon} onClick={action}>
            Edit
          </Button>
        </div>
      </InlineStack>
    </div>
  );
}
