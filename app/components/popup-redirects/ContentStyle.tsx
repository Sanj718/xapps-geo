import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  Collapsible,
  Divider,
  InlineGrid,
  InlineStack,
  RangeSlider,
  Select,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import {
  AdjustIcon,
  CodeIcon,
  ImageAddIcon,
  LanguageIcon,
  PaintBrushFlatIcon,
  SettingsIcon,
  ThemeEditIcon,
} from "@shopify/polaris-icons";
import React, { useContext, useState } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
// import RedirectsPopupPreview from "./RedirectsPopupPreview";
// import { AppContext } from "../AppContext";
import { charLimit, default_basic_configs, loadingStates, planParser, requestHeaders } from "../_helpers";
// import { planParser } from "../../helpers";
// import { default_basic_configs } from "../../../helpers/process-client-response";
// import { ImageManager } from "../ImageManager";
// import { ColorTextField } from "../ColorTextField";
import { Editor } from "@monaco-editor/react";
import ReactQuill from "react-quill";
// import { useAuthenticatedFetch } from "../../hooks";
// import { CREATE_SHOP_CONFIGS } from "../../../helpers/endpoints";

import PopupContent from "../_common/PopupContent";
import tr from "../locales.json";
import "react-quill/dist/quill.snow.css";
import { useActionData, useLoaderData, useNavigation, useOutletContext } from "@remix-run/react";
import { ActionReturn, OutletContext } from "../_types";
import PromoBadge from "../_common/PromoBadge";
import RedirectsPopupPreview from "./RedirectsPopupPreview";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import CustomizePopup from "./CustomizePopup";

const OLD_DEFAULT_ICON =
  "https://ngr-app.herokuapp.com/public/images/earth-americas-solid.svg";
const OLD_STICKY_ICON =
  "https://ngr-app.herokuapp.com/public/images/sticky-logo.png";
const NEW_DEFAULT_ICON = "default";



