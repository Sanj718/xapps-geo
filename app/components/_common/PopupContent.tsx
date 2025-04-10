import React, { Suspense } from "react";
import {
  BlockStack,
  Button,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import { LanguageIcon } from "@shopify/polaris-icons";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import "../../assets/custom.scss"
import TextEditor from "./TextEditor.client";
import { useOutletContext } from "@remix-run/react";
import { OutletContext } from "../_types";
import { planParser } from "../_helpers";

interface PopupContentProps {
  titleLabel?: string;
  titleValue?: string;
  titleOnChange?: (value: string) => void;
  textLabel?: string;
  textValue?: string;
  textOnChange?: (value: string) => void | undefined;
  textHelpText?: string;
  translation?: number;
  titleDisabled?: boolean;
  textDisabled?: boolean;
}


export default function PopupContent({
  titleLabel = "Title",
  titleValue = "",
  titleOnChange = () => { },
  textLabel = "Short text",
  textValue = "",
  textOnChange = undefined,
  textHelpText = "",
  translation = 0,
  titleDisabled = false,
  textDisabled = false,
}: PopupContentProps) {
  const { activePlan } = useOutletContext<OutletContext>();
  const { isFreePlan } = planParser(activePlan);
  const toolTipContent = (
    <small>
      Translate your content into multiple languages supported by your store.
    </small>
  );

  return (
    <InlineGrid gap="400">
      <BlockStack gap="0">
        <InlineStack align="space-between" gap="200" blockAlign="center">
          <Text as="p">{titleLabel}</Text>
          {translation ? (
            <Tooltip width="wide" content={toolTipContent}>
              <Button
                icon={LanguageIcon}
                size="micro"
                onClick={() => shopify.modal.show("popup-content-translation-popup")}
              ></Button>
            </Tooltip>
          ) : null}
        </InlineStack>
        <TextField
          size="slim"
          label={titleLabel}
          value={titleValue}
          labelHidden
          onChange={titleOnChange}
          autoComplete="off"
          disabled={titleDisabled}
        />
      </BlockStack>
      {textOnChange && (
        <div className={textDisabled ? "visually-disabled" : ""}>
          <BlockStack gap="150">
            <BlockStack gap="0">
              <InlineStack align="space-between" gap="200" blockAlign="center">
                <Text as="p">{textLabel}</Text>
                {translation ? (
                  <Tooltip width="wide" content={toolTipContent}>
                    <Button
                      icon={LanguageIcon}
                      size="micro"
                      onClick={() => shopify.modal.show("popup-content-translation-popup")}
                    ></Button>
                  </Tooltip>
                ) : null}
              </InlineStack>
              <Suspense fallback={<div>Loading editor...</div>}>
                <TextEditor textValue={textValue} textOnChange={isFreePlan ? () => { } : textOnChange} disabled={isFreePlan} />
              </Suspense>
            </BlockStack>
            {textHelpText !== "" ? (
              <Text as="p" variant="bodyXs" tone="subdued">
                <small>{textHelpText}</small>
              </Text>
            ) : (
              ""
            )}
          </BlockStack>
        </div>
      )}
    </InlineGrid>
  );
}
