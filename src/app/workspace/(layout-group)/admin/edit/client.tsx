"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Banner from "../_components/course-manipulation/banner";
import NameField from "../_components/course-manipulation/name-field";
import Thumbnail from "../_components/course-manipulation/thumbnail";
import DescriptionField from "../_components/course-manipulation/description-field";
import type { z } from "zod";
import Technologies from "../_components/course-manipulation/technologies";
import Prerequisites from "../_components/course-manipulation/prerequisites";
import { api } from "@/trpc/react";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";
import updateCourseSchema from "@/schema/update-course";
import filterChange from "@/lib/filter-changes";
import { toBase64 } from "@/lib/to-base64";
import { useRouter } from "next/navigation";
import Breadcrumbs from "../../_components/breadcrumbs";
import Instructors, {
  type InstructorType,
} from "../_components/course-manipulation/instructors";

interface DefaultValuesType {
  banner: string;
  thumbnail: string;
  name: string;
  description: string;
  technologies: Record<string, { name: string; logo: string }>;
  prerequisites: string[];
  instructors: { name: string; image?: string; role: string }[];
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

  console.log(errors);

  const router = useRouter();

  const updateCourse = api.course.update.useMutation({
    onSuccess: () => {
      router.push("/workspace/admin");
      router.refresh();
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

    if (changes?.instructors)
      changes.instructors = (changes.instructors as InstructorType[]).map(
        ({ id, role }) => ({
          id,
          role,
        }),
      );

    updateCourse.mutate({ id, ...changes });
  }

  return (
    <div className="py-5">
      <Breadcrumbs
        items={[{ name: "Courses", href: "/workspace/admin" }, "Edit"]}
        className="mb-4"
      />
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
          error={errors?.name?.message ?? errors?.thumbnail?.message}
          NameInput={<NameField control={control} name="name" />}
          ActionButtons={
            <Thumbnail
              control={control}
              name="thumbnail"
              onError={(message: string) =>
                setError("thumbnail", { message, type: "custom" })
              }
            />
          }
        />
        <DescriptionField control={control} name="description" />
        <Technologies control={control} name="technologies" />
        <Instructors control={control} name="instructors" />
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
