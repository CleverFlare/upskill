import Container from "@/components/container";
import SearchBar from "../_components/search-bar";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const searchParam = !!searchParams?.search
    ? Array.isArray(searchParams.search)
      ? searchParams.search[0]
      : searchParams.search
    : "";

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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    </Container>
  );
}
