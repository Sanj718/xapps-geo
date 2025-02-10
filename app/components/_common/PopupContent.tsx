import {
  BlockStack,
  Button,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import React from "react";
import { LanguageIcon } from "@shopify/polaris-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function PopupContent({
  titleLabel = "Title",
  titleValue = "",
  titleOnChange = undefined,
  textLabel = "Short text",
  textValue = "",
  textOnChange = undefined,
  textHelpText = "",
  translation = null,
  titleDisabled = false,
  textDisabled = false,
}) {
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
          {translation && (
            <Tooltip width="wide" content={toolTipContent}>
              <Button
                icon={LanguageIcon}
                size="micro"
                onClick={translation}
              ></Button>
            </Tooltip>
          )}
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
                {translation && (
                  <Tooltip width="wide" content={toolTipContent}>
                    <Button
                      icon={LanguageIcon}
                      size="micro"
                      onClick={translation}
                    ></Button>
                  </Tooltip>
                )}
              </InlineStack>
              <ReactQuill
                className="text-editor"
                theme="snow"
                style={{ background: "#fff" }}
                value={textValue}
                onChange={textOnChange}
                modules={{ toolbar: toolbarOptions }}
              />
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
