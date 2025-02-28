import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  Collapsible,
  Divider,
  InlineGrid,
  InlineStack,
  RangeSlider,
  Select,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import {
  AdjustIcon,
  CodeIcon,
  ImageAddIcon,
  LanguageIcon,
  PaintBrushFlatIcon,
  SettingsIcon,
  ThemeEditIcon,
} from "@shopify/polaris-icons";
import React, { useContext, useState } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
// import RedirectsPopupPreview from "./RedirectsPopupPreview";
// import { AppContext } from "../AppContext";
import { charLimit, default_basic_configs, loadingStates, planParser, requestHeaders } from "../_helpers";
// import { planParser } from "../../helpers";
// import { default_basic_configs } from "../../../helpers/process-client-response";
// import { ImageManager } from "../ImageManager";
// import { ColorTextField } from "../ColorTextField";
import { Editor } from "@monaco-editor/react";
import ReactQuill from "react-quill";
// import { useAuthenticatedFetch } from "../../hooks";
// import { CREATE_SHOP_CONFIGS } from "../../../helpers/endpoints";

import PopupContent from "../_common/PopupContent";
import tr from "../locales.json";
import "react-quill/dist/quill.snow.css";
import { useActionData, useLoaderData, useNavigation, useOutletContext } from "@remix-run/react";
import { ActionReturn, OutletContext } from "../_types";
import PromoBadge from "../_common/PromoBadge";
import RedirectsPopupPreview from "./RedirectsPopupPreview";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import CustomizePopup from "./CustomizePopup";

const OLD_DEFAULT_ICON =
  "https://ngr-app.herokuapp.com/public/images/earth-americas-solid.svg";
const OLD_STICKY_ICON =
  "https://ngr-app.herokuapp.com/public/images/sticky-logo.png";
const NEW_DEFAULT_ICON = "default";



