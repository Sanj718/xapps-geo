import {
  TextField,
  Checkbox,
  Button,
  Select,
  InlineGrid,
  InlineStack,
  Badge,
  Tooltip,
  Icon,
  Divider,
} from "@shopify/polaris";
import React, { useState, useContext, useMemo } from "react";
import { DeleteIcon, QuestionCircleIcon } from "@shopify/polaris-icons";
import {
  continents_auto,
  jsonSafeParse,
  loadingStates,
  parseCountryCodesWithFullNames,
  planParser,
  requestHeaders,
} from "../_helpers";
import countriesList from "../../assets/countries.json";
import { isWebUri } from "valid-url";
import { useActionData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { ActionReturn, LoadingStates, OutletContext } from "../_types";
import ListWithTags from "../_common/ListWithTags";
import { ACTIONS } from "../_actions";


const defaultRedirectItem = {
  location: [],
  except_r: false,
  block: false,
  url: "",
  domain_redirection: false,
  status: true
}
export default function AutoRedirectForm({
  editItem = null,
  redirects = [],
}) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const navigation = useNavigation();
  const submit = useSubmit()
  const actionData = useActionData<ActionReturn>();
  const [addButtonStatus, setAddButtonStatus] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({
    url: false,
    location: false,
  });
  const [redirectItem, setRedirectItem] = useState(
    editItem
      ? { id: editItem?.node?.id, ...jsonSafeParse(editItem.node.value) }
      : defaultRedirectItem
  );

  useMemo(() => {
    if (editItem) {
      setRedirectItem({ id: editItem?.node?.id, key: editItem?.node?.key, ...jsonSafeParse(editItem.node.value) });
    }
  }, [editItem]);

  useMemo(() => {
    let validator = 1;
    if (redirectItem.block) {
      if (
        redirectItem.location === null ||
        redirectItem.location === undefined ||
        redirectItem.location === "" ||
        !redirectItem.location.length
      ) {
        validator *= 0;
      }
    } else {
      Object.entries(redirectItem).forEach(([key, value]) => {
        if (key === "url" || key === "location") {
          if (
            value === null ||
            value === undefined ||
            value === "" ||
            !value.length
          ) {
            validator *= 0;
          }

          if (key === "url") {
            if (!isWebUri(value)) {
              validator *= 0;
            }
          }
        }
      });
    }

    setAddButtonStatus(validator > 0 ? false : true);
  }, [redirectItem]);

  useMemo(() => {
    if (actionData?._action === ACTIONS.create_AutoRedirect && actionData?.status) {
      shopify.modal.hide("add-auto-redirect");
      setRedirectItem(defaultRedirectItem);
    }
    if (actionData?._action === ACTIONS.delete_AutoRedirect && actionData?.status) {
      shopify.modal.hide("edit-auto-redirect");
      setRedirectItem(defaultRedirectItem);
    }
    if (actionData?._action === ACTIONS.update_AutoRedirect && actionData?.status) {
      shopify.modal.hide("edit-auto-redirect");
      setRedirectItem(defaultRedirectItem);
    }
  }, [actionData]);

  function validateUrlField(value, field) {
    setFieldValidation({
      ...fieldValidation,
      [field]: !isWebUri(value),
    });
  }

  async function handleEdit() {
    if (!appId) return;
    submit(
      {
        _action: ACTIONS.UpdateAutoRedirect,
        data: {
          appId,
          key: editItem?.node?.key,
          value: redirectItem,
        },
      },
      requestHeaders,
    );
  }

  async function handleDelete(key: string) {
    if (!appId || !key) return;
    submit(
      {
        _action: ACTIONS.delete_AutoRedirect,
        data: {
          appId,
          key,
        },
      },
      requestHeaders,
    );
  }

  async function handleAdd() {
    if (isFreePlan && redirects?.length >= 1) {
      shopify.toast.show("You have reached the limit of auto redirects on Free plan", {
        isError: true,
      });
      return;
    }
    const nextOrderNumber = redirects?.length
      ? Math.max(...redirects.map((o) => JSON.parse(o.node.value).order_r)) + 1
      : 1;

    if (!appId) return;
    submit(
      {
        _action: ACTIONS.CreateAutoRedirect,
        data: {
          appId,
          data: {
            ...redirectItem,
            order_r: nextOrderNumber,
          },
        },
      },
      requestHeaders,
    );
  }
  const countries_conditionals = parseCountryCodesWithFullNames(countriesList);
  const loading = loadingStates(navigation, [ACTIONS.create_AutoRedirect, ACTIONS.update_AutoRedirect, ACTIONS.delete_AutoRedirect]) as LoadingStates;
  return (
    <InlineGrid gap="400">
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
      <InlineGrid gap="400">
        <InlineGrid columns={"23% auto"} gap="200">
          <Select
            label="Location scope"
            options={[
              {
                label: "Outside",
                value: "except",
              },
              {
                label: "Inside",
                value: "include",
              },
            ]}
            onChange={(value) =>
              setRedirectItem((current) => ({
                ...current,
                except_r: value === "except" ? true : false,
              }))
            }
            value={redirectItem?.except_r ? "except" : "include"}
          />
          <ListWithTags
            list={[
              { value: "-c", label: "Continents", title: true },
              ...continents_auto,
              { value: "-ct", label: "Countries", title: true },
              ...countries_conditionals,
            ]}
            setConfigs={setRedirectItem}
            configs={redirectItem}
            id="location"
            placeholder="Click to select"
            label="Select country or continent"

          />
        </InlineGrid>
        <InlineGrid columns="70% auto 20%" alignItems="center" gap="200">
          <InlineGrid>
            <TextField
              disabled={redirectItem?.block}
              type="url"
              autoComplete="off"
              placeholder="https://"
              // prefix="https://"
              inputMode="url"
              label="Redirect url"
              value={redirectItem?.url ? redirectItem.url : "https://"}
              error={fieldValidation.url && "Please enter valid url"}
              onBlur={(e) => validateUrlField(e.target.value, "url")}
              onChange={(value) =>
                setRedirectItem({
                  ...redirectItem,
                  url: value,
                })
              }
            />
            <Checkbox
              disabled={redirectItem?.block}
              label={
                <InlineStack gap="100" blockAlign="center">
                  Domain redirection
                  <Tooltip
                    width="wide"
                    content={
                      <small>
                        Keeps you on the same page when switching to a new
                        domain. For example, if you're on{" "}
                        <code>site.com/about</code>, you'll be redirected to{" "}
                        <code>new-site.com/about</code> without losing your
                        path.
                      </small>
                    }
                  >
                    <Icon source={QuestionCircleIcon} tone="subdued" />
                  </Tooltip>
                </InlineStack>
              }
              checked={redirectItem?.domain_redirection}
              onChange={(value) =>
                setRedirectItem({
                  ...redirectItem,
                  domain_redirection: value,
                })
              }
            />
          </InlineGrid>
          <InlineStack align="center">
            <Badge>OR</Badge>
          </InlineStack>
          <div
            style={{
              border: "1px dashed #8e0b21",
              background: "#fed1d7",
              color: "#8e0b21",
              padding: "0px 6px",
              borderRadius: "8px",
            }}
          >
            <Checkbox
              label="Block"
              checked={redirectItem?.block}
              onChange={(value) =>
                setRedirectItem((current) => ({ ...current, block: value }))
              }
            />
          </div>
        </InlineGrid>
        <Divider />
        <InlineStack gap="200" align="space-between">
          {editItem ? (
            <Button
              size="slim"
              tone="critical"
              onClick={() => handleDelete(redirectItem?.key)}
              loading={loading[ACTIONS.delete_AutoRedirect + "Loading"]}
              icon={DeleteIcon}
            >
              Delete
            </Button>
          ) : (
            <div></div>
          )}
          <InlineStack gap="200">
            <Button
              onClick={() => {
                shopify.modal.hide("add-auto-redirect");
                shopify.modal.hide("edit-auto-redirect");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={editItem ? handleEdit : handleAdd}
              disabled={addButtonStatus}
              loading={loading[ACTIONS.create_AutoRedirect + "Loading"] || loading[ACTIONS.update_AutoRedirect + "Loading"]}
            >
              {editItem ? "Save" : "Add"}
            </Button>
          </InlineStack>
        </InlineStack>
      </InlineGrid>
    </InlineGrid>
  );
}