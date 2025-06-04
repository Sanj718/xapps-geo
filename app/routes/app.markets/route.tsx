import {
  Page,
  Toast,
  Frame,
  Tabs,
  BlockStack,
  Divider,
  useBreakpoints,
} from "@shopify/polaris";
import React, { useState, useContext, useMemo } from "react";
import { getEmbedConst, isJson, defaultState, default_markets_basic_configs, default_advanced_configs, planParser, requestHeaders } from "../../components/_helpers";
// import { getEmbedConst, isJson, defaultState } from "app/components/_helpers";
// import { MarketsSettings } from "../../components/MarketsSettings";
// import MarketsPopupControls from "../components/markets-popup/MarketsPopupControls";
// import MarketsAutoControls from "../components/markets-auto-redirects/MarketsAutoControls";
// import MarketsAutoSettings from "../components/markets-auto-redirects/MarketsAutoSettings";
// import MarketsContentStyle from "../components/markets-popup/MarketsContentStyle";
// import MarketsPopupDisplaySettings from "../components/markets-popup/MarketsPopupDisplaySettings";
// import MarketsOtherSettings from "../components/markets-popup/MarketsOtherSettings";
import { handleActions } from "./_actions";
import { handleLoaders } from "./_loaders";
import {
  DEV_EMBED_APP_ID,
  MK_EMBED_APP_HANDLE,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../components/env";
import { PageTitle } from "app/components/_common/PageTitle";
import {
  MarketsIcon
} from '@shopify/polaris-icons';
import MarketsOtherSettings from "app/components/markets-popup/MarketsOtherSettings";
import MarketsAutoSettings from "app/components/markets-auto-redirects/MarketsAutoSettings";
import MarketsPopupControls from "app/components/markets-popup/MarketsPopupControls";
import { useActionData, useLoaderData, useOutletContext, useSubmit } from "@remix-run/react";
import { ACTIONS } from "app/components/_actions";
import { ActionReturn, OutletContext } from "app/components/_types";
import tr from "../../components/locales.json";
import { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, MK_EMBED_APP_HANDLE) || {};

// [TODO] find correct way to add ts check here.
export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);



