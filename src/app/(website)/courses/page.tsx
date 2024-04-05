import Container from "@/components/container";
import { db } from "@/server/db";
import type { Course } from "@prisma/client";
import SearchBar from "./_components/search-bar";
import CourseCardWithActions from "./_components/course-card-with-options";

export default async function Courses({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
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
  });

  return (
    <Container className="flex flex-col gap-8 py-10">
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
      <div className="grid grid-cols-1 gap-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!!databaseCoursesData.length &&
          databaseCoursesData.map((course) => (
            <CourseCardWithActions
              key={`Course ${course.id}`}
              id={course.id}
              href={`/courses/${course.id}`}
              thumbnailUrl={course.thumbnail}
            >
              {course.name}
            </CourseCardWithActions>
          ))}
      </div>
    </Container>
  );
}
