import { type SelectProps } from "@radix-ui/react-select";
import {
  type Control,
  type Path,
  type FieldValues,
  useController,
} from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface SelectInputProps<T extends FieldValues>
  extends Omit<
    SelectProps,
    "onChange" | "onError" | "value" | "name" | "placeholder"
  > {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export default function SelectInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  children,
  placeholder,
  ...props
}: SelectInputProps<T>) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const labelId = crypto.randomUUID();

  return (
    <div className="flex flex-col gap-2">
      {!!label && (
        <Label htmlFor={labelId} required={required}>
          {label}
        </Label>
      )}

      <Select
        value={value}
        onValueChange={(value) => onChange(value)}
        {...props}
      >
        <SelectTrigger
          id={labelId}
          className={cn(
            "focus:ring-2",
            !!error
              ? "border border-destructive focus:ring-destructive"
              : "focus:ring-primary",
            value ? "" : "text-gray-500",
          )}
          ref={ref}
          onBlur={() => onBlur()}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>

      {!!error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
