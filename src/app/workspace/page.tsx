import Container from "@/components/container";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  if (session.user.role === "admin") redirect("/workspace/admin");

  const dbData = await db.userCourse.findMany({
    where: { userId: session.user.id },
    include: { course: true },
  });

  const courses = dbData.map((userCourseData) => userCourseData.course);

  return (
    <Container className="flex flex-col gap-7 py-20">
      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeftIcon className="text-base" />
          </Link>
        </Button>
        <h2 className="text-4xl font-bold capitalize">Your courses</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!courses.length && (
          <h2 className="col-span-full text-2xl font-bold">
            No courses have been found
          </h2>
        )}
        {!!courses.length &&
          courses.map((course) => (
            <CourseCard
              href={`/workspace/${course.id}`}
              thumbnailUrl={`/thumbnails/${course.thumbnail}`}
            >
              {course.name}
            </CourseCard>
          ))}
      </div>
    </Container>
  );
}
