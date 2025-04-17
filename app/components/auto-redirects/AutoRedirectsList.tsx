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
} from "@shopify/polaris-icons";
import React, { useState } from "react";
import countries_list from "../../assets/countries.json";
// import { charLimit, continents_auto } from "../../helpers";
import empty2 from "../../assets/empty2.svg";
// import { useAuthenticatedFetch } from "../../hooks";
// import {
//   REORDER_AUTO_REDIRECT,
//   UPDATE_AUTO_REDIRECT,
// } from "../../../helpers/endpoints";
import AutoRedirectForm from "./AutoRedirectForm";
import { charLimit, continents_auto } from "../_helpers";
import { TitleBar, Modal } from "@shopify/app-bridge-react";
import { AppProvider } from "@shopify/shopify-app-remix/react";

const resourceName = {
  singular: "auto redirect",
  plural: "auto redirects",
};

function parseLocations(data) {
  if (!data) return;
  const parsedJson = data;
  let locations = "";
  for (let index = 0; index < parsedJson.length; index++) {
    const item = parsedJson[index];

    if (item.includes("C:")) {
      const getContinentLabel = continents_auto.find(
        (cnt) => cnt.value === item
      );
      if (getContinentLabel) {
        locations += getContinentLabel.label + ", ";
      }
    } else {
      const getCountryLabel = countries_list?.find((cnt) => cnt.code === item);
      if (getCountryLabel) {
        locations += getCountryLabel.name + ", ";
      }
    }
  }
  return locations.replace(/,\s*$/, "");
}

export default function AutoRedirects({
  redirects,
}) {
  // const fetch = useAuthenticatedFetch();
  const [loading, setLoading] = useState(false);
  const [addModalStatus, setAddModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [editRedirect, setEditRedirect] = useState(null);
  const [dragId, setDragId] = useState();

  async function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    setLoading(true);
    const dragBox = redirects.find((box) => box.node.id == dragId);
    const dropBox = redirects.find((box) => box.node.id == ev.currentTarget.id);
    const dragBoxOrder = JSON.parse(dragBox.node.value).order_r;
    const dropBoxOrder = JSON.parse(dropBox.node.value).order_r;
    const newBoxState = redirects.map((box) => {
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
    const updated_order = newBoxState.sort(
      (a, b) =>
        JSON.parse(a.node.value).order_r - JSON.parse(b.node.value).order_r
    );

    // const response = await fetch(REORDER_AUTO_REDIRECT, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "post",
    //   body: JSON.stringify({ data: updated_order, appId }),
    // }).then((data) => data.json());
    // if (response?.status) {
    //   setRedirects(updated_order);
    //   setToastData({
    //     error: false,
    //     msg: tr.responses.rd_reorder_success,
    //   });
    // } else {
    //   setToastData({
    //     error: true,
    //     msg: tr.responses.error,
    //   });
    // }

    setLoading(false);
  }

  // function openEdit(item) {
  //   setEditRedirect(item);
  //   setEditModalStatus(true);
  // }

  function toggleStatus(data) {
    const parsed = JSON.parse(data?.node?.value);
    parsed.status = parsed.status === 1 ? 0 : 1;
    delete data.node.id;
    return { ...data.node, type: "json", value: parsed };
  }

  async function handleRedirectStatus(item) {
    setLoading(true);
    const data = toggleStatus(item);
    // const response = await fetch(UPDATE_AUTO_REDIRECT, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "post",
    //   body: JSON.stringify({
    //     appId,
    //     data,
    //   }),
    // }).then((data) => data.json());
    // if (response?.status) {
    //   setToastData({
    //     error: false,
    //     msg: tr.responses.rd_status_success,
    //   });
    //   await loadRedirects();
    // } else {
    //   setToastData({
    //     error: true,
    //     msg: tr.responses.error,
    //   });
    // }
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
              loading={loading}
              renderItem={(item, index) => {
                const { id, value } = item?.node;
                const { url, location, except_r, status, block } =
                  JSON.parse(value);
                const locations = parseLocations(location);

                return (
                  <div
                    className="auto-redirect-item"
                    id={id}
                    draggable
                    onDragStart={(ev) => {
                      setDragId(ev?.currentTarget?.id);
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
                          <div
                            className="switch"
                            onClick={() => handleRedirectStatus(item)}
                          >
                            <input type="checkbox" checked={status} />
                            <span className="slider round"></span>
                          </div>
                          {except_r ? (
                            <Tooltip
                              width="wide"
                              content={
                                <small>
                                  Excluding selected countries/continents.
                                </small>
                              }
                            >
                              <Icon
                                source={LocationNoneIcon}
                                tone="warning"
                              />
                            </Tooltip>
                          ) : (
                            ""
                          )}
                          <Tooltip
                            width="wide"
                            content={<small>{locations}</small>}
                          >
                            <Text as="p" variant="bodyXs">
                              {charLimit(locations, 25)}
                            </Text>
                          </Tooltip>
                          <div>
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
                            // onClick={() => openEdit(item)}
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
      </InlineGrid>

      {/* Add auto redirect */}
      <Modal id="add-auto-redirect" variant="base">
        <TitleBar title="Add auto redirect" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <AutoRedirectForm
              redirects={redirects}
            />
          </AppProvider>
        </Box>
      </Modal>

      {/* Edit auto redirect */}
      <Modal id="edit-auto-redirect" variant="base">
        <TitleBar title="Edit auto redirect" />
        <Box padding="400">
          <AppProvider i18n={{}} apiKey={""}>
            <AutoRedirectForm
              editItem={editRedirect}
              redirects={redirects}
            />
          </AppProvider>
        </Box>
      </Modal>
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
