import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Icon,
  Image,
  InlineGrid,
  InlineStack,
  ResourceItem,
  ResourceList,
  Text,
  Tooltip,
} from "@shopify/polaris";
import {
  DragHandleIcon,
  EditIcon,
  PlusCircleIcon,
  LocationNoneIcon,
  ToggleOnIcon,
  ToggleOffIcon,
} from "@shopify/polaris-icons";
import React, { useState, useMemo } from "react";
import countries_list from "../../assets/countries.json";
import empty2 from "../../assets/empty2.svg";
import AutoRedirectForm from "./AutoRedirectForm";
import { charLimit, jsonSafeParse, loadingStates, parseLocations, requestHeaders } from "../_helpers";
import { TitleBar, Modal } from "@shopify/app-bridge-react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { ACTIONS } from "../_actions";
import { useActionData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext, RedirectItem, AutoRedirectItem, ActionReturn } from "../_types";

const resourceName = {
  singular: "auto redirect",
  plural: "auto redirects",
};



export default function AutoRedirects({
  redirects,
}: {
  redirects: AutoRedirectItem[];
}) {
  const { appId } =
    useOutletContext<OutletContext>();
  const submit = useSubmit();
  const actionData = useActionData<ActionReturn>();
  const navigation = useNavigation();
  const [editRedirect, setEditRedirect] = useState<AutoRedirectItem | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  
  async function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    const dragBox = redirects.find((box: AutoRedirectItem) => box.id ==dragId);
    const dropBox = redirects.find((box: AutoRedirectItem) => box.id == ev.currentTarget.id);
    const dragBoxOrder = dragBox?.jsonValue?.order_r;
    const dropBoxOrder = dropBox?.jsonValue?.order_r;

    const newBoxState = redirects.map((box: AutoRedirectItem) => {
      const item = box.jsonValue;

      if (box.id == dragId) {
        const newOrderNumber =
          dragBoxOrder === dropBoxOrder
            ? Math.max(
              ...redirects.map((o: AutoRedirectItem) => o.jsonValue.order_r)
            ) + 1
            : dropBoxOrder;
        box.jsonValue = { ...item, order_r: newOrderNumber || 0 };
      }
      if (box.id == ev.currentTarget.id) {
        box.jsonValue = { ...item, order_r: dragBoxOrder || 0 };
      }
      return box;
    });
    const updatedOrder = newBoxState.sort(
      (a: AutoRedirectItem, b: AutoRedirectItem) =>
        a.jsonValue.order_r - b.jsonValue.order_r
    );

    if (!appId || !updatedOrder) return;
    submit(
      {
        _action: ACTIONS.reorder_AutoRedirects,
        data: {
          appId,
          data: updatedOrder,
        },
      } as any,
      requestHeaders,
    );
  }

  function openEdit(item: AutoRedirectItem) {
    setEditRedirect(item);
    if (typeof shopify !== 'undefined' && shopify.modal) {
      shopify.modal.show("edit-auto-redirect");
    }
  }

  function toggleStatus(data: AutoRedirectItem) {
    const parsed = data?.jsonValue || {};
    parsed.status = parsed.status ? false : true;
    if (data?.id) {
      delete (data as any)?.id;
    }
    return parsed;
  }

  async function handleRedirectStatus(item: AutoRedirectItem) {
    if (!appId) return;
    const updatedItem = toggleStatus(item);
    submit(
      {
        _action: ACTIONS.update_AutoRedirect,
        data: {
          appId,
          key: item?.key,
          value: updatedItem,
        },
      } as any,
      requestHeaders,
    );
  }
  const loading = loadingStates(navigation, [ACTIONS.create_AutoRedirect, ACTIONS.update_AutoRedirect, ACTIONS.delete_AutoRedirect, ACTIONS.reorder_AutoRedirects]) as LoadingStates;
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
              <InlineStack align="space-between">
                <Text as="h3" variant="headingMd">
                  Auto redirects
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd">
                Create and edit custom redirect buttons to enhance user
                navigation and improve customer experience. Easily configure
                destinations for each button to meet your store’s needs.
              </Text>
            </BlockStack>
          </div>
        </Box>
        <Card roundedAbove="sm">
          <BlockStack gap="400">
            <ResourceList
              emptyState={
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Image source={empty2} width="200" height="150" alt="empty" />
                  <Text as="p" variant="headingSm">
                    Simplify the customer experience — set up your first auto
                    redirect now!
                  </Text>
                </div>
              }
              resourceName={resourceName}
              items={redirects}
              loading={loading[ACTIONS.create_AutoRedirect + "Loading"] || loading[ACTIONS.update_AutoRedirect + "Loading"] || loading[ACTIONS.delete_AutoRedirect + "Loading"] || loading[ACTIONS.reorder_AutoRedirects + "Loading"]}
              renderItem={(item, index) => {
                const { id, jsonValue } = item;
                const { url, location, except_r, status, block } = jsonValue
                const locations = parseLocations(location as string[], countries_list);

                return (
                  <div
                    className="auto-redirect-item"
                    id={id}
                    draggable
                    onDragStart={(ev) => {
                      setDragId(id);
                    }}
                    onDrop={handleDrop}
                    onDragOver={(ev) => ev.preventDefault()}
                  >
                    <ResourceItem
                      id={id}
                      onClick={() => { }}
                      verticalAlignment="center"
                      accessibilityLabel={`View details`}
                    >
                      <InlineStack blockAlign="center" align="space-between">
                        <InlineStack gap="200">
                          <div style={{ cursor: "move" }}>
                            <Icon source={DragHandleIcon} tone="subdued" />
                          </div>
                          <div className="redirect-status" onClick={() => handleRedirectStatus(item)}><Tooltip content={<small>Status: {status ? "active" : "inactive"}</small>}><Icon source={status ? ToggleOnIcon : ToggleOffIcon} tone={status ? "success" : "subdued"} /></Tooltip></div>
                          {except_r ? (
                            <Tooltip
                              width="wide"
                              content={
                                <small>
                                  Excluding selected countries/continents.
                                </small>
                              }
                            >
                              <div
                                style={{
                                  opacity: (!status && 0.5) || 1,
                                }}
                              ><Icon
                                  source={LocationNoneIcon}
                                  tone="warning"
                                />
                              </div>
                            </Tooltip>
                          ) : (
                            ""
                          )}
                          <Tooltip
                            width="wide"
                            content={<small>{locations}</small>}
                          >
                            <div
                              style={{
                                opacity: (!status && 0.5) || 1,
                              }}
                            ><Text as="p" variant="bodyXs">
                                {charLimit(locations, 25)}
                              </Text></div>
                          </Tooltip>
                          <div
                            style={{
                              opacity: (!status && 0.5) || 1,
                            }}
                          >
                            {block ? (
                              <Badge size="small" tone="critical">
                                Blocked
                              </Badge>
                            ) : (
                              <Tooltip
                                width="wide"
                                content={<small>{url}</small>}
                              >
                                <Badge size="small">
                                  {charLimit(url, 20)}
                                </Badge>
                              </Tooltip>
                            )}
                          </div>
                        </InlineStack>

                        <InlineStack gap="100" align="end">
                          <Button
                            icon={EditIcon}
                            onClick={() => openEdit(item)}
                            size="slim"
                          >
                            Edit
                          </Button>
                        </InlineStack>
                      </InlineStack>
                    </ResourceItem>
                  </div>
                );
              }}
            />
            <InlineStack align="end">
              <Button
                variant="primary"
                onClick={() => {
                  if (typeof shopify !== 'undefined' && shopify.modal) {
                    shopify.modal.show("add-auto-redirect");
                  }
                }}
                icon={PlusCircleIcon}
              >
                Add
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>
      </InlineGrid >

      {/* Add auto redirect */}
      < Modal id="add-auto-redirect" variant="base" >
        <TitleBar title="Add auto redirect" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <AutoRedirectForm
              redirects={redirects}
            />
          </AppProvider>
        </Box>
      </Modal >

      {/* Edit auto redirect */}
      <Modal id="edit-auto-redirect" variant="base" >
        <TitleBar title="Edit auto redirect" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <AutoRedirectForm
              editItem={editRedirect}
              redirects={redirects}
            />
          </AppProvider>
        </Box>
      </Modal >
      {/* <Modal
        open={addModalStatus}
        onClose={() => {
          setAddModalStatus(false);
        }}
        title="Add auto redirect"
      >
        <Modal.Section>
          <AutoRedirectForm
            appId={appId}
            setToastData={setToastData}
            loadRedirects={loadRedirects}
            setModalStatus={setAddModalStatus}
          />
        </Modal.Section>
      </Modal>
      <Modal
        open={editModalStatus}
        onClose={() => {
          setEditModalStatus(false);
          setEditRedirect(null);
        }}
        title="Edit auto redirect"
      >
        <Modal.Section>
          <AutoRedirectForm
            appId={appId}
            setToastData={setToastData}
            loadRedirects={loadRedirects}
            setModalStatus={setEditModalStatus}
            editItem={editRedirect}
          />
        </Modal.Section>
      </Modal> */}
    </>
  );
}
