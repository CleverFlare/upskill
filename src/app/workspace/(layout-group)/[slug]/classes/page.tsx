import { Button } from "@/components/ui/button";
import { HiLink } from "react-icons/hi2";
import AddButton from "./_components/add-button";
import TopicWithControls from "./_components/topic-with-control";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { cn } from "@/lib/utils";
import Topic from "@/components/topic";
import { type Resource } from "@prisma/client";
import YouTube from "./_components/youtube-player";

export default async function Page({
  params,
  searchParams,
}: {
  params: Record<string, string> & { slug: string };
  searchParams: Record<string, string | string[]> & { id?: string };
}) {
  const session = await getServerAuthSession();
  const courses = await db.class.findMany({
    where: {
      courseId: params.slug,
    },
  });

  const { id } = searchParams;

  let currentCourse = !!id
    ? courses.find((course) => course.id === id)
    : courses[courses.length - 1]!;

  if (!id && session?.user.role === "student")
    courses.map((course) => {
      !course.locked && (currentCourse = course);
    });

  return (
    <div className="flex min-h-full flex-1 flex-wrap gap-4">
      {!currentCourse && (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-border">
          <p className="text-xl font-bold capitalize">No classes to view</p>
          <p className="text-muted-foreground">
            Create the root class to starting viewing
          </p>
        </div>
      )}
      {!!currentCourse && (
        <div className="flex flex-1 flex-col items-start gap-4">
          <YouTube
            videoId={currentCourse?.videoId ?? ""}
            title="YouTube video player"
            opts={{
              allow:
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              referrerpolicy: "strict-origin-when-cross-origin",
              allowfullscreen: true,
            }}
            className="w-full"
            iframeClassName="aspect-[2/1] max-h-[600px] h-screen w-full rounded-lg border-none"
          />
          <div className={cn("flex w-full items-center")}>
            <h2 className="text-2xl font-bold">{currentCourse?.title}</h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
              description
            </p>
            <p className="text-gray-500 dark:text-gray-300">
              {currentCourse?.description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
              resources
            </p>
            <div className="flex gap-2">
              {currentCourse.resources.map(
                (resource: Resource, index: number) => (
                  <Button
                    className="rounded-sm"
                    asChild
                    key={`Resource ${index}`}
                  >
                    <a href={resource.url} target="_blank">
                      <HiLink className="me-2 text-base" />
                      {resource.name}
                    </a>
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex w-[400px] flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          Course Content
        </p>
        <div className="flex flex-col gap-2">
          {session?.user.role === "instructor" &&
            courses.map((course, index) => (
              <TopicWithControls
                href={`?id=${course.id}`}
                id={course.id}
                key={course.id}
                locked={course.locked}
                hideLock={index === 0}
              >
                {course.title}
              </TopicWithControls>
            ))}
          {session?.user.role != "instructor" &&
            courses.map((course) => (
              <Topic
                href={`?id=${course.id}`}
                locked={session?.user.role !== "admin" ? course.locked : false}
              >
                {course.title}
              </Topic>
            ))}
          {session?.user.role === "instructor" && <AddButton />}
        </div>
      </div>
    </div>
  );
}
