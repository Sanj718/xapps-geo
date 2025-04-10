import { useOutletContext } from "@remix-run/react";
import {
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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { OutletContext } from "../_types";
import { planParser } from "../_helpers";
import PromoBadge from "../_common/PromoBadge";
// import { AppContext } from "../AppContext";
// import { planParser } from "../../helpers";
// import {
//   GET_BUTTON_EDITOR,
//   GET_BUTTON_EDITOR_STATUS,
//   UPDATE_BUTTON_EDITOR,
//   UPDATE_BUTTON_EDITOR_STATUS,
// } from "../../../helpers/endpoints";
// import tr from "../../helpers/translations.json";
// import { useAuthenticatedFetch } from "../../hooks";
// import { Editor } from "@monaco-editor/react";
// import { PromoBadge } from "../PromoBadge";

const defaultWidgetCode = `/*
  @property {object} geolocation - Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.
  @property {object} redirectButton - Data of redirect button, example: {"flag":"https://....", "label": "Canada", order_r: 1, url: "https://...."}
  @return {boolean} - return false to hide button.
*/
function run(geolocation, redirectButton) {
  if(geolocation.country === "CA" && redirectButton.label === "Canada"){
    return false;
  }
  return true;
}
`;

export default function ButtonDisplayCustomRule() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
      useOutletContext<OutletContext>();
    const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [loading, setLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const [customCodeStatus, setCustomCodeStatus] = useState("false");

  async function loadData() {
    // setLoading(true);
    // try {
    //   const responseEditor = await fetch(GET_BUTTON_EDITOR);
    //   const responseEditorJson = await responseEditor.json();

    //   if (responseEditorJson?.status) {
    //     const widgetEditorData =
    //       responseEditorJson?.data?.body?.data?.appInstallation?.metafield
    //         ?.value || "";
    //     setCustomCode(widgetEditorData);
    //   }

    //   const responseEditorStatus = await fetch(GET_BUTTON_EDITOR_STATUS);
    //   const responseEditorStatusJson = await responseEditorStatus.json();

    //   if (responseEditorStatusJson?.status) {
    //     const widgetEditorStatus =
    //       responseEditorStatusJson?.data?.body?.data?.appInstallation?.metafield
    //         ?.value || "false";
    //     setCustomCodeStatus(widgetEditorStatus);
    //     if (widgetEditorStatus !== "false" && !isProPlan) {
    //       const customAppId =
    //         responseEditorStatusJson?.data?.body?.data?.appInstallation?.id;
    //       handleCustomCodeStatus("false", customAppId);
    //     }
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // setLoading(false);
  }

  // useMemo(() => {
  //   loadData();
  // }, []);

  async function handleCustomCodeStatus(value, appId) {
    // setLoading(true);
    // let error = true;
    // let msg = "Error: appId not found";

    // if (appId) {
    //   setCustomCodeStatus(value);
    //   try {
    //     const response = await fetch(UPDATE_BUTTON_EDITOR_STATUS, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       method: "post",
    //       body: JSON.stringify({
    //         appId,
    //         data: value,
    //       }),
    //     });
    //     const responseJson = await response.json();

    //     if (responseJson?.status) {
    //       error = false;
    //       msg = tr.responses.rd_status_success;
    //       loadData();
    //     } else {
    //       msg = tr.responses.error;
    //     }
    //   } catch (err) {
    //     console.error("Fetch error:", err.message);
    //   }
    // }

    // setToastData({
    //   error,
    //   msg,
    // });
    // setLoading(false);
  }

  async function handleCustomCodeSave() {
    // setLoading(true);
    // let error = true;
    // let msg = "Error";
    // const data = customCode || defaultWidgetCode;

    // if (data !== "") {
    //   try {
    //     const response = await fetch(UPDATE_BUTTON_EDITOR, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       method: "post",
    //       body: JSON.stringify({
    //         appId,
    //         data,
    //       }),
    //     });
    //     const responseJson = await response.json();

    //     if (responseJson?.status) {
    //       error = false;
    //       msg = tr.responses.rd_status_success;
    //       loadData();
    //     } else {
    //       msg = tr.responses.error;
    //     }
    //   } catch (err) {
    //     console.error("Fetch error:", err.message);
    //   }
    // }

    // setToastData({
    //   error,
    //   msg,
    // });
    // setLoading(false);
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
              <PromoBadge type="pro" />
              <Text as="h3" variant="headingMd">
                Button display custom rule
              </Text>
              <Text as="p" variant="bodyMd">
                Easily implement your custom logic for buttons display. Make
                sure to <strong>activate it only if you're a developer</strong>{" "}
                and at your own risk. Reach out to us for personalized
                customization options.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <Card roundedAbove="sm">
          <InlineGrid gap="200">
            <Banner>
              Activating this feature will disable redirect item{" "}
              <strong>"Enable conditional show"</strong> checkbox, as custom
              code will take over.
            </Banner>
            <div style={{ position: "relative" }}>
              <Select
                label="Status: "
                labelInline
                options={[
                  { label: "Active", value: "true" },
                  { label: "Draft", value: "false" },
                ]}
                disabled={loading || !isProPlan}
                onChange={
                  isProPlan
                    ? (value) => handleCustomCodeStatus(value, appId)
                    : undefined
                }
                value={customCodeStatus}
              />
              {loading && (
                <div style={{ position: "absolute", top: "6px", right: "8px" }}>
                  <Spinner size="small" />
                </div>
              )}
            </div>
            <div
              className="code-editor"
              style={{
                opacity: isProPlan ? 1 : 0.3,
                pointerEvents: isProPlan ? "initial" : "none",
              }}
              onClick={() => setModalStatus(true)}
            >
              {/* <Editor
                loading={true}
                width="100%"
                height="200px"
                language="javascript"
                defaultLanguage="javascript"
                defaultValue={loading ? "" : defaultWidgetCode}
                value={customCode ? customCode : defaultWidgetCode}
                // @ts-ignore
                onChange={isProPlan ? setCustomCode : () => {}}
                options={{
                  readOnly: false,
                  minimap: { enabled: false },
                }}
              /> */}
            </div>
          </InlineGrid>
        </Card>
      </InlineGrid>
      {/* <Modal
        size="large"
        open={modalStatus}
        onClose={() => setModalStatus(false)}
        title="Button display custom rule"
        footer={
          <InlineStack align="space-between">
            <div className="customizer-footer"></div>
            <Button
              onClick={async () => {
                await handleCustomCodeSave();
                setModalStatus(false);
              }}
              loading={loading}
              variant="primary"
            >
              Save
            </Button>
          </InlineStack>
        }
      >
        <Modal.Section>
          <Editor
            loading={true}
            width="100%"
            height="500px"
            language="javascript"
            defaultLanguage="javascript"
            defaultValue={loading ? "" : defaultWidgetCode}
            value={customCode ? customCode : defaultWidgetCode}
            // @ts-ignore
            onChange={isProPlan ? setCustomCode : undefined}
            options={{
              readOnly: false,
              minimap: { enabled: false },
            }}
          />
        </Modal.Section>
      </Modal> */}
    </>
  );
}
