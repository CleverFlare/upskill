"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createCourseSchema from "@/schema/create-course";
import Banner from "./_parts/banner";
import NameField from "./_parts/name-field";
import Thumbnail from "./_parts/thumbnail";
import DescriptionField from "./_parts/description-field";
import type { z } from "zod";
import { Form } from "@/components/ui/form";

export default function Page() {
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
  });

  function submitData(data: z.infer<typeof createCourseSchema>) {
    console.log(data);
  }

  return (
    <Container className="py-5">
      <form
        className="flex flex-col gap-10"
        onSubmit={handleSubmit(submitData)}
      >
        <Banner
          onError={(message: string) =>
            setError("banner", { message, type: "custom" })
          }
          control={control}
          name="banner"
          error={
            errors?.banner?.message ??
            errors?.name?.message ??
            errors?.thumbnail?.message
          }
          NameInput={
            <NameField
              markError={!!errors?.name}
              control={control}
              name="name"
            />
          }
          ActionButtons={
            <Thumbnail
              markError={!!errors?.thumbnail}
              control={control}
              name="thumbnail"
              onError={(message: string) =>
                setError("thumbnail", { message, type: "custom" })
              }
            />
          }
          markError={!!errors?.banner}
        />
        <DescriptionField
          control={control}
          name="description"
          error={errors?.description?.message}
        />
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Container>
  );
}
