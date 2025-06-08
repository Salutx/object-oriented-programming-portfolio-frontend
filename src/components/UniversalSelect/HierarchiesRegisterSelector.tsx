import React, { useState } from 'react';

import Icon from '@/components/Icon';
import PopoverBase from '@/components/Popovers/PopoverBase';
import Tooltip from '@/components/Tooltip';
import clsx from 'clsx';
import padHelper from '@/lib/padHelper';
import { HierarchiesRegisterSelectorProps } from './HierarchiesRegisterSelector.types';
import Styles from './HierarchiesRegisterSelector.module.scss';
import Constants from './HierarchiesRegisterSelector.constants';
import RegisterSelectorContent from './components/UniversalSelectContent';

const HierarchiesRegisterSelector = ({
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
}: HierarchiesRegisterSelectorProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const selectedItemLength = Array.isArray(selectedItem) ? selectedItem.length : 0;
  const selectedItemCounter = padHelper.padStart(selectedItemLength?.toString());
  const displayCounterLabel =
    selectedItemLength > 0 ? `${selectedItemCounter} selecionado(s)` : emptyMessage;

  return (
    <React.Fragment>
      <PopoverBase
        isOpened={opened}
        setIsOpened={setOpened}
        anchorElement={anchorEl}
        popoverProps={{
          sx: {
            display: itemsData && itemsData?.length > 0 ? 'flex' : 'none',
          },
        }}
      >
        {({ onClose }) => (
          <RegisterSelectorContent
            itemsData={itemsData}
            selectedItems={selectedItem}
            onClose={onClose}
            onSelect={onSelect}
            sx={sxPopover}
            multiple={multiple}
            hasAllSelector={hasSelectorAll}
            hasHeader={hasSelectorHeader}
          />
        )}
      </PopoverBase>

      <Tooltip title={disabledTooltip} sx={{ width: '100%', overflow: 'hidden', ...sx }}>
        <button
          className={Styles.RegisterSection__Selector}
          onClick={(e) => {
            if (disabled) return;
            setOpened(!opened);
            setAnchorEl(e.currentTarget);
          }}
          style={sx}
          disabled={disabled}
          title={label}
        >
          {displayCounter && (
            <p
              className={clsx(
                Styles.RegisterSection__Selector__Label,
                isNewline && Styles.RegisterSection__Selector__Label__NewLine
              )}
            >
              {displayCounterLabel}
            </p>
          )}

          {!displayCounter && (
            <p
              className={clsx(
                Styles.RegisterSection__Selector__Label,
                isNewline && Styles.RegisterSection__Selector__Label__NewLine
              )}
            >
              {label}
            </p>
          )}
          <div className={Styles.RegisterSection__Selector__Icon}>
            <Icon icon="chevron-down" size={14} color="#B8BAD6"></Icon>
          </div>
        </button>
      </Tooltip>
    </React.Fragment>
  );
};

export default HierarchiesRegisterSelector;
