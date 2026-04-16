"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface BoxProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "sidebar" | "glass" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, variant = "default", padding = "md", ...props }, ref) => {
    const variants = {
      default: "",
      sidebar: "bg-ide-sidebar border-r border-ide-border",
      glass: "glass",
      bordered: "border border-ide-border",
    };

    const paddings = {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-8",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export { Box };
