import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  type ComponentProps,
  type RefObject,
  type ChangeEvent,
  createRef,
  forwardRef,
} from "react";
import { HiPhoto } from "react-icons/hi2";

interface ThumbnailProps
  extends Omit<ComponentProps<"input">, "onChange" | "onError" | "value"> {
  onError: (message: string) => void;
  onChange: (value: Blob | undefined) => void;
  markError?: boolean;
  value: File | Blob;
}

export default forwardRef(function Thumbnail(
  { onChange, onError, markError, value, ...rest }: ThumbnailProps,
  ref,
) {
  const labelRef = createRef<HTMLLabelElement>();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const size = (e.target.files?.[0]?.size ?? 0) / (1024 * 1024);
    if (!e.target?.files?.[0]) return;
    if (!e.target.files?.[0]?.type.includes("image"))
      return onError("Non-image file in thumbnail");
    else if (size > 20)
      return onError(`Your thumbnail image is over 20MB in size`);

    onChange(e.target.files[0]);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className={cn(markError ? "border border-destructive" : "")}
        >
          <HiPhoto />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Course Thumbnail</DialogTitle>
          <DialogDescription>
            This will set the course thumbnail.
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "relative aspect-video h-[200px] cursor-pointer overflow-hidden rounded-xl bg-gray-200",
            markError ? "border border-destructive" : "",
          )}
          onClick={() => labelRef.current?.click()}
        >
          <label
            htmlFor="thumbnail-field"
            className="hidden"
            ref={labelRef}
          ></label>
          {!!value && (
            <Image
              src={value ? URL.createObjectURL(value) : ""}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="thumbnail"
            />
          )}
          <input
            type="file"
            ref={ref as RefObject<HTMLInputElement>}
            className="hidden"
            onChange={handleChange}
            id="thumbnail-field"
            {...rest}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onChange(undefined)}
            className="text-destructive hover:text-destructive"
            type="button"
          >
            Remove
          </Button>
          <DialogClose asChild>
            <Button type="button">Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
