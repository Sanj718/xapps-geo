import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  Icon,
  InlineGrid,
  InlineStack,
  Select,
  SkeletonDisplayText,
  Text,
  Tooltip,
} from "@shopify/polaris";
import { QuestionCircleIcon, StarFilledIcon } from "@shopify/polaris-icons";
import React, { useContext, useState } from "react";
import { LoadingStates, OutletContext } from "../_types";
import { loadingStates, parseCountryCodesWithFullNames, requestHeaders } from "../_helpers";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { planParser } from "../_helpers";
import countriesList from "../../assets/countries.json";
import PromoBadge from "../_common/PromoBadge";
import { ACTIONS } from "../_actions";
// import { AppContext } from "../AppContext";
// import countriesList from "../../assets/countries.json";
// import { parseCountryCodesWithFullNames, planParser } from "../../helpers";
// import { ListWithTags } from "../ListWithTags";
// import { CustomComboBox } from "../CustomComboBox";
// import {
//   CREATE_ALLOWED_PAGES,
//   CREATE_SHOP_CONFIGS,
//   SET_MARKET_CONFIGS,
// } from "../../../helpers/endpoints";
// import tr from "../../helpers/translations.json";
// import { useAuthenticatedFetch } from "../../hooks";
// import { PromoBadge } from "../PromoBadge";

interface MarketsPopupDisplaySettingsProps {
  configs: any;
  setConfigs: (configs: any) => void;
  advancedConfigs: any;
}

export default function MarketsPopupDisplaySettings({
  configs,
  setConfigs,
  advancedConfigs,
}: MarketsPopupDisplaySettingsProps) {
  const { shopdb, activePlan } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  // const [loading, setLoading] = useState(false);
  const submit = useSubmit();
  const navigation = useNavigation();


  async function saveConfigs() {
    submit(
      {
        _action: ACTIONS.update_MarketsConfigs,
        data: {
          basicConfigs: configs,
          advancedConfigs: advancedConfigs,
        },
      },
      requestHeaders,
    );
  }

  const loading = loadingStates(navigation, [ACTIONS.update_MarketsConfigs]) as LoadingStates;

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
                Popup display settings
              </Text>
              <Text as="p" variant="bodyMd">
                Control how often and where the popup appears, including
                frequency, rules, and targeting by country or continent.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <InlineGrid gap="200">
          <Card roundedAbove="sm">
            <InlineGrid gap="200">
              <PromoBadge type="basic" />
              <InlineGrid gap="200">
                <div className={isFreePlan ? "vvisually-disabled" : ""}>
                  <InlineGrid gap="200" columns="2">
                    <Select
                      label={
                        <InlineStack gap="100" blockAlign="center">
                          Display frequency
                          <Tooltip
                            width="wide"
                            content={
                              <small>
                                <p>
                                  <strong>Every browser session:</strong>{" "}
                                  Shown once per session; lasts until
                                  browser/tab closes.
                                </p>
                                <p>
                                  <strong>Every 7 days (cookies):</strong>{" "}
                                  Shown once, then hidden for 7 days (after
                                  close).
                                </p>
                                <p>
                                  <strong>Every page load:</strong> Shown on
                                  every page load.
                                </p>
                              </small>
                            }
                          >
                            <Icon
                              source={QuestionCircleIcon}
                              tone="subdued"
                            />
                          </Tooltip>
                        </InlineStack>
                      }
                      options={[
                        {
                          label: "Every browser session",
                          value: "session",
                        },
                        {
                          label: "Every page load",
                          value: "everyload",
                        },
                        {
                          label: "Every 7 days (cookies)",
                          value: "cookie",
                        },
                      ]}
                      disabled={isFreePlan}
                      onChange={
                        !isFreePlan
                          ? (value) =>
                            setConfigs((current: typeof configs) => ({
                              ...current,
                              showFrequency: value,
                            }))
                          : undefined
                      }
                      value={configs?.showFrequency}
                    />
                    <Select
                      label={
                        <InlineStack gap="100" blockAlign="center">
                          Display rules
                          <Tooltip
                            width="wide"
                            content={
                              <small>
                                <p>
                                  <strong>Automatic GEO Location:</strong>{" "}
                                  Automatically based on visitors geolocation.
                                </p>
                                <p>
                                  <strong>
                                    Automatic (Non-GEO Location):
                                  </strong>{" "}
                                  Triggers actions automatically ignoring
                                  visitor's geolocation.
                                </p>
                                <p>
                                  <strong>
                                    Manual (on custom element click):
                                  </strong>{" "}
                                  Requires a click to trigger.
                                </p>
                              </small>
                            }
                          >
                            <Icon
                              source={QuestionCircleIcon}
                              tone="subdued"
                            />
                          </Tooltip>
                        </InlineStack>
                      }
                      disabled={isFreePlan}
                      options={[
                        {
                          label: "Automatic GEO Location",
                          value: "autoGeo",
                        },
                        {
                          label: "Automatic (non GEO Location)",
                          value: "auto",
                        },
                        {
                          label: "Manual (on custom element click)",
                          value: "manual",
                        },
                      ]}
                      onChange={
                        !isFreePlan
                          ? (newValue) =>
                            setConfigs((current: typeof configs) => ({
                              ...current,
                              showRules: newValue,
                            }))
                          : undefined
                      }
                      value={configs?.showRules}
                      helpText={
                        configs?.showRules === "manual" ? (
                          <Button variant="plain" url="https://geolocationredirects-xapps.tawk.help/article/how-to-add-custom-buttonlink-to-open-popup" target="_blank">
                            How to add custom link to display popup on
                            storefront?
                          </Button>
                        ) : (
                          ""
                        )
                      }
                    />
                  </InlineGrid>
                </div>
              </InlineGrid>
              <InlineStack align="end">
                <Button
                  tone="success"
                  onClick={saveConfigs}
                  loading={loading[ACTIONS.update_MarketsConfigs + "Loading"]}
                  disabled={isFreePlan}
                >
                  Save
                </Button>
              </InlineStack>
            </InlineGrid>
          </Card>
        </InlineGrid>
      </InlineGrid>
    </>
  );
}
