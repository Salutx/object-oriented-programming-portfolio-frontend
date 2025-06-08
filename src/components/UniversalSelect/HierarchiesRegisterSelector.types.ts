/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface HierarchiesRegisterSelectorItem {
  icon?: React.ReactNode;
  id: string | number;
  label: string;
  extraData?: any;
}

export interface UniversalSelectProps {
  label?: string;
  onSelect: (
    selectorItem: HierarchiesRegisterSelectorItem | HierarchiesRegisterSelectorItem[]
  ) => void;
  sx?: React.CSSProperties;
  sxPopover?: React.CSSProperties;
  disabled?: boolean;
  disabledTooltip?: string;
  isNewline?: boolean;
  selectedItem?: HierarchiesRegisterSelectorItem | HierarchiesRegisterSelectorItem[] | null;
  itemsData?: HierarchiesRegisterSelectorItem[];
  displayCounter?: boolean;
  multiple?: boolean;
  emptyMessage?: string;
  hasSelectorHeader?: boolean;
  hasSelectorAll?: boolean;
}
