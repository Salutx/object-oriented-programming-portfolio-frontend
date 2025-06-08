'use client';

import React, { memo, useEffect } from 'react';

import { Popover } from '@mui/material';
import { PopoverBaseProps } from './PopoverBase.types';
import ResetCSS from './Popover.module.scss';
import useOverlayHook from '@/hooks/useOverlayHook';

const PopoverBase = ({
  isOpened,
  setIsOpened,
  anchorElement,
  RenderChildren,
  RenderController,
  onClosePopover,
  popoverProps,
  children,
}: PopoverBaseProps) => {
  const { isOpen, setIsOpen, onClick } = useOverlayHook();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    if (anchorElement) {
      setAnchorEl(anchorElement);
    }
  }, [anchorElement]);

  useEffect(() => {
    if (isOpened !== undefined) {
      setIsOpen(isOpened);
    }
  }, [isOpened, setIsOpen]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick();
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setIsOpen(false);
    setIsOpened?.(false);
    onClosePopover?.();
  };

  return (
    <React.Fragment>
      {!!RenderController && <RenderController onClick={handleClick} isOpen={isOpen} />}
      <Popover
        open={isOpen}
        onClose={handleClosePopover}
        anchorEl={anchorEl}
        elevation={4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: ResetCSS.PaperResetMUI }}
        {...popoverProps}
      >
        {RenderChildren && <RenderChildren onClose={handleClosePopover} />}
        {children && children({ onClose: handleClosePopover })}
      </Popover>
    </React.Fragment>
  );
};

export default memo(PopoverBase);
