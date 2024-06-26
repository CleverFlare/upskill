import Container from "@/components/container";
import { db } from "@/server/db";
import type { Course } from "@prisma/client";
import SearchBar from "./_components/search-bar";
import CourseCard from "@/components/course-card";
import Paginator from "@/components/pagination";

export default async function Courses({
  searchParams,
}: {
  searchParams: Record<string, string | string[]> & { page?: string };
}) {
  const searchParam = !!searchParams?.search
    ? Array.isArray(searchParams.search)
      ? searchParams.search[0]
      : searchParams.search
    : "";

  const databaseCoursesData: Course[] = await db.course.findMany({
    where: {
      name: {
        contains: searchParam,
      },
    },
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
  });

  let coursesCount = await db.course.count({});

  coursesCount = Math.ceil(coursesCount / 10);

  return (
    <Container className="flex flex-1 flex-col gap-8 py-10">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-primary">Courses</p>
        <h2 className="text-4xl font-bold">Unlock your potential</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Skill up, game on! Level up your life with UpSkill's diverse courses.
        </p>
      </div>
      <SearchBar />
      {!!searchParam && (
        <p className="text-2xl font-bold">Search Results of "{searchParam}"</p>
      )}
      <div className="grid flex-1 grid-cols-1 gap-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!databaseCoursesData.length && (
          <div className="col-span-full row-span-full flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-border">
            <p className="text-xl font-bold capitalize">
              There are no courses to view
            </p>
            <p className="max-w-[500px] text-center text-muted-foreground">
              If you think this is unexpected, feel free to contact the admin or
              the developer
            </p>
          </div>
        )}
        {!!databaseCoursesData.length &&
          databaseCoursesData.map((course) => (
            <CourseCard
              key={`Course ${course.id}`}
              href={`/courses/${course.id}`}
              thumbnailUrl={course.thumbnail}
            >
              {course.name}
            </CourseCard>
          ))}
      </div>
      {coursesCount > 1 && <Paginator total={coursesCount} />}
    </Container>
  );
}
