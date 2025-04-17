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
      ? { id: editItem?.node?.id, ...JSON.parse(editItem.node.value) }
      : defaultRedirectItem
  );


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
    if (actionData?._action === ACTIONS.CreateAutoRedirect && actionData?.key) {
      shopify.modal.hide("add-auto-redirect");
      setRedirectItem(defaultRedirectItem);
    }
    if (actionData?._action === ACTIONS.DeleteAutoRedirect && actionData?.status) {
      shopify.modal.hide("edit-auto-redirect");
      setRedirectItem(defaultRedirectItem);
    }
    if (actionData?._action === ACTIONS.UpdateAutoRedirect && actionData?.status) {
      shopify.modal.hide("edit-auto-redirect");
      setRedirectItem(defaultRedirectItem);
    }
  }, [actionData]);

  console.log(actionData);

  function validateUrlField(value, field) {
    setFieldValidation({
      ...fieldValidation,
      [field]: !isWebUri(value),
    });
  }

  async function handleEdit() {
    // setLoading(true);
    // setAddButtonStatus(true);
    // let error = true;
    // let msg = tr.responses.error;

    // try {
    //   const response = await fetch(UPDATE_AUTO_REDIRECT, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "post",
    //     body: JSON.stringify({
    //       data: {
    //         key: editItem.node.key,
    //         namespace: editItem.node.namespace,
    //         type: "json",
    //         value: redirectItem,
    //       },
    //       appId: appId,
    //     }),
    //   });
    //   const responseJson = await response.json();

    //   if (responseJson?.status) {
    //     error = false;
    //     msg = tr.responses.rd_update_success;

    //     setRedirectItem({
    //       location: [],
    //       except: false,
    //       block: false,
    //       url: "",
    //       domain_redirection: false,
    //       status: 1,
    //     });
    //     setModalStatus(false);
    //     loadRedirects();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

    // setAddButtonStatus(false);
    // setLoading(false);
  }

  async function handleDelete(id) {
    // setDeleteLoading(true);
    // let error = true;
    // let msg = tr.responses.error;

    // try {
    //   const response = await fetch(DELETE_AUTO_REDIRECT, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "post",
    //     body: JSON.stringify({ id }),
    //   });
    //   const responseJson = await response.json();
    //   console.log("responseJson", responseJson, id);
    //   if (responseJson?.status) {
    //     error = false;
    //     msg = tr.responses.rd_delete_success;

    //     setModalStatus(false);
    //     loadRedirects();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

    // setDeleteLoading(false);
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

  // const countries = parseCountryCodesWithFullNames(countriesList);
  const countries_conditionals = parseCountryCodesWithFullNames(countriesList);

  const loading = loadingStates(navigation, [ACTIONS.CreateAutoRedirect]) as LoadingStates;

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
              onClick={() => handleDelete(redirectItem?.id)}
              // loading={deleteLoading}
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
              loading={loading[ACTIONS.CreateAutoRedirect + "Loading"]}
            >
              {editItem ? "Save" : "Add"}
            </Button>
          </InlineStack>
        </InlineStack>
      </InlineGrid>
    </InlineGrid>
  );
}

// async function handleSubmit(params) {
//   setRedirectCreateLoading(true);
//   let response = false;
//   if (editItem) {
//     response = await fetch(UPDATE_AUTO_REDIRECT, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "post",
//       body: JSON.stringify({
//         data: {
//           key: editItem.node.key,
//           namespace: editItem.node.namespace,
//           type: "json",
//           value: redirectItem,
//         },
//         appId: appId,
//       }),
//     }).then((data) => data.json());
//   } else {
//     if (isFreePlan && redirects?.length >= 1) {
//       setRedirectCreateLoading(false);
//       setToastData({
//         error: true,
//         msg: tr.responses.limit_error,
//       });
//       return;
//     }
//     const next_order_number = redirects?.length
//       ? Math.max(...redirects.map((o) => JSON.parse(o.node.value).order_r)) +
//         1
//       : 1;
//     response = await fetch(CREATE_AUTO_REDIRECT, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "post",
//       body: JSON.stringify({
//         data: {
//           ...redirectItem,
//           order_r: next_order_number,
//         },
//         appId: appId,
//       }),
//     }).then((data) => data.json());
//   }

//   if (response?.status) {
//     setToastData({
//       error: false,
//       msg: editItem
//         ? tr.responses.rd_update_success
//         : tr.responses.rd_create_success,
//     });
//     setRedirectItem({
//       location: [],
//       except: false,
//       block: false,
//       url: "",
//       domain_redirection: false,
//       status: 1,
//     });
//     setModalStatus(false);
//     loadRedirects();
//   } else {
//     setToastData({
//       error: true,
//       msg: tr.responses.error,
//     });
//   }
//   setRedirectCreateLoading(false);
// }

{
  /* <div className={redirectItem?.block ? "blocked" : ""}>
          <Checkbox
            label="Block"
            checked={redirectItem?.block}
            helpText="restrict access to your site"
            onChange={handleBlock}
          />

          <br />
          <div className="redirect-url">
            <div className="info-box ">
              Redirect to the domain entered above by keeping the page path.
              <br />
              Example:
              <p>
                <i>
                  https://...ca<strong>/inner-page</strong>
                </i>{" "}
                →{" "}
                <i>
                  https://...com<strong>/inner-page</strong>
                </i>
              </p>
            </div>

            <div className="info-box info-box--adds">
              Custom Redirect logic?
              <br />
              You can add your own custom redirect logic in code editor. Go to{" "}
              <strong>Settings</strong> tab and{" "}
              <strong>Advanced Settings</strong> section.
            </div>
          </div>
        </div> */
}
