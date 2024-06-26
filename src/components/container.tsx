import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto h-full w-full max-w-[1200px] px-4", className)}
      {...props}
    />
  );
}
