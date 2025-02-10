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
import { AppContext } from "../AppContext";
import { getEmbedConst, planParser } from "../../helpers";
import { QuestionCircleIcon } from "@shopify/polaris-icons";
import { CREATE_SHOP_CONFIGS } from "../../../helpers/endpoints";
import tr from "../../helpers/translations.json";
import { useAuthenticatedFetch } from "../../hooks";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../../env";
import ExternalSettingsItem from "../_common/ExternalSettingsItem";
import { PromoBadge } from "../PromoBadge";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, RD_EMBED_APP_HANDLE) || {};

export default function OtherSettings({
  originConfigs,
  originAdvancedConfigs,
  reFetch,
  configs,
  setConfigs,
  setToastData,
}) {
  const fetch = useAuthenticatedFetch();
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const { activePlan } = useContext(AppContext);
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [loading, setLoading] = useState(false);

  async function handleActivateEmbedRedirect() {
    redirect?.dispatch(Redirect.Action.ADMIN_PATH, {
      path: `/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`,
      newContext: true,
    });
  }

  const settingsItems = [
    {
      label: "Preview mode",
      text: "You can activate the Preview mode to view your current popup in the Theme Customizer. This mode bypasses all GEO location rules, allowing you to see the popup as it appears.",
      buttonAction: handleActivateEmbedRedirect,
    },
    {
      label: "Emergency disable Popup",
      text: "Instantly deactivate the popup across your site in case of an urgent need, ensuring uninterrupted user experience.",
      buttonAction: handleActivateEmbedRedirect,
    },
    {
      label: "Custom Link/Button Icon",
      text: `Prepend custom icons to your links when the display rules are configured to "Manual," adding a personalized touch to your design.`,
      buttonAction: handleActivateEmbedRedirect,
      link: "#",
    },
  ];

  async function saveOtherConfigs() {
    setLoading(true);
    let error = true;
    let msg = tr.responses.error;

    try {
      const response = await fetch(CREATE_SHOP_CONFIGS, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          basic_configs: {
            ...originConfigs,
            forward_url_params: configs?.forward_url_params,
            custom_rell_attr: configs?.custom_rell_attr,
            domain_redirection: configs?.domain_redirection,
          },
          advanced_configs: originAdvancedConfigs,
        }),
      });
      const responseJson = await response.json();

      if (responseJson?.status) {
        error = false;
        msg = tr.responses.settings_saved;
        reFetch((n) => !n);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    }

    setToastData({
      error,
      msg,
    });
    setLoading(false);
  }

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
                  <p>
                    For certain links on your site, you might want to tell
                    Google your relationship with the linked page.{" "}
                    <a
                      target="_blank"
                      href="https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links"
                    >
                      Read more
                    </a>
                  </p>
                }
                autoComplete="false"
                value={configs?.custom_rell_attr}
                disabled={isFreePlan}
                onChange={
                  !isFreePlan
                    ? (value) =>
                        setConfigs((current) => ({
                          ...current,
                          custom_rell_attr: value,
                        }))
                    : undefined
                }
              />
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
                checked={configs?.forward_url_params}
                onChange={
                  !isFreePlan
                    ? (value) =>
                        setConfigs((current) => ({
                          ...current,
                          forward_url_params: value,
                        }))
                    : undefined
                }
              />
              <Divider />
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
                checked={configs?.domain_redirection}
                onChange={
                  !isFreePlan
                    ? (value) =>
                        setConfigs((current) => ({
                          ...current,
                          domain_redirection: value,
                        }))
                    : undefined
                }
              />
            </InlineGrid>
            <InlineStack align="end">
              <Button
                tone="success"
                onClick={!isFreePlan ? saveOtherConfigs : undefined}
                loading={loading}
                disabled={isFreePlan}
              >
                Save
              </Button>
            </InlineStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="600">
              {settingsItems.map(
                ({ label, text, buttonAction, link }, index) => (
                  <ExternalSettingsItem
                    key={index}
                    label={label}
                    text={text}
                    action={buttonAction}
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
