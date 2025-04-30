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
  Link,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import React, { useState } from "react";
import { QuestionCircleIcon } from "@shopify/polaris-icons";
import ExternalSettingsItem from "../_common/ExternalSettingsItem";
import PromoBadge from "../_common/PromoBadge";
import { default_basic_configs, getEmbedConst, loadingStates, planParser, requestHeaders } from "../_helpers";
import { useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext } from "../_types";
import { DEV_EMBED_APP_ID, PROD_EMBED_APP_ID, RD_EMBED_APP_HANDLE } from "../env";
import { ACTIONS } from "../_actions";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, RD_EMBED_APP_HANDLE) || {};

interface OtherSettingsProps {
  configs: any;
}


export default function OtherSettings({
  configs,
}: OtherSettingsProps) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isFreePlan } = planParser(activePlan);
  const { basicConfigs, advancedConfigs, hideOnAllowedPages, allowedPages } = configs?.data[0] || {}
  const [localConfigs, setLocalConfigs] = useState({ ...default_basic_configs, ...basicConfigs, });
  const submit = useSubmit()
  const navigation = useNavigation();

  const settingsItems = [
    {
      label: "Preview mode",
      text: "You can activate the Preview mode to view your current popup in the Theme Customizer. This mode bypasses all GEO location rules, allowing you to see the popup as it appears.",
      url: `shopify://admin/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`
    },
    {
      label: "Emergency disable Popup",
      text: "Instantly deactivate the popup across your site in case of an urgent need, ensuring uninterrupted user experience.",
      url: `shopify://admin/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`
    },
    {
      label: "Custom Link/Button Icon",
      text: `Prepend custom icons to your links when the display rules are configured to "Manual," adding a personalized touch to your design.`,
      url: `shopify://admin/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`,
      link: "https://geolocationredirects-xapps.tawk.help/article/how-to-add-custom-buttonlink-to-open-popup",
    },
  ];

  async function saveOtherConfigs() {
    submit(
      {
        _action: ACTIONS.create_UpdateConfigs,
        data: {
          basicConfigs: localConfigs,
          advancedConfigs: advancedConfigs,
        },
      },
      requestHeaders,
    );
  }
  
  const loading = loadingStates(navigation, [ACTIONS.create_UpdateConfigs]) as LoadingStates;
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
                Select or add the pages where you would like the popup to be
                displayed or hidden.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <InlineGrid gap="200">
          <Card roundedAbove="sm">
            <InlineGrid gap="200">
              <PromoBadge type="basic" />
              <TextField
                label="SEO Link rel attribute"
                helpText={
                  <Text as="p" variant="bodyXs">
                    For certain links on your site, you might want to tell
                    Google your relationship with the linked page.{" "}
                    <Link
                      target="_blank"
                      url="https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links"
                    >
                      Read more
                    </Link>
                  </Text>
                }
                autoComplete="false"
                value={localConfigs?.custom_rell_attr}
                disabled={isFreePlan}
                onChange={
                  !isFreePlan
                    ? (value) =>
                      setLocalConfigs((current: typeof localConfigs) => ({
                        ...current,
                        custom_rell_attr: value,
                      }))
                    : undefined
                }
              />
              <Divider />
              <InlineStack gap="1200">
                <Checkbox
                  disabled={isFreePlan}
                  label={
                    <InlineStack gap="100" blockAlign="center">
                      Forward URL Query params
                      <Tooltip
                        width="wide"
                        content={
                          <small>
                            Retains current URL parameters when redirecting to
                            another page.
                          </small>
                        }
                      >
                        <Icon source={QuestionCircleIcon} tone="subdued" />
                      </Tooltip>
                    </InlineStack>
                  }
                  checked={localConfigs?.forward_url_params}
                  onChange={
                    !isFreePlan
                      ? (value) =>
                        setLocalConfigs((current: typeof localConfigs) => ({
                          ...current,
                          forward_url_params: value,
                        }))
                      : undefined
                  }
                />

                <Checkbox
                  disabled={isFreePlan}
                  label={
                    <InlineStack gap="100" blockAlign="center">
                      Global domain redirection
                      <Tooltip
                        width="wide"
                        content={
                          <small>
                            Keeps you on the same page when switching to a new
                            domain. For example, if you're on{" "}
                            <code>site.com/about</code>, you'll be redirected to{" "}
                            <code>new-site.com/about</code> without losing your
                            path.{" "}
                            <strong>Applied to all redirect buttons.</strong>
                          </small>
                        }
                      >
                        <Icon source={QuestionCircleIcon} tone="subdued" />
                      </Tooltip>
                    </InlineStack>
                  }
                  checked={localConfigs?.domain_redirection}
                  onChange={
                    !isFreePlan
                      ? (value) =>
                        setLocalConfigs((current: typeof localConfigs) => ({
                          ...current,
                          domain_redirection: value,
                        }))
                      : undefined
                  }
                /></InlineStack>
            </InlineGrid>
            <InlineStack align="end">
              <Button
                variant="primary"
                onClick={!isFreePlan ? saveOtherConfigs : undefined}
                loading={loading[ACTIONS.create_UpdateConfigs + "Loading"]}
                disabled={isFreePlan}
              >
                Save
              </Button>
            </InlineStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="600">
              {settingsItems.map(
                ({ label, text, link, url }, index) => (
                  <ExternalSettingsItem
                    key={index}
                    label={label}
                    text={text}
                    url={url}
                    link={link}
                  />
                )
              )}
            </BlockStack>
          </Card>
        </InlineGrid>
      </InlineGrid>
    </>
  );
}
