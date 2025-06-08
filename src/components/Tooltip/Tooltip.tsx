import React from 'react';

import { Tooltip as TooltipMUI } from '@mui/material';
import { TooltipProps } from './Tooltip.types';
import Styles from './Tooltip.module.scss';
import TooltipRef from './TooltipRef';

const Tooltip = ({
  children,
  offset = -5,
  arrow = false,
  placement = 'bottom',
  title = '',
  sx,
  ...rest
}: TooltipProps) => (
  <TooltipMUI
    style={{ ...sx }}
    describeChild
    title={title}
    placement={placement}
    arrow={arrow}
    PopperProps={{ modifiers: [{ name: 'offset', options: { offset: [0, offset] } }] }}
    TransitionProps={{ timeout: 400 }}
    slotProps={{ popper: { className: Styles.Tooltip } }}
    {...rest}
  >
    <TooltipRef>{children}</TooltipRef>
  </TooltipMUI>
);

export default Tooltip;
