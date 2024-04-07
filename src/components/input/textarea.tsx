import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea, type TextareaProps } from "../ui/textarea";

interface TextareaInputProps<T extends FieldValues>
  extends Omit<TextareaProps, "onChange" | "onError" | "value" | "name"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  noHelperText?: boolean;
}

export default function TextareaInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  noHelperText,
  ...props
}: TextareaInputProps<T>) {
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
      <Textarea
        id={labelId}
        className={cn(
          !!error
            ? "border border-destructive focus-visible:ring-destructive"
            : "",
          className,
        )}
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur()}
        value={value ?? ""}
        {...props}
      />
      {!!error && !noHelperText && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
