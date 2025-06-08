import React from "react";

import clsx from "clsx";
import { UniversalSelectContentProps } from "./UniversalSelectContent.types";
import Styles from "./UniversalSelectContent.module.scss";
import { SelectItem } from "../../UniversalSelect.types";
import Checkbox from "@/components/Checkbox";

const UniversalSelectContent = ({
  sx,
  onClose,
  onSelect,
  itemsData,
  selectedItems,
  multiple,
  title = "Selecione pelo menos uma opção",
  hasAllSelector,
  hasHeader,

  numberOfColumns = 1,
}: UniversalSelectContentProps) => {
  const selectedItemsIds = Array.isArray(selectedItems)
    ? selectedItems?.map((currentItem) => currentItem?.id)
    : [selectedItems?.id];

  const handleSelectItem = (item: SelectItem) => {
    if (multiple) {
      onSelect(item);
      return;
    }

    onSelect(item);
    onClose();
  };

  const hasGroup =
    itemsData?.some(
      (item) => item?.groupedData && item?.groupedData?.length > 0
    ) ?? false;

  const allItemsSelected =
    selectedItemsIds?.length ===
    itemsData?.flatMap((item) => {
      if (item?.groupedData && item?.groupedData?.length > 0) {
        return item?.groupedData?.map((groupedItem) => groupedItem?.id);
      }
      return item?.id;
    })?.length;

  const handleSelectAllItems = () => {
    if (!multiple) return;

    if (itemsData) {
      const newItemsData = itemsData
        .flatMap((item) => {
          if (item?.groupedData && item?.groupedData?.length > 0) {
            return item?.groupedData?.map((groupedItem) => groupedItem);
          }
          return item;
        })
        .filter(Boolean) as SelectItem[];

      const itemsToSelect = allItemsSelected ? [] : newItemsData;
      onSelect(itemsToSelect);
    }
  };

  const options = itemsData;

  if (!itemsData || itemsData?.length === 0) return null;

  return (
    <div className={Styles.SelectorContent} style={{ ...sx }}>
      {hasHeader && (
        <div className={Styles.SelectorContentHeader}>
          <p className={Styles.SelectorContentHeader_Title}>{title}</p>

          {hasAllSelector && (
            <Checkbox
              checked={allItemsSelected}
              label={
                allItemsSelected ? "Desselecionar tudo" : "Selecionar tudo"
              }
              onClick={handleSelectAllItems}
            />
          )}
        </div>
      )}

      <div className={Styles.SelectorWrapper}>
        {hasGroup &&
          options?.map((option, optionIndex) => {
            const groupedData = option?.groupedData;

            return (
              <>
                {optionIndex > 0 && <div className={Styles.SelectorDivider} />}

                <div className={Styles.SelectorSection} key={optionIndex}>
                  <div className={Styles.SelectorSectionHeader}>
                    <p className={Styles.SelectorSectionTitle}>
                      {option.label || "Categoria não informada"}
                    </p>
                  </div>

                  <div
                    className={Styles.SelectorList}
                    style={{
                      gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
                    }}
                  >
                    {groupedData?.map((item, groupedIndex) => {
                      const isSelected = selectedItemsIds?.includes(item?.id);

                      return (
                        <button
                          key={`${item?.id}-${groupedIndex}`}
                          className={clsx(
                            Styles.SelectorContentItem,
                            isSelected && Styles.SelectorContentItem__Selected
                          )}
                          onClick={() => handleSelectItem(item)}
                        >
                          <Checkbox
                            isChecked={isSelected}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectItem(item);
                            }}
                            iconSize={16}
                            sx={{ label: { fontSize: 10 } }}
                            inverted
                            accentColor={"#7182e3"}
                          />

                          {item?.icon}
                          <p className={Styles.SelectorContentItem_Text}>
                            {item?.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}

        {!hasGroup && (
          <div
            className={Styles.SelectorList}
            style={{
              gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
            }}
          >
            {options?.map((item, index) => {
              const isSelected = selectedItemsIds?.includes(item?.id);

              return (
                <button
                  key={`${item?.id}-${index}`}
                  className={clsx(
                    Styles.SelectorContentItem,
                    isSelected && Styles.SelectorContentItem__Selected
                  )}
                  onClick={() => handleSelectItem(item)}
                >
                  {item?.icon}
                  <p className={Styles.SelectorContentItem_Text}>
                    {item?.label}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalSelectContent;
