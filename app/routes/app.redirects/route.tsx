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
import RedirectsList from "../../components/popup-redirects/RedirectsList";
import { useActionData, useLoaderData, useOutletContext, useSearchParams } from "@remix-run/react";
import { AutoRedirectItem, OutletContext, RedirectItem } from "app/components/_types";
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
import AutoRedirects from "app/components/auto-redirects/AutoRedirectsList";
import { DomainRedirectIcon } from "@shopify/polaris-icons";
import AutoRedirectsSettings from "app/components/auto-redirects/AutoRedirectsSettings";
import AutoRedirectsCustomRule from "app/components/auto-redirects/AutoRedirectsCustomRule";


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
  const { allRedirects, configs, widgetEditorStatus, widgetEditorCode, buttonEditorStatus, buttonEditorCode, allAutoRedirects, autoRedirectsCustomCodeStatus, autoRedirectsCustomCode } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(null);
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [autoRedirects, setAutoRedirects] = useState<AutoRedirectItem[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { smUp } = useBreakpoints();
  useMemo(() => {
    const orderedRedirects: RedirectItem[] = allRedirects?.data?.sort((a: RedirectItem, b: RedirectItem) => a.order - b.order);
    setRedirects(orderedRedirects || []);
  }, [allRedirects]);

  useMemo(() => {
    const orderedAutoRedirects: AutoRedirectItem[] = allAutoRedirects?.data?.sort((a: AutoRedirectItem, b: AutoRedirectItem) => JSON.parse(a.node.value).order_r - JSON.parse(b.node.value).order_r);
    setAutoRedirects(orderedAutoRedirects || []);
  }, [allAutoRedirects]);

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

  useMemo(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedTab(parseInt(tab));
    }
  }, [searchParams]);

  return (
    <Page>
      <div id="main-screen">
        <PageTitle
          icon={DomainRedirectIcon}
          title="Custom redirects"
          status={active}
          loading={false}
          embedPath={`${EMBED_APP_ID}/${EMBED_APP_HANDLE}`}
        />
        <br />
        <Tabs
          tabs={mainTabs}
          selected={selectedTab}
          onSelect={(value) => {
            setSelectedTab(value);
            const params = new URLSearchParams();
            params.set("tab", value.toString());
            setSearchParams(params, {
              preventScrollReset: true,
            });
          }}
          fitted
        >
          <br />
          {selectedTab === 0 ? (
            <BlockStack gap={{ xs: "800", sm: "400" }}>
              <RedirectsList redirects={redirects} />
              {smUp ? <Divider /> : null}
              <ContentStyle redirects={redirects} configs={configs} />
              {smUp ? <Divider /> : null}
              <PopupDisplaySettings configs={configs} />
              {smUp ? <Divider /> : null}
              <OtherSettings configs={configs} />
              {smUp ? <Divider /> : null}
              <WidgetDisplayCustomRule status={widgetEditorStatus} code={widgetEditorCode} />
              {smUp ? <Divider /> : null}
              <ButtonDisplayCustomRule status={buttonEditorStatus} code={buttonEditorCode} />
            </BlockStack>
          ) : (
            ""
          )}
          {selectedTab === 1 ? (
            <BlockStack gap={{ xs: "800", sm: "400" }}>
              <AutoRedirects
                redirects={autoRedirects}
              />
              {smUp ? <Divider /> : null}
              <AutoRedirectsSettings />
              {smUp ? <Divider /> : null}
              <AutoRedirectsCustomRule status={autoRedirectsCustomCodeStatus} code={autoRedirectsCustomCode} />
            </BlockStack>
          ) : (
            ""
          )}
        </Tabs>
        <br />
      </div>
    </Page>
  );
}
