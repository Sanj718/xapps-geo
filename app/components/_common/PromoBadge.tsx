import React from "react";
import { Badge, Icon, InlineStack, Tooltip } from "@shopify/polaris";
import { InfoIcon } from "@shopify/polaris-icons";
import { planParser } from "../_helpers";
import { useOutletContext } from "@remix-run/react";

export default function PromoBadge({ type }) {
  const { activePlan } = useOutletContext();
  const { isFreePlan, isBasicPlan, isProPlan } = planParser(activePlan);

  // if ((isProPlan || isBasicPlan) && type === "basic") return;
  // if (isProPlan && type === "pro") return;

  return (
    <div>
      <InlineStack blockAlign="center" wrap={false}>
        <Badge
          progress={type === "pro" ? "complete" : "partiallyComplete"}
          tone={type === "pro" ? "success-strong" : "success"}
        >
          {type === "pro" ? "Pro plan feature" : "Basic plan feature"}
        </Badge>
        <Tooltip
          width="wide"
          content={
            <small>
              {type === "pro"
                ? "Disabled fields are available exclusively with the Pro plan. Please contact us to request access to the Dev plan for testing purposes."
                : "Disabled fields are available exclusively with the Basic plan."}
            </small>
          }
        >
          <Icon source={InfoIcon} tone="subdued" />
        </Tooltip>
      </InlineStack>
    </div>
  );
}
