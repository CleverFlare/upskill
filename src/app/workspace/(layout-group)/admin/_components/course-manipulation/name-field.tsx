import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import {
  useController,
  type Control,
  type Path,
  type FieldValues,
} from "react-hook-form";

interface NameFieldProps<T extends FieldValues>
  extends ComponentProps<"textarea"> {
  control: Control<T>;
  name: Path<T>;
}
export default function NameField<T extends FieldValues>({
  control,
  name,
  ...rest
}: NameFieldProps<T>) {
  const {
    field: { value, onChange, ref, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  return (
    <textarea
      className={cn(
        "z-20 h-full w-1/2 resize-none rounded-md bg-transparent text-4xl text-white caret-gray-500 outline-none dark:caret-white",
        "text-border",
        !!error ? "text-fill-destructive" : "",
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
