import {
  Page,
  List,
  Grid,
  Text,
  Badge,
  Card,
  Button,
  Divider,
  InlineGrid,
  Banner,
  InlineStack,
  Box,
  AppProvider,
  Link,
  BlockStack,
  Scrollable,
} from "@shopify/polaris";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import tr from "../../components/locales.json";
import {
  FlowerIcon,
  SandboxIcon,
  SmileySadIcon,
  TargetIcon,
  CheckboxIcon,
  GiftCardFilledIcon,
  PlanIcon,
  HeartIcon,
} from "@shopify/polaris-icons";
import { useActionData, useLoaderData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { ActionReturn, OutletContext } from "app/components/_types";
import { loadingStates, planParser, requestHeaders } from "app/components/_helpers";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { handleLoaders } from "./_loaders";
import { handleActions } from "./_actions";
import { PageTitle } from "app/components/_common/PageTitle";
import { ACTIONS } from "app/components/_actions";


interface PlanCardProps {
  title: string;
  price: string;
  current?: boolean;
  list: string[];
  dev?: boolean;
  action?: () => void;
  loading?: boolean;
  highlight?: boolean;
}

interface ModalContentProps {
  cancelAction: () => void;
  loading?: boolean;
}

interface RequestPlanModalProps {
  loading: boolean;
  planName: string;
  url: string;
}


export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);

export default function PlansPage() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  // const { marketsConfigs, marketsData } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionReturn>();
  const [basicPlanUrl, setBasicPlanUrl] = useState("");
  const [proPlanUrl, setProPlanUrl] = useState("");
  const [cancelPlanUrl, setCancelPlanUrl] = useState("");

  useMemo(() => {
    if (actionData?._action === ACTIONS.subscribe_BasicPlan && actionData?.confirmationUrl) {
      setBasicPlanUrl(actionData?.confirmationUrl);
    }
    if (actionData?._action === ACTIONS.subscribe_ProPlan && actionData?.confirmationUrl) {
      setProPlanUrl(actionData?.confirmationUrl);
    }
    if (actionData?._action === ACTIONS.cancel_Subscription && actionData?.appSubscription?.status === "CANCELLED" && actionData?.appSubscription?.returnUrl) {
      setCancelPlanUrl(actionData?.appSubscription?.returnUrl);
      shopify.modal.hide("free-plan-help");
      shopify.modal.show("cancel-thank-you");
    }
  }, [actionData]);

  async function handleBasicSubscription() {
    shopify.modal.show("basic-plan-request");
    submit(
      {
        _action: ACTIONS.subscribe_BasicPlan,
      },
      requestHeaders,
    );
  }

  async function handleProSubscription() {
    shopify.modal.show("pro-plan-request");
    submit(
      {
        _action: ACTIONS.subscribe_ProPlan,
      },
      requestHeaders,
    );
  }

  async function handleSubscriptionCancel() {
    submit(
      {
        _action: ACTIONS.cancel_Subscription,
        data: {
          id: activePlan.id,
        },
      },
      requestHeaders,
    );
  }
  const loading = loadingStates(navigation, [ACTIONS.subscribe_BasicPlan, ACTIONS.subscribe_ProPlan, ACTIONS.cancel_Subscription]) as LoadingStates;

  return (
    <Page>
      <div id="main-screen">
        <PageTitle title="Plans" hideStatus={true} icon={PlanIcon} />
        {(devPlan || veteranPlan) && (
          <Box padding="400">
            <Banner icon={devPlan ? SandboxIcon : GiftCardFilledIcon} tone="info">
              {devPlan ? (
                <p>
                  Your current plan is the <strong>Dev Plan</strong>, which
                  includes all the features of the <strong>Pro Plan</strong>.
                </p>
              ) : (
                <p>
                  <strong>Geolocation Redirects</strong> is <strong>no</strong>{" "}
                  longer available for <strong>free</strong>. However, as a
                  privileged veteran user, you are eligible for our app's{" "}
                  <strong>Basic plan</strong>, free of charge.
                </p>
              )}
            </Banner>
          </Box>
        )}
        <Box padding="400">
          <BlockStack gap="400">
            <Grid columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
              {/* [TODO] add all plans features */}
              <PlanCard
                current={isFreePlan}
                title="Free"
                price="$0/month"
                list={[
                  "Free forever",
                  "Custom popup title",
                  "Up to 1 redirect button",
                  "Shopify's native GEO location based popup",
                  "Up to 1 auto-redirect",
                  "Disable auto-redirect for search crawlers/bots",
                  "Markets integration & popup",
                ]}
                action={() => shopify.modal.show("free-plan-help")}
              />
              <PlanCard
                current={isBasicPlan}
                title="Basic"
                price="$4.99/month"
                list={[
                  "Choose different popup types",
                  "Customisable basic styles",
                  "Custom popup title, icon & text",
                  "Up to 4 redirect buttons",
                  "Shopify's native GEO location based popup show up rules",
                  "Popup visibility logic full control(session/everyload/cookies)",
                  "Unlimited auto-redirects",
                  "Markets integration & popup customization",
                ]}
                action={isProPlan
                  ? () => shopify.modal.show("pro-plan-help")
                  : handleBasicSubscription}
              />
              <PlanCard
                highlight={true}
                current={isProPlan}
                title="Pro"
                price="$8.99/month"
                list={[
                  "All Basic plan features",
                  "Unlimited redirect buttons",
                  "Translations",
                  "Conditional redirect button show based on user geo location",
                  "Add your custom CSS code",
                  "Select pages where you want to allow/disallow the popup",
                  "Markets auto-redirects",
                ]}
                dev={!devPlan && !isProPlan}
                action={handleProSubscription}
              />
            </Grid>
          </BlockStack>
        </Box>

      </div>
      <Modal id="pro-plan-request" variant="small">
        <TitleBar title="Subscribe to Pro Plan" />
        <Box padding="400">
          <AppProvider i18n={{}}>
            <RequestPlanModal loading={loading[ACTIONS.subscribe_ProPlan + "Loading"]} planName="Pro" url={proPlanUrl} />
          </AppProvider>
        </Box>
      </Modal>
      <Modal id="basic-plan-request" variant="small">
        <TitleBar title="Subscribe to Basic Plan" />
        <Box padding="400">
          <AppProvider i18n={{}}>
            <RequestPlanModal loading={loading[ACTIONS.subscribe_BasicPlan + "Loading"]} planName="Basic" url={basicPlanUrl} />
          </AppProvider>
        </Box>
      </Modal>
      <Modal id="pro-plan-help" variant="small">
        <TitleBar title="How can we help instead?" />
        <Box padding="400">
          <AppProvider i18n={{}}>
            <ModalContent
              cancelAction={() => {
                shopify.modal.hide("pro-plan-help");
                handleBasicSubscription()
              }}
              loading={loading[ACTIONS.subscribe_BasicPlan + "Loading"]}
            />
          </AppProvider>
        </Box>
      </Modal>
      <Modal id="free-plan-help" variant="small">
        <TitleBar title="How can we help instead?" />
        <Box padding="400">
          <AppProvider i18n={{}}>
            <ModalContent
              cancelAction={() => {
                handleSubscriptionCancel()
              }}
              loading={loading[ACTIONS.cancel_Subscription + "Loading"]}
            />
          </AppProvider>
        </Box>
      </Modal>
      <Modal id="cancel-thank-you" variant="small">
        <TitleBar title="Subscription cancelled" />
        <Box padding="400">
          <AppProvider i18n={{}}>
            <InlineGrid gap="200">
              <Text as="p" variant="bodyMd">Your subscription has been cancelled. You can still use the app for free. Please refresh the page to see the changes.</Text>
              <Divider />
              <Button url={cancelPlanUrl} target="_top">Close</Button>
            </InlineGrid>
          </AppProvider>
        </Box>
      </Modal>
    </Page>
  );
}


