import { Button } from "@/components/ui/button";
import Assignment, { type AssignmentProps } from "./_components/assignment";
// import { data } from "./_components/mock-data";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import Paginator from "@/components/pagination";

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
  const session = await getServerSession();

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
      submissions: {
        where: {
          user: {
            id: session!.user.id,
          },
        },
      },
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
      isSubmitted: !!submissions.length,
    }),
  ) as unknown as AssignmentProps[];

  return (
    <div className="relative flex flex-col gap-2">
      {data.map((item) => (
        <Assignment {...item} key={`Assignment ${item.id}`} />
      ))}
      {assignmentsCount > 1 && <Paginator total={assignmentsCount} />}
      <Button
        size="icon"
        asChild
        className="fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg"
      >
        <Link href="assignments/create">
          <HiPlus className="text-base" />
        </Link>
      </Button>
    </div>
  );
}

export const dynamic = "force-dynamic";
