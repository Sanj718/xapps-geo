import { useEffect, useMemo, useState } from "react";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import {
  Page,
  Text,
  Card,
  Button,
  Box,
  InlineStack,
  Badge,
  Tooltip,
  Icon,
  Banner,
  Divider,
  InlineGrid,
  Image,
  CalloutCard,
  Spinner,
} from "@shopify/polaris";
import {
  InfoIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  SandboxIcon,
  GiftCardFilledIcon,
  ConfettiIcon,
} from "@shopify/polaris-icons";
import card1 from "../../assets/card1.svg";
import card2 from "../../assets/card2.svg";
import rateCard from "../../assets/rateCard.svg";
import {
  getEmbedConst,
  planParser,
  getTotals,
  formatDate,
  getDate,
  requestHeaders,
  loadingStates,
} from "../../components/_helpers";
import {
  PROD_EMBED_APP_ID,
  DEV_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
  MK_EMBED_APP_HANDLE,
} from "../../components/env";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { ActionReturn, LoadingStates, OutletContext } from "app/components/_types";
import { handleLoaders } from "./_loaders";
import { handleActions } from "./_actions";
import { ACTIONS } from "app/components/_actions";

declare global {
  interface Window {
    Tawk_API: {
      toggle: () => void;
    };
  }
}

const Tawk_API = (typeof window !== 'undefined' ? window.Tawk_API : undefined);

const { EMBED_APP_ID, EMBED_APP_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, RD_EMBED_APP_HANDLE) || {};

const { EMBED_APP_HANDLE: MK_EMBED_HANDLE } =
  getEmbedConst(PROD_EMBED_APP_ID, DEV_EMBED_APP_ID, MK_EMBED_APP_HANDLE) || {};

interface ThemeData {
  current?: {
    blocks: {
      [key: string]: {
        type: string;
        disabled?: boolean;
      };
    };
  };
}

interface AnalyticsData {
  id: number;
  dataAuto: string | null;
  dataButton: string | null;
  dataMarketsAuto: string | null;
  dataMarketsButton: string | null;
}

interface StartCardProps {
  title: string;
  status: boolean;
  image: string;
  label: string;
  url: string;
}

interface StatsProps {
  loading?: boolean;
  title: string;
  totalPeriod?: string;
  totamlNum: number;
  popupNum: number;
  popupPeriod?: string;
  autoNum: number;
  autoPeriod?: string;
}

export const loader = async (params: LoaderFunctionArgs) => handleLoaders(params);

export const action = async (params: ActionFunctionArgs) => handleActions(params);

