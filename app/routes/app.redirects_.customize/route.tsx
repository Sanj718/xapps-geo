import { AppProvider, Box, InlineGrid, Page } from "@shopify/polaris";
import { areObjectsEqual, default_advanced_configs, default_basic_configs, getEmbedConst, loadingStates, planParser, requestHeaders } from "../../components/_helpers";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Await, useActionData, useLoaderData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { Asset, LoadingStates, OutletContext, RedirectItem } from "app/components/_types";
import { handleActions } from "./_actions";
import { handleLoaders } from "./_loaders";
import { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Modal, SaveBar, TitleBar } from "@shopify/app-bridge-react";
import CustomizePopup from "app/components/popup-redirects/CustomizePopup";
import { ACTIONS } from "app/components/_actions";
import tr from "../../components/locales.json";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
} from "../../components/env";
import PromoBadge from "app/components/_common/PromoBadge";
import PopupContent from "app/components/_common/PopupContent";
import ImageManager from "app/components/_common/ImageManager";
import IconSettings from "app/components/popup-redirects/IconSettings";

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, RD_EMBED_APP_HANDLE) || {};

// [TODO] find correct way to add ts check here.
export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);


export default function CustomizePopupPage() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
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
        _action: ACTIONS.create_UpdateConfigs,
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


  function handleCustomIconUpload(assets: Asset | null) {
    if (!assets) return;
    setLocalConfigs((current: typeof localConfigs) => ({
      ...current,
      icon: assets.url
    }));
    shopify.modal.hide("icon-upload-popup");
  }

  const loading = loadingStates(navigation, [ACTIONS.create_UpdateConfigs]) as LoadingStates;
  return (
    <Page
      fullWidth
      compactTitle
      title="Customize your popup"
      backAction={{
        content: "Back", onAction: () => navigate("/app/redirects#ngr-modal-preview", {
          viewTransition: true,
          preventScrollReset: true,
        })
      }}
      primaryAction={{ content: "Save", disabled: !hasChange, onAction: saveConfigs, loading: loading[ACTIONS.create_UpdateConfigs + "Loading"] }}
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
        <button variant="primary" onClick={saveConfigs} loading={loading[ACTIONS.create_UpdateConfigs + "Loading"] ? "true" : undefined}></button>
        <button onClick={() => {
          shopify.saveBar.hide('configs-save-bar');
          navigate("/app/redirects");
        }}></button>
      </SaveBar>


      <Modal id="popup-content-translation-popup">
        <TitleBar title="Popup content translation" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <InlineGrid gap="300">
              <Box>
                <PromoBadge type="pro" />
              </Box>
              <InlineGrid columns="2" gap="200">
                {(secondaryLocales?.length > 0 &&
                  secondaryLocales.map((locale) => {
                    return (
                      <PopupContent
                        titleDisabled={!isProPlan}
                        key={locale.locale}
                        titleLabel={`Title (${locale.locale})`}
                        titleValue={isProPlan
                          ? localConfigs?.title_locales &&
                            localConfigs.title_locales[locale.locale]
                            ? localConfigs.title_locales[locale.locale]
                            : ""
                          : ""}
                        titleOnChange={isProPlan ? (value) =>
                          setLocalConfigs((current) => ({
                            ...current,
                            title_locales: {
                              ...current?.title_locales,
                              [locale.locale]: value,
                            },
                          })) : undefined}
                        textLabel={`Short text (${locale.locale})`}
                        textValue={isProPlan
                          ? localConfigs?.text_locales &&
                            localConfigs.text_locales[locale.locale]
                            ? localConfigs.text_locales[locale.locale]
                            : ""
                          : ""}
                        textOnChange={isProPlan ? (value) => {
                          setLocalConfigs((current) => ({
                            ...current,
                            text_locales: {
                              ...current.text_locales,
                              [locale.locale]: value,
                            },
                          }));
                        } : undefined}
                      />
                    );
                  })) ||
                  ""}
              </InlineGrid>
            </InlineGrid>
          </AppProvider>
        </Box>
      </Modal>


      <Modal id="icon-upload-popup">
        <TitleBar title="Select custom icon" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <ImageManager callBack={handleCustomIconUpload} />
          </AppProvider></Box>
      </Modal>

      <Modal id="icon-settings-popup">
        <TitleBar title="Icon settings" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <IconSettings configs={localConfigs} setConfigs={setLocalConfigs} isFreePlan={isFreePlan} />
          </AppProvider></Box>
      </Modal>

      <Modal id="dropdown-label-translation-popup">
        <TitleBar title="Dropdown label translation" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <InlineGrid gap="300">
              <Box>
                <PromoBadge type="pro" />
              </Box>
              <div className={!isProPlan ? "visually-disabled" : ""}>
                <InlineGrid columns="2" gap="200">
                  {secondaryLocales?.map((locale) => {
                    const titleValue =
                      localConfigs?.dropdownPlaceholder_locales &&
                        localConfigs.dropdownPlaceholder_locales[locale.locale]
                        ? localConfigs.dropdownPlaceholder_locales[locale.locale]
                        : "";
                    const titleOnChange = (value: string) =>
                      setLocalConfigs((current: typeof localConfigs) => ({
                        ...current,
                        dropdownPlaceholder_locales: {
                          ...current.dropdownPlaceholder_locales,
                          [locale.locale]: value,
                        },
                      }));
                    return (
                      <PopupContent
                        key={locale.locale}
                        titleLabel={`Dropdown label (${locale.locale})`}
                        titleValue={titleValue}
                        // @ts-ignore
                        titleOnChange={titleOnChange}
                        titleDisabled={!isProPlan}
                      />
                    );
                  })}
                </InlineGrid>
              </div>
            </InlineGrid>
          </AppProvider>
        </Box>
      </Modal>
      {toastData?.msg !== "" &&
        shopify.toast.show(toastData.msg, { isError: toastData.error })}
      <br />
    </Page>
  );
}
