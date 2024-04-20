import DataTable from "./_organisms/table";
import { columns, type Student } from "./_components/columns";
import Paginator from "@/components/pagination";
import { db } from "@/server/db";

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
  const studentsData = await db.user.findMany({
    where: {
      AND: [
        {
          courses: {
            some: { AND: [{ courseId: params.slug }, { isAccepted: true }] },
          },
        },
        {
          OR: [
            {
              username: { startsWith: searchParams?.search ?? "" },
            },
            {
              firstName: { startsWith: searchParams?.search ?? "" },
            },
            {
              lastName: { startsWith: searchParams?.search ?? "" },
            },
          ],
        },
      ],
    },
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
    include: {
      courses: {
        where: {
          courseId: params.slug,
        },
      },
    },
  });

  let studentsCount = await db.user.count({
    where: {
      AND: [
        {
          courses: {
            some: { AND: [{ courseId: params.slug }, { isAccepted: true }] },
          },
        },
        {
          OR: [
            {
              username: { startsWith: searchParams?.search ?? "" },
            },
            {
              firstName: { startsWith: searchParams?.search ?? "" },
            },
            {
              lastName: { startsWith: searchParams?.search ?? "" },
            },
          ],
        },
      ],
    },
  });

  studentsCount = Math.ceil(studentsCount / 10);

  const data: Student[] = studentsData.map(
    ({ firstName, courses, image, lastName, id, username }) => ({
      firstName,
      lastName,
      id,
      username,
      avatar: image ?? undefined,
      points: courses[0]?.points ?? 0,
    }),
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Students</h1>
      <DataTable data={data} columns={columns} />
      {studentsCount > 1 && <Paginator total={studentsCount} />}
    </div>
  );
}

export const dynamic = "force-dynamic";
