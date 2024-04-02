import CourseDetails from "@/app/_components/course-details";
import { db } from "@/server/db";
import type { Course } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Record<string, string | string[]> & { slug: string };
}) {
  let databaseCourseData: Course | null;

  try {
    databaseCourseData = await db.course.findUnique({
      where: {
        id: params.slug,
      },
    });
  } catch (err) {
    return redirect("/not-found");
  }

  if (!databaseCourseData) redirect("/not-found");

  return (
    <CourseDetails
      name={databaseCourseData?.name ?? ""}
      bannerUrl={databaseCourseData?.banner ?? ""}
      description={databaseCourseData?.description ?? ""}
      technologies={(databaseCourseData?.technologies as []) ?? []}
      prerequisites={(databaseCourseData?.prerequisites as []) ?? []}
    />
  );
}
