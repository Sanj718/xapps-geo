import { BlockStack, Card, Page, Select, Spinner } from "@shopify/polaris";
import { loadingStates, requestHeaders, defaultWidgetCode, planParser, defaultAutoRedirectsCode } from "../../components/_helpers";
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
import AutoRedirectDisplayCustomRuleCodeBanner from "app/components/auto-redirects/AutoRedirectDisplayCustomRuleCodeBanner";
import AutoRedirectDisplayCustomRuleBanner from "app/components/auto-redirects/AutoRedirectDisplayCustomRuleBanner";
export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);


export default function AutoRedirectsCustomRulePage() {
  const { activePlan, appId } = useOutletContext<OutletContext>();
  const { isProPlan } = planParser(activePlan);
  const { autoRedirectsCustomCodeStatus, autoRedirectsCustomCode } = useLoaderData<typeof loader>();
  const submit = useSubmit()
  const navigation = useNavigation()
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
    <Page
      fullWidth
      compactTitle
      title="Auto redirects custom rule"
      backAction={{
        content: "Back", onAction: () => navigate("/app/redirects?tab=1#auto-redirects-code-editor", {
          viewTransition: true,
          preventScrollReset: true,
        })
      }}
      primaryAction={{ content: "Save", onAction: handleCustomCodeSave, loading: loading[ACTIONS.update_AutoRedirectsCustomCode + "Loading"] }}
    >
      <BlockStack gap="200">
        <AutoRedirectDisplayCustomRuleBanner />
        <div style={{ position: "relative" }}>
          <Suspense fallback={<Spinner size="small" />}>
            <Await   resolve={autoRedirectsCustomCodeStatus}>
              {(data: any) => (
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
                  value={data?.value || "false"}
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
        <Card>
          <AutoRedirectDisplayCustomRuleCodeBanner /><br />
          <div
            className="code-editor"
            style={{
              opacity: isProPlan ? 1 : 0.3,
              pointerEvents: isProPlan ? "initial" : "none",
            }}
          >
            <Suspense fallback={<Spinner size="small" />}>
              <Await resolve={autoRedirectsCustomCode}>
                {(code) => {
                  return <CodeEditor code={code?.value || defaultAutoRedirectsCode} onChange={isProPlan ? setCustomCode : () => { }} language="javascript" />
                }}
              </Await>
            </Suspense>
          </div>
        </Card>
      </BlockStack>
    </Page>
  );
}
