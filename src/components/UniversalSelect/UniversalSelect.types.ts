/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface SelectItem {
  icon?: React.ReactNode;
  id: string | number;
  label: string;
  extraData?: any;
  groupedData?: SelectItem[];
}

export interface UniversalSelectProps {
  label?: string | React.ReactNode;
  onSelect: (item: SelectItem | SelectItem[]) => void;
  sx?: {
    title?: React.CSSProperties;
    wrapper?: React.CSSProperties;
    button?: React.CSSProperties;
  };
  required?: boolean;
  explanation?: string;
  sxPopover?: React.CSSProperties;
  disabled?: boolean;
  disabledTooltip?: string;
  isNewline?: boolean;
  selectedItem?: SelectItem | SelectItem[] | null;
  itemsData?: SelectItem[];
  displayCounter?: boolean;
  multiple?: boolean;
  emptyMessage?: string;
  hasSelectorHeader?: boolean;
  hasSelectorAll?: boolean;
  title?: string;
  popoverHeaderTitle?: string;
  numberOfColumns?: number;
  displayChips?: boolean;
  onRemoveChip?: (item: SelectItem) => void;
}
