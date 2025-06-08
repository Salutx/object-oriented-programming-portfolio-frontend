/* eslint-disable comma-dangle */
import { MouseEvent, MutableRefObject, SetStateAction, Dispatch } from "react";

export const mouseMoveHandler = (
  eleRef: MutableRefObject<HTMLDivElement | null>,
  grabbing: boolean,
  pos: { top: number; left: number; x: number; y: number },
  e: MouseEvent,
  hadMovementRef: MutableRefObject<boolean>
) => {
  e.stopPropagation();
  if (!grabbing || !eleRef.current) return;

  const ele = eleRef.current;
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;

  ele.scrollTop = pos.top - dy;
  ele.scrollLeft = pos.left - dx;

  // eslint-disable-next-line no-param-reassign
  hadMovementRef.current = true;
};

export const mouseDownHandler = (
  eleRef: MutableRefObject<HTMLDivElement | null>,
  setGrabbing: Dispatch<SetStateAction<boolean>>,
  setPos: Dispatch<
    SetStateAction<{ top: number; left: number; x: number; y: number }>
  >,
  e: MouseEvent<HTMLDivElement>,
  hadMovementRef: MutableRefObject<boolean>
) => {
  e.stopPropagation();
  if (!eleRef.current) return;

  setGrabbing(true);
  // eslint-disable-next-line no-param-reassign
  eleRef.current.style.userSelect = "none";

  const ele = eleRef.current;

  setPos({
    left: ele.scrollLeft,
    top: ele.scrollTop,
    x: e.clientX,
    y: e.clientY,
  });

  // eslint-disable-next-line no-param-reassign
  hadMovementRef.current = false;
};

export const mouseUpHandler = (
  eleRef: MutableRefObject<HTMLDivElement | null>,
  setGrabbing: Dispatch<SetStateAction<boolean>>,
  e?: MouseEvent<HTMLDivElement>
) => {
  if (e) {
    e.stopPropagation();
  }

  setGrabbing(false);
  eleRef.current?.style.removeProperty("userSelect");
};
