import { cn } from "@/lib/utils";
import type createCourseSchema from "@/schema/create-course";
import { type ComponentProps } from "react";
import { useController, type Control } from "react-hook-form";
import type { z } from "zod";

interface NameFieldProps extends ComponentProps<"textarea"> {
  markError?: boolean;
  control: Control<z.infer<typeof createCourseSchema>>;
  name: keyof z.infer<typeof createCourseSchema>;
}
export default function NameField({
  markError,
  control,
  name,
  ...rest
}: NameFieldProps) {
  const {
    field: { value, onChange, ref, ...field },
  } = useController({
    control,
    name,
  });
  return (
    <textarea
      className={cn(
        "z-20 h-full w-1/2 resize-none rounded-md bg-transparent text-4xl text-white caret-gray-500 outline-none dark:caret-white",
        "text-border",
        markError ? "text-fill-destructive" : "",
      )}
      placeholder="Title"
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
      ref={ref}
      {...field}
      {...rest}
    />
  );
}
