import { Button } from "@/components/ui/button";
import Assignment, { type AssignmentProps } from "./_components/assignment";
// import { data } from "./_components/mock-data";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import { db } from "@/server/db";
import Paginator from "@/components/pagination";
import { getServerAuthSession } from "@/server/auth";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[]> & {
    page: string;
    search: string;
  };
  params: { slug: string };
}) {
  const session = await getServerAuthSession();

  const isInstructor = session?.user.role === "instructor";

  const isAdmin = session?.user.role === "admin";

  const assignmentsData = await db.assignment.findMany({
    where: {
      courseId: params.slug,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
    include: {
      ...(!isAdmin && {
        submissions: {
          where: {
            user: {
              id: session!.user.id,
            },
          },
        },
      }),
    },
  });

  let assignmentsCount = await db.assignment.count({
    where: {
      courseId: params.slug,
    },
  });

  assignmentsCount = Math.ceil(assignmentsCount / 10);

  const data: AssignmentProps[] = assignmentsData.map(
    ({ id, title, content, dueDate, createdAt, submissions }) => ({
      id,
      title,
      content,
      dueDate,
      createdAt,
      isSubmitted: !!submissions?.length,
    }),
  ) as unknown as AssignmentProps[];

  return (
    <div className="relative flex min-h-full flex-col gap-2">
      {!assignmentsData.length && (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-border">
          <p className="text-xl font-bold capitalize">
            Where are the assignments! HUH?
          </p>
          <p className="text-muted-foreground">
            There are no assignments to view
          </p>
          {isInstructor && (
            <Button asChild className="mt-2">
              <Link href="assignments/create">
                <HiPlus className="me-2 text-base" />
                Create a new one
              </Link>
            </Button>
          )}
        </div>
      )}
      {data.map((item) => (
        <Assignment
          {...item}
          key={`Assignment ${item.id}`}
          isInstructor={isInstructor}
          hideSubmitForm={isAdmin}
        />
      ))}
      {assignmentsCount > 1 && <Paginator total={assignmentsCount} />}
      {isInstructor && !!assignmentsData.length && (
        <Button
          size="icon"
          asChild
          className="fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg"
        >
          <Link href="assignments/create">
            <HiPlus className="text-base" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
