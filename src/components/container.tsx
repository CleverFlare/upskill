import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("m-auto h-full max-w-[1200px] px-4", className)}
      {...props}
    />
  );
}
