import CourseDetails from "@/app/_components/course-details";
import { db } from "@/server/db";
import type { Prisma, User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Record<string, string | string[]> & { slug: string };
}) {
  try {
    type UserCourseWithUser = Prisma.UserCourseGetPayload<{
      include: {
        user: { select: { firstName: true; lastName: true; image: true } };
      };
    }>;

    const databaseCourseData = await db.course.findUnique({
      where: {
        id: params.slug,
      },
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
            user: {
              select: {
                firstName: true,
                lastName: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!databaseCourseData) return redirect("/not-found");

    const instructors = (databaseCourseData.users as UserCourseWithUser[]).map(
      ({ user, role }: UserCourseWithUser) => ({
        name: `${(user as User).firstName} ${(user as User).lastName}`,
        image: (user as User).image,
        role: role,
      }),
    );

    return (
      <CourseDetails
        name={databaseCourseData?.name ?? ""}
        bannerUrl={databaseCourseData?.banner ?? ""}
        description={databaseCourseData?.description ?? ""}
        technologies={(databaseCourseData?.technologies as []) ?? []}
        prerequisites={(databaseCourseData?.prerequisites as []) ?? []}
        instructors={instructors ?? []}
      />
    );
  } catch (err) {
    return redirect("/not-found");
  }
}