export default function ContentStyle({
  redirects,
  reFetch,
  configs,
  setConfigs,
  advancedConfigs,
  setAdvancedConfigs,
  secondaryLocales,
  setToastData,
}) {
  // const fetch = useAuthenticatedFetch();
  // const { activePlan } = useContext(AppContext);
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  // const { allRedirects } = useLoaderData<typeof loader>();
  // const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const actionData = useActionData<ActionReturn>();
  const navigation = useNavigation();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [loading, setLoading] = useState(false);
  const [customizeModalStatus, setCustomizeModalStatus] = useState(false);
  const [assetsModalStatus, setAssetsModalStatus] = useState(false);
  const [widgetStylesOpen, setWidgetStylesOpen] = useState(false);
  const [codeEditorOpen, setCodeEditorOpen] = useState(false);
  const [iconModalStatus, setIconModalStatus] = useState(false);
  const [customizePopupVisibilityChange, setCustomizePopupVisibilityChange] = useState(false);
  const [contentTranslationModal, setContentTranslationsModal] =
    useState(false);
  const [dropdownLabelTranslationModal, setDropdownLabelTranslationModal] =
    useState(false);

  function handleCustomIconUpload(assets) {
    if (!assets) return;
    setConfigs({ ...configs, icon: assets?.url });
    setAssetsModalStatus(false);
  }

  async function saveConfigs() {
    setLoading(true);
    let error = true;
    let msg = tr.responses.error;

    try {
      const response = await fetch(CREATE_SHOP_CONFIGS, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          basic_configs: configs,
          advanced_configs: advancedConfigs,
        }),
      });
      const responseJson = await response.json();

      if (responseJson?.status) {
        error = false;
        msg = tr.responses.settings_saved;
        reFetch((n) => !n);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    }

    setToastData({
      error,
      msg,
    });
    setLoading(false);
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
              <Text as="h3" variant="headingMd">
                Content & Style
              </Text>
              <Text as="p" variant="bodyMd">
                Personalize the visual look of your popup by adjusting its
                layout, colors, fonts, and overall style. This section allows
                you to create a design that aligns with your brand and enhances
                user experience.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <Card roundedAbove="sm">
          <RedirectsPopupPreview
            redirects={
              isProPlan
                ? redirects
                : isBasicPlan
                  ? redirects.slice(0, 4)
                  : redirects.slice(0, 1)
            }
            basicConfigs={
              !isFreePlan
                ? configs
                : {
                  ...default_basic_configs,
                  title: configs?.title,
                  icon: configs?.icon,
                  buttonText: configs?.buttonText,
                  showFlag: configs?.showFlag,
                }
            }
            advancedConfigs={isProPlan ? advancedConfigs : {}}
            customCSSClass="in-page"
          />
          <InlineStack align="end">
            <Button
              variant="primary"
              icon={ThemeEditIcon}
              onClick={() => shopify.modal.show("customize-popup")}
            >
              Customize
            </Button>
          </InlineStack>
        </Card>
      </InlineGrid>

      {/* Customize your popup */}
      <Modal id="customize-popup" variant="max" onShow={() => setCustomizePopupVisibilityChange(true)} onHide={() => setCustomizePopupVisibilityChange(false)}>
        <TitleBar title="Customize your popup" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <CustomizePopup visibilityChange={customizePopupVisibilityChange} redirects={redirects} configs={configs} setConfigs={setConfigs} advancedConfigs={advancedConfigs} setAdvancedConfigs={setAdvancedConfigs} />
          </AppProvider>
        </Box>
      </Modal>
      {/* <Modal
        size="large"
        open={customizeModalStatus}
        onClose={() => setCustomizeModalStatus(false)}
        title="Customize your popup"
        footer={
          <InlineStack align="space-between">
            <div className="customizer-footer"></div>
            <Button
              onClick={async () => {
                await saveConfigs();
                setCustomizeModalStatus(false);
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
          <div className="wide-modal"></div>
          <InlineGrid columns={{ xs: "1fr", md: "1fr 3fr" }} gap="400">
            <>
              <BlockStack gap="200">
                <PromoBadge type="basic" />
                <div className={isFreePlan ? "vvisually-disabled" : ""}>
                  <Text as="p">Icon</Text>
                  <InlineStack gap="150">
                    <div className="icon-upload">
                      <Button
                        onClick={
                          !isFreePlan
                            ? () => setAssetsModalStatus(true)
                            : undefined
                        }
                        icon={ImageAddIcon}
                        disabled={isFreePlan}
                      >
                        Upload
                      </Button>
                      <ImageManager
                        status={assetsModalStatus}
                        setStatus={setAssetsModalStatus}
                        typeSingleCallback={
                          !isFreePlan ? handleCustomIconUpload : false
                        }
                      />
                    </div>
                    <Tooltip
                      content={
                        <p>
                          Edit icon <strong>width</strong> or add a custom{" "}
                          <strong>icon URL</strong>.
                        </p>
                      }
                    >
                      <Button
                        disabled={isFreePlan}
                        icon={SettingsIcon}
                        onClick={() => setIconModalStatus(true)}
                      />
                    </Tooltip>
                  </InlineStack>
                </div>

                <InlineGrid gap="400">
                  <PopupContent
                    titleValue={configs?.title}
                    // @ts-ignore
                    titleOnChange={(value) =>
                      setConfigs({ ...configs, title: value })
                    }
                    textValue={configs?.text}
                    // @ts-ignore
                    textOnChange={(value) => {
                      !isFreePlan
                        ? setConfigs((current) => ({
                            ...current,
                            text: value,
                          }))
                        : undefined;
                    }}
                    // titleDisabled={isFreePlan}
                    textDisabled={isFreePlan}
                    textHelpText={`Use [[country]] in the Short text field to display the user's GEO location. Example: "Looks like you're in [[country]]! Check out our local site."`}
                    // @ts-ignore
                    translation={
                      secondaryLocales?.length
                        ? () => setContentTranslationsModal((trOpen) => !trOpen)
                        : null
                    }
                  />
                  <div
                    className={
                      configs?.type === "topbar" ? "visually-disabled" : ""
                    }
                  >
                    <Tooltip content="Displays the visitor's current country flag based on geolocation data.">
                      <Checkbox
                        label="Show country flag"
                        checked={configs?.showFlag}
                        onChange={(value) =>
                          setConfigs((current) => ({
                            ...current,
                            showFlag: value,
                          }))
                        }
                      />
                    </Tooltip>
                  </div>
                  <Divider />
                  <InlineGrid gap="200">
                    <div className={isFreePlan ? "vvisually-disabled" : ""}>
                      <Select
                        disabled={isFreePlan}
                        label="Widget type: "
                        labelInline
                        options={[
                          { label: "Popup", value: "popup" },
                          { label: "Top bar", value: "topbar" },
                          { label: "Left sticky", value: "sticky" },
                        ]}
                        onChange={
                          !isFreePlan
                            ? (value) =>
                                setConfigs((current) => ({
                                  ...current,
                                  type: value,
                                }))
                            : undefined
                        }
                        value={configs?.type}
                      />
                    </div>
                    <div className={isFreePlan ? "vvisually-disabled" : ""}>
                      {configs?.type === "topbar" && (
                        <Checkbox
                          disabled={isFreePlan}
                          label="Sticky to top"
                          checked={configs?.topbarSticky}
                          onChange={(value) =>
                            setConfigs((current) => ({
                              ...current,
                              topbarSticky: value,
                            }))
                          }
                        />
                      )}
                      {configs?.type === "sticky" && (
                        <InlineGrid gap="300">
                          <RangeSlider
                            disabled={isFreePlan}
                            label="Vertical position"
                            value={configs?.stickyVerticalPosition}
                            onChange={(value) =>
                              setConfigs((current) => ({
                                ...current,
                                stickyVerticalPosition: value,
                              }))
                            }
                            output
                          />
                          <InlineGrid columns="2" gap="200">
                            <Select
                              disabled={isFreePlan}
                              label="Sticky opener icon"
                              options={[
                                { label: "Custom", value: "custom" },
                                {
                                  label: "User's country flag (GEO)",
                                  value: "geo",
                                },
                              ]}
                              onChange={
                                !isFreePlan
                                  ? (value) =>
                                      setConfigs((current) => ({
                                        ...current,
                                        stickyOpener: value,
                                      }))
                                  : undefined
                              }
                              value={configs?.stickyOpener}
                            />
                            {(configs?.stickyOpener === undefined ||
                              configs?.stickyOpener === "custom") && (
                              <TextField
                                disabled={isFreePlan}
                                label="Sticky Toggle Icon (link)"
                                value={
                                  configs?.stickyToggleIcon === OLD_STICKY_ICON
                                    ? "default"
                                    : configs?.stickyToggleIcon
                                }
                                autoComplete="false"
                                onChange={(value) =>
                                  setConfigs((current) => ({
                                    ...current,
                                    stickyToggleIcon: value,
                                  }))
                                }
                              />
                            )}
                          </InlineGrid>
                        </InlineGrid>
                      )}
                    </div>
                  </InlineGrid>
                  <Divider />
                  <InlineStack gap="200" align="space-between">
                    <Button
                      variant="monochromePlain"
                      onClick={() => setWidgetStylesOpen((status) => !status)}
                    >
                      Styles
                    </Button>
                    <Button
                      icon={AdjustIcon}
                      size="micro"
                      onClick={() => setWidgetStylesOpen((status) => !status)}
                    >
                      Edit
                    </Button>
                  </InlineStack>
                  <Collapsible id="widget-styles" open={widgetStylesOpen}>
                    <InlineGrid gap="200">
                      <PromoBadge type="basic" />
                      <div className={isFreePlan ? "vvisually-disabled" : ""}>
                        <InlineGrid gap="300">
                          <Select
                            disabled={isFreePlan}
                            label="Font family"
                            options={[
                              {
                                label: "Inherit site fonts",
                                value: "inherit",
                              },
                              { label: "Arial", value: "Arial" },
                              { label: "Arial Black", value: "Arial Black" },
                              { label: "Courier New", value: "Courier New" },
                              { label: "Georgia", value: "Georgia" },
                              {
                                label: "Times New Roman",
                                value: "Times New Roman",
                              },
                              { label: "Trebuchet MS", value: "Trebuchet MS" },
                              { label: "Tahoma", value: "Tahoma" },
                              { label: "Verdana", value: "Verdana" },
                              { label: "Impact", value: "Impact" },
                            ]}
                            onChange={(value) =>
                              setConfigs((current) => ({
                                ...current,
                                font: value,
                              }))
                            }
                            value={configs?.font}
                          />
                          <InlineGrid gap="200">
                            <InlineGrid gap="200" columns="2">
                              <ColorTextField
                                disabled={isFreePlan}
                                label="Background"
                                placeholder="#fff"
                                id="modalBgColor"
                                configs={configs}
                                setConfigs={!isFreePlan ? setConfigs : false}
                              />
                              <ColorTextField
                                disabled={isFreePlan}
                                label="Text"
                                placeholder="#000"
                                id="modalTextColor"
                                configs={configs}
                                setConfigs={!isFreePlan ? setConfigs : false}
                              />
                              <ColorTextField
                                disabled={isFreePlan}
                                label="Border"
                                placeholder="#fff"
                                id="modalBorderColor"
                                configs={configs}
                                setConfigs={!isFreePlan ? setConfigs : false}
                              />
                            </InlineGrid>
                          </InlineGrid>
                          <Divider />
                          <InlineGrid gap="200">
                            <Text as="p" variant="headingSm">
                              Button styles
                            </Text>
                            <InlineGrid gap="200" columns="2">
                              <ColorTextField
                                disabled={isFreePlan}
                                label="Background"
                                placeholder="#fff"
                                id="buttonsBgColor"
                                configs={configs}
                                setConfigs={!isFreePlan ? setConfigs : false}
                              />
                              <ColorTextField
                                disabled={isFreePlan}
                                label="Text"
                                placeholder="#000"
                                id="buttonsColor"
                                configs={configs}
                                setConfigs={!isFreePlan ? setConfigs : false}
                              />
                              <Select
                                disabled={isFreePlan}
                                label="Layout"
                                options={[
                                  {
                                    label: "Grid",
                                    value: "grid",
                                  },
                                  {
                                    label: "Stack",
                                    value: "stack",
                                  },
                                  {
                                    label: "Dropdown",
                                    value: "dropdown",
                                  },
                                ]}
                                onChange={
                                  !isFreePlan
                                    ? (value) =>
                                        setConfigs((current) => ({
                                          ...current,
                                          layout: value,
                                        }))
                                    : undefined
                                }
                                value={configs?.layout ? configs.layout : ""}
                              />
                              {configs?.layout === "dropdown" ? (
                                <InlineGrid>
                                  <InlineStack
                                    align="space-between"
                                    gap="200"
                                    blockAlign="center"
                                  >
                                    <Text as="p">Label</Text>
                                    <Tooltip content="Translate your content into multiple languages supported by your store.">
                                      <Button
                                        icon={LanguageIcon}
                                        size="micro"
                                        onClick={() =>
                                          setDropdownLabelTranslationModal(true)
                                        }
                                      ></Button>
                                    </Tooltip>
                                  </InlineStack>
                                  <TextField
                                    size="slim"
                                    label="Dropdown label"
                                    labelHidden
                                    onChange={
                                      !isFreePlan
                                        ? (value) =>
                                            setConfigs((current) => ({
                                              ...current,
                                              dropdownPlaceholder: value,
                                            }))
                                        : undefined
                                    }
                                    value={
                                      configs?.dropdownPlaceholder
                                        ? configs.dropdownPlaceholder
                                        : "Select"
                                    }
                                    autoComplete="off"
                                  />
                                </InlineGrid>
                              ) : (
                                ""
                              )}
                            </InlineGrid>
                          </InlineGrid>
                        </InlineGrid>
                      </div>
                    </InlineGrid>
                  </Collapsible>
                  <Divider />
                  <InlineStack gap="200" align="space-between">
                    <Button
                      variant="monochromePlain"
                      onClick={() => setCodeEditorOpen((status) => !status)}
                    >
                      Code editor
                    </Button>
                    <Button
                      icon={AdjustIcon}
                      size="micro"
                      onClick={() => setCodeEditorOpen((status) => !status)}
                    >
                      Edit
                    </Button>
                  </InlineStack>
                  <Collapsible id="code-editor" open={codeEditorOpen}>
                    <InlineGrid gap="200">
                      <PromoBadge type="pro" />
                      <InlineGrid gap="150">
                        <TextField
                          prefix="#"
                          label="Element custom ID"
                          onChange={
                            isProPlan
                              ? (value) =>
                                  setAdvancedConfigs((current) => ({
                                    ...current,
                                    html_id: value,
                                  }))
                              : undefined
                          }
                          disabled={!isProPlan}
                          value={isProPlan ? advancedConfigs?.html_id : ""}
                          autoComplete="off"
                        />
                        <InlineGrid gap="100">
                          <Text as="p" variant="bodyMd">
                            CSS Code
                          </Text>
                          <div className={isProPlan ? "" : "visually-disabled"}>
                            <div className="code-editor">
                              <Editor
                                // theme="vs-dark"
                                height="300px"
                                language="css"
                                defaultLanguage="css"
                                defaultValue={advancedConfigs?.css || ""}
                                onChange={
                                  isProPlan
                                    ? (value) =>
                                        setAdvancedConfigs((current) => ({
                                          ...current,
                                          css: value,
                                        }))
                                    : undefined
                                }
                                options={{
                                  readOnly: false,
                                  minimap: { enabled: false },
                                  scrollbar: {
                                    vertical: "hidden",
                                  },
                                  overviewRulerBorder: false,
                                  renderLineHighlight: "none",
                                  glyphMargin: false,
                                  lineNumbers: "off",
                                  folding: false,
                                }}
                              />
                            </div>
                          </div>
                        </InlineGrid>
                        <Tooltip content="Disable styles added in Styles section (popup and button styles).">
                          <Checkbox
                            label="Disable default styles"
                            disabled={!isProPlan}
                            checked={
                              isProPlan
                                ? advancedConfigs?.disable_basic_css
                                : false
                            }
                            onChange={(value) =>
                              isProPlan
                                ? setAdvancedConfigs((current) => ({
                                    ...current,
                                    disable_basic_css: value,
                                  }))
                                : undefined
                            }
                          />
                        </Tooltip>
                      </InlineGrid>
                    </InlineGrid>
                  </Collapsible>
                </InlineGrid>
              </BlockStack>
            </>

            <div className="ngr-inner-preview">
              <RedirectsPopupPreview
                redirects={
                  isProPlan
                    ? redirects
                    : isBasicPlan
                    ? redirects.slice(0, 4)
                    : redirects.slice(0, 1)
                }
                basicConfigs={
                  !isFreePlan
                    ? configs
                    : {
                        ...default_basic_configs,
                        title: configs?.title,
                        icon: configs?.icon,
                        buttonText: configs?.buttonText,
                        showFlag: configs?.showFlag,
                      }
                }
                advancedConfigs={isProPlan ? advancedConfigs : {}}
              />
            </div>
          </InlineGrid>
        </Modal.Section>
      </Modal> */}

      {/* Edit icon settings */}
      {/* <Modal
        open={iconModalStatus}
        onClose={() => setIconModalStatus(false)}
        title="Edit icon settings"
        size="small"
      >
        <Modal.Section>
          <InlineGrid gap="200">
            <TextField
              autoComplete="false"
              label="Max-width"
              labelAction={{
                content: "auto",
                onAction: () =>
                  setConfigs((current) => ({
                    ...current,
                    iconWidth: "auto",
                  })),
              }}
              value={configs?.iconWidth || ""}
              suffix={configs?.iconWidth === "auto" ? "" : "px"}
              monospaced
              onChange={(value) =>
                setConfigs((current) => ({
                  ...current,
                  iconWidth: value,
                }))
              }
            />
            <TextField
              monospaced
              selectTextOnFocus
              label="Icon url"
              value={
                configs?.icon
                  ? configs?.icon === OLD_DEFAULT_ICON
                    ? "default"
                    : configs?.icon
                  : ""
              }
              onChange={(value) =>
                !isFreePlan
                  ? setConfigs((current) => ({
                      ...current,
                      icon: value,
                    }))
                  : false
              }
              autoComplete="off"
            />
          </InlineGrid>
        </Modal.Section>
      </Modal> */}

      {/* Popup content translation */}
      {/* <Modal
        open={contentTranslationModal}
        onClose={() => setContentTranslationsModal(false)}
        title="Popup content translation"
      >
        <Modal.Section>
          <InlineGrid gap="300">
            <Box>
              <PromoBadge type="pro" />
            </Box>
            <div className={!isProPlan ? "vvisually-disabled" : ""}>
              <InlineGrid columns="2" gap="200">
                {(secondaryLocales?.length > 0 &&
                  secondaryLocales.map((locale) => {
                    const titleValue = isProPlan
                      ? configs?.title_locales &&
                        configs.title_locales[locale.locale]
                        ? configs.title_locales[locale.locale]
                        : ""
                      : "";
                    const titleOnChange = isProPlan
                      ? (value) =>
                          setConfigs((current) => ({
                            ...current,
                            title_locales: {
                              ...current?.title_locales,
                              [locale.locale]: value,
                            },
                          }))
                      : undefined;
                    const textValue = isProPlan
                      ? configs?.text_locales &&
                        configs.text_locales[locale.locale]
                        ? configs.text_locales[locale.locale]
                        : ""
                      : "";
                    const textOnChange = isProPlan
                      ? (value) => {
                          setConfigs((current) => ({
                            ...current,
                            text_locales: {
                              ...current.text_locales,
                              [locale.locale]: value,
                            },
                          }));
                        }
                      : undefined;
                    return (
                      <PopupContent
                        titleDisabled={!isProPlan}
                        key={locale.locale}
                        titleLabel={`Title (${locale.locale})`}
                        titleValue={titleValue}
                        // @ts-ignore
                        titleOnChange={titleOnChange}
                        textLabel={`Short text (${locale.locale})`}
                        textValue={textValue}
                        // @ts-ignore
                        textOnChange={textOnChange}
                      />
                    );
                  })) ||
                  ""}
              </InlineGrid>
            </div>
            <Divider />
            <InlineStack align="end">
              <Button onClick={() => setContentTranslationsModal(false)}>
                Close
              </Button>
            </InlineStack>
          </InlineGrid>
        </Modal.Section>
      </Modal> */}

      {/* Dropdown label translation */}
      {/* <Modal
        open={dropdownLabelTranslationModal}
        onClose={() => setDropdownLabelTranslationModal(false)}
        title="Dropdown label translation"
      >
        <Modal.Section>
          <InlineGrid gap="300">
            <Box>
              <PromoBadge type="pro" />
            </Box>
            <div className={!isProPlan ? "visually-disabled" : ""}>
              <InlineGrid columns="2" gap="200">
                {(secondaryLocales?.length > 0 &&
                  secondaryLocales.map((locale) => {
                    const titleValue =
                      configs?.dropdownPlaceholder_locales &&
                      configs.dropdownPlaceholder_locales[locale.locale]
                        ? configs.dropdownPlaceholder_locales[locale.locale]
                        : "";
                    const titleOnChange = (value) =>
                      setConfigs((current) => ({
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
                  })) ||
                  ""}
              </InlineGrid>
            </div>
            <Divider />
            <InlineStack align="end">
              <Button onClick={() => setDropdownLabelTranslationModal(false)}>
                Close
              </Button>
            </InlineStack>
          </InlineGrid>
        </Modal.Section>
      </Modal> */}
    </>
  );
}
