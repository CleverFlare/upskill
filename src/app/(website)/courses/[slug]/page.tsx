import CourseDetails from "@/app/_components/course-details";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import type { Course } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

export default async function Page({ params }: { params: { slug: string } }) {
  let databaseCourseData: Course | null;
  const session = await getServerAuthSession();

  try {
    databaseCourseData = await db.course.findUnique({
      where: {
        id: params.slug,
      },
    });
  } catch (err) {
    return redirect("/not-found");
  }

  if (!databaseCourseData) return redirect("/not-found");

  return (
    <Container className="flex flex-col gap-10 py-5">
      <CourseDetails
        name={databaseCourseData?.name ?? ""}
        bannerUrl={databaseCourseData?.banner ?? ""}
        description={databaseCourseData?.description ?? ""}
        technologies={(databaseCourseData?.technologies as []) ?? []}
        prerequisites={(databaseCourseData?.prerequisites as []) ?? []}
      />
      {!session && (
        <Button variant="outline" className="flex gap-2" asChild>
          <Link href="/login">
            <HiArrowLeftOnRectangle />
            <p>Sign in to enroll</p>
          </Link>
        </Button>
      )}
      {!!session && (
        <Button className="flex gap-2">
          <HiArrowLeftOnRectangle />
          <p>Enroll to this course</p>
        </Button>
      )}
    </Container>
  );
}
