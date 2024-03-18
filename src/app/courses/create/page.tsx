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
  } = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(createCourseSchema),
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
        <Controller
          control={control}
          name="banner"
          render={({ field: { value, onChange, ref, ...field } }) => (
            <Banner
              {...field}
              onError={(message: string) =>
                setError("banner", { message, type: "custom" })
              }
              onChange={onChange}
              value={value}
              ref={ref}
              error={
                errors?.banner?.message ??
                errors?.name?.message ??
                errors?.thumbnail?.message
              }
              ActionButtons={
                <Thumbnail
                  value={thumbnailField.value}
                  onChange={thumbnailField.onChange}
                  ref={thumbnailField.ref}
                  onError={(message: string) =>
                    setError("banner", { message, type: "custom" })
                  }
                  markError={!!errors?.thumbnail}
                />
              }
              NameInput={
                <NameField
                  markError={!!errors?.name}
                  onChange={(e) => nameField.onChange(e.target.value)}
                  value={nameField.value}
                  ref={ref}
                />
              }
              markError={!!errors?.banner}
            />
          )}
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
