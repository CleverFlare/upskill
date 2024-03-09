import type { ComponentProps } from "react";
import EmptyStateBox from "./empty-box-svg";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends ComponentProps<"div"> {
  text: string;
}

export default function EmptyState({
  text = "Empty State",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <EmptyStateBox />
      <p className="font-bold text-primary">{text}</p>
    </div>
  );
}