export default function ContentStyle({
  redirects,
  reFetch,
  configs,
  setConfigs,
  advancedConfigs,
  setAdvancedConfigs,
  secondaryLocales,
  setToastData,
}) {
  // const fetch = useAuthenticatedFetch();
  // const { activePlan } = useContext(AppContext);
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  // const { allRedirects } = useLoaderData<typeof loader>();
  // const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const actionData = useActionData<ActionReturn>();
  const navigation = useNavigation();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [loading, setLoading] = useState(false);
  const [customizeModalStatus, setCustomizeModalStatus] = useState(false);
  const [assetsModalStatus, setAssetsModalStatus] = useState(false);
  const [widgetStylesOpen, setWidgetStylesOpen] = useState(false);
  const [codeEditorOpen, setCodeEditorOpen] = useState(false);
  const [iconModalStatus, setIconModalStatus] = useState(false);
  const [customizePopupVisibilityChange, setCustomizePopupVisibilityChange] = useState(false);
  const [contentTranslationModal, setContentTranslationsModal] =
    useState(false);
  const [dropdownLabelTranslationModal, setDropdownLabelTranslationModal] =
    useState(false);

  function handleCustomIconUpload(assets) {
    if (!assets) return;
    setConfigs({ ...configs, icon: assets?.url });
    setAssetsModalStatus(false);
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
                Content & Style
              </Text>
              <Text as="p" variant="bodyMd">
                Personalize the visual look of your popup by adjusting its
                layout, colors, fonts, and overall style. This section allows
                you to create a design that aligns with your brand and enhances
                user experience.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <Card roundedAbove="sm">
          <RedirectsPopupPreview
            redirects={
              isProPlan
                ? redirects
                : isBasicPlan
                  ? redirects.slice(0, 4)
                  : redirects.slice(0, 1)
            }
            basicConfigs={
              !isFreePlan
                ? configs
                : {
                  ...default_basic_configs,
                  title: configs?.title,
                  icon: configs?.icon,
                  buttonText: configs?.buttonText,
                  showFlag: configs?.showFlag,
                }
            }
            advancedConfigs={isProPlan ? advancedConfigs : {}}
            customCSSClass="in-page"
          />
          <InlineStack align="end">
            <Button
              variant="primary"
              icon={ThemeEditIcon}
              onClick={() => shopify.modal.show("customize-popup")}
            >
              Customize
            </Button>
          </InlineStack>
        </Card>
      </InlineGrid>

      {/* Customize your popup */}
      <Modal id="customize-popup" variant="max" onShow={() => setCustomizePopupVisibilityChange(true)} onHide={() => setCustomizePopupVisibilityChange(false)}>
        <TitleBar title="Customize your popup" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <CustomizePopup visibilityChange={customizePopupVisibilityChange} redirects={redirects} configs={configs} setConfigs={setConfigs} advancedConfigs={advancedConfigs} setAdvancedConfigs={setAdvancedConfigs} />
          </AppProvider>
        </Box>
      </Modal>
     

      {/* Edit icon settings */}
      {/* <Modal
        open={iconModalStatus}
        onClose={() => setIconModalStatus(false)}
        title="Edit icon settings"
        size="small"
      >
        <Modal.Section>
          <InlineGrid gap="200">
            <TextField
              autoComplete="false"
              label="Max-width"
              labelAction={{
                content: "auto",
                onAction: () =>
                  setConfigs((current) => ({
                    ...current,
                    iconWidth: "auto",
                  })),
              }}
              value={configs?.iconWidth || ""}
              suffix={configs?.iconWidth === "auto" ? "" : "px"}
              monospaced
              onChange={(value) =>
                setConfigs((current) => ({
                  ...current,
                  iconWidth: value,
                }))
              }
            />
            <TextField
              monospaced
              selectTextOnFocus
              label="Icon url"
              value={
                configs?.icon
                  ? configs?.icon === OLD_DEFAULT_ICON
                    ? "default"
                    : configs?.icon
                  : ""
              }
              onChange={(value) =>
                !isFreePlan
                  ? setConfigs((current) => ({
                      ...current,
                      icon: value,
                    }))
                  : false
              }
              autoComplete="off"
            />
          </InlineGrid>
        </Modal.Section>
      </Modal> */}

      {/* Popup content translation */}
      {/* <Modal
        open={contentTranslationModal}
        onClose={() => setContentTranslationsModal(false)}
        title="Popup content translation"
      >
        <Modal.Section>
          <InlineGrid gap="300">
            <Box>
              <PromoBadge type="pro" />
            </Box>
            <div className={!isProPlan ? "vvisually-disabled" : ""}>
              <InlineGrid columns="2" gap="200">
                {(secondaryLocales?.length > 0 &&
                  secondaryLocales.map((locale) => {
                    const titleValue = isProPlan
                      ? configs?.title_locales &&
                        configs.title_locales[locale.locale]
                        ? configs.title_locales[locale.locale]
                        : ""
                      : "";
                    const titleOnChange = isProPlan
                      ? (value) =>
                          setConfigs((current) => ({
                            ...current,
                            title_locales: {
                              ...current?.title_locales,
                              [locale.locale]: value,
                            },
                          }))
                      : undefined;
                    const textValue = isProPlan
                      ? configs?.text_locales &&
                        configs.text_locales[locale.locale]
                        ? configs.text_locales[locale.locale]
                        : ""
                      : "";
                    const textOnChange = isProPlan
                      ? (value) => {
                          setConfigs((current) => ({
                            ...current,
                            text_locales: {
                              ...current.text_locales,
                              [locale.locale]: value,
                            },
                          }));
                        }
                      : undefined;
                    return (
                      <PopupContent
                        titleDisabled={!isProPlan}
                        key={locale.locale}
                        titleLabel={`Title (${locale.locale})`}
                        titleValue={titleValue}
                        // @ts-ignore
                        titleOnChange={titleOnChange}
                        textLabel={`Short text (${locale.locale})`}
                        textValue={textValue}
                        // @ts-ignore
                        textOnChange={textOnChange}
                      />
                    );
                  })) ||
                  ""}
              </InlineGrid>
            </div>
            <Divider />
            <InlineStack align="end">
              <Button onClick={() => setContentTranslationsModal(false)}>
                Close
              </Button>
            </InlineStack>
          </InlineGrid>
        </Modal.Section>
      </Modal> */}

      {/* Dropdown label translation */}
      {/* <Modal
        open={dropdownLabelTranslationModal}
        onClose={() => setDropdownLabelTranslationModal(false)}
        title="Dropdown label translation"
      >
        <Modal.Section>
          <InlineGrid gap="300">
            <Box>
              <PromoBadge type="pro" />
            </Box>
            <div className={!isProPlan ? "visually-disabled" : ""}>
              <InlineGrid columns="2" gap="200">
                {(secondaryLocales?.length > 0 &&
                  secondaryLocales.map((locale) => {
                    const titleValue =
                      configs?.dropdownPlaceholder_locales &&
                      configs.dropdownPlaceholder_locales[locale.locale]
                        ? configs.dropdownPlaceholder_locales[locale.locale]
                        : "";
                    const titleOnChange = (value) =>
                      setConfigs((current) => ({
                        ...current,
                        dropdownPlaceholder_locales: {
                          ...current.dropdownPlaceholder_locales,
                          [locale.locale]: value,
                        },
                      }));

                    return (
                      <PopupContent
                        key={locale.locale}
                        titleLabel={`Dropdown label (${locale.locale})`}
                        titleValue={titleValue}
                        // @ts-ignore
                        titleOnChange={titleOnChange}
                        titleDisabled={!isProPlan}
                      />
                    );
                  })) ||
                  ""}
              </InlineGrid>
            </div>
            <Divider />
            <InlineStack align="end">
              <Button onClick={() => setDropdownLabelTranslationModal(false)}>
                Close
              </Button>
            </InlineStack>
          </InlineGrid>
        </Modal.Section>
      </Modal> */}
    </>
  );
}
