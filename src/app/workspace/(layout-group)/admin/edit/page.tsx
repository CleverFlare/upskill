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
    include: {
      users: {
        where: {
          OR: [
            {
              role: "instructor",
            },
            {
              role: "head",
            },
          ],
        },
        include: {
          user: true,
        },
      },
    },
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

  const filteredInstructors = dbCourseData.users.map(({ user, role }) => ({
    name: `${user.firstName} ${user.lastName}`,
    image: user.image,
    username: user.username,
    role,
    id: user.id,
  })) as {
    name: string;
    image?: string;
    role: string;
    username: string;
    id: string;
  }[];

  const defaultValues = {
    name: dbCourseData.name,
    banner: dbCourseData.banner,
    description: dbCourseData.description,
    thumbnail: dbCourseData.thumbnail,
    prerequisites: dbCourseData.prerequisites,
    technologies: technologies,
    instructors: filteredInstructors,
  };

  return (
    <ClientPage defaultValues={defaultValues} id={searchParams.id as string} />
  );
}
