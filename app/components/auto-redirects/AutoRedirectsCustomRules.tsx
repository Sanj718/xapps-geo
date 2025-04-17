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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContext";
import { planParser } from "../../helpers";
import {
  GET_AUTO_REDIRECTS_EDITOR,
  GET_AUTO_REDIRECTS_EDITOR_STATUS,
  UPDATE_AUTO_REDIRECT_EDITOR,
  UPDATE_AUTO_REDIRECT_EDITOR_STATUS,
  UPDATE_WIDGET_EDITOR,
  UPDATE_WIDGET_EDITOR_STATUS,
} from "../../../helpers/endpoints";
import tr from "../../helpers/translations.json";
import { useAuthenticatedFetch } from "../../hooks";
import { Editor } from "@monaco-editor/react";
import { PromoBadge } from "../PromoBadge";

const defaultWidgetCode = `/*
  Auto redirection custom code is for adding/editing your custom logic for existing auto-redirects. This will not work on its own, you have to add at least one redirection rule.
  @property {string} redirectUrl - Redirect url added in app admin.
  @property {string} currentUrl - Current client visited page url added.
  @property {object} geolocation - Geolocation data of user, example: {"country_name":"Canada","country":"CA","continent":"NA"}.
  @property {function} forceRedirect - Force redirect by ingoring any other redirection rules. Accepts one argument type {string}. Example: forceRedirect("https://your-url.com")
  @return {string} - Modified string of url to be redirected. If empty string user will be redirected based on app admin logic.
*/
function pattern(redirectUrl, currentUrl, geolocation, forceRedirect) {
  let newUrl = "";
  // your logic
  // force redirection logic: 
  // if(gelocation.country === "CA"){
  //   return forceRedirect("https://your-url.com")
  // }
  return newUrl;
}
`;

export default function AutoRedirectsCustomRules({ appId, setToastData }) {
  const fetch = useAuthenticatedFetch();
  const { activePlan } = useContext(AppContext);
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [loading, setLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const [customCodeStatus, setCustomCodeStatus] = useState("false");

  async function loadData() {
    setLoading(true);
    try {
      const responseEditor = await fetch(GET_AUTO_REDIRECTS_EDITOR);
      const responseEditorJson = await responseEditor.json();

      if (responseEditorJson?.status) {
        const editorData =
          responseEditorJson?.data?.body?.data?.appInstallation?.metafield
            ?.value || "";
        setCustomCode(editorData);
      }

      const responseEditorStatus = await fetch(
        GET_AUTO_REDIRECTS_EDITOR_STATUS
      );
      const responseEditorStatusJson = await responseEditorStatus.json();
      if (responseEditorStatusJson?.status) {
        const editorStatus =
          responseEditorStatusJson?.data?.body?.data?.appInstallation?.metafield
            ?.value || "true";
        setCustomCodeStatus(editorStatus);
        if (editorStatus !== "false" && !isProPlan) {
          const customAppId =
            responseEditorStatusJson?.data?.body?.data?.appInstallation?.id;
          handleCustomCodeStatus("false", customAppId);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useMemo(() => {
    loadData();
  }, []);

  async function handleCustomCodeStatus(value, appId) {
    setLoading(true);
    let error = true;
    let msg = "Error: appId not found";

    if (appId) {
      setCustomCodeStatus(value);
      try {
        const response = await fetch(UPDATE_AUTO_REDIRECT_EDITOR_STATUS, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({
            appId,
            data: value,
          }),
        });
        const responseJson = await response.json();

        if (responseJson?.status) {
          error = false;
          msg = tr.responses.rd_status_success;
          loadData();
        } else {
          msg = tr.responses.error;
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    }

    setToastData({
      error,
      msg,
    });
    setLoading(false);
  }
  async function handleCustomCodeSave() {
    setLoading(true);
    let error = true;
    let msg = "Error: data is empty";
    const data = customCode || defaultWidgetCode;

    if (data !== "") {
      try {
        const response = await fetch(UPDATE_AUTO_REDIRECT_EDITOR, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({
            appId,
            data,
          }),
        });
        const responseJson = await response.json();

        if (responseJson?.status) {
          error = false;
          msg = tr.responses.rd_status_success;
          loadData();
        } else {
          msg = tr.responses.error;
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    }

    setToastData({
      error,
      msg,
    });
    setLoading(false);
  }
  // console.log("customCodeStatus", customCodeStatus);
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
            <Banner>
              Please ensure to <strong>add at least one auto redirect</strong>{" "}
              item before implementing any custom auto-redirect code.
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
              <Editor
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
              />
            </div>
          </InlineGrid>
        </Card>
      </InlineGrid>
      <Modal
        size="large"
        open={modalStatus}
        onClose={() => setModalStatus(false)}
        title="Auto redirects custom rule"
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
      </Modal>
    </>
  );
}
