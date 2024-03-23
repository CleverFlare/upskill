import { db } from "@/server/db";
import ClientPage from "./client";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  if (!searchParams.id) return redirect("/not-found");

  const dbCourseData = await db.course.findUnique({
    where: { id: searchParams.id as string },
  });

  if (!dbCourseData) return redirect("/not-found");

  const technologies: Record<
    string,
    { name: string; logo: string; logoId: string }
  > = {};

  for (const technology of dbCourseData.technologies) {
    technologies[technology.name] = {
      name: technology.name,
      logo: technology.logoUrl,
      logoId: technology.logoId,
    };
  }

  const defaultValues = {
    name: dbCourseData.name,
    banner: dbCourseData.banner,
    description: dbCourseData.description,
    thumbnail: dbCourseData.thumbnail,
    prerequisites: dbCourseData.prerequisites,
    technologies: technologies,
  };

  return (
    <ClientPage defaultValues={defaultValues} id={searchParams.id as string} />
  );
}
