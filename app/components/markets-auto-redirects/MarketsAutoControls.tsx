import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Text,
  Tooltip,
} from "@shopify/polaris";
import React from "react";
import {
  CalendarTimeIcon,
} from "@shopify/polaris-icons";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext } from "../_types";
import { ACTIONS } from "../_actions";
import { loadingStates, planParser, requestHeaders } from "../_helpers";
import PromoBadge from "../_common/PromoBadge";

interface MarketsAutoControlsProps {
  marketsData: any;
  marketRedirect: boolean;
  marketsSync: () => void;
  marketsSyncLoading: boolean;
}

export default function MarketsAutoControls({
  marketsData,
  marketRedirect,
  marketsSyncLoading,
  marketsSync,
}: MarketsAutoControlsProps) {
  const { shopdb, activePlan } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const submit = useSubmit();
  const navigation = useNavigation();

  async function handleMarketsAuto() {
    submit(
      {
        _action: ACTIONS.update_MarketsRedirect,
        data: {
          autoRedirect: !marketRedirect,
          appId: shopdb?.appId,
        },
      },
      requestHeaders,
    );
  }

  const loading = loadingStates(navigation, [ACTIONS.update_MarketsRedirect, ACTIONS.run_MarketsSync]) as LoadingStates;

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
            {!marketsData?.lastSyncTimestamp && (
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
                        marketsData?.lastSyncTimestamp
                          ? "info"
                          : "attention"
                      }
                      size="small"
                      icon={CalendarTimeIcon}
                    >
                      {marketsData?.lastSyncTimestamp
                        ? marketsData?.lastSyncTimestamp?.toISOString()
                        : "N/A"}
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
                    loading={loading[ACTIONS.update_MarketsRedirect + "Loading"]}
                    pressed={marketRedirect && !loading[ACTIONS.update_MarketsRedirect + "Loading"] ? true : false}
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
