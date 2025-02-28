import {
  Text,
  TextField,
  Button,
  FormLayout,
  Checkbox,
  Select,
  Thumbnail,
  Divider,
  Icon,
  InlineStack,
  InlineGrid,
  Tooltip,
  Box,
  BlockStack,
  Collapsible,
  Card,
} from "@shopify/polaris";
import React, { useState, useMemo } from "react";
import {
  ImageAddIcon,
  ImageIcon,
  LanguageIcon,
  DeleteIcon,
  QuestionCircleIcon,
  XCircleIcon,
} from "@shopify/polaris-icons";
import countriesList from "../../assets/countries.json";
import {
  continents_auto,
  loadingStates,
  parseCountries,
  parseCountryCodesWithFullNames,
  planParser,
  requestHeaders,
} from "../_helpers";
import tr from "../locales.json";
import { isWebUri } from "valid-url";
import ListWithTags from "../_common/ListWithTags";
import ImageManager from "../_common/ImageManager";
import PromoBadge from "../_common/PromoBadge";
import { useActionData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { ActionReturn, LoadingStates, OutletContext, RedirectItem, Asset } from "../_types";


interface FieldValidation {
  url: boolean;
  flag: boolean;
}

interface PopupRedirectFormProps {
  editItem?: RedirectItem;
  setToastData: (data: { error: boolean; msg: string }) => void;
  redirects: any[];
}

interface Country {
  image: string;
  name: string;
}


const defaultRedirectItem = {
  shopId: 0,
  flag: "",
  label: "",
  url: "",
  order: 0,
  conditional: false,
  conditionalLocation: null,
  domainRedirection: false,
  locales: null,
}

export default function PopupRedirectForm({
  editItem = undefined,
  setToastData,
  redirects = [],
}: PopupRedirectFormProps) {

  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const actionData = useActionData<ActionReturn>();
  const navigation = useNavigation();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const countries = parseCountries(countriesList);
  const countries_conditionals = parseCountryCodesWithFullNames(countriesList);
  const primaryLocale = shopInfo?.shopLocales?.find((item) => item.primary);
  const secondaryLocales = shopInfo?.shopLocales?.filter(
    (item) => !item.primary,
  );
  const submit = useSubmit();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [addButtonStatus, setAddButtonStatus] = useState(false);
  const [labelTranslation, setLabelTranslation] = useState(false);
  const [assetsModalStatus, setAssetsModalStatus] = useState(false);
  const [redirectItem, setRedirectItem] = useState<RedirectItem>(defaultRedirectItem);
  const [fieldValidation, setFieldValidation] = useState({
    url: false,
    flag: false,
  });

  useMemo(() => {
    if (editItem?.id) {
      setSelectedCountry(editItem.flag);
      setRedirectItem(editItem)
    }
  }, [editItem]);

  useMemo(() => {
    if (actionData?._action === "addRedirect" && actionData?.status) {
      // if (redirects?.length >= 4 && isBasicPlan) {
      //   msg = tr.responses.limit_error;
      // }
      setToastData({ error: false, msg: tr.responses.rd_create_success });
      shopify.modal.hide("add-redirect");
      setRedirectItem(defaultRedirectItem);
      setSelectedCountry("--");
    }
    if (actionData?._action === "deleteRedirect" && actionData?.status) {
      setToastData({ error: false, msg: tr.responses.rd_delete_success });
      shopify.modal.hide("edit-redirect");
      setRedirectItem(defaultRedirectItem);
      setSelectedCountry("--");
    }
    if (actionData?._action === "updateRedirect" && actionData?.status) {
      setToastData({ error: false, msg: tr.responses.rd_update_success });
      shopify.modal.hide("edit-redirect");
      setRedirectItem(defaultRedirectItem);
      setSelectedCountry("--");
    }
  }, [actionData]);

  function handleCountrySelect(value: string) {
    setSelectedCountry(value);
    const selectedCountry: Country | undefined = countriesList.find(
      (country: Country) => country.image === value,
    );
    setRedirectItem({
      ...redirectItem,
      flag: value,
      label: selectedCountry?.name || "",
    });
    setFieldValidation({
      ...fieldValidation,
      flag: false,
    });
  }

  function handleCustomIconUpload(assets: Asset | null) {
    if (!assets) return;
    setRedirectItem({
      ...redirectItem,
      flag: assets.url,
    });

    setSelectedCountry("--");
    setAssetsModalStatus(false);
  }

  useMemo(() => {
    let validator = 1;
    Object.entries(redirectItem).forEach(([key, value]) => {
      if (key === "url" || key === "label") {
        if (value === null || value === undefined || value === "") {
          validator *= 0;
        }
        if (key === "url") {
          if (!isWebUri(value)) {
            validator *= 0;
          }
        }
      }
    });
    setAddButtonStatus(validator > 0 ? false : true);
  }, [redirectItem, fieldValidation]);

  function validateUrlField(value: string, field: keyof FieldValidation) {
    setFieldValidation({
      ...fieldValidation,
      [field]: !isWebUri(value),
    });
  }

  async function handleUpdate() {
    submit(
      {
        _action: "updateRedirect",
        data: redirectItem,
      },
      requestHeaders,
    );
    setLabelTranslation(false)
  }


  async function handleDelete(id: number) {
    submit(
      {
        _action: "deleteRedirect",
        data: {
          id
        },
      },
      requestHeaders,
    );
  }

  async function handleAdd() {
    submit(
      {
        _action: "addRedirect",
        data: {
          ...redirectItem,
          shopId: shopdb?.id,
          order_r: redirects?.length
            ? Math.max(...redirects.map((o) => o.order_r)) + 1
            : 1,
        },
      },
      requestHeaders,
    );
    setLabelTranslation(false)
  }

  const { addRedirectLoading, deleteRedirectLoading, updateRedirectLoading } = loadingStates(navigation, ["addRedirect", "deleteRedirect", "updateRedirect"]) as LoadingStates;

  return (
    <InlineGrid gap="400">
      <FormLayout>
        {editItem && (
          <Select
            label="Status:"
            labelInline
            options={[
              { value: "active", label: "Active" },
              { value: "draft", label: "Draft" },
            ]}
            value={redirectItem.status ? "active" : "draft"}
            onChange={(value) =>
              setRedirectItem({
                ...redirectItem,
                status: value === "active" ? true : false,
              })
            }
          />
        )}
        <InlineStack gap="300" blockAlign="end" align="space-between">
          <InlineGrid gap="100">
            <Text as="p">Icon</Text>
            <div style={{ border: "1px solid #ccc", borderRadius: "6px" }}>
              <Thumbnail
                size="small"
                source={redirectItem?.flag ? redirectItem.flag : ImageIcon}
                alt=""
              />
            </div>
          </InlineGrid>
          <InlineGrid gap="200">
            <PromoBadge type="basic" />
            <InlineStack gap="300" blockAlign="baseline">
              <Select
                label="Select icon"
                options={countries}
                onChange={handleCountrySelect}
                value={selectedCountry}
              />
              <InlineGrid gap="100">
                <Text as="p">Custom icon</Text>
                <Button
                  size="large"
                  onClick={() => {
                    setAssetsModalStatus((val) => !val);
                  }}
                  icon={assetsModalStatus ? XCircleIcon : ImageAddIcon}
                  disabled={isFreePlan}
                >
                  {assetsModalStatus ? "Close" : "Select"}
                </Button>
              </InlineGrid>
            </InlineStack>
          </InlineGrid>
        </InlineStack>
        {assetsModalStatus && (
          <Collapsible id="assets-manager" open={assetsModalStatus}>
            <Card padding="0">
              <ImageManager callBack={handleCustomIconUpload} />
            </Card>
          </Collapsible>
        )}
        <InlineGrid gap="200" columns="1">
          <BlockStack gap="0">
            <InlineStack align="space-between" gap="200" blockAlign="center">
              <Text as="p">{`Label ${primaryLocale ? "(" + primaryLocale.locale + ")" : ""
                }`}</Text>
              {secondaryLocales && secondaryLocales.length && (
                <Tooltip
                  width="wide"
                  content={
                    <small>
                      Translate your content into multiple languages supported
                      by your store.
                    </small>
                  }
                >
                  <Button
                    icon={LanguageIcon}
                    size="micro"
                    onClick={() => setLabelTranslation((val) => !val)}
                  ></Button>
                </Tooltip>
              )}
            </InlineStack>
            <TextField
              type="text"
              autoComplete="off"
              label={`Label ${primaryLocale ? "(" + primaryLocale.locale + ")" : ""
                }`}
              labelHidden
              value={redirectItem.label ? redirectItem.label : ""}
              onChange={(value) =>
                setRedirectItem({
                  ...redirectItem,
                  label: value,
                })
              }
            />
            {labelTranslation && (
              <Collapsible id="assets-manager" open={labelTranslation}>
                <br />
                <Card padding="200">
                  <InlineGrid gap="200">
                    <Box>
                      <PromoBadge type="pro" />
                    </Box>
                    <div
                      style={{
                        maxHeight: "70px",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      {secondaryLocales && secondaryLocales.length && (
                        <InlineGrid gap="400" columns="2">
                          {secondaryLocales.map((locale) => {
                            const parsedLocales = redirectItem.locales || {};
                            return (
                              <TextField
                                disabled={!isProPlan}
                                key={locale.locale}
                                type="text"
                                autoComplete="off"
                                label={`Label (${locale.locale || ""})`}
                                value={
                                  parsedLocales &&
                                    parsedLocales[locale.locale]
                                    ? parsedLocales[locale.locale]
                                    : ""
                                }
                                onChange={(value) =>
                                  setRedirectItem({
                                    ...redirectItem,
                                    locales: {
                                      ...parsedLocales,
                                      [locale.locale]: value,
                                    },
                                  })
                                }
                              />
                            );
                          })}
                        </InlineGrid>
                      )}
                    </div>
                    <Divider />
                    <InlineStack align="end">
                      <Button
                        size="micro"
                        onClick={() => setLabelTranslation(false)}
                      >
                        Close
                      </Button>
                    </InlineStack>
                  </InlineGrid>
                </Card>
              </Collapsible>
            )}
          </BlockStack>
          <TextField
            type="url"
            autoComplete="off"
            placeholder="https://"
            inputMode="url"
            label="Url"
            value={redirectItem.url ? redirectItem.url : "https://"}
            error={fieldValidation.url && "Please enter valid url"}
            onBlur={(e) => validateUrlField(e.target.value, "url")}
            onChange={(value) => {
              setRedirectItem({
                ...redirectItem,
                url: value,
              });
              // validateUrlField(value, "url")
            }}
          />
        </InlineGrid>
        <Divider />
        <PromoBadge type="pro" />
        <InlineGrid columns="2" gap="200" alignItems="start">
          <InlineStack gap="100" blockAlign="center">
            <Checkbox
              disabled={!isProPlan}
              label={`Domain redirection`}
              checked={redirectItem.domainRedirection}
              onChange={
                isProPlan
                  ? (value) =>
                    setRedirectItem({
                      ...redirectItem,
                      domainRedirection: value,
                    })
                  : undefined
              }
            />
            <Tooltip
              width="wide"
              content={
                <small>
                  Keeps you on the same page when switching to a new domain. For
                  example, if you're on <code>site.com/about</code>, you'll be
                  redirected to <code>new-site.com/about</code> without losing
                  your path.
                </small>
              }
            >
              <Icon source={QuestionCircleIcon} tone="subdued" />
            </Tooltip>
          </InlineStack>
          <InlineGrid gap="100">
            <InlineStack gap="100" blockAlign="center">
              <Checkbox
                disabled={!isProPlan}
                label="Enable conditional show"
                checked={isProPlan ? redirectItem.conditional : false}
                onChange={
                  isProPlan
                    ? (value) =>
                      setRedirectItem({
                        ...redirectItem,
                        conditional: value,
                      })
                    : undefined
                }
              />
              <Tooltip
                content={
                  <small>
                    You can conditionally show redirect buttons based on user
                    geo location country/continent.
                  </small>
                }
              >
                <Icon source={QuestionCircleIcon} tone="subdued" />
              </Tooltip>
            </InlineStack>
            {isProPlan && redirectItem?.conditional && (
              <ListWithTags
                list={[
                  { value: "-c", label: "Continents", title: true },
                  ...continents_auto,
                  { value: "-ct", label: "Countries", title: true },
                  ...countries_conditionals,
                ]}
                setConfigs={isProPlan ? setRedirectItem : () => { }}
                configs={isProPlan ? redirectItem : []}
                id="conditionalLocation"
                helpText=""
                placeholder="Select countries/continents"
              />)}
          </InlineGrid>
        </InlineGrid>
      </FormLayout>

      <Divider />

      <InlineStack gap="200" align="space-between">
        {editItem ? (
          <Button
            size="slim"
            tone="critical"
            onClick={() => { if (redirectItem?.id) { handleDelete(redirectItem.id) } }}
            loading={deleteRedirectLoading}
            icon={DeleteIcon}
          >
            Delete
          </Button>
        ) : (
          <div></div>
        )}
        <InlineStack gap="200">
          <Button
            size="slim"
            onClick={() => {
              shopify.modal.hide("add-redirect");
              shopify.modal.hide("edit-redirect");
              setLabelTranslation(false)
            }}
          >
            Cancel
          </Button>
          <Button
            size="slim"
            variant="primary"
            onClick={editItem ? handleUpdate : handleAdd}
            disabled={addButtonStatus}
            loading={addRedirectLoading || updateRedirectLoading}
          >
            {editItem ? "Save" : "Add"}
          </Button>
        </InlineStack>
      </InlineStack>
    </InlineGrid>
  );
}