import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import React from "react";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  MK_EMBED_APP_HANDLE,
} from "../env";
import ExternalSettingsItem from "../_common/ExternalSettingsItem";
import { getEmbedConst } from "../_helpers";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, MK_EMBED_APP_HANDLE) || {};

export default function MarketsAutoSettings() {
  const embedPath = `shopify://admin/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`;

  const settingsItems = [
    {
      label: "Emergency disable auto redirect",
      text: "Instantly turn off Markets auto redirect, disabling any Market redirection code on your site.",
      url: embedPath,
    },
    {
      label: "Auto redirect once",
      text: "Store visitors will be automatically redirected only once per visit (session/cookies based)",
      url: embedPath,
    },
    {
      label: "Disable auto redirects for Web crawlers",
      text: "Control redirects for search engine bots, allowing you to enable or disable redirection for web crawlers.",
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
              <InlineStack align="space-between">
                <Text as="h3" variant="headingMd">
                  Settings
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd">
                Manage market redirections with options to instantly disable
                them, limit to one per session, or configure settings for search
                engine bots.
              </Text>
            </BlockStack>
          </div>
        </Box>
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
    </>
  );
}
