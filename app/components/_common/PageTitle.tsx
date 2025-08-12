import React from "react";
import { QuestionCircleIcon, AdjustIcon } from "@shopify/polaris-icons";
import {
  Box,
  Button,
  Icon,
  Image,
  InlineGrid,
  InlineStack,
  Text,
  Tooltip,
} from "@shopify/polaris";
import statusGreen from "../../assets/status-green.svg";
import statusRed from "../../assets/status-red.svg";
import statusGray from "../../assets/status-gray.svg";
interface PageTitleProps {
  icon?: any
  title: string;
  status?: boolean | null;
  loading?: boolean;
  url?: string;
  hideStatus?: boolean;
}

export function PageTitle({ icon, title, status, loading, url = "", hideStatus = false }: PageTitleProps) {

  return (
    <Box padding="400">
      <InlineStack gap="200" align="space-between">
        <InlineStack gap="200" blockAlign="center">
          {icon && <Icon source={icon} />}
          <Text as="h1" variant="headingXl">
            {title}
          </Text>
        </InlineStack>
        <InlineStack gap="300" blockAlign="center">
          {!hideStatus && (
          <Tooltip
            width="wide"
            content={
              <Box padding="200">
                <InlineGrid gap="100">
                  <Text as="p" variant="headingXs">
                    Status: {status ? "Enabled" : "Disabled"}
                  </Text>
                  <small>
                    App embeds enable features like geolocation redirection by
                    injecting necessary code into your theme (Shopify
                    recommended method). This ensures your store can support
                    popup or automatically redirect visitors based on your
                    configurations.{" "}
                    <strong>
                      Make sure this is enabled to activate redirection
                      features.
                    </strong>{" "}
                    Manage app embeds in your theme editor.
                  </small>
                </InlineGrid>
              </Box>
            }
          >
            <InlineStack gap="200">
              <Text as="p">Status:</Text>
              <Image
                alt=""
                source={loading ? statusGray : status ? statusGreen : statusRed}
              />
              <Button
                url={url}
                size="micro"
                icon={AdjustIcon}
              />
            </InlineStack>
          </Tooltip>
          )}
          <Button
            size="micro"
            icon={QuestionCircleIcon}
            url="https://geolocationredirects-xapps.tawk.help/"
            target="_blank"
          >
            Help center
          </Button>
        </InlineStack>
      </InlineStack>
    </Box>
  );
}
