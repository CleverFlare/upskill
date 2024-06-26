import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

interface StepLineProps extends ComponentProps<"div"> {
  checked?: boolean;
  isError?: boolean;
}

export default function StepLine({
  checked,
  className,
  isError,
  ...props
}: StepLineProps) {
  return (
    <div
      className={cn(
        "h-[2px] flex-1",
        checked
          ? isError
            ? "bg-destructive"
            : "bg-primary"
          : "bg-[hsl(var(--border))]",
        className,
      )}
      {...props}
    ></div>
  );
}
