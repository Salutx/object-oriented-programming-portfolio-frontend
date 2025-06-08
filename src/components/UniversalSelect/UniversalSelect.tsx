import React, { useState } from "react";

import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import clsx from "clsx";
import { UniversalSelectProps } from "./UniversalSelect.types";
import Styles from "./UniversalSelect.module.scss";
import UniversalSelectContent from "./components/UniversalSelectContent";
import Chip from "../Chip";
import ScrollableFrame from "../ScrollableFrame";
import padHelper from "@/utils/padHelper";
import PopoverBase from "../PopoverBase";

const UniversalSelect = ({
  sx,
  label,
  onSelect,
  disabled,
  disabledTooltip,
  isNewline,
  selectedItem,
  itemsData,
  displayCounter,
  sxPopover,
  multiple,
  emptyMessage,
  hasSelectorHeader,
  hasSelectorAll,
  required,
  title,
  popoverHeaderTitle = "Selecione pelo menos uma opção",
  numberOfColumns = 1,
  displayChips,
  onRemoveChip,
}: UniversalSelectProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const selectedItemLength = Array.isArray(selectedItem)
    ? selectedItem.length
    : 0;
  const selectedItemCounter = padHelper.padStart(
    selectedItemLength?.toString()
  );
  const displayCounterLabel =
    selectedItemLength > 0
      ? `${selectedItemCounter} selecionado(s)`
      : emptyMessage;

  return (
    <React.Fragment>
      <PopoverBase
        isOpened={opened}
        setIsOpened={setOpened}
        anchorElement={anchorEl}
        popoverProps={{
          sx: {
            display: itemsData && itemsData?.length > 0 ? "flex" : "none",
          },
        }}
      >
        {({ onClose }) => (
          <UniversalSelectContent
            itemsData={itemsData}
            selectedItems={selectedItem}
            onClose={onClose}
            onSelect={onSelect}
            sx={sxPopover}
            multiple={multiple}
            hasAllSelector={hasSelectorAll}
            hasHeader={hasSelectorHeader}
            title={popoverHeaderTitle}
            numberOfColumns={numberOfColumns}
          />
        )}
      </PopoverBase>

      <div className={Styles.UniversalSelect} style={{ ...sx?.wrapper }}>
        {title && (
          <div className={Styles.Register__FormHeader}>
            <p
              className={Styles.Register__FormField__Label}
              style={{ ...sx?.title }}
            >
              {title}{" "}
              {required && <span className={Styles.Label__Required}>*</span>}
            </p>
          </div>
        )}

        <Tooltip
          title={disabledTooltip}
          sx={{ width: "100%", overflow: "hidden", display: "flex", ...sx }}
        >
          <button
            className={Styles.RegisterSection__Selector}
            onClick={(e) => {
              if (disabled) return;
              setOpened(!opened);
              setAnchorEl(e.currentTarget);
            }}
            style={sx?.button}
            disabled={disabled}
            title={typeof label === "string" ? label : ""}
          >
            {displayCounter && !displayChips && (
              <p
                className={clsx(
                  Styles.RegisterSection__Selector__Label,
                  isNewline && Styles.RegisterSection__Selector__Label__NewLine
                )}
              >
                {displayCounterLabel}
              </p>
            )}

            {!displayCounter && displayChips && (
              <ScrollableFrame className={Styles.ScrollableFrame}>
                {(Array.isArray(selectedItem)
                  ? selectedItem.length === 0
                  : !selectedItem) && (
                  <p className={Styles.RegisterSection__Selector__Label}>
                    {emptyMessage}
                  </p>
                )}

                {selectedItem && Array.isArray(selectedItem)
                  ? selectedItem.map((item, index) => (
                      <Chip
                        key={index}
                        onDeleteChip={() => onRemoveChip?.(item)}
                        label={item?.label}
                        sx={{
                          chip: {
                            flexShrink: 0,
                            height: 23,
                            padding: "0 10px",
                            background: "transparent",
                          },
                        }}
                      />
                    ))
                  : selectedItem?.icon && (
                      <Chip
                        onDeleteChip={() => onRemoveChip?.(selectedItem)}
                        label={selectedItem?.label}
                        sx={{
                          chip: {
                            flexShrink: 0,
                            height: 23,
                            padding: "0 10px",
                            background: "transparent",
                          },
                        }}
                      />
                    )}
              </ScrollableFrame>
            )}

            {!displayCounter && typeof label === "string" && (
              <p
                className={clsx(
                  Styles.RegisterSection__Selector__Label,
                  isNewline && Styles.RegisterSection__Selector__Label__NewLine
                )}
              >
                {label}
              </p>
            )}

            {!displayCounter && typeof label !== "string" && label}

            <div className={Styles.RegisterSection__Selector__Icon}>
              <Icon name="chevron-down" size={14}></Icon>
            </div>
          </button>
        </Tooltip>
      </div>
    </React.Fragment>
  );
};

export default UniversalSelect;
