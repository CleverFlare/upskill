import { getServerAuthSession } from "@/server/auth";
import CourseDetails from "@/app/_components/course-details";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const session = await getServerAuthSession();

  return <div>Courses</div>;
}
