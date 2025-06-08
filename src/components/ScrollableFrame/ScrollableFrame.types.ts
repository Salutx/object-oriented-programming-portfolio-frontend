import React, { ReactNode } from 'react';

export interface ScrollableFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * ComponentType documentation
   */
  children: ReactNode;
  /**
   * ComponentType documentation
   */
  sx?: React.CSSProperties;
}
