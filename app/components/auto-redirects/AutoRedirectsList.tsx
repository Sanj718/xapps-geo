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
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { LoadingStates, OutletContext } from "../_types";

const resourceName = {
  singular: "auto redirect",
  plural: "auto redirects",
};



export default function AutoRedirects({
  redirects,
}) {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const [editRedirect, setEditRedirect] = useState(null);
  const [dragId, setDragId] = useState("");

  async function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    const dragBox = redirects.find((box: { node: { id: string } }) => box.node.id == dragId);
    const dropBox = redirects.find((box: { node: { id: string } }) => box.node.id == ev.currentTarget.id);
    const dragBoxOrder = JSON.parse(dragBox.node.value).order_r;
    const dropBoxOrder = JSON.parse(dropBox.node.value).order_r;
    const newBoxState = redirects.map((box: { node: { id: string, value: string } }) => {
      const item = JSON.parse(box.node.value);

      if (box.node.id == dragId) {
        const new_order =
          dragBoxOrder === dropBoxOrder
            ? Math.max(
              ...redirects.map((o) => JSON.parse(o.node.value).order_r)
            ) + 1
            : dropBoxOrder;
        box.node.value = JSON.stringify({ ...item, order_r: new_order });
      }
      if (box.node.id == ev.currentTarget.id) {
        box.node.value = JSON.stringify({ ...item, order_r: dragBoxOrder });
      }
      return box;
    });
    const updatedOrder = newBoxState.sort(
      (a: { node: { value: string } }, b: { node: { value: string } }) =>
        JSON.parse(a.node.value).order_r - JSON.parse(b.node.value).order_r
    );

    if (!appId) return;
    submit(
      {
        _action: ACTIONS.ReOrderAutoRedirects,
        data: {
          appId,
          data: updatedOrder,
        },
      },
      requestHeaders,
    );
  }

  function openEdit(item: any) {
    setEditRedirect(item);
    console.log(item)
    shopify.modal.show("edit-auto-redirect");
  }

  function toggleStatus(data) {
    const parsed = JSON.parse(data?.node?.value);
    parsed.status = parsed.status === 1 ? 0 : 1;
    delete data.node.id;
    return parsed;
  }

  async function handleRedirectStatus(item) {
    if (!appId) return;
    const updatedItem = toggleStatus(item);
    submit(
      {
        _action: ACTIONS.UpdateAutoRedirect,
        data: {
          appId,
          key: item?.node?.key,
          value: updatedItem,
        },
      },
      requestHeaders,
    );
  }

  const loading = loadingStates(navigation, [ACTIONS.CreateAutoRedirect, ACTIONS.UpdateAutoRedirect, ACTIONS.DeleteAutoRedirect, ACTIONS.ReOrderAutoRedirects]) as LoadingStates;
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
              loading={loading[ACTIONS.CreateAutoRedirect + "Loading"] || loading[ACTIONS.UpdateAutoRedirect + "Loading"] || loading[ACTIONS.DeleteAutoRedirect + "Loading"] || loading[ACTIONS.ReOrderAutoRedirects + "Loading"]}
              renderItem={(item, index) => {
                const { id, value } = item?.node;
                const { url, location, except_r, status, block } =
                  jsonSafeParse(value);
                const locations = parseLocations(location, countries_list);

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
                          <div onClick={() => handleRedirectStatus(item)}><Tooltip content={<small>Status: {status ? "active" : "inactive"}</small>}><Icon source={status ? ToggleOnIcon : ToggleOffIcon} tone={status ? "success" : "subdued"} /></Tooltip></div>
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
                onClick={() => shopify.modal.show("add-auto-redirect")}
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
      < Modal id="edit-auto-redirect" variant="base" >
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