const mainTabs = [
  {
    id: "markets-popup",
    content: "Markets popup",
  },
  {
    id: "markets-auto",
    content: "Markets auto redirect",
  },
];
let timesRun = 0;
let interval: NodeJS.Timeout;
export default function MarketsRedirects() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const { marketsConfigs, marketsData } = useLoaderData<typeof loader>();
  // const { basicConfigs, advancedConfigs, hideOnAllowedPages, allowedPages } = configs?.data[0] || {}
  // const { activePlan, shopData, appId } = useContext(AppContext);
  // const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  // const redirect = Redirect.create(useAppBridge());
  // const fetch = useAuthenticatedFetch();
  const { smUp } = useBreakpoints();
  const submit = useSubmit();
  const actionData = useActionData<ActionReturn>();
  const [initialLoading, setInitialLoading] = useState(true);
  const [secondaryLocales, setSecondaryLocales] = useState(null);
  const [toastData, setToastData] = useState(defaultState);
  const [marketsSyncLoading, setMarketsSyncLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  // const [marketsPopup, setMarketsPopup] = useState(false);
  // const [marketRedirect, setMarketRedirect] = useState(false);
  // const [marketsData, setMarketsData] = useState(null);
  const [noConfigs, setNoConfigs] = useState(false);
  const [refetchSettings, setRefetchSettings] = useState(false);
  const [active, setActive] = useState(null);

  const [localConfigs, setLocalConfigs] = useState({ ...default_markets_basic_configs, ...marketsConfigs?.data?.basicConfigs });
  const [localAdvancedConfigs, setLocalAdvancedConfigs] = useState({ ...default_advanced_configs, ...marketsConfigs?.data?.advancedConfigs });

  // useMemo(() => {
  //   const sLocales = shopData?.locales?.filter((item) => !item.primary) || null;
  //   setSecondaryLocales(sLocales);
  // }, [shopData]);

  // async function loadMarkets() {
  //   let error = true;
  //   let msg = tr.responses.error;
  //   // await getLocalShopData();

  //   try {
  //     const response = await fetch(GET_SYNCED_MARKETS);
  //     const responseJson = await response.json();

  //     if (responseJson?.status) {
  //       setMarketsData(responseJson?.data);
  //       error = false;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   if (error) {
  //     setToastData({
  //       error,
  //       msg,
  //     });
  //   }
  // }

  // async function loadSettings() {
  //   let error = true;
  //   let msg = tr.responses.error_settings_load;

  //   try {
  //     const response = await fetch(GET_MARKET_CONFIGS);
  //     const responseJson = await response.json();

  //     if (responseJson?.data && responseJson?.data[0]) {
  //       const storeSavedConfigs = JSON.parse(
  //         responseJson.data[0].basic_configs
  //       );
  //       const storeSavedAdvancedConfigs = JSON.parse(
  //         responseJson.data[0].advanced_configs
  //       );
  //       const widgetStatus = responseJson?.data[0]?.widget;
  //       const autoRedirectStatus = responseJson?.data[0]?.auto_redirect;

  //       setMarketsPopup(widgetStatus);
  //       setMarketRedirect(autoRedirectStatus);

  //       setConfigs({ ...configs, ...storeSavedConfigs });
  //       setAdvancedConfigs({
  //         ...advancedConfigs,
  //         ...storeSavedAdvancedConfigs,
  //       });

  //       setLocalConfigs({ ...configs, ...storeSavedConfigs });
  //       setLocalAdvancedConfigs({
  //         ...advancedConfigs,
  //         ...storeSavedAdvancedConfigs,
  //       });

  //       error = false;
  //     } else {
  //       setNoConfigs(true);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   if (error) {
  //     setToastData({
  //       error,
  //       msg,
  //     });
  //   }
  // }

  // async function loadEmbedData() {
  //   try {
  //     const response = await fetch(CHECK_EMBED);
  //     const responseJson = await response.json();

  //     if (responseJson?.data) {
  //       const parsedValue =
  //         isJson(responseJson.data) && JSON.parse(responseJson.data);
  //       if (parsedValue?.current?.blocks) {
  //         const check = Object.entries(parsedValue.current.blocks).find(
  //           ([item, value]) => {
  //             return (
  //               value.type.includes(EMBED_APP_ID) &&
  //               value.type.includes(EMBED_APP_HANDLE) &&
  //               !value.disabled
  //             );
  //           }
  //         );
  //         setActive(check);
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useMemo(async () => {
  //   Promise.all([loadMarkets(), loadSettings(), loadEmbedData()])
  //     .then((results) => {
  //       setInitialLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error occurred while executing methods: ", error);
  //     });
  // }, [refetchSettings]);

  useMemo(() => {
    // if (actionData?._action === ACTIONS.update_MarketsConfigs && actionData?.status) {
    //   // setMarketsSyncLoading(false);
    // }
    if (actionData?._action === ACTIONS.get_MarketsSyncStatus && actionData?.status) {
      if (actionData?.data?.syncStatus === "SUCCESS") {
        setMarketsSyncLoading(false);
        clearInterval(interval);
        shopify.toast.show(tr.responses.success_markets);
      }
    }
  }, [actionData]);

  async function handleMarketsSync() {
    if (!shopdb?.id) return;
    setMarketsSyncLoading(true);
    console.log('handleMarketsSync', shopdb?.id);
    submit(
      {
        _action: ACTIONS.run_MarketsSync,
        data: {
          shopId: shopdb?.id,
        },
      },
      requestHeaders,
    );
    setTimeout(() => {
      saveConfigs();
    }, 1000);
    interval = setInterval(
      async () => checkMarketsStatus(interval),
      5000
    );
  }

  async function saveConfigs() {
    submit(
      {
        _action: ACTIONS.update_MarketsConfigs,
        data: {
          basicConfigs: localConfigs,
          advancedConfigs: localAdvancedConfigs,
        },
      },
      requestHeaders,
    );
  }

  async function checkMarketsStatus(interval: NodeJS.Timeout) {
    timesRun++;
    if (timesRun > 30) {
      timesRun = 0;
      clearInterval(interval);
      setMarketsSyncLoading(false);
      shopify.toast.show(tr.responses.error_markets);
      return;
    }
    submit(
      {
        _action: ACTIONS.get_MarketsSyncStatus,
        data: {
          shopId: shopdb?.id,
        },
      },
      requestHeaders,
    );
  }
  console.log("marketsConfigs: ", marketsConfigs);
  return (
    <Page>
      <div id="main-screen">
        <PageTitle
          icon={MarketsIcon}
          title="Markets redirects"
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
              <MarketsPopupControls
                marketsData={marketsData?.data}
                marketsSync={handleMarketsSync}
                marketsSyncLoading={marketsSyncLoading}
                marketsPopup={marketsConfigs?.data?.widget}
              />
              {smUp ? <Divider /> : null}
              {/* 
            <MarketsContentStyle
              marketsData={marketsData}
              reFetch={setRefetchSettings}
              configs={localConfigs}
              setConfigs={setLocalConfigs}
              advancedConfigs={localAdvancedConfigs}
              setAdvancedConfigs={setLocalAdvancedConfigs}
              secondaryLocales={secondaryLocales}
              setToastData={setToastData}
            />
            {smUp ? <Divider /> : null}
            <MarketsPopupDisplaySettings
              initialLoading={initialLoading}
              reFetch={setRefetchSettings}
              configs={localConfigs}
              setConfigs={setLocalConfigs}
              advancedConfigs={localAdvancedConfigs}
              // pageVisibility={localPageVisibility}
              // setPageVisibility={setLocalPageVisibility}
              setToastData={setToastData}
            />
            {smUp ? <Divider /> : null}
           */}
              <MarketsOtherSettings />
            </BlockStack>
          ) : (
            ""
          )}

          {selectedTab === 1 ? (
            <BlockStack gap={{ xs: "800", sm: "400" }}>
              {/* <MarketsAutoControls
              initialLoading={initialLoading}
              marketsData={marketsData}
              marketsSync={handleMarketsSync}
              marketsSyncLoading={marketsSyncLoading}
              marketRedirect={marketRedirect}
              reFetch={setRefetchSettings}
              setToastData={setToastData}
            />
            */}
              <MarketsAutoSettings />
            </BlockStack>
          ) : (
            ""
          )}
        </Tabs>

        {toastData?.msg !== "" && (
          <Toast
            content={toastData.msg}
            error={toastData.error}
            onDismiss={() => setToastData({ ...toastData, msg: "" })}
          />
        )}
        <br />
      </div>
    </Page>
  );
}

