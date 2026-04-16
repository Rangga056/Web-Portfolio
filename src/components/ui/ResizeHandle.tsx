"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ResizeHandleProps {
  orientation: "horizontal" | "vertical";
  onResize: (delta: number) => void;
  className?: string;
}

export const ResizeHandle = ({ orientation, onResize, className }: ResizeHandleProps) => {
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      if (orientation === "horizontal") {
        onResize(e.movementX);
      } else {
        onResize(e.movementY);
      }
    }
  }, [isResizing, orientation, onResize]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      onMouseDown={startResizing}
      className={cn(
        "transition-colors hover:bg-tokyo-blue/50 z-50",
        orientation === "horizontal" ? "w-1 cursor-col-resize h-full" : "h-1 cursor-row-resize w-full",
        isResizing && "bg-tokyo-blue",
        className
      )}
    />
  );
};
