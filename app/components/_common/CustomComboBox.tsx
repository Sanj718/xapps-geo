import {
    Tag,
    Listbox,
    EmptySearchResult,
    Combobox,
    Text,
    BlockStack,
    InlineStack,
    AutoSelection,
} from "@shopify/polaris";
import React from "react";
import { useState, useCallback, useMemo } from "react";

interface CustomComboBoxProps {
    optionsList: string[];
    defaultSelected?: string[];
    selectedItems?: string[];
    setSelectedItems: (items: string[]) => void;
    disabled?: boolean;
}
export function CustomComboBox({
    optionsList,
    defaultSelected,
    selectedItems,
    setSelectedItems,
    disabled = false,
}: CustomComboBoxProps) {
    const checkSelectedItems =
        selectedItems && Object.keys(selectedItems).length !== 0 && selectedItems;

    const [selectedTags, setSelectedTags] = useState(
        checkSelectedItems || defaultSelected || []
    );
    const [value, setValue] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const handleActiveOptionChange = useCallback(
        (activeOption: string) => {
            const activeOptionIsAction = activeOption === value;

            if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
                setSuggestion(activeOption);
            } else {
                setSuggestion("");
            }
        },
        [value, selectedTags]
    );
    const updateSelection = useCallback(
        (selected: string) => {
            const nextSelectedTags: Set<string> = new Set([...selectedTags]);

            if (nextSelectedTags.has(selected)) {
                nextSelectedTags.delete(selected);
            } else {
                nextSelectedTags.add(selected);
            }
            setSelectedTags([...nextSelectedTags]);
            setSelectedItems([...nextSelectedTags]);
            setValue("");
            setSuggestion("");
        },
        [selectedTags]
    );

    const removeTag = useCallback(
        (tag: string) => () => {
            updateSelection(tag);
        },
        [updateSelection]
    );

    const getAllTags = useCallback(() => {
        const savedTags = optionsList;
        return [...new Set([...savedTags, ...selectedTags].sort())];
    }, [selectedTags, optionsList]);

    const formatOptionText = useCallback(
        (option: string) => {
            const trimValue = value.trim().toLocaleLowerCase();
            const matchIndex = option.indexOf(trimValue);

            if (!value || matchIndex === -1) return option;

            const start = option.slice(0, matchIndex);
            const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
            const end = option.slice(matchIndex + trimValue.length, option.length);

            return (
                <InlineStack>
                    {start}
                    <Text as="span">{highlight}</Text>
                    {end}
                </InlineStack>
            );
        },
        [value]
    );

    const options = useMemo(() => {
        let list;
        const allTags = getAllTags();
        const filterRegex = new RegExp(value, "i");

        if (value) {
            list = allTags.filter((tag) => tag.match(filterRegex));
        } else {
            list = allTags;
        }

        return [...list];
    }, [value, getAllTags]);

    const verticalContentMarkup =
        selectedTags.length > 0 ? (
            <InlineStack gap="100">
                {selectedTags.map((tag) => (
                    <Tag
                        key={`option-${tag}`}
                        onRemove={removeTag(tag)}
                        disabled={disabled}
                    >
                        {tag}
                    </Tag>
                ))}
            </InlineStack>
        ) : null;

    const optionMarkup =
        options.length > 0
            ? options.map((option) => {
                return (
                    <Listbox.Option
                        key={option}
                        value={option}
                        selected={selectedTags.includes(option)}
                        accessibilityLabel={option}
                    >
                        <Listbox.TextOption selected={selectedTags.includes(option)}>
                            {formatOptionText(option)}
                        </Listbox.TextOption>
                    </Listbox.Option>
                );
            })
            : null;

    const noResults = value && !getAllTags().includes(value);

    const actionMarkup = noResults ? (
        <Listbox.Action
            disabled={disabled}
            value={value}
        >{`Add "${value}"`}</Listbox.Action>
    ) : null;

    const emptyStateMarkup = optionMarkup ? null : (
        <EmptySearchResult
            title=""
            description={`No tags found matching "${value}"`}
        />
    );

    const listboxMarkup =
        optionMarkup || actionMarkup || emptyStateMarkup ? (
            <Listbox
                autoSelection={AutoSelection.First}
                onSelect={updateSelection}
                onActiveOptionChange={handleActiveOptionChange}
            >
                {actionMarkup}
                {optionMarkup}
            </Listbox>
        ) : null;

    useMemo(() => {
        if (checkSelectedItems) {
            setSelectedTags(checkSelectedItems);
        }
    }, [checkSelectedItems]);

    return (
        <div className="combobox">
            <Combobox
                allowMultiple
                activator={
                    <Combobox.TextField
                        disabled={disabled}
                        autoComplete="off"
                        label="Search tags"
                        labelHidden
                        value={value}
                        // suggestion={suggestion}
                        placeholder="Select page template or add custom URL"
                        verticalContent={verticalContentMarkup}
                        onChange={setValue}
                    />
                }
            >
                {listboxMarkup}
            </Combobox>
        </div>
    );
}
