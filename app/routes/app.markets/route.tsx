import {
  Page,
  Toast,
  Frame,
  Tabs,
  BlockStack,
  Divider,
  useBreakpoints,
  Box,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import React, { useState, useContext, useMemo } from "react";
import { getEmbedConst, isJson, defaultState, default_markets_basic_configs, default_advanced_configs, planParser, requestHeaders } from "../../components/_helpers";
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
  MarketsIcon,
  CursorOptionIcon,
  ArrowsOutHorizontalIcon,
} from '@shopify/polaris-icons';
import MarketsOtherSettings from "app/components/markets-popup/MarketsOtherSettings";
import MarketsAutoSettings from "app/components/markets-auto-redirects/MarketsAutoSettings";
import MarketsPopupControls from "app/components/markets-popup/MarketsPopupControls";
import { useActionData, useLoaderData, useOutletContext, useSearchParams, useSubmit } from "@remix-run/react";
import { ACTIONS } from "app/components/_actions";
import { ActionReturn, OutletContext } from "app/components/_types";
import tr from "../../components/locales.json";
import { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import MarketsPopupDisplaySettings from "app/components/markets-popup/MarketsPopupDisplaySettings";
import MarketsAutoControls from "app/components/markets-auto-redirects/MarketsAutoControls";
import MarketsContentStyle from "app/components/markets-popup/MarketsContentStyle";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, MK_EMBED_APP_HANDLE) || {};
export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);

let timesRun = 0;
let interval: NodeJS.Timeout;
export default function MarketsRedirects() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const { themeEmbedData, marketsConfigs, marketsData } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { smUp } = useBreakpoints();
  const submit = useSubmit();
  const actionData = useActionData<ActionReturn>();
  const [marketsSyncLoading, setMarketsSyncLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [active, setActive] = useState(null);

  const [localConfigs, setLocalConfigs] = useState({ ...default_markets_basic_configs, ...marketsConfigs?.data?.basicConfigs });
  const [localAdvancedConfigs, setLocalAdvancedConfigs] = useState({ ...default_advanced_configs, ...marketsConfigs?.data?.advancedConfigs });

  useMemo(() => {
    if (themeEmbedData?.current?.blocks) {
      let checkMarkets = false;

      Object.entries(themeEmbedData.current.blocks).forEach(([item, value]: [string, any]) => {
        if (
          value.type.includes(EMBED_APP_ID) &&
          value.type.includes(EMBED_APP_HANDLE) &&
          !value.disabled
        ) {
          checkMarkets = true;
        }
      });
      if (checkMarkets) {
        setActive(checkMarkets);
      }
    }
  }, [themeEmbedData]);

  useMemo(() => {
    if (actionData?._action === ACTIONS.get_MarketsSyncStatus && actionData?.status) {
      if (actionData?.data?.syncStatus !== "") {
        setMarketsSyncLoading(false);
        clearInterval(interval);
      }
      if (actionData?.data?.syncStatus === "SUCCESS") {
        shopify.toast.show(tr.responses.success_markets);
      }
      if (actionData?.data?.syncStatus === "ERROR") {
        shopify.toast.show(tr.responses.error_markets);
      }

    }
  }, [actionData]);

  async function handleMarketsSync() {
    if (!shopdb?.id) return;
    setMarketsSyncLoading(true);
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
      5000 // [TODO] Make this dynamic
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

  useMemo(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedTab(parseInt(tab));
    }
  }, [searchParams]);


  // console.log("marketsConfigs: ", marketsConfigs, localConfigs, localAdvancedConfigs);
  return (
    <Page>
      <div id="main-screen">
        <PageTitle
          icon={MarketsIcon}
          title="Market redirects"
          status={active}
          loading={false}
          url={`shopify://admin/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`}
        />
        <Box padding="300">
          <ButtonGroup variant="segmented" fullWidth noWrap>
            <Button size="large" pressed={selectedTab === 0} onClick={() => setSelectedTab(0)} icon={CursorOptionIcon}>
              Markets popup
            </Button>
            <Button size="large" pressed={selectedTab === 1} onClick={() => setSelectedTab(1)} icon={ArrowsOutHorizontalIcon}>
              Markets auto redirect
            </Button>
          </ButtonGroup>
        </Box>
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
            <MarketsContentStyle
              marketsData={marketsData}
              configs={localConfigs}
              advancedConfigs={localAdvancedConfigs}
            />
            {smUp ? <Divider /> : null}
            <MarketsPopupDisplaySettings
              configs={localConfigs}
              setConfigs={setLocalConfigs}
              advancedConfigs={localAdvancedConfigs}
            />
            {smUp ? <Divider /> : null}
            <MarketsOtherSettings />
          </BlockStack>
        ) : (
          ""
        )}

        {selectedTab === 1 ? (
          <BlockStack gap={{ xs: "800", sm: "400" }}>
            <MarketsAutoControls
              marketsData={marketsData?.data}
              marketsSync={handleMarketsSync}
              marketsSyncLoading={marketsSyncLoading}
              marketRedirect={marketsConfigs?.data?.autoRedirect}
            />
            {smUp ? <Divider /> : null}
            <MarketsAutoSettings />
          </BlockStack>
        ) : (
          ""
        )}
        <br />
      </div>
    </Page>
  );
}