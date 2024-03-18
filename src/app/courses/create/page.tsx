"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Controller, useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createCourseSchema, {
  type CreateCourseSchemaType,
} from "@/schema/create-course";
import Banner from "./_parts/banner";
import NameField from "./_parts/name-field";
import Thumbnail from "./_parts/thumbnail";

export default function Page() {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
    getValues,
  } = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(createCourseSchema),
  });

  console.log(getValues());
  console.log(errors);

  const { field: bannerField } = useController({
    name: "banner",
    control: control,
  });

  const { field: thumbnailField } = useController({
    name: "thumbnail",
    control: control,
  });

  const { field: nameField } = useController({
    name: "name",
    control: control,
  });

  function submitData(data: CreateCourseSchemaType) {
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
          onChange={bannerField.onChange}
          value={bannerField.value}
          ref={bannerField.ref}
          error={
            errors?.banner?.message ??
            errors?.name?.message ??
            errors?.thumbnail?.message
          }
          NameInput={
            <NameField
              markError={!!errors?.name}
              onChange={(e) => nameField.onChange(e.target.value)}
              value={nameField.value}
              ref={nameField.ref}
              onBlur={() => nameField.onBlur()}
            />
          }
          ActionButtons={
            <Thumbnail
              markError={!!errors?.thumbnail}
              onChange={thumbnailField.onChange}
              value={thumbnailField.value}
              ref={thumbnailField.ref}
              onError={(message: string) =>
                setError("thumbnail", { message, type: "custom" })
              }
            />
          }
          markError={!!errors?.banner}
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
