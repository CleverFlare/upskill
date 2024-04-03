"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Banner from "./_parts/banner";
import NameField from "./_parts/name-field";
import Thumbnail from "./_parts/thumbnail";
import DescriptionField from "./_parts/description-field";
import type { z } from "zod";
import Technologies from "./_parts/technologies";
import Prerequisites from "./_parts/prerequisites";
import { api } from "@/trpc/react";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";
import updateCourseSchema from "@/schema/update-course";
import filterChange from "@/lib/filter-changes";
import { toBase64 } from "@/lib/to-base64";
import { useRouter } from "next/navigation";

interface DefaultValuesType {
  banner: string;
  thumbnail: string;
  name: string;
  description: string;
  technologies: Record<string, { name: string; logo: string }>;
  prerequisites: string[];
}

export default function ClientPage({
  defaultValues,
  id,
}: {
  defaultValues: DefaultValuesType;
  id: string;
}) {
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof updateCourseSchema>>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues,
  });

  const router = useRouter();

  const updateCourse = api.course.update.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push("/workspace/admin");
    },
  });

  async function submitData(data: z.infer<typeof updateCourseSchema>) {
    // utilizes the filterChange utility to detect changes
    const changes = filterChange(
      defaultValues as unknown as Record<string, unknown>,
      data,
    );

    // Check if there is no changes made
    if (!Object.entries(changes).length)
      return console.log("No changes to update");

    // Converts the thumbnail image to base64 format if its present
    if (changes?.thumbnail)
      changes.thumbnail = await toBase64(data.thumbnail as Blob);

    // Converts the banner image to base64 format if its present
    if (changes?.banner) changes.banner = await toBase64(data.banner as Blob);

    // Converts the technologies object into an array if its present
    if (changes?.technologies)
      changes.technologies = await Promise.all(
        Object.entries(data.technologies).map(async ([_, data]) => {
          if (!data?.logoId)
            data.logo = (await toBase64(data.logo as File)) as string;

          return data;
        }),
      );
    updateCourse.mutate({ id, ...changes });
  }

  return (
    <div className="py-5">
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
        <Technologies
          control={control}
          name="technologies"
          error={errors?.technologies?.message as string | undefined}
        />
        <Prerequisites control={control} name="prerequisites" />
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href=".">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={updateCourse.isLoading}
            aria-disabled={updateCourse.isLoading}
          >
            {updateCourse.isLoading && (
              <LuLoader2 className="me-2 animate-spin" />
            )}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
