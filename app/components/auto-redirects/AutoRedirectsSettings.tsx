import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { ExternalIcon } from "@shopify/polaris-icons";
import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../../env";
import ExternalSettingsItem from "../_common/ExternalSettingsItem";
import { getEmbedConst } from "../../helpers";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, RD_EMBED_APP_HANDLE) || {};

export default function AutoRedirectsSettings() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  async function handleActivateEmbedRedirect() {
    redirect?.dispatch(Redirect.Action.ADMIN_PATH, {
      path: `/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`,
      newContext: true,
    });
  }

  const settingsItems = [
    {
      label: "Emergency disable all auto redirects",
      text: "Instantly turn off all auto redirects, disabling any redirection code on your site.",
      buttonAction: handleActivateEmbedRedirect,
    },
    {
      label: "Auto redirect once",
      text: "Store visitors will be automatically redirected only once per visit (session/cookies based)",
      buttonAction: handleActivateEmbedRedirect,
    },
    {
      label: "Disable auto redirects for Web crawlers",
      text: "Control redirects for search engine bots, allowing you to enable or disable redirection for web crawlers.",
      buttonAction: handleActivateEmbedRedirect,
    },
    {
      label: "Disable URL param",
      text: `To prevent endless redirect loops from incorrect redirects, we've added a special URL parameter "?ngr-redirected=1". Disabling this feature is at your own risk.`,
      buttonAction: handleActivateEmbedRedirect,
    },
    {
      label: "Disable preload overlay",
      text: "A white overlay is added to your site while detecting the visitor's geolocation. You can enable or disable this feature here.",
      buttonAction: handleActivateEmbedRedirect,
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
                Manage auto redirects by disabling them entirely, limiting to
                one per session, or excluding web crawlers for optimized visitor
                and search engine navigation.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <Card roundedAbove="sm">
          <BlockStack gap="600">
            {settingsItems.map(({ label, text, buttonAction }, index) => (
              <ExternalSettingsItem
                key={index}
                label={label}
                text={text}
                action={buttonAction}
              />
            ))}
          </BlockStack>
        </Card>
      </InlineGrid>
    </>
  );
}