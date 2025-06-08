import React from 'react';
import { SelectItem } from '../../UniversalSelect.types';

export interface UniversalSelectContentProps {
  onClose: () => void;
  onSelect: (selectorItem: SelectItem | SelectItem[]) => void;
  itemsData?: SelectItem[];
  selectedItems?: SelectItem | SelectItem[] | null;
  multiple?: boolean;
  sx?: React.CSSProperties;
  title?: string;
  hasHeader?: boolean;
  hasAllSelector?: boolean;
  hasSearch?: boolean;
  numberOfColumns?: number;
  searchPlaceholder?: string;
}
