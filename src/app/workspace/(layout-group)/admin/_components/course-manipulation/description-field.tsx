import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  useController,
  type Control,
  type Path,
  type FieldValues,
} from "react-hook-form";

interface DescriptionField<T extends FieldValues>
  extends Omit<TextareaProps, "value" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
}

export default function DescriptionField<T extends FieldValues>({
  control,
  name,
  ...rest
}: DescriptionField<T>) {
  const {
    field: { value, onChange, ref, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
        track description
      </p>
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Description..."
          className={cn(
            "resize-y",
            !!error
              ? "border border-destructive focus-visible:ring-1 focus-visible:ring-destructive"
              : "",
          )}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          ref={ref}
          {...field}
          {...rest}
        />
        {!!error && <p className="text-sm text-destructive">{error.message}</p>}
      </div>
    </div>
  );
}
