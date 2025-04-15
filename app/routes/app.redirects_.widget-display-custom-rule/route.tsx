import { Banner, BlockStack, Box, Card, List, Page, Select, Spinner } from "@shopify/polaris";
import { areObjectsEqual, default_advanced_configs, default_basic_configs, getEmbedConst, loadingStates, requestHeaders, defaultWidgetCode, planParser } from "../../components/_helpers";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Await, useActionData, useLoaderData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext, RedirectItem } from "app/components/_types";
import { handleActions } from "./_actions";
import { handleLoaders } from "./_loaders";
import { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { SaveBar, TitleBar } from "@shopify/app-bridge-react";
import CustomizePopup from "app/components/popup-redirects/CustomizePopup";
import { ACTIONS } from "app/components/_actions";
import tr from "../../components/locales.json";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../components/env";
import CodeEditor from "app/components/_common/CodeEditor.client";
import WidgetDisplayCustomRuleBanner from "../../components/popup-redirects/WidgetDisplayCustomRuleBanner";
import WidgetDisplayCustomRuleCodeBanner from "app/components/popup-redirects/WidgetDisplayCustomRuleCodeBanner";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, RD_EMBED_APP_HANDLE) || {};


export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);


export default function WidgetDisplayCustomRulePage() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const { allRedirects, configs, widgetEditorStatus, widgetEditorCode } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const submit = useSubmit()
  const navigation = useNavigation()
  const navigate = useNavigate();
  const [hasChange, setHasChange] = useState(false);
  const [customCode, setCustomCode] = useState(defaultWidgetCode);
  const { basicConfigs, advancedConfigs, hideOnAllowedPages, allowedPages } = configs?.data[0] || {}
  const [localConfigs, setLocalConfigs] = useState({ ...default_basic_configs, ...basicConfigs });
  const [localAdvancedConfigs, setLocalAdvancedConfigs] = useState({ ...default_advanced_configs, ...advancedConfigs });
  const secondaryLocales = shopInfo?.shopLocales?.filter(
    (item) => !item.primary,
  );

  // async function saveConfigs() {
  //   submit(
  //     {
  //       _action: ACTIONS.CreateUpdateConfigs,
  //       data: {
  //         basicConfigs: localConfigs,
  //         advancedConfigs: localAdvancedConfigs,
  //       },
  //     },
  //     requestHeaders,
  //   );
  // }

  async function handleCustomCodeSave() {
    if (!appId) return;
    submit(
      {
        _action: ACTIONS.WidgetDisplayCustomRuleCodeSave,
        data: {
          appId,
          data: customCode,
        },
      },
      requestHeaders,
    );
  }

  async function handleCustomCodeStatus(value: string) {
    if (!appId) return;
    submit(
      {
        _action: ACTIONS.WidgetDisplayCustomRuleStatus,
        data: {
          appId,
          data: value,
        },
      },
      requestHeaders,
    );
  }

  console.log('widgetEditorStatus', widgetEditorStatus);

  const loading = loadingStates(navigation, [ACTIONS.WidgetDisplayCustomRuleCodeSave, ACTIONS.WidgetDisplayCustomRuleStatus]) as LoadingStates;
  return (
    <Page
      fullWidth
      compactTitle
      title="Widget display custom rule"
      backAction={{
        content: "Back", onAction: () => navigate("/app/redirects#code-editor", {
          viewTransition: true,
          preventScrollReset: true,
        })
      }}
      primaryAction={{ content: "Save", onAction: handleCustomCodeSave, loading: loading[ACTIONS.WidgetDisplayCustomRuleCodeSave + "Loading"] }}
    >
      <BlockStack gap="400">
        <WidgetDisplayCustomRuleBanner />
        <div style={{ position: "relative" }}>
          <Suspense fallback={<Spinner size="small" />}>
            <Await resolve={widgetEditorStatus}>
              {(status) => {
                return <Select
                  label="Status: "
                  labelInline
                  options={[
                    { label: "Active", value: "true" },
                    { label: "Draft", value: "false" },
                  ]}
                  disabled={loading[ACTIONS.WidgetDisplayCustomRuleStatus + "Loading"] || !isProPlan}
                  onChange={
                    isProPlan
                      ? (value) => handleCustomCodeStatus(value)
                      : undefined
                  }
                  value={status?.value}
                />
              }}
            </Await>
            {loading[ACTIONS.WidgetDisplayCustomRuleStatus + "Loading"] && (
              <div style={{ position: "absolute", top: "6px", right: "8px", zIndex: 10 }}>
                <Spinner size="small" />
              </div>
            )}
          </Suspense>
        </div>

        <Card>
          <WidgetDisplayCustomRuleCodeBanner /><br />
          <Suspense fallback={<Spinner size="small" />}>
            <Await resolve={widgetEditorCode}>
              {(code) => {
                return <CodeEditor code={code?.value || defaultWidgetCode} onChange={isProPlan ? setCustomCode : () => { }} language="javascript" />
              }}
            </Await>
          </Suspense>
        </Card>
      </BlockStack>
    </Page>
  );
}
