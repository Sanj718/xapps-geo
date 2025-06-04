import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Modal,
  Select,
  Spinner,
  Text,
} from "@shopify/polaris";
import {
  MaximizeIcon
} from '@shopify/polaris-icons';
import React, { Suspense, useContext, useEffect, useMemo, useState } from "react";
// import { AppContext } from "../AppContext";
// import { planParser } from "../../helpers";
// import {
//   GET_AUTO_REDIRECTS_EDITOR,
//   GET_AUTO_REDIRECTS_EDITOR_STATUS,
//   UPDATE_AUTO_REDIRECT_EDITOR,
//   UPDATE_AUTO_REDIRECT_EDITOR_STATUS,
//   UPDATE_WIDGET_EDITOR,
//   UPDATE_WIDGET_EDITOR_STATUS,
// } from "../../../helpers/endpoints";
// import tr from "../../helpers/translations.json";
// import { useAuthenticatedFetch } from "../../hooks";
import { Editor } from "@monaco-editor/react";
import PromoBadge from "../_common/PromoBadge";
import { Await, useActionData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import CodeEditor from "../_common/CodeEditor.client";
import { defaultAutoRedirectsCode, defaultWidgetCode, loadingStates, planParser, requestHeaders } from "../_helpers";
import { LoadingStates, OutletContext } from "../_types";
import { ACTIONS } from "../_actions";
import AutoRedirectDisplayCustomRuleCodeBanner from "./AutoRedirectDisplayCustomRuleCodeBanner";
import AutoRedirectDisplayCustomRuleBanner from "./AutoRedirectDisplayCustomRuleBanner";
// import { PromoBadge } from "../PromoBadge";

interface AutoRedirectsCustomRuleProps {
  status: any;
  code: any;
}


export default function AutoRedirectsCustomRule({ status, code }: AutoRedirectsCustomRuleProps) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const submit = useSubmit()
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [customCode, setCustomCode] = useState(defaultAutoRedirectsCode);

  async function handleCustomCodeStatus(value: string) {
    if (!appId) return;
    submit(
      {
        _action: ACTIONS.update_AutoRedirectsCustomCodeStatus,
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
        _action: ACTIONS.update_AutoRedirectsCustomCode,
        data: {
          appId,
          data: customCode,
        },
      },
      requestHeaders,
    );
  }

  const loading = loadingStates(navigation, [ACTIONS.update_AutoRedirectsCustomCode, ACTIONS.update_AutoRedirectsCustomCodeStatus]) as LoadingStates;
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
              <PromoBadge type="pro" />
              <Text as="h3" variant="headingMd">
                Auto redirects custom rule
              </Text>
              <Text as="p" variant="bodyMd">
                Easily implement your custom logic for auto redirects. Contact
                us and we can customize it for you.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <Card roundedAbove="sm">
          <InlineGrid gap="200">
            <AutoRedirectDisplayCustomRuleBanner />
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
                      disabled={loading[ACTIONS.update_AutoRedirectsCustomCodeStatus + "Loading"] || !isProPlan}
                      onChange={
                        isProPlan
                          ? (value) => handleCustomCodeStatus(value)
                          : undefined
                      }
                      value={status?.value || "false"}
                    />
                  )}
                </Await>
                {loading[ACTIONS.update_AutoRedirectsCustomCodeStatus + "Loading"] && (
                  <div style={{ position: "absolute", top: "6px", right: "8px", zIndex: 10 }}>
                    <Spinner size="small" />
                  </div>
                )}
              </Suspense>
            </div>
            <AutoRedirectDisplayCustomRuleCodeBanner />
            <div
              className="auto-redirects-code-editor"
              style={{
                opacity: isProPlan ? 1 : 0.3,
                pointerEvents: isProPlan ? "initial" : "none",
              }}
            >
              <Suspense fallback={<Spinner size="small" />}>
                <Await resolve={code}>
                  {(code) => {
                    return <CodeEditor code={code?.value || defaultAutoRedirectsCode} onChange={isProPlan ? setCustomCode : () => { }} language="javascript" />
                  }}
                </Await>
              </Suspense>
            </div>
            <InlineStack align="space-between" gap="200">
              <Button
                variant="tertiary"
                icon={MaximizeIcon}
                onClick={() => navigate("/app/redirects/autoredirects-custom-rule")}
              >
                Open Full-Screen Editor
              </Button>
              <Button
                variant="primary"
                onClick={() => handleCustomCodeSave()}
                loading={loading[ACTIONS.update_AutoRedirectsCustomCode + "Loading"]}
              >
                Save
              </Button>
            </InlineStack>
          </InlineGrid>
        </Card>
      </InlineGrid>
    </>
  );
}
