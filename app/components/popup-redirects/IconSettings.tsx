import React from "react";
import { InlineGrid, TextField } from "@shopify/polaris";
import { OLD_DEFAULT_ICON } from "../_helpers";

interface IconSettingsProps {
  configs: { iconWidth?: string; icon?: string };
  setConfigs: React.Dispatch<React.SetStateAction<{ iconWidth?: string; icon?: string }>>;
  isFreePlan: boolean;
}

export default function IconSettings({ configs, setConfigs, isFreePlan }: IconSettingsProps) {
  return (
    <InlineGrid gap="200" columns="2">
      <TextField
        autoComplete="false"
        label="Max-width"
        labelAction={{
          content: "auto",
          onAction: () =>
            setConfigs((current) => ({
              ...current,
              iconWidth: "auto",
            })),
        }}
        value={configs?.iconWidth || ""}
        suffix={configs?.iconWidth === "auto" ? "" : "px"}
        monospaced
        onChange={(value) =>
          setConfigs((current) => ({
            ...current,
            iconWidth: value,
          }))
        }
      />
      <TextField
        monospaced
        selectTextOnFocus
        label="Icon url"
        value={
          configs?.icon
            ? configs?.icon === OLD_DEFAULT_ICON
              ? "default"
              : configs?.icon
            : ""
        }
        onChange={(value) =>
          !isFreePlan
            ? setConfigs((current) => ({
                ...current,
                icon: value,
              }))
            : false
        }
        autoComplete="off"
      />
    </InlineGrid>
  );
}
