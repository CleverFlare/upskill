import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ComponentProps,
  type RefObject,
  useEffect,
} from "react";

interface NameFieldProps extends ComponentProps<"textarea"> {
  markError?: boolean;
}
export default forwardRef(function NameField(
  { markError, value, ...rest }: NameFieldProps,
  ref,
) {
  useEffect(() => {
    console.log(rest);
  }, [rest]);
  return (
    <textarea
      className={cn(
        "z-20 h-full w-1/2 resize-none bg-transparent text-4xl text-white caret-gray-500 outline-none dark:caret-white",
        "text-border",
        markError ? "outline-1 outline-destructive" : "",
      )}
      placeholder="Title"
      ref={ref as RefObject<HTMLTextAreaElement>}
      value={value}
      {...rest}
    />
  );
});
