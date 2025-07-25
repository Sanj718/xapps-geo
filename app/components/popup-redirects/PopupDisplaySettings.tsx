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
  Link,
  Select,
  SkeletonDisplayText,
  Text,
  Tooltip,
} from "@shopify/polaris";
import { QuestionCircleIcon } from "@shopify/polaris-icons";
import React, { useState } from "react";
import countriesList from "../../assets/countries.json";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext } from "../_types";
import { default_advanced_configs, default_basic_configs, loadingStates, parseCountryCodesWithFullNames, planParser, requestHeaders } from "../_helpers";
import ListWithTags from "../_common/ListWithTags";
import PromoBadge from "../_common/PromoBadge";
import { CustomComboBox } from "../_common/CustomComboBox";
import tr from "../locales.json";
import { ACTIONS } from "../_actions";

const continents = [
  { value: "AF", label: "Africa" },
  { value: "AN", label: "Antarctica" },
  { value: "AS", label: "Asia" },
  { value: "EU", label: "Europe" },
  { value: "NA", label: "North america" },
  { value: "OC", label: "Oceania" },
  { value: "SA", label: "South america" },
];

const pageTemplates = [
  "all",
  "index",
  "product",
  "collection",
  "page",
  "blog",
  "article",
  "cart",
  "password",
  "404",
  "search",
  "account pages",
];

interface PopupDisplaySettingsProps {
  configs: any
}

export default function PopupDisplaySettings({
  configs,
  // setToastData,
}: PopupDisplaySettingsProps) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const { basicConfigs, advancedConfigs, hideOnAllowedPages, allowedPages } = configs?.data[0] || {}
  const submit = useSubmit()
  const navigation = useNavigation();
  const [localConfigs, setLocalConfigs] = useState({ ...default_basic_configs, ...basicConfigs, });
  const [localHidePages, setLocalHidePages] = useState<boolean>(hideOnAllowedPages || false);
  const [localAllowedPages, setLocalAllowedPages] = useState<string[]>(allowedPages || ["all"]);

  const countries = parseCountryCodesWithFullNames(countriesList);
  function handleShowRulesChange(value: any) {
    let newGeo = false;
    let newAuto = false;
    if (value === "autoGeo") {
      newGeo = true;
      newAuto = true;
    } else if (value === "auto") {
      newGeo = false;
      newAuto = true;
    }
    setLocalConfigs((current: typeof localConfigs) => ({
      ...current,
      automaticShow: newAuto,
      geo: newGeo,
    }));
  }

  async function savePageVisibility() {
    submit(
      {
        _action: ACTIONS.create_AllowedPages,
        data: {
          allowedPages: localAllowedPages,
          hideOnAllowedPages: localHidePages,
        },
      },
      requestHeaders,
    );
  }

  async function saveConfigs() {
    submit(
      {
        _action: ACTIONS.update_RedirectsConfigs,
        data: {
          basicConfigs: localConfigs,
          advancedConfigs: advancedConfigs,
        },
      },
      requestHeaders,
    );
  }
