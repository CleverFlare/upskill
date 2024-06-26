import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  type ComponentProps,
  createRef,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  type Control,
  useController,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { HiPencil } from "react-icons/hi2";

interface BannerProps<T extends FieldValues>
  extends Omit<
    ComponentProps<"input">,
    "onChange" | "onError" | "value" | "name"
  > {
  onError: (message: string) => void;
  error?: string;
  NameInput?: ReactNode;
  ActionButtons?: ReactNode;
  control: Control<T>;
  name: Path<T>;
}

export default function Banner<T extends FieldValues>({
  onError,
  error: additionalError,
  NameInput,
  ActionButtons,
  control,
  name,
  ...rest
}: BannerProps<T>) {
  const labelRef = createRef<HTMLLabelElement>();
  const {
    field: { onChange, value, ref, ...field },
    fieldState: { error },
  } = useController({ control, name });

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const size = (e.target.files?.[0]?.size ?? 0) / (1024 * 1024);
    if (!e.target?.files?.[0]) return;
    if (!e.target.files?.[0]?.type.includes("image"))
      return onError("Non-image file in banner");
    else if (size > 20)
      return onError("Your banner image is over 20MB in size");

    onChange(e.target.files[0]);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "relative h-[217px] w-full overflow-hidden rounded-xl p-5",
          value ? "" : "bg-gray-200 dark:bg-gray-500",
          !!error ? "border border-destructive" : "",
        )}
      >
        {NameInput}
        <div className="absolute right-4 top-4 flex gap-4">
          {ActionButtons}
          <label
            htmlFor="banner-input"
            ref={labelRef}
            className="hidden"
          ></label>
          <Button
            variant="secondary"
            size="icon"
            className={cn(!!error ? "border border-destructive" : "")}
            onClick={() => labelRef.current?.click()}
            type="button"
          >
            <HiPencil />
          </Button>
        </div>
        <input
          type="file"
          id="banner-input"
          ref={ref}
          onChange={handleChange}
          className="hidden"
          {...field}
          {...rest}
        />
        {!!value && (
          <Image
            src={
              typeof value === "string"
                ? value
                : URL.createObjectURL(value as Blob)
            }
            className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full bg-gray-200 object-cover object-center"
            width={1168}
            height={217}
            alt="banner"
          />
        )}
      </div>
      {(!!error || !!additionalError) && (
        <p className="text-sm text-destructive">
          {error?.message ?? additionalError}
        </p>
      )}
    </div>
  );
}
