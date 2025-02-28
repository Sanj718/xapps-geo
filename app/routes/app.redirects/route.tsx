import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  Tabs,
  Divider,
  useBreakpoints,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { PageTitle } from "../../components/_common/PageTitle";
import { getEmbedConst } from "../../components/_helpers";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../components/env";
import { useMemo, useState } from "react";
import RedirectItems from "../../components/popup-redirects/RedirectItems";
import { ClientActionFunctionArgs, useActionData, useLoaderData, useOutletContext } from "@remix-run/react";
import { authenticate } from "../../shopify.server";
import { getAssets } from "../../components/_actions";
import tr from "../../components/locales.json";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, RD_EMBED_APP_HANDLE) || {};

const mainTabs = [
  {
    id: "popup",
    content: "Popup redirects",
  },
  {
    id: "auto",
    content: "Auto redirects",
  },
];

const defaultAllowedConfigs = {
  allowed_pages: ["all"],
  hide_on_allowed_pages: false,
};

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { OutletContext, RedirectItem } from "app/components/_types";
import { createRedirect, deleteRedirect, getAllRedirects, reorderRedirect, updateRedirect, updateRedirectStatus } from "app/db-queries.server";
import ContentStyle from "app/components/popup-redirects/ContentStyle";
import { handleActions } from "./_actions";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const allRedirects = await getAllRedirects({ shop: session.shop });
  // const { id } = params;
  // const { admin, session } = await authenticate.admin(request);
  // if (params.id === "new") {
  //   return json({ discount: "new" });
  // }
  // const discount = await getDiscount(admin, id);
  return { allRedirects };
};

export const action = async (params) => handleActions(params);


export default function CustomRedirects() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { allRedirects } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const [errors, setErrors] = useState([]);
  const [toastData, setToastData] = useState({ msg: "", error: false });
  const [initialLoading, setInitialLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { smUp } = useBreakpoints();

  useMemo(() => {
    if (allRedirects?.status) {
      const orderedRedirects: RedirectItem[] = allRedirects.data.sort((a: RedirectItem, b: RedirectItem) => a.order - b.order);
      setRedirects(orderedRedirects);
    }
  }, [allRedirects]);

  // useMemo(() => {
  //   if (actionData?.status) {
  //     setToastData({ error: false, msg: tr.responses.success });
  //   }
  // }, [actionData]);

  async function loadRedirects() {
    let error = true;
    // let msg = tr.responses.error;

    // await getLocalShopData();
    // const locales = shopData?.locales || localShopLocales;

    try {
      // const response = await fetch(
      //   GET_REDIRECTS + `?localesAllowed=${locales && locales.length ? 1 : 0}`
      // );
      // const responseJson = await response.json();
      // if (responseJson?.status) {
      //   const ordered = responseJson.data.sort((a, b) => a.order_r - b.order_r);
      //   setRedirects(ordered);
      //   error = false;
      // }
    } catch (err) {
      console.log(err);
    }

    // if (error) {
    //   setToastData({
    //     error,
    //     msg,
    //   });
    // }
  }

  useMemo(() => {
    // if (actionData && !actionData?.data?.status) {
    //   shopify.toast.show("Error, try again.", { isError: true });
    //   if (actionData?.data?.errors?.length) {
    //     setErrors(actionData.data.errors);
    //   }
    // } else {
    //   setErrors([]);
    // }
    // if (
    //   (actionData?._action === "new" || actionData?._action === "edit") &&
    //   actionData?._status
    // ) {
    //   const { discountId, discountClass } =
    //     actionData?.data?.discountCreate?.codeAppDiscount ||
    //     actionData?.data?.discountCreate?.automaticAppDiscount ||
    //     {};
    //   const url = getDiscountUrl(discountId, discountClass, true);
    //   if (url) navigate(url);
    // }
    // if (actionData?._action === "discountDelete" && actionData?._status) {
    //   navigate("/app");
    // }
  }, [actionData]);

  // console.log("shopInfo", shopInfo, appId, appData);
  return (
    <Page>
      <PageTitle
        title="Custom redirects"
        status={active}
        loading={initialLoading}
        embedPath={`${EMBED_APP_ID}/${EMBED_APP_HANDLE}`}
      />
      <br />
      <Tabs
        tabs={mainTabs}
        selected={selectedTab}
        onSelect={setSelectedTab}
        fitted
      >
        <br />
        {selectedTab === 0 ? (
          <BlockStack gap={{ xs: "800", sm: "400" }}>
            <RedirectItems
              redirects={redirects}
              setToastData={setToastData}
            />
            {smUp ? <Divider /> : null}
            <ContentStyle
              redirects={redirects}
            // reFetch={setRefetchSettings}
            // configs={localConfigs}
            // setConfigs={setLocalConfigs}
            // advancedConfigs={localAdvancedConfigs}
            // setAdvancedConfigs={setLocalAdvancedConfigs}
            // secondaryLocales={secondaryLocales}
            // setToastData={setToastData}
            />
            {/* {smUp ? <Divider /> : null}
            <PopupDisplaySettings
              initialLoading={initialLoading}
              reFetch={setRefetchSettings}
              configs={localConfigs}
              setConfigs={setLocalConfigs}
              advancedConfigs={localAdvancedConfigs}
              pageVisibility={localPageVisibility}
              setPageVisibility={setLocalPageVisibility}
              setToastData={setToastData}
            /> */}
            {/* {smUp ? <Divider /> : null}
            <OtherSettings
              originConfigs={configs}
              originAdvancedConfigs={advancedConfigs}
              reFetch={setRefetchSettings}
              configs={localConfigs}
              setConfigs={setLocalConfigs}
              setToastData={setToastData}
            /> */}
            {/* {smUp ? <Divider /> : null}
            <WidgetDisplayCustomRule
              appId={appId}
              setToastData={setToastData}
            />
            {smUp ? <Divider /> : null}
            <ButtonDisplayCustomRule
              appId={appId}
              setToastData={setToastData}
            /> */}
          </BlockStack>
        ) : (
          ""
        )}
        {/* {selectedTab === 1 ? (
          <BlockStack gap={{ xs: "800", sm: "400" }}>
            <AutoRedirects
              initialLoading={initialLoading}
              loadRedirects={loadAutoRedirects}
              setRedirects={setAutoRedirects}
              redirects={autoRedirects}
              setToastData={setToastData}
              appId={appId}
            />
            {smUp ? <Divider /> : null}
            <AutoRedirectsSettings />
            {smUp ? <Divider /> : null}
            <AutoRedirectsCustomRules
              appId={appId}
              setToastData={setToastData}
            />
          </BlockStack>
        ) : (
          ""
        )} */}
      </Tabs>
      {toastData?.msg !== "" &&
        shopify.toast.show(toastData.msg, { isError: toastData.error })}
      <br />
    </Page>
  );
}
