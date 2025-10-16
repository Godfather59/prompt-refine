import * as React from "react";
import { cn } from "../lib/utils";

interface OptionTileProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
  selected?: boolean;
  icon?: React.ReactNode;
  asCheckbox?: boolean;
}

export function OptionTile({
  label,
  description,
  selected,
  icon,
  asCheckbox = false,
  className,
  ...props
}: OptionTileProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "group flex w-full flex-col gap-2 rounded-lg border border-border bg-muted/20 p-4 text-left transition-all hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected && "border-primary bg-primary/10 shadow-sm",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {icon}
        <span>{label}</span>
      </span>
      {description ? (
        <span className="text-sm text-muted-foreground">{description}</span>
      ) : null}
      <span className="sr-only">
        {selected
          ? asCheckbox
            ? "Selected"
            : "Current selection"
          : asCheckbox
            ? "Not selected"
            : "Choose"}
      </span>
    </button>
  );
}
