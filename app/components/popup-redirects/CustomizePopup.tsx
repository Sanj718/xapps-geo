import React, { useContext, useMemo, useState } from "react";
import { Editor } from "@monaco-editor/react";
import ReactQuill from "react-quill";
import PopupContent from "../_common/PopupContent";
import tr from "../locales.json";
import "react-quill/dist/quill.snow.css";
import {
    AdjustIcon,
    CodeIcon,
    ImageAddIcon,
    LanguageIcon,
    PaintBrushFlatIcon,
    SettingsIcon,
    ThemeEditIcon,
} from "@shopify/polaris-icons";
import {
    BlockStack,
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
import PromoBadge from "../_common/PromoBadge";
import { useActionData, useLoaderData, useNavigation, useOutletContext } from "@remix-run/react";
import { ActionReturn, Asset, OutletContext } from "../_types";
import { default_basic_configs, planParser } from "../_helpers";
import ImageManager from "../_common/ImageManager";
import ColorTextField from "../_common/ColorTextField";
import RedirectsPopupPreview from "./RedirectsPopupPreview";
import IconSettings from "./IconSettings";



export default function CustomizePopup({ visibilityChange, redirects, configs, setConfigs, advancedConfigs, setAdvancedConfigs }) {
    const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
        useOutletContext<OutletContext>();
    const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
    const [widgetStylesOpen, setWidgetStylesOpen] = useState(false);
    const [codeEditorOpen, setCodeEditorOpen] = useState(false);
    const [assetsModalStatus, setAssetsModalStatus] = useState(false);
    const [iconModalStatus, setIconModalStatus] = useState(false);

    function handleCustomIconUpload(assets: Asset | null) {
        if (!assets) return;
        setConfigs({ ...configs, icon: assets?.url });
        setAssetsModalStatus(false);
    }


    useMemo(() => {
        if (!visibilityChange) {
            setAssetsModalStatus(false)
        }
    }, [visibilityChange])
    console.log("visibilityChange", visibilityChange)
    return <InlineGrid columns={{ xs: "1fr", md: "1fr 3fr" }} gap="400">
        <>
            <BlockStack gap="200">
                <PromoBadge type="basic" />
                <Text as="p">Icon</Text>
                <InlineStack gap="150">
                    <Button
                        onClick={
                            !isFreePlan
                                ? () => setAssetsModalStatus((status) => !status)
                                : undefined
                        }
                        icon={ImageAddIcon}
                        disabled={isFreePlan}
                    >
                        Upload
                    </Button>
                    <Tooltip
                        width="wide"
                        content={
                            <small>
                                Edit icon <strong>width</strong> or add a custom{" "}
                                <strong>icon URL</strong>.
                            </small>
                        }
                    >
                        <Button
                            disabled={isFreePlan}
                            icon={SettingsIcon}
                            onClick={() => setIconModalStatus((status) => !status)}
                        />
                    </Tooltip>
                </InlineStack>
                {assetsModalStatus && (
                    <Collapsible id="popup-assets-manager" open={assetsModalStatus}>
                        <Card padding="0">
                            <ImageManager callBack={handleCustomIconUpload} />
                        </Card>
                    </Collapsible>
                )}
                {iconModalStatus && (<Collapsible id="popup-icon-settings" open={iconModalStatus}> <Card ><IconSettings configs={configs} setConfigs={setConfigs} isFreePlan={isFreePlan} /></Card></Collapsible>)}
                <InlineGrid gap="400">
                    {/* <PopupContent
                        titleValue={configs?.title}
                        titleOnChange={(value) =>
                            setConfigs({ ...configs, title: value })
                        }
                        textValue={configs?.text}
                        textOnChange={(value) => {
                            !isFreePlan
                                ? setConfigs((current) => ({
                                    ...current,
                                    text: value,
                                }))
                                : undefined;
                        }}
                        textDisabled={isFreePlan}
                        textHelpText={`Use [[country]] in the Short text field to display the user's GEO location. Example: "Looks like you're in [[country]]! Check out our local site."`}
                        translation={
                            secondaryLocales?.length
                                ? () => setContentTranslationsModal((trOpen) => !trOpen)
                                : null
                        }
                    /> */}
                    <div
                        className={
                            configs?.type === "topbar" ? "visually-disabled" : ""
                        }
                    >
                        <Tooltip width="wide" content={<small>Displays the visitor's current country flag based on geolocation data.</small>}>
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
                                                                onClick={() => { }
                                                                    // setDropdownLabelTranslationModal(true)
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

        {visibilityChange && <div className="ngr-inner-preview">
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
        </div>}
    </InlineGrid>
}