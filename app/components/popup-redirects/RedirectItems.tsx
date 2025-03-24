import React, { useMemo, useState } from "react";
import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Icon,
  Image,
  InlineGrid,
  InlineStack,
  ResourceItem,
  ResourceList,
  Text,
  Tooltip,
} from "@shopify/polaris";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import {
  DragHandleIcon,
  EditIcon,
  HideIcon,
  PlusCircleIcon,
  ToggleOffIcon,
  ToggleOnIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
// import PopupRedirectForm from "./PopupRedirectForm";
import { charLimit, loadingStates, requestHeaders } from "../_helpers";
// import tr from "../locales.json";
import empty from "../../assets/empty.svg";
import PopupRedirectForm from "./PopupRedirectForm";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { ActionReturn, LoadingStates, RedirectItem } from "../_types";
// import { id } from "date-fns/locale";

interface RedirectItemsProps {
  redirects: any;
  setToastData: any;
}
interface DragEvent {
  currentTarget: {
    id: string;
  };
}

const resourceName = {
  singular: "redirect",
  plural: "redirects",
};

export default function RedirectItems({
  redirects,
  setToastData,
}: RedirectItemsProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  // const actionData = useActionData<ActionReturn>();
  const [editRedirect, setEditRedirect] = useState(undefined);
  const [dragId, setDragId] = useState("");

  // useMemo(() => {
  //   if (actionData?._action === "toggleRedirectStatus" && actionData?.status) {
  //     setToastData({ error: false, msg: tr.responses.rd_status_success });
  //   }
  // }, [actionData]);

  function openEdit(item: any) {
    setEditRedirect(item);
    shopify.modal.show("edit-redirect")
  }

  async function handleDrop(ev: DragEvent) {
    const currentTargetId = Number(ev.currentTarget.id);
    const currentDragId = Number(dragId);
    const dragBox = redirects.find((box: RedirectItem) => box.id == currentDragId);
    const dropBox = redirects.find((box: RedirectItem) => box.id == currentTargetId);

    if (!dragBox || !dropBox) return;

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = redirects.map((box: RedirectItem) => {
      if (box.id == currentDragId) {
        box.order = dropBoxOrder;
      }
      if (box.id == currentTargetId) {
        box.order = dragBoxOrder;
      }
      return box;
    });

    const updated_order = newBoxState.sort((a: RedirectItem, b: RedirectItem) => a.order - b.order);
    const updated_order_ids = updated_order.map((item: RedirectItem) => item.id);

    submit(
      {
        _action: "reorderRedirect",
        data: {
          ids: updated_order_ids
        },
      },
      requestHeaders,
    );
  }

  async function handleRedirectStatus(item: RedirectItem) {
    const newStatus = !item.status;
    submit(
      {
        _action: "toggleRedirectStatus",
        data: {
          id: item.id,
          status: newStatus,
        },
      },
      requestHeaders,
    );
  }

  const { toggleRedirectStatusLoading, reorderRedirectLoading } = loadingStates(navigation, ["toggleRedirectStatus", "reorderRedirect"]) as LoadingStates;

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
                  Redirect buttons
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
                  <Image
                    source={empty}
                    width="200"
                    height="150"
                    alt="empty"
                  />
                  <Text as="p" variant="headingSm">
                    Guide customers effortlessly — add your first redirect!
                  </Text>
                </div>
              }
              resourceName={resourceName}
              items={redirects}
              loading={toggleRedirectStatusLoading || reorderRedirectLoading}
              renderItem={(item: RedirectItem, rId, index) => {
                const { id, url, label, flag, status } = item;

                if (!id) return null;
                return (
                  <div
                    className="redirect-item"
                    id={String(id) || ""}
                    draggable
                    onDragStart={(ev) => {
                      setDragId(ev?.currentTarget?.id);
                    }}
                    onDrop={handleDrop}
                    onDragOver={(ev) => ev.preventDefault()}
                  >
                    <ResourceItem
                      id={String(id)}
                      onClick={() => { }}
                      verticalAlignment="center"
                      accessibilityLabel={`View details for ${label}`}
                    >
                      <InlineStack blockAlign="center" align="space-between">
                        <InlineStack gap="200">
                          <div style={{ cursor: "move" }}>
                            <Icon source={DragHandleIcon} tone="subdued" />
                          </div>
                          <div onClick={() => handleRedirectStatus(item as RedirectItem)}><Tooltip content={<small>Status: {status ? "active" : "inactive"}</small>}><Icon source={status ? ToggleOnIcon : ToggleOffIcon} tone={status ? "success" : "subdued"} /></Tooltip></div>
                          <img
                            src={flag}
                            width="30"
                            height="30"
                            style={{
                              opacity: (!status && 0.5) || 1,
                              objectFit: "contain",
                            }}
                          />
                          <div
                            style={{
                              opacity: (!status && 0.5) || 1,
                            }}
                          >
                            <InlineStack gap="150">
                              <Text as="p" variant="headingXs">
                                {charLimit(label, 30)}
                              </Text>
                              <Badge size="small">{charLimit(url, 27)}</Badge>
                            </InlineStack>
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
                    {redirects.length - 1 !== index && <Divider />}
                  </div>
                );
              }}
            />
            <InlineStack align="end">
              <Button
                variant="primary"
                onClick={() => shopify.modal.show("add-redirect")}
                icon={PlusCircleIcon}
              >
                Add
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>
      </InlineGrid>

      {/* Add redirect modal */}
      <Modal id="add-redirect" variant="base">
        <TitleBar title="Add redirect" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <PopupRedirectForm
              setToastData={setToastData}
              redirects={redirects}
            />
          </AppProvider>
        </Box>
      </Modal>

      {/* Edit redirect modal */}
      <Modal id="edit-redirect" variant="base">
        <TitleBar title="Edit redirect" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <PopupRedirectForm
              setToastData={setToastData}
              redirects={redirects}
              editItem={editRedirect}
            />
          </AppProvider>
        </Box>
      </Modal>
    </>
  );
}
