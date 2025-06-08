import { PopoverProps } from '@mui/material';
import React, { ReactElement } from 'react';

export interface PopoverBaseProps {
  RenderController?: ({
    onClick,
    isOpen,
  }: {
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isOpen: boolean;
  }) => ReactElement;
  RenderChildren?: ({
    onClose,
    anchorElement,
  }: {
    onClose: () => void;
    anchorElement: HTMLElement | null;
  }) => ReactElement;
  anchorElement?: HTMLElement | null;
  isOpened?: boolean;
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  popoverProps?: Partial<PopoverProps>;
  onClosePopover?: () => void;
  children?: ({ onClose }: { onClose: () => void }) => ReactElement;
}
