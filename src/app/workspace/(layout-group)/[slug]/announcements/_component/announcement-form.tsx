"use client";
import FieldInput from "@/components/input/field";
import TextareaInput from "@/components/input/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import createPostSchema from "@/schema/create-post";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FormEvent, createRef } from "react";
import { useController, useForm } from "react-hook-form";
import { HiOutlinePhoto, HiPaperAirplane } from "react-icons/hi2";
import type { z } from "zod";

export default function AnnouncementForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    control,
    name: "image",
  });

  const imageRef = createRef<HTMLLabelElement>();

  function submitData(data: z.infer<typeof createPostSchema>) {
    console.log(data);
  }

  return (
    <form
      className="flex h-max items-end gap-2 border-t pt-2"
      onSubmit={handleSubmit(submitData)}
    >
      <label htmlFor="image" className="hidden" ref={imageRef}></label>
      <input
        id="image"
        type="file"
        ref={ref}
        onChange={(e) => onChange(e.currentTarget.files?.[0])}
        className="hidden"
      />
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "relative aspect-square h-full w-auto overflow-hidden",
          errors?.image ? "border-destructive" : "",
        )}
        onBlur={() => onBlur()}
        onClick={() => imageRef.current?.click()}
        type="button"
      >
        {!value && <HiOutlinePhoto className="text-2xl" />}
        {!!value && (
          <Image
            src={typeof value === "string" ? value : URL.createObjectURL(value)}
            alt="post image"
            width={98}
            height={98}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        )}
      </Button>
      <div className="flex h-full flex-1 flex-col gap-2">
        <FieldInput
          control={control}
          name="title"
          placeholder="Title..."
          noHelperText
        />
        <TextareaInput
          control={control}
          name="content"
          placeholder="Content..."
          className="resize-none"
          noHelperText
        />
      </div>
      <Button size="icon">
        <HiPaperAirplane className="text-base" />
      </Button>
    </form>
  );
}
