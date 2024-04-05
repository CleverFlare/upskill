import CourseDetails from "@/app/_components/course-details";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import type { Prisma, User } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiArrowLeftOnRectangle, HiOutlineWindow } from "react-icons/hi2";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const session = await getServerAuthSession();

    const databaseCourseData = await db.course.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        users: {
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
          <Button variant="outline" className="flex gap-2" asChild>
            <Link href="/login">
              <HiArrowLeftOnRectangle />
              <p>Sign in to enroll</p>
            </Link>
          </Button>
        )}
        {!!session && !hasCourse && (
          <Button>
            <HiArrowLeftOnRectangle className="me-2 text-base" />
            Enroll to this course
          </Button>
        )}
        {!!session && hasCourse && (
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