export default function Index() {
  const { shopInfo, shopdb, activePlan, devPlan, veteranPlan, appId, appData } =
    useOutletContext<OutletContext>();
  const { themeEmbedData } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionReturn>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const { isProPlan, isBasicPlan, isFreePlan } = planParser(activePlan);
  const [marketsEmbedStatus, setMarketsEmbedStatus] = useState(false);
  const [redirectsEmbedStatus, setRedirectsEmbedStatus] = useState(false);

  const [totalCustomAuto, setTotalCustomAuto] = useState(0);
  const [totalCustomPopup, setTotalCustomPopup] = useState(0);
  const [periodCustomRedirects, setPeriodCustomRedirects] = useState("");
  const [periodCustomAutoRedirects, setPeriodCustomAutoRedirects] =
    useState("");
  const [periodCustomPopupRedirects, setPeriodCustomPopupRedirects] =
    useState("");

  const [totalMarketsAuto, setTotalMarketsAuto] = useState(0);
  const [totalMarketsPopup, setTotalMarketsPopup] = useState(0);
  const [periodMarketsRedirects, setPeriodMarketsRedirects] = useState("");
  const [periodMarketsAutoRedirects, setPeriodMarketsAutoRedirects] =
    useState("");
  const [periodMarketsPopupRedirects, setPeriodMarketsPopupRedirects] =
    useState("");

  useMemo(() => {
    setEmbedData(themeEmbedData);
  }, [themeEmbedData]);

  useMemo(() => {
    if (actionData?._action === "getAnalyticsData" && actionData?.status) {
      setStoreAnalytics(actionData?.data);
    }
  }, [actionData]);

  useEffect(() => {
    submit(
      {
        _action: ACTIONS.get_AnalyticsData,
      },
      requestHeaders,
    );
  }, []);

  async function setEmbedData(theme: ThemeData) {
    if (theme?.current?.blocks) {
      let checkRedirects = false;
      let checkMarkets = false;

      Object.entries(theme.current.blocks).forEach(([item, value]) => {
        if (
          value.type.includes(EMBED_APP_ID) &&
          value.type.includes(EMBED_APP_HANDLE) &&
          !value.disabled
        ) {
          checkRedirects = true;
        }

        if (
          value.type.includes(EMBED_APP_ID) &&
          value.type.includes(MK_EMBED_HANDLE) &&
          !value.disabled
        ) {
          checkMarkets = true;
        }
      });
      if (checkRedirects) {
        setRedirectsEmbedStatus(checkRedirects);
      }
      if (checkMarkets) {
        setMarketsEmbedStatus(checkMarkets);
      }
    }
  }

  async function setStoreAnalytics(analyticsData: AnalyticsData) {
    if (analyticsData?.id) {
      const customAutoData = getTotals(analyticsData?.dataAuto);
      const customPopupData = getTotals(analyticsData?.dataButton);
      const marketsAutoData = getTotals(analyticsData?.dataMarketsAuto);
      const marketsPopupData = getTotals(analyticsData?.dataMarketsButton);

      setTotalCustomAuto(customAutoData?.length || 0);
      setTotalCustomPopup(customPopupData?.length || 0);
      setTotalMarketsAuto(marketsAutoData?.length || 0);
      setTotalMarketsPopup(marketsPopupData?.length || 0);

      setPeriodCustomAutoRedirects(formatDate(customAutoData));
      setPeriodCustomPopupRedirects(formatDate(customPopupData))
      setPeriodMarketsAutoRedirects(formatDate(marketsAutoData));
      setPeriodMarketsPopupRedirects(formatDate(marketsPopupData));

      if (
        customAutoData?.length &&
        customPopupData?.length &&
        marketsAutoData?.length &&
        marketsPopupData?.length
      ) {
        const marketsFirstDate = getDate(
          [marketsAutoData[0], marketsPopupData[0]],
          ">"
        );
        const marketsLastDate = getDate(
          [
            marketsAutoData[marketsAutoData.length - 1],
            marketsPopupData[marketsPopupData.length - 1],
          ],
          "<"
        );
        setPeriodMarketsRedirects(
          formatDate([marketsFirstDate, marketsLastDate])
        );
      }


      if (customAutoData?.length && customPopupData?.length) {
        const customFirstDate = getDate(
          [customAutoData[0], customPopupData[0]],
          ">"
        );
        const customLastDate = getDate(
          [
            customAutoData[customAutoData.length - 1],
            customPopupData[customPopupData.length - 1],
          ],
          "<"
        );
        setPeriodCustomRedirects(formatDate([customFirstDate, customLastDate]));
      }


    }
  }

  const loading = loadingStates(navigation, [ACTIONS.get_AnalyticsData]) as LoadingStates;

  return (
    <Page>
      <div id="main-screen">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h1" variant="headingLg">
            Welcome, {shopInfo?.shop?.name}! 👋
          </Text>
          <Text as="p" variant="bodyXs">
            <InlineStack blockAlign="center" gap="150">
              Your plan:{" "}
              <Badge
                tone={
                  isProPlan
                    ? "success-strong"
                    : isBasicPlan
                      ? "success"
                      : "attention"
                }
                progress={
                  isProPlan
                    ? "complete"
                    : isBasicPlan
                      ? "partiallyComplete"
                      : "incomplete"
                }
              >
                {isProPlan ? "Pro" : isBasicPlan ? "Basic" : "Free"}
              </Badge>
              {(veteranPlan || devPlan) && (
                <>
                  {" "}
                  +
                  <Tooltip
                    width="wide"
                    content={
                      <small>
                        {devPlan ? (
                          <span>
                            Your current plan is the <strong>Dev Plan</strong>,
                            which includes all the features of the{" "}
                            <strong>Pro Plan</strong>.
                          </span>
                        ) : veteranPlan ? (
                          <span>
                            <strong>Geolocation Redirects</strong> is{" "}
                            <strong>no</strong> longer available for{" "}
                            <strong>free</strong>. However, as a privileged
                            veteran user, you are eligible for our app's{" "}
                            <strong>Basic plan</strong>, free of charge.
                          </span>
                        ) : (
                          ""
                        )}
                      </small>
                    }
                  >
                    <Icon
                      source={devPlan ? SandboxIcon : GiftCardFilledIcon}
                      tone="success"
                    />
                  </Tooltip>
                </>
              )}
            </InlineStack>
          </Text>
        </InlineStack>
        {/* <br />
        <Banner
          icon={ConfettiIcon}
          title="New Look, Better Experience!"
          action={{
            content: "Have questions or issues? Contact us!",
            onAction: () => Tawk_API?.toggle(),
          }}
        >
          We've updated the our app with a refreshed design and improved layout
          for a better experience! 🎉
        </Banner> */}
        <br />
        <InlineGrid columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }} gap="400">
          <StartCard
            title="Custom redirects"
            status={redirectsEmbedStatus}
            image={card1}
            label="Customize custom redirects"
            url="/app/redirects"
          />
          <StartCard
            title="Markets redirects"
            status={marketsEmbedStatus}
            image={card2}
            label="Customize markets redirects"
            url="/app/markets"
          />
        </InlineGrid>
        <br />
        <Divider />
        <Banner tone="info">We apologize for any inconvenience. Our team is currently working on improving the analytics functionality to provide you with more accurate data. Thank you for your patience and understanding.</Banner>
      
        <br />
        <InlineGrid columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }} gap="400">
          <Stats
            loading={loading[ACTIONS.get_AnalyticsData + "Loading"]}
            title="Custom redirects performance"
            totalPeriod={periodCustomRedirects}
            totamlNum={totalCustomPopup + totalCustomAuto}
            popupNum={totalCustomPopup}
            popupPeriod={periodCustomPopupRedirects}
            autoNum={totalCustomAuto}
            autoPeriod={periodCustomAutoRedirects}
          />
          <Stats
            loading={loading[ACTIONS.get_AnalyticsData + "Loading"]}
            title="Markets redirects performance"
            totalPeriod={periodMarketsRedirects}
            totamlNum={totalMarketsPopup + totalMarketsAuto}
            popupNum={totalMarketsPopup}
            popupPeriod={periodMarketsPopupRedirects}
            autoNum={totalMarketsAuto}
            autoPeriod={periodMarketsAutoRedirects}
          />
        </InlineGrid>
        <br />
        <Divider />
        <br />
        <CalloutCard
          illustration={rateCard}
          title="Please share your thoughts"
          primaryAction={{
            content: "Good",
            target: "_blank",
            url: "https://apps.shopify.com/native-geo-redirects-popup?#modal-show=WriteReviewModal",
            icon: ThumbsUpIcon,
          }}
          secondaryAction={{
            content: "Bad",
            url: "#",
            icon: ThumbsDownIcon,
            onAction: () => Tawk_API?.toggle(),
          }}
        >
          <p>How's your experience been with the Geolocation Redirects app?</p>
        </CalloutCard>
      </div>
    </Page>
  );
}

