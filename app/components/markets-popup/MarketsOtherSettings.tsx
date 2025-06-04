import {
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Icon,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import React, { useContext, useState } from "react";
import { getEmbedConst, planParser } from "../_helpers";
// import tr from "../../helpers/translations.json";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  MK_EMBED_APP_HANDLE,
} from "../env";
import ExternalSettingsItem from "../_common/ExternalSettingsItem";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, MK_EMBED_APP_HANDLE) || {};

export default function MarketsOtherSettings() {
  const embedPath = `shopify://admin/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`;

  const settingsItems = [
    {
      label: "Preview mode",
      text: "You can activate the Preview mode to view your current popup in the Theme Customizer. This mode bypasses all GEO location rules, allowing you to see the popup as it appears.",
      url: embedPath,
    },
    {
      label: "Emergency disable Popup",
      text: "Instantly deactivate the popup across your site in case of an urgent need, ensuring uninterrupted user experience.",
      url: embedPath,
    },
    {
      label: "Custom Link/Button Icon",
      text: `Prepend custom icons to your links when the display rules are configured to "Manual," adding a personalized touch to your design.`,
      url: embedPath,
    },
  ];

  return (
    <>
      <InlineGrid columns={{ xs: "1fr", md: "auto  70%" }} gap="400">
        <Box
          as="section"
          paddingInlineStart={{ xs: "400", sm: "0" }}
          paddingInlineEnd={{ xs: "400", sm: "0" }}
        >
          <div style={{ paddingLeft: "1rem" }}>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Other settings
              </Text>
              <Text as="p" variant="bodyMd">
                Easily preview your popup in the Theme Customizer, bypass GEO
                location rules, quickly disable the popup in emergencies, and
                add custom icons to links when using manual display rules for a
                personalized touch.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <InlineGrid gap="200">
          <Card roundedAbove="sm">
            <BlockStack gap="600">
              {settingsItems.map(({ label, text, url }, index) => (
                <ExternalSettingsItem
                  key={index}
                  label={label}
                  text={text}
                  url={url}
                />
              ))}
            </BlockStack>
          </Card>
        </InlineGrid>
      </InlineGrid>
    </>
  );
}
