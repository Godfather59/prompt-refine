import * as React from "react";
import { cn } from "../../lib/utils";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? "presentation" : "separator"}
      className={cn("h-px w-full bg-border", className)}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";
