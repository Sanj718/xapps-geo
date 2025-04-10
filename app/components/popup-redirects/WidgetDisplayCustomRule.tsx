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
  List
} from "@shopify/polaris";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import React, { Suspense, useContext, useEffect, useMemo, useState } from "react";
// import { AppContext } from "../AppContext";
// import { planParser } from "../../helpers";
// import {
//   GET_WIDGET_EDITOR,
//   GET_WIDGET_EDITOR_STATUS,
//   UPDATE_WIDGET_EDITOR,
//   UPDATE_WIDGET_EDITOR_STATUS,
// } from "../../../helpers/endpoints";
// import tr from "../../helpers/translations.json";
// import { useAuthenticatedFetch } from "../../hooks";
// import { Editor } from "@monaco-editor/react";
// import { PromoBadge } from "../PromoBadge"; 
import { Await, useActionData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext } from "../_types";
import { loadingStates, planParser, requestHeaders } from "../_helpers";
import PromoBadge from "../_common/PromoBadge";
import CodeEditor from "../_common/CodeEditor.client";
import { ACTIONS } from "../_actions";

const defaultWidgetCode = `/*
  @property {object} geolocation - Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.
  @property {function} openModal - Function to open modal.
  @property {boolean} hasBeenClosed - Modal closed state, saved in cookies/session (configured in Settings & style tab). Returns "1" (type string) if closed.
*/
function run(geolocation, openModal, hasBeenClosed) {
  if(geolocation.country === "CA" && hasBeenClosed !== "1"){
    //openModal()
  }
}
`;

interface WidgetDisplayCustomRuleProps {
  status: {
    value: string;
  };
  code: {
    value: string;
  };
}

export default function WidgetDisplayCustomRule({ status, code }: WidgetDisplayCustomRuleProps) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  // const { basicConfigs, advancedConfigs, hideOnAllowedPages, allowedPages } = configs?.data[0] || {}
  const submit = useSubmit()
  const actionData = useActionData();
  const navigation = useNavigation();
  const [customCode, setCustomCode] = useState(defaultWidgetCode);
  const [customCodeStatus, setCustomCodeStatus] = useState("false");
  const [renderEditor, setRenderEditor] = useState(false);
  const [renderEditorModal, setRenderEditorModal] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setRenderEditor(true);
    }, 1000);
  }, [customCodeStatus]);

  useMemo(() => {
    // if (actionData?._action === "analyticsData" && actionData?.status) {
    //   setStoreAnalytics(actionData?.data);
    // }
  }, [actionData]);


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
    // shopify.modal.hide('display-custom-rule')
  }

  const loading = loadingStates(navigation, [ACTIONS.WidgetDisplayCustomRuleStatus, ACTIONS.WidgetDisplayCustomRuleCodeSave]) as LoadingStates;
  console.log('actionData', actionData);
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
          <Banner>
            Activating this feature will disable all settings under{" "}
            <strong>"Popup display settings"</strong> except the{" "}
            <strong>"Display frequency"</strong> option, as custom code will
            take over.
          </Banner>
          <div style={{ position: "relative" }}>
            <Suspense fallback={<Spinner size="small" />}>
              <Await resolve={status}>
                {(status) => {
                  // setCustomCodeStatus(status?.value);
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
          <div
            className="code-editor"
            style={{
              opacity: isProPlan ? 1 : 0.3,
              pointerEvents: isProPlan ? "initial" : "none",
            }}
            // onClick={() => shopify.modal.show("display-custom-rule")}
          >
            <Suspense fallback={<Spinner size="small" />}>
              <Await resolve={code}>
                {(code) => {
                  return renderEditor && <CodeEditor code={code?.value || defaultWidgetCode} onChange={isProPlan ? setCustomCode : () => { }} language="javascript" />
                }}
              </Await>
            </Suspense>
          </div>
        </InlineGrid>
      </Card>
    </InlineGrid>

    <Modal id="display-custom-rule" variant="max" onShow={() => setRenderEditorModal(true)}>
      <TitleBar title="Widget display custom rule">
        <button
          variant="primary"
          onClick={() => handleCustomCodeSave()}
          loading={loading[ACTIONS.WidgetDisplayCustomRuleCodeSave + "Loading"] ? "loading" : false}
        >
          Save
        </button>
        <button onClick={() => shopify.modal.hide('display-custom-rule')}>Close</button>
      </TitleBar>
      <Box padding="200">
        <Banner >
          <List type="bullet" gap="extraTight">
            <List.Item><code>{`@property {object} geolocation`}</code> - {`Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.`}</List.Item>
            <List.Item><code>{`@property {function} openModal`}</code> - {`Function to open modal.`}</List.Item>
            <List.Item><code>{`@property {boolean} hasBeenClosed`}</code> - {`Modal closed state, saved in cookies/session (configured in Settings & style tab). Returns "1" (type string) if closed.`}</List.Item>
          </List>
        </Banner>
      </Box>
      <Suspense fallback={<Spinner size="small" />}>
        <Await resolve={code}>
          {(code) => {
            return renderEditorModal && <CodeEditor code={code?.value || defaultWidgetCode} onChange={isProPlan ? setCustomCode : () => { }} language="javascript" />
          }}
        </Await>
      </Suspense>
    </Modal >
  </>
}
