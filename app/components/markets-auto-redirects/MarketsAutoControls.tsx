import {
  Badge,
  Banner,
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
import { planParser } from "../../helpers";
import {
  QuestionCircleIcon,
  CalendarTimeIcon,
  InfoIcon,
} from "@shopify/polaris-icons";
import {
  CREATE_SHOP_CONFIGS,
  UPDATE_MARKETS_REDIRECT,
} from "../../../helpers/endpoints";
import tr from "../../helpers/translations.json";
import { useAuthenticatedFetch } from "../../hooks";
import { PromoBadge } from "../PromoBadge";

export default function MarketsAutoControls({
  initialLoading,
  marketsData,
  marketRedirect,
  reFetch,
  marketsSync,
  marketsSyncLoading,
  setToastData,
}) {
  const fetch = useAuthenticatedFetch();
  const { activePlan, shopData, appId } = useContext(AppContext);
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [loading, setLoading] = useState(false);

  // async function saveOtherConfigs() {
  //   setLoading(true);
  //   let error = true;
  //   let msg = tr.responses.error;

  //   try {
  //     const response = await fetch(CREATE_SHOP_CONFIGS, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "post",
  //       body: JSON.stringify({
  //         basic_configs: {
  //           ...originConfigs,
  //           forward_url_params: configs?.forward_url_params,
  //           custom_rell_attr: configs?.custom_rell_attr,
  //           domain_redirection: configs?.domain_redirection,
  //         },
  //         advanced_configs: originAdvancedConfigs,
  //       }),
  //     });
  //     const responseJson = await response.json();

  //     if (responseJson?.status) {
  //       error = false;
  //       msg = tr.responses.settings_saved;
  //       reFetch((n) => !n);
  //     }
  //   } catch (err) {
  //     console.error("Fetch error:", err.message);
  //   }

  //   setToastData({
  //     error,
  //     msg,
  //   });
  //   setLoading(false);
  // }

  async function handleMarketsAuto() {
    setLoading(true);
    let error = true;
    let msg = tr.responses.error;

    try {
      const response = await fetch(UPDATE_MARKETS_REDIRECT, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ shop_id: shopData?.shopData?.id, appId }),
      });
      const responseJson = await response.json();

      if (responseJson?.status) {
        error = false;
        msg = tr.responses.success;
        await reFetch((n) => !n);
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
                Auto redirect controls
              </Text>
              <Text as="p" variant="bodyMd">
                Manage and configure settings for synchronizing and auto
                redirecting based on regional preferences.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <Card roundedAbove="sm">
          <InlineGrid gap="600">
            {!initialLoading && !marketsData?.last_sync_timestamp && (
              <Banner tone="warning">
                <small>
                  Perform an <strong>initial sync</strong> to ensure your
                  store's Market data is up-to-date. This step is required
                  before proceeding.
                </small>
              </Banner>
            )}
            <InlineGrid columns="70% auto" gap="200">
              <InlineGrid gap="100">
                <InlineStack gap="200" blockAlign="center">
                  <Text as="h2" variant="headingSm">
                    Markets sync
                  </Text>
                  <Tooltip content="Last sync date/time in UTC.">
                    <Badge
                      tone={
                        marketsData?.last_sync_timestamp
                          ? "info"
                          : !initialLoading
                          ? "attention"
                          : "read-only"
                      }
                      size="small"
                      icon={CalendarTimeIcon}
                    >
                      {marketsData?.last_sync_timestamp
                        ? marketsData.last_sync_timestamp
                        : !initialLoading
                        ? "N/A"
                        : "loading..."}
                    </Badge>
                  </Tooltip>
                </InlineStack>
                <Text as="p" variant="bodyXs">
                  Sync your store's market data to keep it up-to-date. <br />
                  Re-sync after any changes to Shopify Markets.
                </Text>
              </InlineGrid>
              <InlineStack align="end" blockAlign="center">
                <div>
                  <Button
                    size="slim"
                    variant="primary"
                    loading={marketsSyncLoading}
                    onClick={marketsSync}
                  >
                    Sync
                  </Button>
                </div>
              </InlineStack>
            </InlineGrid>
            <Divider />

            <InlineGrid columns="70% auto" gap="200">
              <InlineGrid gap="100">
                <PromoBadge type="pro" />
                <Text as="h2" variant="headingSm">
                  Markets auto redirect
                </Text>
                <Text as="p" variant="bodyXs">
                  Automatically redirects visitors to the appropriate market
                  (country, currency, and language, if configured) based on
                  their geolocation.
                </Text>
              </InlineGrid>
              <InlineStack align="end" blockAlign="center">
                <div>
                  <Button
                    disabled={!marketsData || !isProPlan}
                    size="slim"
                    onClick={isProPlan ? handleMarketsAuto : undefined}
                    loading={loading}
                    pressed={marketRedirect && !loading ? true : false}
                  >
                    {marketRedirect ? "Enabled" : "Enable"}
                  </Button>
                </div>
              </InlineStack>
            </InlineGrid>
          </InlineGrid>
        </Card>
      </InlineGrid>
    </>
  );
}
