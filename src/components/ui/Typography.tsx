import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "code";
  variant?: "title" | "subtitle" | "body" | "code" | "muted";
}

const Typography = React.forwardRef<HTMLElement, TextProps>(
  ({ className, as: Component = "p", variant = "body", ...props }, ref) => {
    const variants = {
      title: "text-4xl font-bold tracking-tight text-white font-sans",
      subtitle: "text-xl text-zinc-400 font-mono",
      body: "text-base text-zinc-300 font-sans",
      code: "text-sm font-mono text-tokyo-blue bg-ide-sidebar px-1.5 py-0.5 rounded border border-ide-border",
      muted: "text-sm text-zinc-500 font-sans",
    };

    const CombinedComponent = Component as React.ElementType;

    return (
      <CombinedComponent
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
