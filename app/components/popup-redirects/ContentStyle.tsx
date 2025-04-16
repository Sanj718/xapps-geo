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
import { default_advanced_configs, default_basic_configs, loadingStates, planParser, requestHeaders } from "../_helpers";
import PopupContent from "../_common/PopupContent";
import { useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
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
  const navigate = useNavigate();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [customizePopupVisibilityChange, setCustomizePopupVisibilityChange] = useState(false);
  const [localConfigs, setLocalConfigs] = useState({ ...default_basic_configs, ...basicConfigs });
  const [localAdvancedConfigs, setLocalAdvancedConfigs] = useState({ ...default_advanced_configs, ...advancedConfigs });
  const secondaryLocales = shopInfo?.shopLocales?.filter(
    (item) => !item.primary,
  );

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
                ? { ...default_basic_configs, ...basicConfigs }
                : {
                  ...default_basic_configs,
                  title: basicConfigs?.title,
                  icon: basicConfigs?.icon,
                  buttonText: basicConfigs?.buttonText,
                  showFlag: basicConfigs?.showFlag,
                }
            }
            advancedConfigs={isProPlan ? { ...default_advanced_configs, ...advancedConfigs } : {}}
            customCSSClass="in-page"
          />
          <InlineStack align="end">
            <Button
              variant="primary"
              icon={ThemeEditIcon}
              onClick={() => navigate("/app/redirects/customize")}
              // onClick={() => shopify.modal.show("customize-popup")}
            >
              Customize
            </Button>
          </InlineStack>
        </Card>
      </InlineGrid>

      {/* Customize your popup
      <Modal id="customize-popup" variant="max" onShow={() => setCustomizePopupVisibilityChange(true)} onHide={() => setCustomizePopupVisibilityChange(false)}>
        <TitleBar title="Customize your popup">
          <button variant="primary" onClick={() => saveConfigs()} loading={loading[ACTIONS.CreateUpdateConfigs + "Loading"] ? "loading" : false}>Save</button>
          <button onClick={() => shopify.modal.hide('customize-popup')}>Close</button>
        </TitleBar>
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <CustomizePopup
              redirects={redirects} configs={localConfigs}
              setConfigs={setLocalConfigs}
              advancedConfigs={localAdvancedConfigs}
              setAdvancedConfigs={setLocalAdvancedConfigs}
            />
          </AppProvider>
        </Box>
      </Modal> */}



    </>
  );
}
