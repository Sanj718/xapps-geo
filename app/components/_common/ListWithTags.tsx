import { Tag, Listbox, Combobox, InlineStack } from "@shopify/polaris";
import React, { useState, useEffect, useMemo } from "react";
import { jsonSafeParse } from "../_helpers";

interface ListItem {
  value: string;
  label: string;
  title?: boolean;
}

interface ListWithTagsProps {
  setConfigs: (configs: any) => void; // You can replace 'any' with a more specific type if available
  configs: any;                      // Replace 'any' with a specific type if possible
  list?: ListItem[];                 // Optional prop with default value
  id: string;                        // Assuming it's required
  label?: string;                    // Optional with default value
  placeholder?: string;              // Optional with default value
  helpText?: string;                 // Optional
}

export default function ListWithTags({
  setConfigs,
  configs,
  list = [],
  id,
  label = "",
  placeholder = "",
  helpText,
}: ListWithTagsProps) {
  const allOptions = useMemo(() => list, []);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(allOptions);

  useEffect(() => {
    // console.log("configs", configs)
    // const ids = jsonSafeParse(configs[id]) || [];
    setSelectedOptions(configs[id]);
  }, [configs]);

  function updateText(value: string) {
    setInputValue(value);

    if (value === "") {
      setOptions(allOptions);
      return;
    }

    const filterRegex = new RegExp(value, "i");
    const resultOptions = allOptions.filter((option) =>
      option.label.match(filterRegex),
    );
    setOptions(resultOptions);
  }

  function updateSelection(selected: string) {
    if (selectedOptions?.includes(selected)) {
      const filtered = selectedOptions.filter((option) => option !== selected);
      setSelectedOptions(filtered);
      setConfigs({ ...configs, [id]: filtered });
    } else {
      let data: string[] = [];
      if (selectedOptions) {
        data = [...selectedOptions, selected];
      } else {
        data = [selected];
      }

      setSelectedOptions(data);
      setConfigs({ ...configs, [id]: data });
    }

    const matchedOption = options.find((option) => {
      return option.value.match(selected);
    });
    setInputValue((matchedOption && matchedOption.label) || "");
  }

  function removeTag(tag: string) {
    const options = [...selectedOptions];
    options.splice(options.indexOf(tag), 1);
    setSelectedOptions(options);
    setConfigs({ ...configs, [id]: options });
  }
  console.log("selectedOptions", selectedOptions)
  return (
    <div>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            autoComplete="off"
            onChange={updateText}
            value={inputValue}
            placeholder={placeholder}
            helpText={helpText}
            label={label}
            size="slim"
          />
        }
      >
        {options?.length ? (
          <Listbox onSelect={updateSelection}>
            {options?.map((option) => {
              const { label, value, title } = option;
              if (label === "-") return;
              if (title) {
                return <Listbox.Header key={value}>{label}</Listbox.Header>;
              }

              return (
                <Listbox.Option
                  key={value}
                  value={value}
                  selected={selectedOptions && selectedOptions.includes(value)}
                  accessibilityLabel={label}
                >
                  {label}
                </Listbox.Option>
              );
            })}
          </Listbox>
        ) : null}
      </Combobox>

      <div style={{ marginTop: "10px", maxHeight: "70px", overflow: "auto" }}>
        <InlineStack gap="100">
          {selectedOptions?.map((option) => {
            return (
              <Tag key={`option${option}`} onRemove={() => removeTag(option)}>
                {option}
              </Tag>
            );
          })}
        </InlineStack>
      </div>
    </div>
  );
}
