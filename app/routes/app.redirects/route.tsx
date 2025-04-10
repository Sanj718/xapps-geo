import {
  Page,
  BlockStack,
  Tabs,
  Divider,
  useBreakpoints,
} from "@shopify/polaris";
import { PageTitle } from "../../components/_common/PageTitle";
import { getEmbedConst } from "../../components/_helpers";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../components/env";
import { Suspense, useMemo, useState } from "react";
import RedirectItems from "../../components/popup-redirects/RedirectItems";
import { Await, useActionData, useLoaderData, useOutletContext } from "@remix-run/react";
import { OutletContext, RedirectItem } from "app/components/_types";
import ContentStyle from "app/components/popup-redirects/ContentStyle";
import { handleActions } from "./_actions";
import { handleLoaders } from "./_loaders";
import tr from "../../components/locales.json";
import PopupDisplaySettings from "app/components/popup-redirects/PopupDisplaySettings";
import OtherSettings from "app/components/popup-redirects/OtherSettings";
import WidgetDisplayCustomRule from "app/components/popup-redirects/WidgetDisplayCustomRule";
import ButtonDisplayCustomRule from "app/components/popup-redirects/ButtonDisplayCustomRule";
import { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";


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



// [TODO] find correct way to add ts check here.
export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);


export default function CustomRedirects() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { allRedirects, configs, widgetEditorStatus, widgetEditorCode } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const [toastData, setToastData] = useState({ msg: "", error: false });
  const [active, setActive] = useState(null);
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { smUp } = useBreakpoints();
  // const [initialLoading, setInitialLoading] = useState(false);
  // const [errors, setErrors] = useState([]);

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


  return (
    <Page>
      <PageTitle
        title="Custom redirects"
        status={active}
        loading={false}
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
            <RedirectItems redirects={redirects} />
            {smUp ? <Divider /> : null}
            <ContentStyle redirects={redirects} configs={configs} />
            {smUp ? <Divider /> : null}
            <PopupDisplaySettings configs={configs} />
            {smUp ? <Divider /> : null}
            <OtherSettings configs={configs} />
            {smUp ? <Divider /> : null}
            <WidgetDisplayCustomRule status={widgetEditorStatus} code={widgetEditorCode} />
            {smUp ? <Divider /> : null}
            <ButtonDisplayCustomRule />
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
