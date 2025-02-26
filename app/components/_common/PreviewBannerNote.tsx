import React from "react";
import { Banner, Text, Link } from "@shopify/polaris";
import { getEmbedConst } from "../_helpers";
import {
  DEV_EMBED_APP_ID,
  PROD_EMBED_APP_ID,
  RD_EMBED_APP_HANDLE,
  MK_EMBED_APP_HANDLE,
} from "../env";
import { useOutletContext } from "@remix-run/react";
import { OutletContext } from "../_types";

export default function PreviewBannerNote({ type = "custom" }) {
  const { shopInfo } = useOutletContext<OutletContext>();
  const { EMBED_APP_ID, EMBED_APP_HANDLE } =
    getEmbedConst(
      PROD_EMBED_APP_ID,
      DEV_EMBED_APP_ID,
      type === "markets" ? MK_EMBED_APP_HANDLE : RD_EMBED_APP_HANDLE,
    ) || {};
  return (
    <Banner>
      <Text as="p" variant="bodySm">
        Please note that certain UI elements (such as the flag and [[country]])
        and styles in the preview may differ from those on the live site, as the
        live site applies your site's global styles. To see an accurate
        representation of the widget, navigate to the Theme Customizer and
        enable <Link target="_blank" url={`https://${shopInfo?.shop?.myshopifyDomain}/admin/themes/current/editor?context=apps&activateAppId=${EMBED_APP_ID}/${EMBED_APP_HANDLE}`}>Preview Mode</Link>.
      </Text>
    </Banner>
  );
}
