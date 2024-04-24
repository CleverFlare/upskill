import CourseDetails from "@/app/_components/course-details";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import type { Prisma, User } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiArrowLeftOnRectangle, HiOutlineWindow } from "react-icons/hi2";
import EnrollButton from "./_components/enroll-button";
import UnenrollButton from "./_components/unenroll-button";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const session = await getServerAuthSession();

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
            user: true,
          },
        },
      },
    });

    if (!databaseCourseData) return redirect("/not-found");

    type CourseWithUser = Prisma.CourseGetPayload<{
      include: {
        users: {
          include: { user: true };
        };
      };
    }>;
    type UserCourseWithUser = Prisma.UserCourseGetPayload<{
      include: {
        user: { select: { firstName: true; lastName: true; image: true } };
      };
    }>;

    const instructors = (databaseCourseData as CourseWithUser).users.map(
      ({ user, role }: UserCourseWithUser) => ({
        name: `${(user as User).firstName} ${(user as User).lastName}`,
        image: (user as User).image,
        role: role,
      }),
    );

    const userCourseRecord =
      session?.user.role !== "admin"
        ? await db.userCourse.findFirst({
            where: {
              userId: session?.user.id,
              courseId: databaseCourseData.id,
            },
          })
        : undefined;

    const hasCourse = !!userCourseRecord || session?.user.role === "admin";

    const isAccepted = userCourseRecord?.isAccepted;

    return (
      <Container className="flex flex-col gap-10 py-5">
        <CourseDetails
          name={databaseCourseData?.name ?? ""}
          bannerUrl={databaseCourseData?.banner ?? ""}
          description={databaseCourseData?.description ?? ""}
          technologies={(databaseCourseData?.technologies as []) ?? []}
          prerequisites={(databaseCourseData?.prerequisites as []) ?? []}
          instructors={instructors ?? []}
        />
        {!session && (
          <Button variant="outline" asChild>
            <Link href="/login">
              <HiArrowLeftOnRectangle className="me-2 text-base" />
              <p>Sign in to enroll</p>
            </Link>
          </Button>
        )}
        {!!session && !hasCourse && <EnrollButton />}
        {!!session && hasCourse && !isAccepted && <UnenrollButton />}
        {!!session && hasCourse && isAccepted && (
          <Button asChild>
            <Link href={`/workspace/${databaseCourseData.id}`}>
              <HiOutlineWindow className="me-2 text-base" />
              View in workspace
            </Link>
          </Button>
        )}
      </Container>
    );
  } catch (err) {
    return redirect("/not-found");
  }
}
