import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  DescriptionList,
  InlineGrid,
  InlineStack,
  Select,
  Spinner,
  Text,
  List,
  ButtonGroup
} from "@shopify/polaris";
import {
  MaximizeIcon
} from '@shopify/polaris-icons';
import React, { Suspense, useContext, useEffect, useMemo, useState } from "react";
import { Await, useActionData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext } from "../_types";
import { defaultWidgetCode, loadingStates, planParser, requestHeaders } from "../_helpers";
import PromoBadge from "../_common/PromoBadge";
import CodeEditor from "../_common/CodeEditor.client";
import { ACTIONS } from "../_actions";
import WidgetDisplayCustomRuleBanner from "./WidgetDisplayCustomRuleBanner";
import WidgetDisplayCustomRuleCodeBanner from "./WidgetDisplayCustomRuleCodeBanner";
interface WidgetDisplayCustomRuleProps {
  status: any;
  code: any;
}

export default function WidgetDisplayCustomRule({ status, code }: WidgetDisplayCustomRuleProps) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const submit = useSubmit()
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [customCode, setCustomCode] = useState(defaultWidgetCode);


  async function handleCustomCodeStatus(value: string) {
    if (!appId) return;
    submit(
      {
        _action: ACTIONS.update_WidgetDisplayCustomRuleStatus,
        data: {
          appId,
          data: value,
        },
      },
      requestHeaders,
    );
  }
  async function handleCustomCodeSave() {
    if (!appId) return;
    submit(
      {
        _action: ACTIONS.update_WidgetDisplayCustomRuleCode,
        data: {
          appId,
          data: customCode,
        },
      },
      requestHeaders,
    );
  }

  const loading = loadingStates(navigation, [ACTIONS.update_WidgetDisplayCustomRuleStatus, ACTIONS.update_WidgetDisplayCustomRuleCode]) as LoadingStates;

  return <>
    <InlineGrid columns={{ xs: "1fr", md: "auto  70%" }} gap="400">
      <Box
        as="section"
        paddingInlineStart={{ xs: "400", sm: "0" }}
        paddingInlineEnd={{ xs: "400", sm: "0" }}
      >
        <div style={{ paddingLeft: "1rem" }}>
          <BlockStack gap="400">
            <PromoBadge type="pro" />
            <Text as="h3" variant="headingMd">
              Widget display custom rule
            </Text>
            <Text as="p" variant="bodyMd">
              Easily implement your custom logic for widget display. Make sure
              to <strong>activate it only if you're a developer</strong> and
              at your own risk. Reach out to us for personalized customization
              options.
            </Text>
          </BlockStack>
        </div>
      </Box>
      <Card roundedAbove="sm">
        <InlineGrid gap="200">
          <WidgetDisplayCustomRuleBanner />
          <div style={{ position: "relative" }}>
            <Suspense fallback={<Spinner size="small" />}>
              <Await resolve={status}>
                {(status) => (
                  <Select
                    label="Status: "
                    labelInline
                    options={[
                      { label: "Active", value: "true" },
                      { label: "Draft", value: "false" },
                    ]}
                    disabled={loading[ACTIONS.update_WidgetDisplayCustomRuleStatus + "Loading"] || !isProPlan}
                    onChange={
                      isProPlan
                        ? (value) => handleCustomCodeStatus(value)
                        : undefined
                    }
                    value={status?.value || "false"}
                  />
                )}
              </Await>
              {loading[ACTIONS.update_WidgetDisplayCustomRuleStatus + "Loading"] && (
                <div style={{ position: "absolute", top: "6px", right: "8px", zIndex: 10 }}>
                  <Spinner size="small" />
                </div>
              )}
            </Suspense>
          </div>
          <WidgetDisplayCustomRuleCodeBanner />
          <div
            id="code-editor"
            className="code-editor"
            style={{
              opacity: isProPlan ? 1 : 0.3,
              pointerEvents: isProPlan ? "initial" : "none",
            }}
          >
            <Suspense fallback={<Spinner size="small" />}>
              <Await resolve={code}>
                {(code) => {
                  return <CodeEditor code={code?.value || defaultWidgetCode} onChange={isProPlan ? setCustomCode : () => { }} language="javascript" />;
                }}
              </Await>
            </Suspense>
          </div>
          <InlineStack align="space-between" gap="200">
            <Button
              variant="tertiary"
              icon={MaximizeIcon}
              onClick={() => {
                if (typeof shopify !== 'undefined' && shopify.modal) {
                  navigate("/app/redirects/widget-display-custom-rule");
                }
              }}
            >
              Open Full-Screen Editor
            </Button>
            <Button
              variant="primary"
              onClick={() => handleCustomCodeSave()}
              loading={loading[ACTIONS.update_WidgetDisplayCustomRuleCode + "Loading"]}
            >
              Save
            </Button>
          </InlineStack>
        </InlineGrid>
      </Card>
    </InlineGrid>
  </>
}
