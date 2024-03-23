import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type updateCourseSchema from "@/schema/update-course";
import { useController, type Control } from "react-hook-form";
import type { z } from "zod";

interface DescriptionField extends Omit<TextareaProps, "value" | "onChange"> {
  control: Control<z.infer<typeof updateCourseSchema>>;
  name: keyof z.infer<typeof updateCourseSchema>;
  error?: string;
}

export default function DescriptionField({
  error,
  control,
  name,
  ...rest
}: DescriptionField) {
  const {
    field: { value, onChange, ref, ...field },
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
        {!!error && (
          <p className="text-sm text-destructive">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </p>
        )}
      </div>
    </div>
  );
}
