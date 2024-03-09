import CourseDetails from "@/app/_components/course-details";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <Container className="flex flex-col py-5">
      <CourseDetails />
      <Button variant="outline" className="flex gap-2" asChild>
        <Link href="/">
          <HiArrowRightOnRectangle />
          <p>Sign in to enroll</p>
        </Link>
      </Button>
    </Container>
  );
}
