import SearchBar from "./_components/search-bar";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi2";
import Link from "next/link";
import CourseCardWithActions from "./_components/course-card-with-options";
import { db } from "@/server/db";
import Paginator from "@/components/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]> & {
    search: string;
    page?: string;
  };
}) {
  const databaseCoursesData = await db.course.findMany({
    where: {
      OR: [
        {
          name: { contains: searchParams?.search ?? "" },
        },
        {
          description: { contains: searchParams?.search ?? "" },
        },
        {
          technologies: {
            some: { name: { contains: searchParams?.search ?? "" } },
          },
        },
      ],
    },
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
  });

  let coursesCount = await db.course.count({});

  coursesCount = Math.ceil(coursesCount / 10);

  return (
    <div className="flex min-h-full flex-col gap-4">
      <h2 className="text-4xl font-bold">Courses</h2>
      <p className="text-gray-500">
        Here you can manage all the courses on the platform.
      </p>
      <div className="flex w-full justify-between gap-4">
        <SearchBar />
        <Button asChild>
          <Link href="/workspace/admin/create">
            <HiPlus className="me-2 text-base" />
            Create
          </Link>
        </Button>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {!databaseCoursesData.length && (
          <div className="col-span-full row-span-full flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-border">
            <p className="text-xl font-bold capitalize">
              Oh no! No courses available
            </p>
            <p className="max-w-[500px] text-center text-muted-foreground">
              There are no courses to view
            </p>
          </div>
        )}
        {!!databaseCoursesData.length &&
          databaseCoursesData.map((course) => (
            <CourseCardWithActions
              key={`Course ${course.id}`}
              id={course.id}
              href={`/workspace/${course.id}`}
              thumbnailUrl={course.thumbnail}
            >
              {course.name}
            </CourseCardWithActions>
          ))}
      </div>
      {coursesCount > 1 && <Paginator total={coursesCount} />}
    </div>
  );
}
