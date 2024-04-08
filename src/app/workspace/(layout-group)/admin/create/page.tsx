"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createCourseSchema from "@/schema/create-course";
import type { z } from "zod";
import { toBase64 } from "@/lib/to-base64";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";
import Breadcrumbs from "../../_components/breadcrumbs";
import Prerequisites from "../_components/course-manipulation/prerequisites";
import Instructors from "../_components/course-manipulation/instructors";
import Technologies from "../_components/course-manipulation/technologies";
import DescriptionField from "../_components/course-manipulation/description-field";
import NameField from "../_components/course-manipulation/name-field";
import Thumbnail from "../_components/course-manipulation/thumbnail";
import Banner from "../_components/course-manipulation/banner";

export default function Page() {
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      technologies: {},
      prerequisites: [],
      instructors: [],
    },
  });

  const router = useRouter();

  const createCourse = api.course.create.useMutation({
    onSuccess: () => {
      router.push("/workspace/admin");
      router.refresh();
    },
  });

  async function submitData({
    thumbnail,
    banner,
    technologies,
    prerequisites,
    name,
    description,
    instructors,
  }: z.infer<typeof createCourseSchema>) {
    const encodedThumbnail = await toBase64(thumbnail);
    const encodedBanner = await toBase64(banner);
    const technologiesWithEncodedLogos = await Promise.all(
      Object.entries(technologies).map(async ([_, data]) => {
        const logo = (await toBase64(data.logo as File)) as string;
        return {
          name: data.name,
          logo,
        };
      }),
    );
    const filteredInstructors = instructors.map(({ id, role }) => ({
      id,
      role,
    }));
    createCourse.mutate({
      name,
      prerequisites,
      technologies: technologiesWithEncodedLogos,
      description,
      thumbnail: encodedThumbnail as string,
      banner: encodedBanner as string,
      instructors: filteredInstructors as [
        { id: string; role: string },
        ...{ id: string; role: string }[],
      ],
    });
  }

  return (
    <div className="py-5">
      <Breadcrumbs
        items={[{ name: "Courses", href: "/workspace/admin" }, "Create"]}
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
            disabled={createCourse.isPending}
            aria-disabled={createCourse.isPending}
          >
            {createCourse.isPending && (
              <LuLoader2 className="me-2 animate-spin" />
            )}
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
