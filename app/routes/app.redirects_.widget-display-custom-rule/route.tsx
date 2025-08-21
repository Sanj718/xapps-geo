import { BlockStack, Card, Page, Select, Spinner } from "@shopify/polaris";
import { loadingStates, requestHeaders, defaultWidgetCode, planParser } from "../../components/_helpers";
import { Suspense, useState } from "react";
import { Await, useLoaderData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext } from "app/components/_types";
import { handleActions } from "./_actions";
import { handleLoaders } from "./_loaders";
import { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ACTIONS } from "app/components/_actions";
import CodeEditor from "app/components/_common/CodeEditor.client";
import WidgetDisplayCustomRuleBanner from "../../components/popup-redirects/WidgetDisplayCustomRuleBanner";
import WidgetDisplayCustomRuleCodeBanner from "app/components/popup-redirects/WidgetDisplayCustomRuleCodeBanner";
export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);


export default function WidgetDisplayCustomRulePage() {
  const { activePlan, appId } = useOutletContext<OutletContext>();
  const { isProPlan } = planParser(activePlan);
  const { widgetEditorStatus, widgetEditorCode } = useLoaderData<typeof loader>();
  const submit = useSubmit()
  const navigation = useNavigation()
  const navigate = useNavigate();
  const [customCode, setCustomCode] = useState(defaultWidgetCode);

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

  const loading = loadingStates(navigation, [ACTIONS.update_WidgetDisplayCustomRuleCode, ACTIONS.update_WidgetDisplayCustomRuleStatus]) as LoadingStates;
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
      primaryAction={{ content: "Save", onAction: handleCustomCodeSave, loading: loading[ACTIONS.update_WidgetDisplayCustomRuleCode + "Loading"] }}
    >
      <BlockStack gap="200">
        <WidgetDisplayCustomRuleBanner />
        <div style={{ position: "relative" }}>
          <Suspense fallback={<Spinner size="small" />}>
            <Await resolve={widgetEditorStatus}>
              {(status: Record<string, string> | null) => {
                return <Select
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
              }}
            </Await>
            {loading[ACTIONS.update_WidgetDisplayCustomRuleStatus + "Loading"] && (
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
              {(code: Record<string, string> | null) => {
                return <CodeEditor code={code?.value || defaultWidgetCode} onChange={isProPlan ? setCustomCode : () => { }} language="javascript" />;
              }}
            </Await>
          </Suspense>
        </Card>
      </BlockStack>
    </Page>
  );
}
