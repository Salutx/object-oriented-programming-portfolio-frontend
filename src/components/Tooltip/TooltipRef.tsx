/* eslint-disable react/display-name */
import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import Styles from './Tooltip.module.scss';

interface TooltipRefProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const TooltipRef = forwardRef<HTMLDivElement, TooltipRefProps>(({ children, ...rest }, ref) => (
  <div className={Styles.TooltipRef} ref={ref} {...rest}>
    {children}
  </div>
));

export default TooltipRef;
