import { adminOnly } from "@/server/auth";
import SearchBar from "./_components/search-bar";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi2";
import Link from "next/link";
import CourseCardWithActions from "./_components/course-card-with-options";
import { db } from "@/server/db";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]> & { search: string };
}) {
  await adminOnly();

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
  });

  return (
    <div className="flex flex-col gap-6">
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
      <div className="grid grid-cols-1 gap-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    </div>
  );
}
