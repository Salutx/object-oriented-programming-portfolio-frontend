"use client";

import React, { useRef, useState } from "react";

import { ScrollableFrameProps } from "./ScrollableFrame.types";
import {
  mouseDownHandler,
  mouseMoveHandler,
  mouseUpHandler,
} from "@/utils/ScrollableHelpers";

const ScrollableFrame = ({ children, className, sx }: ScrollableFrameProps) => {
  const [grabbing, setGrabbing] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, x: 0, y: 0 });

  const hadMovementRef = useRef(false);
  const eleRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      onMouseLeave={() => setGrabbing(false)}
      onMouseUp={(e) => mouseUpHandler(eleRef, setGrabbing, e)}
      onMouseDown={(e) => {
        mouseDownHandler(eleRef, setGrabbing, setPos, e, hadMovementRef);
      }}
      onMouseMove={(e) => {
        mouseMoveHandler(eleRef, grabbing, pos, e, hadMovementRef);
      }}
      onClick={(e) => {
        if (hadMovementRef.current) {
          e.stopPropagation();
        }
      }}
      ref={eleRef}
      className={className}
      style={sx}
    >
      {children}
    </div>
  );
};

export default ScrollableFrame;
