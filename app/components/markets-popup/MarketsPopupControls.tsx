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
import React, { useState } from "react";
import { CalendarTimeIcon } from "@shopify/polaris-icons";
import {
  useActionData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { LoadingStates, OutletContext } from "../_types";
import { loadingStates, planParser, requestHeaders } from "../_helpers";
import { ACTIONS } from "../_actions";

interface MarketsPopupControlsProps {
  marketsData: any;
  marketsPopup: boolean;
  marketsSync: () => void;
  marketsSyncLoading: boolean;
}

export default function MarketsPopupControls({
  marketsData,
  marketsPopup,
  marketsSync,
  marketsSyncLoading,
}: MarketsPopupControlsProps) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  // const [loading, setLoading] = useState(false);
  const submit = useSubmit();
  const navigation = useNavigation()

  async function handleMarketsPopup() {
    console.log("handleMarketsPopup");
    submit(
      {
        _action: ACTIONS.update_MarketsWidget,
        data: {
          shopId: shopdb?.id,
          widget: !marketsPopup,
        },
      },
      requestHeaders,
    );
  };

  const loading = loadingStates(navigation, [ACTIONS.update_MarketsWidget]) as LoadingStates;
  console.log("marketsPopup: ", marketsPopup);
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
                Popup controls
              </Text>
              <Text as="p" variant="bodyMd">
                Manage and configure settings for synchronizing and
                enabling/disabling popup based on regional preferences.
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
                        ? String(marketsData.lastSyncTimestamp)
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
                <Text as="h2" variant="headingSm">
                  Markets popup
                </Text>
                <Text as="p" variant="bodyXs">
                  Enable or disable the markets popup functionality.
                </Text>
              </InlineGrid>
              <InlineStack align="end" blockAlign="center">
                <div>
                  <Button
                    disabled={!marketsData}
                    tone="success"
                    size="slim"
                    onClick={handleMarketsPopup}
                    loading={loading[ACTIONS.update_MarketsWidget + "Loading"]}
                    pressed={marketsPopup && !loading[ACTIONS.update_MarketsWidget + "Loading"] ? true : false}
                  >
                    {marketsPopup ? "Active" : "Disabled"}
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
