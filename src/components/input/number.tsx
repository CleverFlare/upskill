import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { type NumberFormatBaseProps, NumericFormat } from "react-number-format";

interface NumberInputProps<T extends FieldValues>
  extends Omit<
    NumberFormatBaseProps,
    "onChange" | "onError" | "value" | "name"
  > {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
}

export default function NumberInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  ...props
}: NumberInputProps<T>) {
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
      <input
        type="text"
        value={value}
        onChange={() => onChange()}
        className="hidden"
        ref={ref}
      />
      <NumericFormat
        customInput={Input}
        id={labelId}
        className={cn(
          !!error
            ? "border border-destructive focus-visible:ring-destructive"
            : "",
          className,
        )}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onBlur={() => onBlur()}
        {...props}
      />
      {!!error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
