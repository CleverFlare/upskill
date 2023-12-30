import Container from "@/components/container";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Courses() {
  return (
    <Container className="flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-primary">Courses</p>
        <h2 className="text-4xl font-bold">Unlock your potential</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Skill up, game on! Level up your life with UpSkill's diverse courses.
        </p>
      </div>
      <div className="flex">
        <Input
          placeholder="Search..."
          className="rounded-ee-none rounded-se-none"
        />
        <Button
          variant="outline"
          size="icon"
          className="rounded-es-none rounded-ss-none"
        >
          <HiMagnifyingGlass className="text-lg" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CourseCard>Hello World</CourseCard>
        <CourseCard>Hello World</CourseCard>
        <CourseCard>Hello World</CourseCard>
      </div>
    </Container>
  );
}
