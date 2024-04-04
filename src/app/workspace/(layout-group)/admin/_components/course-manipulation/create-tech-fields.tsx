import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type createTechnologySchema from "@/schema/create-technology";
import type { ChangeEvent } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { z } from "zod";

interface NameFieldProps<T extends FieldValues>
  extends Omit<InputProps, "onChange" | "value"> {
  control: Control<T>;
  name: Path<T>;
}
export function NameField<T extends FieldValues>({
  control,
  name,
}: NameFieldProps<T>) {
  const {
    field: { value, onChange, ref, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <div className="col-span-3 flex flex-col gap-2">
        <Input
          id="name"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
          {...field}
        />
        {!!error && <p className="text-sm text-destructive">{error.message}</p>}
      </div>
    </div>
  );
}

interface LogoFieldProps
  extends Omit<InputProps, "onChange" | "value" | "onError"> {
  control: Control<z.infer<typeof createTechnologySchema>>;
  name: keyof z.infer<typeof createTechnologySchema>;
  onError: (message: string) => void;
}
export function LogoField({ control, name, onError }: LogoFieldProps) {
  const {
    field: { value: _, onChange, ref, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const size = (e.target.files?.[0]?.size ?? 0) / (1024 * 1024);
    if (!e.target?.files?.[0]) return;
    if (!e.target.files?.[0]?.type.includes("image"))
      return onError("Non-image file in banner");
    else if (size > 20)
      return onError(`Your banner image is over 20MB in size`);

    onChange(e.target.files[0]);
  }

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="logoUrl" className="text-right">
        Logo
      </Label>
      <div className="col-span-3 flex flex-col gap-2">
        <Input
          type="file"
          id="logoUrl"
          onChange={handleChange}
          ref={ref}
          {...field}
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
