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
import { AppContext } from "../AppContext";
import countriesList from "../../assets/countries.json";
import { parseCountryCodesWithFullNames, planParser } from "../../helpers";
import { ListWithTags } from "../ListWithTags";
import { CustomComboBox } from "../CustomComboBox";
import {
  CREATE_ALLOWED_PAGES,
  CREATE_SHOP_CONFIGS,
} from "../../../helpers/endpoints";
import tr from "../../helpers/translations.json";
import { useAuthenticatedFetch } from "../../hooks";
import { PromoBadge } from "../PromoBadge";

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

export default function PopupDisplaySettings({
  initialLoading,
  reFetch,
  configs,
  setConfigs,
  advancedConfigs,
  pageVisibility,
  setPageVisibility,
  setToastData,
}) {
  const fetch = useAuthenticatedFetch();
  const { activePlan } = useContext(AppContext);
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [loading, setLoading] = useState(false);
  const [visibilityLoading, setVisibilityLoading] = useState(false);

  const countries = parseCountryCodesWithFullNames(countriesList);
  function handleShowRulesChange(value) {
    let newGeo = false;
    let newAuto = false;
    if (value === "autoGeo") {
      newGeo = true;
      newAuto = true;
    } else if (value === "auto") {
      newGeo = false;
      newAuto = true;
    }
    setConfigs((current) => ({
      ...current,
      automaticShow: newAuto,
      geo: newGeo,
    }));
  }

  async function savePageVisibility() {
    setVisibilityLoading(true);
    let error = true;
    let msg = tr.responses.error;

    try {
      const response = await fetch(CREATE_ALLOWED_PAGES, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(pageVisibility),
      });
      const responseJson = await response.json();

      if (responseJson?.status) {
        error = false;
        msg = tr.responses.saved;
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    }

    setToastData({
      error,
      msg,
    });
    setVisibilityLoading(false);
  }

  async function saveConfigs() {
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
          basic_configs: configs,
          advanced_configs: advancedConfigs,
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
              {initialLoading ? (
                <InlineGrid gap="200">
                  <InlineGrid gap="200" columns="2">
                    <InlineGrid gap="150">
                      Display frequency
                      <SkeletonDisplayText size="large" maxWidth="100%" />
                    </InlineGrid>
                    <InlineGrid gap="150">
                      Display rules
                      <SkeletonDisplayText size="large" maxWidth="100%" />
                    </InlineGrid>
                  </InlineGrid>
                  <InlineGrid
                    columns={{ xs: "1fr", md: "20% 20% 1fr" }}
                    gap="200"
                  >
                    <SkeletonDisplayText size="large" maxWidth="100%" />
                    <SkeletonDisplayText size="large" maxWidth="100%" />
                    <SkeletonDisplayText size="large" maxWidth="100%" />
                  </InlineGrid>
                </InlineGrid>
              ) : (
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
                        onChange={
                          !isFreePlan
                            ? (value) =>
                                setConfigs((current) => ({
                                  ...current,
                                  show: value,
                                }))
                            : undefined
                        }
                        value={configs?.show}
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
                          configs?.automaticShow && configs?.geo
                            ? "autoGeo"
                            : configs?.automaticShow
                            ? "auto"
                            : "manual"
                        }
                        disabled={isFreePlan}
                        helpText={
                          !configs?.automaticShow && !configs?.geo ? (
                            <Button
                              variant="plain"
                              url="https://geolocationredirects-xapps.tawk.help/article/how-to-add-custom-buttonlink-to-open-popup"
                              target="_blank"
                            >
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
                  <div
                    style={{
                      opacity: configs?.geo ? 1 : 0.5,
                      pointerEvents: configs?.geo ? "initial" : "none",
                    }}
                  >
                    <InlineGrid
                      columns={{ xs: "1fr", md: "20% 20% 1fr" }}
                      gap="200"
                    >
                      <Select
                        label="Display popup logic"
                        labelHidden
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
                          setConfigs((current) => ({
                            ...current,
                            reverseGeo: value === "include" ? true : false,
                          }))
                        }
                        value={configs?.reverseGeo ? "include" : "except"}
                      />
                      <Select
                        label="Location type"
                        labelHidden
                        options={[
                          { label: "Continents", value: "continent" },
                          { label: "Countries", value: "country" },
                        ]}
                        onChange={(value) =>
                          setConfigs((current) => ({
                            ...current,
                            location: value,
                          }))
                        }
                        value={configs?.location}
                      />
                      <div>
                        <div
                          style={{
                            display:
                              configs?.location === "continent"
                                ? "block"
                                : "none",
                          }}
                        >
                          <ListWithTags
                            // @ts-ignore
                            list={continents}
                            setConfigs={setConfigs}
                            configs={configs}
                            id="continents"
                            helpText=""
                            placeholder="Select continents"
                          />
                        </div>
                        <div
                          style={{
                            display:
                              configs?.location === "country"
                                ? "block"
                                : "none",
                          }}
                        >
                          <ListWithTags
                            list={countries}
                            setConfigs={setConfigs}
                            configs={configs}
                            id="countries"
                            helpText=""
                            placeholder="Select countries"
                          />
                        </div>
                      </div>
                    </InlineGrid>
                  </div>
                </InlineGrid>
              )}
              <InlineStack align="end">
                <Button tone="success" onClick={saveConfigs} loading={loading}>
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
                            setPageVisibility((current) => ({
                              ...current,
                              hide_on_allowed_pages:
                                value === "hide" ? true : false,
                            }))
                          }
                          value={
                            pageVisibility?.hide_on_allowed_pages
                              ? "hide"
                              : "show"
                          }
                        />
                        <CustomComboBox
                          disabled={!isProPlan}
                          optionsList={pageTemplates}
                          defaultSelected={["all"]}
                          selectedItems={pageVisibility?.allowed_pages}
                          setSelectedItems={(value) =>
                            setPageVisibility((current) => ({
                              ...current,
                              allowed_pages: value,
                            }))
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
                  tone="success"
                  loading={visibilityLoading}
                  onClick={isProPlan ? savePageVisibility : undefined}
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
