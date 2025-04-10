import {
  Page,
  BlockStack,
  Tabs,
  Divider,
  useBreakpoints,
} from "@shopify/polaris";
// import { PageTitle } from "../../components/_common/PageTitle";
import { default_advanced_configs, default_basic_configs, getEmbedConst, loadingStates, requestHeaders } from "../../components/_helpers";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../components/env";
import { Suspense, useEffect, useMemo, useState } from "react";
import RedirectItems from "../../components/popup-redirects/RedirectItems";
import { Await, useActionData, useLoaderData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext, RedirectItem } from "app/components/_types";
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
import { PageTitle } from "app/components/_common/PageTitle";
import { SaveBar, TitleBar } from "@shopify/app-bridge-react";
import CustomizePopup from "app/components/popup-redirects/CustomizePopup";
import { ACTIONS } from "app/components/_actions";


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

// Add deep comparison function
function areObjectsEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => {
    if (!(key in obj2)) return false;
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return areObjectsEqual(obj1[key], obj2[key]);
    }
    return obj1[key] === obj2[key];
  });
}

export default function CustomRedirectsCode() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { allRedirects, configs, widgetEditorStatus, widgetEditorCode } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const submit = useSubmit()
  const navigation = useNavigation()
  const navigate = useNavigate();
  const [hasChange, setHasChange] = useState(false);
  const [toastData, setToastData] = useState({ msg: "", error: false });
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const { basicConfigs, advancedConfigs, hideOnAllowedPages, allowedPages } = configs?.data[0] || {}
  const [localConfigs, setLocalConfigs] = useState({ ...default_basic_configs, ...basicConfigs });
  const [localAdvancedConfigs, setLocalAdvancedConfigs] = useState({ ...default_advanced_configs, ...advancedConfigs });
  const secondaryLocales = shopInfo?.shopLocales?.filter(
    (item) => !item.primary,
  );

  async function saveConfigs() {
    submit(
      {
        _action: ACTIONS.CreateUpdateConfigs,
        data: {
          basicConfigs: localConfigs,
          advancedConfigs: localAdvancedConfigs,
        },
      },
      requestHeaders,
    );
  }

  useMemo(() => {
    if (allRedirects?.status) {
      const orderedRedirects: RedirectItem[] = allRedirects.data.sort((a: RedirectItem, b: RedirectItem) => a.order - b.order);
      setRedirects(orderedRedirects);
    }
  }, [allRedirects]);

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

  useEffect(() => {
    const definedConfigs = { ...default_basic_configs, ...basicConfigs };
    const definedAdvancedConfigs = { ...default_advanced_configs, ...advancedConfigs };
    if (!areObjectsEqual(localConfigs, definedConfigs) || !areObjectsEqual(localAdvancedConfigs, definedAdvancedConfigs)) {
      shopify.saveBar.show('configs-save-bar');
      setHasChange(true);
    } else {
      shopify.saveBar.hide('configs-save-bar');
      setHasChange(false);
    }
  }, [localConfigs, localAdvancedConfigs, configs]);


  const loading = loadingStates(navigation, [ACTIONS.CreateUpdateConfigs]) as LoadingStates;
  return (
    <Page
      fullWidth
      compactTitle
      title="Customize your popup"
      backAction={{ content: "Back", onAction: () => navigate("/app/redirects") }}
      primaryAction={{ content: "Save", disabled: !hasChange, onAction: saveConfigs, loading: loading[ACTIONS.CreateUpdateConfigs + "Loading"] }}
    >
      <CustomizePopup
        redirects={redirects}
        configs={localConfigs}
        setConfigs={setLocalConfigs}
        advancedConfigs={localAdvancedConfigs}
        setAdvancedConfigs={setLocalAdvancedConfigs}
        saveConfigs={saveConfigs}
      />
      <SaveBar id="configs-save-bar" discardConfirmation>
        <button variant="primary" onClick={saveConfigs} loading={loading[ACTIONS.CreateUpdateConfigs + "Loading"] ? "true" : undefined}></button>
        <button onClick={() => {
          shopify.saveBar.hide('configs-save-bar');
          navigate("/app/redirects");
        }}></button>
      </SaveBar>
      {toastData?.msg !== "" &&
        shopify.toast.show(toastData.msg, { isError: toastData.error })}
      <br />
    </Page>
  );
}
