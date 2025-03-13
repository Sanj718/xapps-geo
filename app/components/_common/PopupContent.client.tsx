import React, { lazy, Suspense, useEffect, useState } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../assets/custom.scss"

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
  const toolbarOptions = [
    // [{ header: [2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];
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
              <ReactQuill className="text-editor"
                theme="snow"
                style={{ background: "#fff" }}
                value={textValue}
                onChange={textOnChange}
                modules={{ toolbar: toolbarOptions }} />

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
