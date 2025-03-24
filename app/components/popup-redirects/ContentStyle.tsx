import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { ThemeEditIcon } from "@shopify/polaris-icons";
import React, { useState } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { default_basic_configs, loadingStates, planParser, requestHeaders } from "../_helpers";
import PopupContent from "../_common/PopupContent";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { Asset, LoadingStates, OutletContext, RedirectItem } from "../_types";
import PromoBadge from "../_common/PromoBadge";
import RedirectsPopupPreview from "./RedirectsPopupPreview";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import CustomizePopup from "./CustomizePopup";
import ImageManager from "../_common/ImageManager";
import IconSettings from "./IconSettings";
import tr from "../locales.json";
import { ACTIONS } from "../_actions";

interface ContentStyleProps {
  redirects: RedirectItem[];
  configs: any;
}
export default function ContentStyle({
  redirects,
  configs,
}: ContentStyleProps) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { basicConfigs, advancedConfigs, hideOnAllowedPages, allowedPages } = configs?.data[0] || {}
  const submit = useSubmit()
  const navigation = useNavigation();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [customizePopupVisibilityChange, setCustomizePopupVisibilityChange] = useState(false);
  const [localConfigs, setLocalConfigs] = useState(basicConfigs);
  const [localAdvancedConfigs, setLocalAdvancedConfigs] = useState(advancedConfigs);
  const secondaryLocales = shopInfo?.shopLocales?.filter(
    (item) => !item.primary,
  );

  async function saveConfigs() {
    submit(
      {
        _action: ACTIONS.CreateUpdateConfigs,
        data: {
          basicConfigs: localConfigs,
          advancedConfigs: localAdvancedConfigs,
        },
      },
      requestHeaders,
    );
  }

  function handleCustomIconUpload(assets: Asset | null) {
    if (!assets) return;
    setLocalConfigs((current: typeof localConfigs) => ({
      ...current,
      icon: assets.url
    }));
  }

  const loading = loadingStates(navigation, [ACTIONS.CreateUpdateConfigs]) as LoadingStates;
 
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
                ? basicConfigs
                : {
                  ...default_basic_configs,
                  title: basicConfigs?.title,
                  icon: basicConfigs?.icon,
                  buttonText: basicConfigs?.buttonText,
                  showFlag: basicConfigs?.showFlag,
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
        <TitleBar title="Customize your popup">
          <button variant="primary" onClick={() => saveConfigs()} loading={loading[ACTIONS.CreateUpdateConfigs + "Loading"] ? "loading" : false}>Save</button>
          <button onClick={() => shopify.modal.hide('customize-popup')}>Close</button>
        </TitleBar>
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <CustomizePopup
              visibilityChange={customizePopupVisibilityChange}
              redirects={redirects} configs={localConfigs}
              setConfigs={setLocalConfigs}
              advancedConfigs={localAdvancedConfigs}
              setAdvancedConfigs={setLocalAdvancedConfigs}
            />
          </AppProvider>
        </Box>
      </Modal>

      <Modal id="popup-content-translation-popup">
        <TitleBar title="Popup content translation" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <InlineGrid gap="300">
              <Box>
                <PromoBadge type="pro" />
              </Box>
              <InlineGrid columns="2" gap="200">
                {(secondaryLocales?.length > 0 &&
                  secondaryLocales.map((locale) => {
                    return (
                      <PopupContent
                        titleDisabled={!isProPlan}
                        key={locale.locale}
                        titleLabel={`Title (${locale.locale})`}
                        titleValue={isProPlan
                          ? localConfigs?.title_locales &&
                            localConfigs.title_locales[locale.locale]
                            ? localConfigs.title_locales[locale.locale]
                            : ""
                          : ""}
                        titleOnChange={isProPlan ? (value) =>
                          setLocalConfigs((current) => ({
                            ...current,
                            title_locales: {
                              ...current?.title_locales,
                              [locale.locale]: value,
                            },
                          })) : undefined}
                        textLabel={`Short text (${locale.locale})`}
                        textValue={isProPlan
                          ? localConfigs?.text_locales &&
                            localConfigs.text_locales[locale.locale]
                            ? localConfigs.text_locales[locale.locale]
                            : ""
                          : ""}
                        textOnChange={isProPlan ? (value) => {
                          setLocalConfigs((current) => ({
                            ...current,
                            text_locales: {
                              ...current.text_locales,
                              [locale.locale]: value,
                            },
                          }));
                        } : undefined}
                      />
                    );
                  })) ||
                  ""}
              </InlineGrid>
            </InlineGrid>
          </AppProvider>
        </Box>
      </Modal>


      <Modal id="icon-upload-popup">
        <TitleBar title="Select custom icon" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <ImageManager callBack={handleCustomIconUpload} />
          </AppProvider></Box>
      </Modal>

      <Modal id="icon-settings-popup">
        <TitleBar title="Icon settings" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <IconSettings configs={localConfigs} setConfigs={setLocalConfigs} isFreePlan={isFreePlan} />
          </AppProvider></Box>
      </Modal>

      <Modal id="dropdown-label-translation-popup">
        <TitleBar title="Dropdown label translation" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <InlineGrid gap="300">
              <Box>
                <PromoBadge type="pro" />
              </Box>
              <div className={!isProPlan ? "visually-disabled" : ""}>
                <InlineGrid columns="2" gap="200">
                  {secondaryLocales?.map((locale) => {
                    const titleValue =
                      localConfigs?.dropdownPlaceholder_locales &&
                        localConfigs.dropdownPlaceholder_locales[locale.locale]
                        ? localConfigs.dropdownPlaceholder_locales[locale.locale]
                        : "";
                    const titleOnChange = (value: string) =>
                      setLocalConfigs((current: typeof localConfigs) => ({
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
                  })}
                </InlineGrid>
              </div>
            </InlineGrid>
          </AppProvider>
        </Box>
      </Modal>


    </>
  );
}
