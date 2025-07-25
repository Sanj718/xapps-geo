import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import {
  ThemeEditIcon,
} from "@shopify/polaris-icons";
import React, { useState } from "react";
import { MarketsPopupPreview } from "./MarketsPopupPreview";
import { useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { OutletContext } from "../_types";
import { default_markets_basic_configs, handleSideNavClick, planParser } from "../_helpers";

interface MarketsContentStyleProps {
  marketsData: any;
  configs: any;
  advancedConfigs: any;
}

export default function MarketsContentStyle({
  marketsData,
  configs,
  advancedConfigs,
}: MarketsContentStyleProps) {
  const { shopdb, activePlan } = useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const navigate = useNavigate();

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
          <MarketsPopupPreview
            marketsData={marketsData}
            basicConfigs={
              !isFreePlan
                ? { ...default_markets_basic_configs, ...configs }
                : {
                  ...default_markets_basic_configs,
                  title: configs?.title,
                  icon: configs?.icon,
                  buttonText: configs?.buttonText,
                }
            }
            advancedConfigs={isProPlan ? advancedConfigs : {}}
            customCSSClass="in-page"
          />
          <InlineStack align="end">
            <Button
              variant="primary"
              icon={ThemeEditIcon}
              onClick={() => {
                handleSideNavClick();
                navigate("/app/markets/customize");
              }}
            >
              Customize
            </Button>
          </InlineStack>
        </Card>
      </InlineGrid>
    </>
  );
}