import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  type ComponentProps,
  createRef,
  type ChangeEvent,
  forwardRef,
  type RefObject,
  type ReactNode,
} from "react";
import { HiPencil } from "react-icons/hi2";

interface BannerProps
  extends Omit<ComponentProps<"input">, "onChange" | "onError" | "value"> {
  error?: string;
  onError: (message: string) => void;
  onChange: (value: Blob) => void;
  markError?: boolean;
  value: File | Blob;
  NameInput?: ReactNode;
  ActionButtons?: ReactNode;
}

export default forwardRef(function Banner(
  {
    value,
    onChange,
    error,
    onError,
    markError,
    NameInput,
    ActionButtons,
    ...rest
  }: BannerProps,
  ref,
) {
  const labelRef = createRef<HTMLLabelElement>();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const size = (e.target.files?.[0]?.size ?? 0) / (1024 * 1024);
    if (!e.target?.files?.[0]) return;
    if (!e.target.files?.[0]?.type.includes("image"))
      return onError("Non-image file");
    else if (size > 20)
      return onError(`Your file is over 20MB in size, it accounts for ${size}`);

    onChange(e.target.files[0]);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "relative h-[217px] w-full overflow-hidden rounded-xl p-5",
          value ? "" : "bg-gray-200 dark:bg-gray-500",
          markError ? "border border-destructive" : "",
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
            className={cn("")}
            onClick={() => labelRef.current?.click()}
            type="button"
          >
            <HiPencil />
          </Button>
        </div>
        <input
          type="file"
          id="banner-input"
          ref={ref as RefObject<HTMLInputElement>}
          onChange={handleChange}
          className="hidden"
          {...rest}
        />
        {!!value && (
          <Image
            src={URL.createObjectURL(value)}
            className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-gray-200 object-cover object-center"
            width={1168}
            height={217}
            alt="banner"
          />
        )}
      </div>
      {!!error && (
        <p className="text-sm text-destructive">
          {typeof error === "object" ? JSON.stringify(error) : error}
        </p>
      )}
    </div>
  );
});
