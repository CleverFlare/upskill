"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createCourseSchema from "@/schema/create-course";
import Banner from "./_parts/banner";
import NameField from "./_parts/name-field";
import Thumbnail from "./_parts/thumbnail";
import DescriptionField from "./_parts/description-field";
import type { z } from "zod";
import Technologies from "./_parts/technologies";
import Prerequisites from "./_parts/prerequisites";
import { toBase64 } from "@/lib/to-base64";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";

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
    },
  });

  const router = useRouter();

  const createCourse = api.post.createCourse.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push("/courses");
    },
  });

  async function submitData({
    thumbnail,
    banner,
    technologies,
    prerequisites,
    name,
    description,
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
    createCourse.mutate({
      name,
      prerequisites,
      technologies: technologiesWithEncodedLogos,
      description,
      thumbnail: encodedThumbnail as string,
      banner: encodedBanner as string,
    });
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
        <Technologies
          control={control}
          name="technologies"
          error={errors?.technologies?.message as string | undefined}
        />
        <Prerequisites control={control} name="prerequisites" />
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/courses">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={createCourse.isLoading}
            aria-disabled={createCourse.isLoading}
          >
            {createCourse.isLoading && (
              <LuLoader2 className="me-2 animate-spin" />
            )}
            Create
          </Button>
        </div>
      </form>
    </Container>
  );
}