console.log(localConfigs)
  const loading = loadingStates(navigation, [ACTIONS.update_RedirectsConfigs, ACTIONS.create_AllowedPages]) as LoadingStates;
  return (
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
                  onChange={
                    !isFreePlan
                      ? (value) =>
                        setLocalConfigs((current: typeof localConfigs) => ({
                          ...current,
                          show: value,
                        }))
                      : undefined
                  }
                  value={localConfigs?.show}
                  disabled={isFreePlan}
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
                  labelAction={!localConfigs?.automaticShow && !localConfigs?.geo ? { content: "How to add custom link?", target: "_blank", url: "https://geolocationredirects-xapps.tawk.help/article/how-to-add-custom-buttonlink-to-open-popup" } : {}}
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
                    !isFreePlan ? handleShowRulesChange : undefined
                  }
                  value={
                    localConfigs?.automaticShow && localConfigs?.geo
                      ? "autoGeo"
                      : localConfigs?.automaticShow
                        ? "auto"
                        : "manual"
                  }
                  disabled={isFreePlan}
                />
              </InlineGrid>
              <InlineGrid
                columns={{ xs: "1fr", md: "20% 20% 1fr" }}
                gap="200"
              >
                <Select
                  label="Display popup logic"
                  labelHidden
                  disabled={!localConfigs?.geo}
                  options={[
                    {
                      label: "Outside",
                      value: "except",
                    },
                    {
                      label: "Inside",
                      value: "include",
                    },
                  ]}
                  onChange={(value) =>
                    setLocalConfigs((current: typeof localConfigs) => ({
                      ...current,
                      reverseGeo: value === "include" ? true : false,
                    }))
                  }
                  value={localConfigs?.reverseGeo ? "include" : "except"}
                />
                <Select
                  label="Location type"
                  labelHidden
                  disabled={!localConfigs?.geo}
                  options={[
                    { label: "Continents", value: "continent" },
                    { label: "Countries", value: "country" },
                  ]}
                  onChange={(value) =>
                    setLocalConfigs((current: typeof localConfigs) => ({
                      ...current,
                      location: value,
                    }))
                  }
                  value={localConfigs?.location}
                />
                <div style={{
                  opacity: localConfigs?.geo ? 1 : 0.5,
                  pointerEvents: localConfigs?.geo ? "initial" : "none",
                }}>
                  <div
                    style={{
                      display:
                        localConfigs?.location === "continent"
                          ? "block"
                          : "none",
                    }}
                  >
                    <ListWithTags
                      // @ts-ignore
                      list={continents}
                      setConfigs={setLocalConfigs}
                      configs={localConfigs}
                      id="continents"
                      helpText=""
                      placeholder="Select continents"
                    />
                  </div>
                  <div
                    style={{
                      display:
                        localConfigs?.location === "country"
                          ? "block"
                          : "none",
                    }}
                  >
                    <ListWithTags
                      list={countries}
                      setConfigs={setLocalConfigs}
                      configs={localConfigs}
                      id="countries"
                      helpText=""
                      placeholder="Select countries"
                    />
                  </div>
                </div>
              </InlineGrid>
            </InlineGrid>
            <InlineStack align="end">
              <Button variant="primary" onClick={saveConfigs} loading={loading[ACTIONS.update_RedirectsConfigs + "Loading"]}>
                Save
              </Button>
            </InlineStack>
          </InlineGrid>
        </Card>
        <Card roundedAbove="sm">
          <InlineGrid gap="200">
            <InlineGrid gap="200">
              <div>
                <PromoBadge type="pro" />
              </div>
              <Grid columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                <InlineGrid gap="100">
                  <InlineStack gap="150" blockAlign="center">
                    Page visibility
                    <Tooltip
                      width="wide"
                      content={
                        <small>
                          Manage where the popup appears by selecting specific
                          page templates or custom URLs, giving you full
                          control over its visibility on your site.
                        </small>
                      }
                    >
                      <Icon source={QuestionCircleIcon} tone="subdued" />
                    </Tooltip>
                  </InlineStack>
                  <div className={isProPlan ? "" : "vvisually-disabled"}>
                    <InlineGrid
                      gap="200"
                      columns={{ xs: "1fr", md: "1fr 5fr" }}
                    >
                      <Select
                        disabled={!isProPlan}
                        label="hide/show on selected pages/templates"
                        labelHidden
                        options={[
                          {
                            label: "Show on",
                            value: "show",
                          },
                          {
                            label: "Hide on",
                            value: "hide",
                          },
                        ]}
                        onChange={(value) =>
                          setLocalHidePages(value === "hide" ? true : false)
                        }
                        value={
                          localHidePages
                            ? "hide"
                            : "show"
                        }
                      />
                      <CustomComboBox
                        disabled={!isProPlan}
                        optionsList={pageTemplates}
                        defaultSelected={["all"]}
                        selectedItems={localAllowedPages}
                        setSelectedItems={(value) =>
                          setLocalAllowedPages(value)
                        }
                      />
                    </InlineGrid>
                  </div>
                </InlineGrid>
              </Grid>
            </InlineGrid>
            <InlineStack align="end">
              <Button
                disabled={!isProPlan}
                variant="primary"
                loading={loading[ACTIONS.create_AllowedPages + "Loading"]}
                onClick={isProPlan ? savePageVisibility : undefined}
              >
                Save
              </Button>
            </InlineStack>
          </InlineGrid>
        </Card>
      </InlineGrid>
    </InlineGrid>
  );
}
