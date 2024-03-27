import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { HiCheck, HiXMark } from "react-icons/hi2";

const stepVariants = cva(
  "min-w-[32px] min-h-[32px] rounded-full border-2 cursor-pointer flex justify-center items-center",
  {
    variants: {
      state: {
        default: "border-gray-200",
        selected: "border-[hsl(var(--color))]",
        checked: "bg-[hsl(var(--color))] border-[hsl(var(--color))]",
      },
      isError: {
        false: "[--color:var(--primary)]",
        true: "[--color:var(--destructive)]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface StepProps
  extends ComponentProps<"div">,
    VariantProps<typeof stepVariants> {
  isError?: boolean;
}

export default function Step({
  state,
  isError,
  className,
  ...props
}: StepProps) {
  return (
    <div
      className={cn(stepVariants({ state, isError: !!isError }), className)}
      {...props}
    >
      {state === "selected" && (
        <div
          className={cn("size-[10px] rounded-full bg-[hsl(var(--color))]")}
        ></div>
      )}
      {state === "checked" && !isError && (
        <HiCheck className="text-xl text-white" />
      )}
      {state === "checked" && !!isError && (
        <HiXMark className="text-xl text-white" />
      )}
    </div>
  );
}