function PlanCard({ title, price, current = false, list, dev = false, action, loading, highlight = false }: PlanCardProps) {
  return (
    <Card background={current ? "bg-fill-tertiary" : "bg-fill"}>

      <BlockStack gap="200" align="space-around">
        <InlineGrid gap="300">
          <InlineStack align="space-between" gap="200">
            <Text as="h2" variant="headingLg">
              {title} - <span style={highlight ? { color: "#fff", background: "#00936f", padding: "0px 4px", borderRadius: "3px" } : {}}>{price}</span>
            </Text>
          </InlineStack>
          <Button
            variant="primary"
            disabled={current}
            onClick={action}
            loading={loading}
            icon={current ? CheckboxIcon : TargetIcon}
          >
            {current ? "Your plan" : "Select"}
          </Button>
          <Divider />
          <Scrollable>
            <List>
              {list &&
                list.map((item, index) => {
                  return <List.Item key={index}>{item}</List.Item>;
                })}
            </List>
          </Scrollable>
          {dev && (
            <Banner hideIcon>
              <InlineGrid gap="200">
                <Text as="p" variant="bodyXs">
                  You can request a <strong>Free Dev Plan</strong> for testing and
                  development purposes.
                </Text>
                <Button
                  size="micro"
                  icon={SandboxIcon}
                  onClick={() => void Tawk_API.toggle()}
                >
                  Request
                </Button>
              </InlineGrid>
            </Banner>
          )}
        </InlineGrid>
      </BlockStack>
    </Card >

  );
}

function RequestPlanModal({ loading, planName, url }: RequestPlanModalProps) {
  return <InlineGrid gap="200">
    <Text as="p" variant="bodyMd">
      {loading ? `Requesting subscription link to ${planName}...` : `Click the button below to subscribe to the ${planName} Plan. You’ll be redirected to the Shopify billing page to complete your subscription.`}
    </Text>
    <Divider />
    <Button tone="success" target="_top" loading={loading} variant="primary" url={url}>Subscribe</Button>
  </InlineGrid>
}

function ModalContent({ cancelAction, loading = false }: ModalContentProps) {
  return (
    <InlineGrid gap="200">
      <Text as="p" variant="bodyMd">
        Downgrading will result in the loss of important features, and refunds
        are not available.
      </Text>
      <Text as="p" variant="bodyMd" fontWeight="bold"> <Badge icon={HeartIcon} tone="magic">We can always help you:</Badge> <Link monochrome url="mailto:contact@xapps.shop">contact@xapps.shop</Link></Text>
      <Divider />
      <InlineStack align="end" gap="200">
        <Button
          tone="critical"
          icon={SmileySadIcon}
          onClick={cancelAction}
          loading={loading}
        >
          Downgrade
        </Button>
        <Button tone="success" variant="primary" icon={FlowerIcon}>
          Need Help!
        </Button>
      </InlineStack>
    </InlineGrid>
  );
}