function Stats({
  loading = false,
  title,
  totalPeriod = "",
  totamlNum,
  popupNum,
  popupPeriod = "",
  autoNum,
  autoPeriod = "",
}: StatsProps) {
  return (
    <InlineGrid gap="200">
      <Box>
        <InlineStack blockAlign="center" align="space-between">
          <InlineStack blockAlign="baseline" gap="200">
            <Text as="h2" variant="headingMd">
              {title}
            </Text>
            {totalPeriod && totalPeriod !== "" && (
              <Text as="span" variant="bodyXs" tone="subdued">
                {totalPeriod}
              </Text>
            )}
          </InlineStack>
        </InlineStack>
      </Box>
      <Card>
        <InlineGrid gap="200">
          <InlineStack align="space-between">
            <Text as="h3" variant="headingMd">
              Total
            </Text>
            <Tooltip
              hasUnderline
              width="wide"
              content={
                <small>
                  Kindly note that analytics data may have slight inaccuracies
                  and is best used for general insights and visibility.
                </small>
              }
            >
              {loading ? (
                <Spinner size="small" />
              ) : (
                <Icon source={InfoIcon} tone="subdued" />
              )}
            </Tooltip>
          </InlineStack>
          <Text as="p" variant="heading2xl">
            {totamlNum}
          </Text>
        </InlineGrid>
      </Card>
      <InlineGrid columns="2" gap="200">
        <Card>
          <InlineGrid gap="200">
            <InlineGrid>
              <Text as="h3" variant="headingMd">
                Popup redirects
              </Text>
              {popupPeriod && popupPeriod !== "" && (
                <Text variant="bodyXs" as="p" tone="subdued">
                  <small style={{ fontSize: "8px" }}>{popupPeriod}</small>
                </Text>
              )}
            </InlineGrid>
            <Text as="p" variant="heading2xl">
              {popupNum}
            </Text>
          </InlineGrid>
        </Card>
        <Card>
          <InlineGrid gap="200">
            <InlineGrid>
              <Text as="h3" variant="headingMd">
                Auto redirects
              </Text>
              {autoPeriod && autoPeriod !== "" && (
                <Text variant="bodyXs" as="p" tone="subdued">
                  <small style={{ fontSize: "8px" }}>{autoPeriod}</small>
                </Text>
              )}
            </InlineGrid>
            <Text as="p" variant="heading2xl">
              {autoNum}
            </Text>
          </InlineGrid>
        </Card>
      </InlineGrid>
    </InlineGrid>
  );
}

function StartCard({ title, status, image, label, url }: StartCardProps) {
  const navigate = useNavigate();
  return (
    <Card>
      <InlineGrid gap="400">
        <InlineStack align="space-between">
          <Text as="h2" variant="headingMd">
            {title}
          </Text>
          <Tooltip
            width="wide"
            content={
              <small>
                App embeds are app-provided elements that float or appear as an
                overlay in your theme, or add code to your online store without
                being visible to your customers. You can activate, deactivate,
                preview, and customize app embeds through the theme editor.
              </small>
            }
          >
            <Badge
              size="small"
              tone={status ? "success" : "warning"}
              progress={status ? "complete" : "incomplete"}
            >
              {status ? "Enabled" : "Disabled"}
            </Badge>
          </Tooltip>
        </InlineStack>
        {image && (
          <InlineStack align="center">
            <Image source={image} width="250" height="150" alt="" />
          </InlineStack>
        )}
        <Button
          variant="primary"
          onClick={() => {
            navigate(url);
          }}
        >
          {label}
        </Button>
      </InlineGrid>
    </Card>
  );
}
