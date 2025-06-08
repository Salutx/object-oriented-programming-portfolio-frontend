import { TooltipProps as TooltipMUIProps } from '@mui/material';
import React, { ReactElement } from 'react';

export type TooltipPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export interface TooltipProps extends Omit<TooltipMUIProps, 'children'> {
  /**
   * Array of Tooltip properties
   * @param {boolean} enabled
   */
  arrow?: boolean;
  offset?: number;
  disabled?: boolean;
  children: React.ReactNode | ReactElement;
  sx?: React.CSSProperties;
}
